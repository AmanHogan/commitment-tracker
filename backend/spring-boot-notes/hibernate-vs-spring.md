# Hibernate vs Spring

1. Spring Data JPA is an abstraction layer ontop of JPA to reduce teh amount fo boilerplate code required to
implment DAO/Repisotories.
2. JPA is the specification ORM
3. Hibernate is a JPA Implmenatation and generates SQL queries
4. JDBC is responsible for actually executing the SQL Queries
5. Spring Data JPA -> JPA (Like a Java Interface) -> Hibernate -> JDBC -> DB