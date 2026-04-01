package com.amanhogan.mcp_k3s.service;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class CommitmentTrackerService {

    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Value("${commitment-tracker.base-url:http://localhost:8081}")
    private String baseUrl;

    // ── BusinessCommitmentOne ──────────────────────────────────────────────────

    @Tool(description = "Get all business commitments (type one). Returns a JSON list.")
    public String getAllCommitmentsOne() {
        return get("/api/commitments-one");
    }

    @Tool(description = "Get business commitments (type one) filtered by status. Valid statuses: PENDING, IN_PROGRESS, COMPLETED, FAILED")
    public String getCommitmentsOneByStatus(
            @ToolParam(description = "Commitment status: PENDING, IN_PROGRESS, COMPLETED, or FAILED") String status) {
        return get("/api/commitments-one/getByStatus/" + status);
    }

    @Tool(description = "Create a new business commitment (type one). Provide a JSON body matching the BusinessCommitmentOne schema: workItem, description, status, applicationContext, problem, impact, etc.")
    public String createCommitmentOne(
            @ToolParam(description = "Full JSON body for the new commitment. Required fields: workItem, status (PENDING/IN_PROGRESS/COMPLETED/FAILED)") String jsonBody) {
        return post("/api/commitments-one", jsonBody);
    }

    @Tool(description = "Update an existing business commitment (type one) by ID. Provide the full updated JSON body.")
    public String updateCommitmentOne(
            @ToolParam(description = "The MongoDB ID of the commitment to update") String id,
            @ToolParam(description = "Full JSON body with updated fields") String jsonBody) {
        return put("/api/commitments-one/" + id, jsonBody);
    }

    @Tool(description = "Delete a business commitment (type one) by ID.")
    public String deleteCommitmentOne(
            @ToolParam(description = "The MongoDB ID of the commitment to delete") String id) {
        return delete("/api/commitments-one/" + id);
    }

    // ── BusinessCommitmentTwo ──────────────────────────────────────────────────

    @Tool(description = "Get all business commitments (type two / events). Returns a JSON list.")
    public String getAllCommitmentsTwo() {
        return get("/api/commitments-two");
    }

    @Tool(description = "Get business commitments (type two / events) filtered by status.")
    public String getCommitmentsTwoByStatus(
            @ToolParam(description = "Status value to filter by") String status) {
        return get("/api/commitments-two/getByStatus/" + status);
    }

    @Tool(description = "Create a new business commitment (type two / event). Fields: eventName, type, description, isDone (DONE/NOT_DONE), isRequired (REQUIRED/NOT_REQUIRED), started, finished.")
    public String createCommitmentTwo(
            @ToolParam(description = "Full JSON body for the new event commitment") String jsonBody) {
        return post("/api/commitments-two", jsonBody);
    }

    @Tool(description = "Update an existing business commitment (type two / event) by ID.")
    public String updateCommitmentTwo(
            @ToolParam(description = "The MongoDB ID of the event commitment to update") String id,
            @ToolParam(description = "Full JSON body with updated fields") String jsonBody) {
        return put("/api/commitments-two/" + id, jsonBody);
    }

    @Tool(description = "Delete a business commitment (type two / event) by ID.")
    public String deleteCommitmentTwo(
            @ToolParam(description = "The MongoDB ID of the event commitment to delete") String id) {
        return delete("/api/commitments-two/" + id);
    }

    // ── HTTP helpers ───────────────────────────────────────────────────────────

    private String get(String path) {
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .header("Accept", "application/json")
                    .GET()
                    .build();
            return send(req);
        } catch (Exception e) {
            throw new RuntimeException("GET " + path + " failed: " + e.getMessage(), e);
        }
    }

    private String post(String path, String jsonBody) {
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();
            return send(req);
        } catch (Exception e) {
            throw new RuntimeException("POST " + path + " failed: " + e.getMessage(), e);
        }
    }

    private String put(String path, String jsonBody) {
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .PUT(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();
            return send(req);
        } catch (Exception e) {
            throw new RuntimeException("PUT " + path + " failed: " + e.getMessage(), e);
        }
    }

    private String delete(String path) {
        try {
            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(baseUrl + path))
                    .DELETE()
                    .build();
            return send(req);
        } catch (Exception e) {
            throw new RuntimeException("DELETE " + path + " failed: " + e.getMessage(), e);
        }
    }

    private String send(HttpRequest req) throws Exception {
        HttpResponse<String> resp = httpClient.send(req, HttpResponse.BodyHandlers.ofString());
        int status = resp.statusCode();
        if (status >= 200 && status < 300) {
            return resp.body().isBlank() ? "Success (status " + status + ")" : resp.body();
        }
        throw new RuntimeException("API returned " + status + ": " + resp.body());
    }
}
