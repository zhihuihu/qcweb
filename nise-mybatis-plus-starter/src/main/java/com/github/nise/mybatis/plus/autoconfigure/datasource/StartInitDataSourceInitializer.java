/**
 * zhihuihu.github.io.
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.mybatis.plus.autoconfigure.datasource;

import com.github.nise.mybatis.plus.properties.NiseMybatisPlusProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.DatabasePopulator;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

/**
 * 数据库初始化
 * @author huzhi
 * @version $ v 0.1 2021/10/31 20:05 huzhi Exp $$
 */
@Configuration
@ConditionalOnProperty(value = "nise.mybatis-plus.single-schema.enabled", havingValue = "true")
public class StartInitDataSourceInitializer {

    /**
     * 自定义Bean实现业务的特殊需求
     * @param dataSource
     * @return
     */
    @Bean
    public DataSourceInitializer dataSourceInitializer(final DataSource dataSource,final NiseMybatisPlusProperties niseMybatisPlusProperties) {
        final DataSourceInitializer initializer = new DataSourceInitializer();
        // 设置数据源
        initializer.setDataSource(dataSource);
        initializer.setDatabasePopulator(databasePopulator(niseMybatisPlusProperties.getSingleSchema().getPath()));
        return initializer;
    }

    private DatabasePopulator databasePopulator(String schemaPath) {
        final ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        Resource resource = new ClassPathResource(schemaPath);
        populator.addScripts(resource);
        return populator;
    }

    @Bean(name = "dataSource")
    @DependsOn("dataSourcePreTask")
    public DataSource dataSource(DataSourceConfig dataSourceConfig) {
        return dataSourceConfig.instance();
    }

    @Bean
    public DataSourceConfig dataSourceConfig(){
        return new DataSourceConfig();
    }

    @Bean
    public DataSourcePreTask dataSourcePreTask(){
        return new DataSourcePreTask();
    }
}
