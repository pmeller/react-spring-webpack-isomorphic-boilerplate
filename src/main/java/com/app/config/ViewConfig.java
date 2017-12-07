package com.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.script.ScriptTemplateConfigurer;
import org.springframework.web.servlet.view.script.ScriptTemplateViewResolver;

import java.nio.charset.StandardCharsets;

@EnableWebMvc
@Configuration
public class ViewConfig extends WebMvcConfigurerAdapter {

	private static final String[] scripts = {
		"js/polyfill.js",
		"js/ssr.js"
	};

	@Bean
	public ViewResolver viewResolver() {
		ScriptTemplateViewResolver viewResolver = new ScriptTemplateViewResolver();
		viewResolver.setPrefix("templates/");
		viewResolver.setSuffix(".html");
		return viewResolver;
	}

	@Bean
	public ScriptTemplateConfigurer scriptTemplateConfigurer() {
		ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();
		configurer.setEngineName("nashorn");
		configurer.setCharset(StandardCharsets.UTF_8);
		configurer.setScripts(scripts);
		configurer.setRenderObject("SSR"); // output library name defined in webpack.config.js
		configurer.setRenderFunction("render");
		configurer.setSharedEngine(false);
		return configurer;
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
		registry
			.addResourceHandler("/static/**")
			.addResourceLocations("classpath:/static/");
	}
}
