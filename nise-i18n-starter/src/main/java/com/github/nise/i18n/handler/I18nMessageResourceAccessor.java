/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.i18n.handler;

import com.github.nise.i18n.config.Constant;
import com.github.nise.i18n.exception.I18nRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.AbstractResourceBasedMessageSource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.util.ObjectUtils;

import java.util.Locale;

/**
 * 获取资源类
 * @author huzhihui
 * @version $ v 0.1 2021/10/21 20:41 huzhihui Exp $$
 */
public class I18nMessageResourceAccessor {
    private static final Logger logger = LoggerFactory.getLogger(I18nMessageResourceAccessor.class);
    public String defaultLocaleName = Constant.DEFAULT_LOCAL_NAME;
    private MessageSourceAccessor messageSourceAccessor;
    private boolean isAssertNotEmpty;

    public I18nMessageResourceAccessor(AbstractResourceBasedMessageSource messageSource) {
        this.messageSourceAccessor = new MessageSourceAccessor(messageSource);
    }

    public String getMessage(String key) {
        Locale locale = this.chooseLocale(this.defaultLocaleName);
        return this.getMessage(key, locale, this.isAssertNotEmpty);
    }

    public String getMessage(String key, String lang) {
        Locale locale = this.chooseLocale(lang);
        return this.getMessage(key, locale, this.isAssertNotEmpty);
    }

    public String getMessage(String key, Boolean isAssertNotEmpty) {
        Locale locale = this.chooseLocale(this.defaultLocaleName);
        return this.getMessage(key, locale, isAssertNotEmpty);
    }

    public String getMessage(String key, String lang, Boolean isAssertNotEmpty) {
        Locale locale = this.chooseLocale(lang);
        return this.getMessage(key, locale, isAssertNotEmpty);
    }

    public void setDefaultLocaleName(String defaultLocaleName) {
        this.defaultLocaleName = defaultLocaleName;
    }

    public void setAssertNotEmpty(boolean assertNotEmpty) {
        this.isAssertNotEmpty = assertNotEmpty;
    }

    public String getMessage(String key, Locale locale, Boolean isAssertNotEmpty) {
        return this.getMessage(key, locale, null, isAssertNotEmpty);
    }

    public String getMessage(String key, Locale locale, String defaultMsg, Boolean isAssertNotEmpty) {
        String result = null;
        result = this.messageSourceAccessor.getMessage(key, null, defaultMsg, locale);
        if (isAssertNotEmpty != null && isAssertNotEmpty && ObjectUtils.isEmpty(result)) {
            logger.error("未获取到{}-{}国际化资源值", key, locale);
            throw new I18nRuntimeException("未获取到国际化资源值");
        } else {
            return result;
        }
    }

    private Locale getLocale(String lang) {
        return new Locale(lang.split("_")[0], lang.split("_")[1]);
    }

    private Locale chooseLocale(String lang) {
        Locale locale;
        if (!ObjectUtils.isEmpty(lang)) {
            locale = this.getLocale(lang);
        } else {
            locale = this.getLocale(this.defaultLocaleName);
        }

        return locale;
    }
}
