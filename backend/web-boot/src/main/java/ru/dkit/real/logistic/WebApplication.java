package ru.dkit.real.logistic;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import java.util.concurrent.TimeUnit;

/**
 * Класс запуска приложения.
 */
@SpringBootApplication(scanBasePackages = {"ru.dkit.real.logistic"})
@SuppressWarnings("unused")
public class WebApplication extends SpringBootServletInitializer {

  @Value("${server.port:9000}")
  private int port;

  public static void main(String[] args) {
    SpringApplication.run(WebApplication.class, args);
  }

  @Bean
  public EmbeddedServletContainerFactory servletContainerFactory() {
    TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory(port);
    factory.setSessionTimeout(60, TimeUnit.MINUTES);
    return factory;
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(WebApplication.class);
  }
}
