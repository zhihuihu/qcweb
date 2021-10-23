/**
 * zhihuihu.github.io.
 * Copyright (c) 2016-2019 All Rights Reserved.
 */
package com.github.nise.i18n.autoconfigure;

import com.github.nise.i18n.handler.I18nResourceBundleMessageSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 重写了参数校验
 * WebMvcConfigurationSupport 类在上下文中只有一个会起作用，这里实现WebMvcConfigurer做适配
 * @author huzhi
 * @version $ v 0.1 2021/10/23 21:34 huzhi Exp $$
 */
@Configuration
public class ValidatorConfiguration implements WebMvcConfigurer {

    @Autowired
    private I18nResourceBundleMessageSource messageSource;

    @Override
    public Validator getValidator() {
        return validator();
    }

    @Bean
    public Validator validator() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.setValidationMessageSource(messageSource);
        return validator;
    }
}
