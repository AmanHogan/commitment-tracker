package com.amanhogan.mcp_k3s;

import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.amanhogan.mcp_k3s.service.CommitmentTrackerService;

@SpringBootApplication
public class McpK3sApplication {

	public static void main(String[] args) {
		SpringApplication.run(McpK3sApplication.class, args);
	}

	@Bean
	public ToolCallbackProvider tools(CommitmentTrackerService commitmentTrackerService) {
		return MethodToolCallbackProvider.builder()
				.toolObjects(commitmentTrackerService)
				.build();
	}

}
