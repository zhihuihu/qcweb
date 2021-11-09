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
    @Value("${spring.datasource.hikari.maximum-pool-size}")
    private int maximumPoolSize;
    @Value("${spring.datasource.hikari.minimum-idle}")
    private int minimumIdle;
    @Value("${spring.datasource.hikari.idle-timeout}")
    private int idleTimeout;
    @Value("${spring.datasource.hikari.connection-timeout}")
    private int connectionTimeout;
    @Value("${spring.datasource.hikari.max-lifetime}")
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
        /*config.setMinimumIdle(minimumIdle);
        config.setMaximumPoolSize(maximumPoolSize);
        config.setConnectionTimeout(connectionTimeout);
        config.setMaxLifetime(maxLifetime);
        config.setIdleTimeout(idleTimeout);*/

        dataSource = new HikariDataSource(config);
        return dataSource;
    }


}
