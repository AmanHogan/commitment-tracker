# Adding a New Entity — Full Flow

Use the `Action Item` table as the example throughout.

```sql
CREATE TABLE action_items (
  id SERIAL PRIMARY KEY,
  action_item TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  status TEXT DEFAULT 'In Progress',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 1. Model

`src/main/java/.../model/ActionItem.java`

Rules:
- `@Entity` marks it as a JPA entity.
- `@Table(name = "...")` must exactly match the Postgres table name.
- `@EntityListeners(AuditingEntityListener.class)` enables `@CreatedDate` / `@LastModifiedDate`.
- ID is `Integer` (not `Long`) because Postgres `SERIAL` = 32-bit integer.
- `@Column(name = "...")` is only needed when the Java field name doesn't match the DB column after snake_case conversion (e.g. `actionItem` → `action_item` is fine; `dueDate` → `due_date` is fine).

```java
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "action_items")
@EntityListeners(AuditingEntityListener.class)
public class ActionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "action_item", nullable = false)
    private String actionItem;

    private String description;

    private LocalDate dueDate;

    private String status;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
```

---

## 2. Repository

`src/main/java/.../repository/ActionItemRepository.java`

Rules:
- Extend `JpaRepository<YourEntity, IdType>`.
- Spring Data auto-implements `findAll`, `findById`, `save`, `deleteById`, etc. — you get them for free.
- Add custom query methods by following the naming convention: `findBy<FieldName>(value)`.

```java
@Repository
public interface ActionItemRepository extends JpaRepository<ActionItem, Integer> {

    // Spring derives the query from the method name automatically
    List<ActionItem> findByStatus(String status);
}
```

---

## 3. Service Interface

`src/main/java/.../service/ActionItemService.java`

Rules:
- Define the contract (what operations exist) without any implementation.
- Keeps the controller decoupled from the specific implementation.

```java
public interface ActionItemService {

    List<ActionItem> findAll();

    ActionItem create(ActionItem actionItem);

    ActionItem update(Integer id, ActionItem actionItem);

    void delete(Integer id);

    List<ActionItem> findByStatus(String status);

    void deleteAll();
}
```

---

## 4. Service Implementation

`src/main/java/.../service/ActionItemImpl.java`

Rules:
- `@Service` registers it as a Spring bean.
- `@RequiredArgsConstructor` (Lombok) injects the repository via constructor injection.
- In `update()`: fetch the existing record, set only the fields that should be updatable (don't overwrite `createdAt`), then save.
- Throw a descriptive `RuntimeException` if a record isn't found (you can graduate to a custom exception class later).

```java
@Service
@RequiredArgsConstructor
public class ActionItemImpl implements ActionItemService {

    private final ActionItemRepository actionItemRepository;

    @Override
    public List<ActionItem> findAll() {
        return actionItemRepository.findAll();
    }

    @Override
    public ActionItem create(ActionItem actionItem) {
        return actionItemRepository.save(actionItem);
    }

    @Override
    public ActionItem update(Integer id, ActionItem updated) {
        return actionItemRepository.findById(id)
                .map(existing -> {
                    existing.setActionItem(updated.getActionItem());
                    existing.setDescription(updated.getDescription());
                    existing.setDueDate(updated.getDueDate());
                    existing.setStatus(updated.getStatus());
                    return actionItemRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("ActionItem not found: " + id));
    }

    @Override
    public void delete(Integer id) {
        if (!actionItemRepository.existsById(id)) {
            throw new RuntimeException("ActionItem not found: " + id);
        }
        actionItemRepository.deleteById(id);
    }

    @Override
    public List<ActionItem> findByStatus(String status) {
        return actionItemRepository.findByStatus(status);
    }

    @Override
    public void deleteAll() {
        actionItemRepository.deleteAll();
    }
}
```

---

## 5. DTO

`src/main/java/.../io/ActionItemDto.java`

Rules:
- A `record` is the cleanest way — immutable, no boilerplate.
- The DTO is what goes over the wire (JSON in/out). The entity is what hits the DB.
- Keep sensitive or internal fields (e.g. `createdAt`) read-only in real apps, but include them here for simplicity.

```java
public record ActionItemDto(
        Integer id,
        String actionItem,
        String description,
        LocalDate dueDate,
        String status,
        Instant createdAt,
        Instant updatedAt
) {}
```

---

## 6. Mapper

`src/main/java/.../mapper/ActionItemMapper.java`

Rules:
- `final` class with private constructor = pure static utility, no instantiation.
- `toDto()` — entity → DTO (used in controller responses).
- `toEntity()` — DTO → entity (used when creating/updating).
- `toDtoList()` — convenience for `findAll` responses.

```java
public final class ActionItemMapper {
    private ActionItemMapper() {}

    public static ActionItemDto toDto(ActionItem e) {
        if (e == null) return null;
        return new ActionItemDto(
                e.getId(),
                e.getActionItem(),
                e.getDescription(),
                e.getDueDate(),
                e.getStatus(),
                e.getCreatedAt(),
                e.getUpdatedAt()
        );
    }

    public static ActionItem toEntity(ActionItemDto d) {
        if (d == null) return null;
        return ActionItem.builder()
                .id(d.id())
                .actionItem(d.actionItem())
                .description(d.description())
                .dueDate(d.dueDate())
                .status(d.status())
                .createdAt(d.createdAt())
                .updatedAt(d.updatedAt())
                .build();
    }

    public static List<ActionItemDto> toDtoList(List<ActionItem> list) {
        return list.stream().map(ActionItemMapper::toDto).collect(Collectors.toList());
    }
}
```

---

## 7. Controller

`src/main/java/.../controller/ActionItemController.java`

Rules:
- `@RestController` = `@Controller` + `@ResponseBody` (auto-serializes return values to JSON).
- `@RequestMapping("/api/...")` sets the base route.
- Use `ResponseEntity<T>` to control HTTP status codes explicitly.
- The controller should only call the service — no business logic here.
- `@PathVariable` binds `/{id}` from the URL. `@RequestBody` deserializes the JSON request body.

```java
@RestController
@RequestMapping("/api/action-items")
@RequiredArgsConstructor
public class ActionItemController {

    private final ActionItemService actionItemService;

    @GetMapping
    public ResponseEntity<List<ActionItemDto>> getAll() {
        return ResponseEntity.ok(ActionItemMapper.toDtoList(actionItemService.findAll()));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ActionItemDto>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(ActionItemMapper.toDtoList(actionItemService.findByStatus(status)));
    }

    @PostMapping
    public ResponseEntity<ActionItemDto> create(@RequestBody ActionItemDto dto) {
        ActionItem saved = actionItemService.create(ActionItemMapper.toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(ActionItemMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActionItemDto> update(@PathVariable Integer id, @RequestBody ActionItemDto dto) {
        ActionItem updated = actionItemService.update(id, ActionItemMapper.toEntity(dto));
        return ResponseEntity.ok(ActionItemMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        actionItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        actionItemService.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
```

---

## Checklist

- [ ] Model created with `@Entity`, `@Table`, `@Id`, auditing annotations
- [ ] Repository extends `JpaRepository<Entity, Integer>`
- [ ] Service interface defines all method signatures
- [ ] Service impl annotated `@Service`, injected with `@RequiredArgsConstructor`
- [ ] DTO is a `record` matching the fields you want to expose
- [ ] Mapper has `toDto`, `toEntity`, `toDtoList`
- [ ] Controller annotated `@RestController`, uses `ResponseEntity` for all returns
- [ ] App starts without Hibernate validation errors

---

## Key things Hibernate will complain about

| Problem | Cause | Fix |
|---|---|---|
| `missing table [x]` | `@Table(name=...)` doesn't match DB | Fix the name |
| `missing column [x]` | Field name doesn't snake_case to the DB column | Add `@Column(name = "...")` |
| `wrong column type: found serial, expecting bigint` | Used `Long` id with Postgres `SERIAL` | Use `Integer` |
| `wrong column type: found _text, expecting varchar` | DB column is `TEXT[]` array | Use `String[]` field type |


Raw performance — complex queries that Hibernate generates poorly
Bulk operations — inserting/updating millions of rows
Stored procedures — calling DB-side logic


