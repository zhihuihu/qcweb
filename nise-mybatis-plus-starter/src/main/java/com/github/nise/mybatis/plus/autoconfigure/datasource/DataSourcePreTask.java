/**
 * zhihuihu.github.io.
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.mybatis.plus.autoconfigure.datasource;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * 数据库连接池创建之前执行的前置任务
 * @author huzhi
 * @version $ v 0.1 2021/10/31 20:01 huzhi Exp $$
 */
@Slf4j
public class DataSourcePreTask {

    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;

    @PostConstruct
    public void init() {
        try {
            URI uri = new URI(url.replace("jdbc:", ""));
            String host = uri.getHost();
            String path = uri.getPath();
            int port = uri.getPort();
            Connection connection = DriverManager.getConnection("jdbc:mysql://" + host + ":" + port, username, password);
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE DATABASE IF NOT EXISTS `" + path.replace("/", "") + "` DEFAULT CHARACTER SET = `utf8mb4` COLLATE `utf8mb4_unicode_ci`;");
            statement.close();
            connection.close();
        } catch (SQLException | URISyntaxException throwables) {
            log.error(throwables.getMessage());
        }
    }
}

