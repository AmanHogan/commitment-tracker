# mcp-k3s — Spring AI MCP Weather Server

A Spring Boot MCP server that exposes weather tools to VS Code Copilot via stdio.

---

## Setup

1. Install Java 21+
2. Build the jar:
   ```bash
   mvn -DskipTests package
   ```
3. Make sure `.vscode/mcp.json` is present (already committed)
4. Open Copilot Chat → Tools icon → confirm `mcp-k3s-weather` appears

VS Code auto-launches the server — no manual `java -jar` needed.

---

## Tools

| Tool                           | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| `getWeatherForecastByLocation` | Forecast for a lat/lon coordinate                        |
| `getAlerts`                    | Active alerts for a two-letter US state code (e.g. `NY`) |

---

## MCP Concepts

| Type          | Description                              |
| ------------- | ---------------------------------------- |
| **Resources** | File-like data clients can read          |
| **Tools**     | Functions callable by an LLM             |
| **Prompts**   | Pre-written templates for specific tasks |

---

## Notes

- This server uses **stdio** transport — VS Code spawns the jar as a subprocess
- Never use `System.out.println` in stdio mode — it corrupts the MCP stream; use a logger instead
- SSE transport (`spring-ai-starter-mcp-server-webmvc`) requires a running HTTP server and `mcp.json` type `sse` pointing at `/sse` — stdio is simpler for local dev
