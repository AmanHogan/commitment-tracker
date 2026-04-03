# Entity

How to define a JPA entity and use Lombok to reduce boilerplate.

```java
@Entity
@Table(name = "table_name")
public class MyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
}
```

Lombok can generate getters/setters and common methods for you.

- `@Data` generates getters, setters, `toString()`, `equals()`, and `hashCode()`, and a constructor for required (final/@NonNull) fields.
- `@AllArgsConstructor` generates a constructor with one parameter per field.
- `@NoArgsConstructor` generates a no-argument constructor (JPA requires a no-arg constructor).
- `@Builder` provides a fluent builder API and also generates an all-args constructor used by the builder, but it does NOT generate a no-arg constructor.

Important notes for JPA entities:

- JPA requires a no-arg constructor; add Lombok's `@NoArgsConstructor` so the persistence provider can instantiate entities.
- `@Data` is convenient but can be dangerous on entities because the generated `equals()`/`hashCode()` may include collections or lazy associations (which can trigger unintended loads). Prefer explicit equals/hashCode control in production (see `@EqualsAndHashCode(onlyExplicitlyIncluded = true)`).

Example (common, simple pattern):

```java
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyEntity {
    @Id @GeneratedValue
    private Integer id;

    private String firstName;
    private String lastName;
}
```

If you prefer not to use `@Builder`, you can use the all-args constructor or setters to populate fields. Another common approach is to accept a DTO in the controller and map it to the entity in a mapper or service.

If you'd like, I can also add a short example showing `@EqualsAndHashCode(onlyExplicitlyIncluded = true)` and a recommended pattern for entities with associations.

So now we need to mark that the class is also an entity and that it is tied to a table and that it has a primary key so that it can be used in tandem with the repository. So now Spring Data JPA will look liek this:

```java
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Enitity
@Table(name = "my_table")
public class MyEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
}
```

Some notes. we use `private Integer id` instead of `private int id` because the into defaults to 0, and Integer defaults to null.

When adding data into the table, Hibernate checks the id. If it sees that the id is null, it knows you are trying to create a new id using `@GeneratedValue`; if it different, it will try to fetch the data that matches the id. Hibernate essentially

We can also add @EntityLister so that you can do custom logic when the cases are created.


