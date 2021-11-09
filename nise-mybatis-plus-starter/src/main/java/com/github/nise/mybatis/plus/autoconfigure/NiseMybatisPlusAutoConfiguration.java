/**
 * zhihuihu.github.io.
 * Copyright (c) 2016-2019 All Rights Reserved.
 */
package com.github.nise.mybatis.plus.autoconfigure;

import com.github.nise.mybatis.plus.autoconfigure.datasource.StartInitDataSourceInitializer;
import com.github.nise.mybatis.plus.properties.NiseMybatisPlusProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * 针对mybatis-plus的一些增强封装
 * 便于后续开箱即用
 * @author huzhi
 * @version $ v 0.1 2021/10/31 19:25 huzhi Exp $$
 */
@Configuration
@ConditionalOnProperty(value = "nise.mybatis-plus.enabled", havingValue = "true")
@Import(value = {StartInitDataSourceInitializer.class})
public class NiseMybatisPlusAutoConfiguration {

    @Bean
    @ConfigurationProperties(prefix = "nise.mybatis-plus")
    public NiseMybatisPlusProperties niseMybatisPlusProperties(){
        return new NiseMybatisPlusProperties();
    }

}
