/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.i18n.handler;

import com.github.nise.i18n.config.Constant;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

/**
 * 设置语言解析器
 * @author huzhihui
 * @version $ v 0.1 2021/10/21 20:39 huzhihui Exp $$
 */
public class I18nAcceptHeaderLocaleResolver extends AcceptHeaderLocaleResolver {
    private static final int LANG_LENGTH = 2;

    public I18nAcceptHeaderLocaleResolver() {
    }

    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String acceptLanguage = request.getHeader(Constant.CONTENT_LANGUAGE);
        if (acceptLanguage != null && !acceptLanguage.trim().isEmpty()) {
            String[] split = acceptLanguage.split(Constant.UNDERLINE);
            return split.length != 2 ? this.getDefaultLocale() : new Locale(split[0], split[1]);
        } else {
            return super.resolveLocale(request);
        }
    }
}
