/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.i18n.autoconfigure;

import com.github.nise.i18n.I18nUtils;
import com.github.nise.i18n.handler.I18nAcceptHeaderLocaleResolver;
import com.github.nise.i18n.handler.I18nMessageResourceAccessor;
import com.github.nise.i18n.handler.I18nResourceBundleMessageSource;
import com.github.nise.i18n.handler.WebI18nMessageResourceAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.AbstractResourceBasedMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import java.util.Locale;

/**
 * @author huzhihui
 * @version $ v 0.1 2021/10/19 21:55 huzhihui Exp $$
 */
@Configuration
@Import(value = {ValidatorConfiguration.class,I18nUtils.class})
public class NiseI18nConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(I18nMessageResourceAccessor.class);
    @Value("${spring.mvc.locale:zh_CN}")
    private String locale;

    public NiseI18nConfiguration() {
    }

    @Bean
    @ConditionalOnMissingBean({LocaleResolver.class})
    public LocaleResolver localeResolver() {
        AcceptHeaderLocaleResolver localeResolver = new I18nAcceptHeaderLocaleResolver();
        String[] localeSplit = this.locale.split("_");
        if (localeSplit.length != 2) {
            logger.error("国际化参数传入错误，参数{}", this.locale);
            throw new IllegalArgumentException("国际化参数传入错误");
        } else {
            localeResolver.setDefaultLocale(new Locale(localeSplit[0], localeSplit[1]));
            return localeResolver;
        }
    }

    @Bean
    @ConditionalOnMissingBean({AbstractResourceBasedMessageSource.class})
    public I18nResourceBundleMessageSource messageResource() {
        I18nResourceBundleMessageSource i18nResourceBundleMessageSource = new I18nResourceBundleMessageSource();
        return i18nResourceBundleMessageSource;
    }

    @Bean
    public WebI18nMessageResourceAccessor messageResourceAccessor(I18nResourceBundleMessageSource messageResource, LocaleResolver localeResolver) {
        WebI18nMessageResourceAccessor webI18nMessageResourceAccessor = new WebI18nMessageResourceAccessor(messageResource);
        webI18nMessageResourceAccessor.setLocaleResolver(localeResolver);
        webI18nMessageResourceAccessor.setDefaultLocaleName(this.locale);
        return webI18nMessageResourceAccessor;
    }

    @Bean
    public I18nUtils i18nUtils(I18nMessageResourceAccessor i18nMessageResourceAccessor){
        final I18nUtils i18nUtils = new I18nUtils(i18nMessageResourceAccessor);
        return i18nUtils;
    }
}
