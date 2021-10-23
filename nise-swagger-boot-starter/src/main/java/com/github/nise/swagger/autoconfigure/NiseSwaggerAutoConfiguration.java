/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.swagger.autoconfigure;

import com.github.nise.swagger.properties.SwaggerProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ObjectUtils;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * Swagger自动配置
 * @author huzhihui
 * @version $ v 0.1 2021/10/19 21:33 huzhihui Exp $$
 */
@Configuration
@ConditionalOnProperty(value = "nise.swagger.enabled", havingValue = "true")
public class NiseSwaggerAutoConfiguration {

    @Bean
    @ConfigurationProperties(prefix = "nise.swagger")
    public SwaggerProperties swaggerProperties(){
        return new SwaggerProperties();
    }

    @Bean
    public Docket createRestApi(SwaggerProperties swaggerProperties) {
        // 参数校验
        if(ObjectUtils.isEmpty(swaggerProperties.getApiBasePackage())){
            throw new IllegalArgumentException("swagger-starter初始化失败，apiBasePackage参数为空");
        }
        if(ObjectUtils.isEmpty(swaggerProperties.getContact())){
            throw new IllegalArgumentException("swagger-starter初始化失败，contact参数为空");
        }
        // swagger设置，基本信息，要解析的接口及路径等
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo(swaggerProperties))
                .select()
                // 设置通过什么方式定位需要自动生成文档的接口，这里定位方法上的@ApiOperation注解
                .apis(RequestHandlerSelectors.basePackage(swaggerProperties.getApiBasePackage()))
                // 接口URI路径设置，any是全路径，也可以通过PathSelectors.regex()正则匹配
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo(SwaggerProperties swaggerProperties) {
        return new ApiInfoBuilder()
                .title(swaggerProperties.getTitle())
                .description(swaggerProperties.getDescription())
                .contact(new Contact(swaggerProperties.getContact().getUsername(), swaggerProperties.getContact().getWebsite(), swaggerProperties.getContact().getEmail()))
                .version(swaggerProperties.getVersion())
                .build();
    }

}
