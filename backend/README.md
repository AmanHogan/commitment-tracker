# Spring Boot Commitment Tracker — Run Instructions

Quick steps to run the backend and its MongoDB on macOS (also includes a Docker option).

**Prerequisites**

- Homebrew (or Docker) installed.
- Java JDK installed (project pom sets `java.version=25`; use a JDK compatible with the project).
- Maven wrapper is provided (`./mvnw`).

**MongoDB (Homebrew)**

1. Install (if needed):

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

2. Start MongoDB service:

```bash
brew services start mongodb-community@7.0
```

3. Stop MongoDB service:

```bash
brew services stop mongodb-community@7.0
```

Note: the repository contains `run-mongo.sh` but it currently contains both a `start` and `stop` line; running it as-is will start then immediately stop the service. Use the commands above, or make the script executable and replace its contents with the small wrapper below.

Example fixed script (`run-mongo.sh`):

```bash
#!/usr/bin/env bash
set -e
case "$1" in
  start) brew services start mongodb-community@7.0 ;;
  stop)  brew services stop mongodb-community@7.0 ;;
  restart) brew services restart mongodb-community@7.0 ;;
  *) echo "Usage: $0 {start|stop|restart}"; exit 2 ;;
esac
```

Make it executable:

```bash
chmod +x run-mongo.sh
./run-mongo.sh start
```

**MongoDB (Docker alternative)**

If you prefer Docker:

```bash
docker run -d --name mongo -p 27017:27017 -e MONGO_INITDB_DATABASE=commitment_tracker mongo:7.0
```

The application expects the database `commitment_tracker` on localhost:27017 by default.

**Run the Spring Boot app**

1. From the project root:

```bash
cd spring-boot-commitment-tracker
```

2. Run with the Maven wrapper (development):

```bash
./mvnw spring-boot:run
```

3. Or build and run the jar (production-like):

```bash
./mvnw clean package -DskipTests
java -jar target/commitment-tracker-0.0.1-SNAPSHOT.jar
```

By default the app listens on port 8080. A quick smoke test:

```bash
curl http://localhost:8080/
# returns: Hello World
```

**Connection configuration**

The project configures MongoDB in `src/main/resources/application.properties` and in `MongoConfig`:

```
spring.data.mongodb.uri=mongodb://localhost:27017/commitment_tracker
```

If Mongo is on a different host/port, update the URI or set an environment-specific `application.properties`.

**Troubleshooting**

- If `./mvnw` fails due to Java version, check `java -version` and install a JDK compatible with the `java.version` in `pom.xml` or adjust the pom.
- Ensure MongoDB is running before starting the Spring Boot app.

**Want me to fix `run-mongo.sh` in the repo?**

If you want, I can patch `run-mongo.sh` to accept start/stop commands and make it executable. Ask me to apply that change.
