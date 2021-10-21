/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.i18n.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.AbstractResourceBasedMessageSource;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

/**
 * 基于servlet的web方式获取资源
 * @author huzhihui
 * @version $ v 0.1 2021/10/21 20:45 huzhihui Exp $$
 */
public class WebI18nMessageResourceAccessor extends I18nMessageResourceAccessor {
    private static final Logger logger = LoggerFactory.getLogger(WebI18nMessageResourceAccessor.class);
    private LocaleResolver localeResolver;

    public WebI18nMessageResourceAccessor(AbstractResourceBasedMessageSource messageSource) {
        super(messageSource);
    }

    @Override
    public String getMessage(String key) {
        Locale locale = this.getLocaleFromRequest();
        logger.debug("key is {} locale is {}", key, locale);
        return this.getMessage(key, locale, (String)null, false);
    }

    private Locale getLocaleFromRequest() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attr.getRequest();
        Locale locale = this.localeResolver.resolveLocale(request);
        return locale;
    }

    public void setLocaleResolver(LocaleResolver localeResolver) {
        this.localeResolver = localeResolver;
    }
}
