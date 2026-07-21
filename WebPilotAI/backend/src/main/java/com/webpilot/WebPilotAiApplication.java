package com.webpilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class WebPilotAiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebPilotAiApplication.class, args);
	}
}