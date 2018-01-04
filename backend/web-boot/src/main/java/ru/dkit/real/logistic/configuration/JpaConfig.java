package ru.dkit.real.logistic.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
public class JpaConfig {

  @Autowired
  private DataSource dataSource;

  @Value("${hibernate.dialect}")
  private String hibernateDialect;
  @Value("${hibernate.show_sql}")
  private String hibernateShowSql;
  @Value("${hibernate.hbm2ddl.auto}")
  private String hibernateHbm2ddlAuto;
  @Value("${hibernate.format_sql}")
  private String hibernateFormatSql;

  private String[] entityPackagesToScan = {"ru.dkit.real.logistic.**.entities"};

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    LocalContainerEntityManagerFactoryBean lef = new LocalContainerEntityManagerFactoryBean();
    lef.setDataSource(dataSource);
    lef.setJpaVendorAdapter(jpaVendorAdapter());
    lef.setPackagesToScan(entityPackagesToScan);
    lef.setJpaProperties(getHibernateProperties());
    return lef;
  }

  @Bean
  public JpaVendorAdapter jpaVendorAdapter() {
    HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
    hibernateJpaVendorAdapter.setShowSql(true);
    hibernateJpaVendorAdapter.setGenerateDdl(false);
    hibernateJpaVendorAdapter.setDatabase(Database.HSQL);
    return hibernateJpaVendorAdapter;
  }

  private Properties getHibernateProperties() {
    Properties properties = new Properties();
    properties.put("hibernate.dialect", hibernateDialect);
    properties.put("hibernate.show_sql", hibernateShowSql);
    properties.put("hibernate.hbm2ddl.auto", hibernateHbm2ddlAuto);
    properties.put("hibernate.format_sql", hibernateFormatSql);
    return properties;
  }

  @Bean
  public JpaTransactionManager transactionManager() {
    JpaTransactionManager transactionManager = new JpaTransactionManager();
    transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
    return transactionManager;
  }
}
