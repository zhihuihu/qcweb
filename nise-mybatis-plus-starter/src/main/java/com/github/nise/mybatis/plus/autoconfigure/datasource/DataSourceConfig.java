/**
 * zhihuihu.github.io.
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.mybatis.plus.autoconfigure.datasource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;

/**
 * 数据库信息配置
 * @author huzhi
 * @version $ v 0.1 2021/10/31 20:04 huzhi Exp $$
 */
public class DataSourceConfig {

    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;
    @Value("${spring.datasource.hikari.maximumPoolSize}")
    private int maximumPoolSize;
    @Value("${spring.datasource.hikari.minimumIdle}")
    private int minimumIdle;
    @Value("${spring.datasource.hikari.idleTimeout}")
    private int idleTimeout;
    @Value("${spring.datasource.hikari.connectionTimeout}")
    private int connectionTimeout;
    @Value("${spring.datasource.hikari.maxLifetime}")
    private int maxLifetime;

    private HikariDataSource dataSource;

    public HikariDataSource instance() {
        if (dataSource != null) {
            return dataSource;
        }
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(url);
        config.setUsername(username);
        config.setPassword(password);
        config.setMinimumIdle(minimumIdle);
        config.setMaximumPoolSize(maximumPoolSize);
        config.setConnectionTimeout(connectionTimeout);
        config.setMaxLifetime(maxLifetime);
        config.setIdleTimeout(idleTimeout);

        dataSource = new HikariDataSource(config);
        return dataSource;
    }


}
