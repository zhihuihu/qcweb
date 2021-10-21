/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.i18n;

import com.github.nise.i18n.handler.I18nMessageResourceAccessor;

import javax.annotation.PostConstruct;

/**
 * 国际化工具类
 * @author huzhihui
 * @version $ v 0.1 2021/10/21 20:48 huzhihui Exp $$
 */
public class I18nUtils {

    private I18nMessageResourceAccessor resourceAccessor;

    private static I18nUtils i18nUtils;

    public I18nUtils(I18nMessageResourceAccessor resourceAccessor) {
        this.resourceAccessor = resourceAccessor;
    }

    @PostConstruct
    protected void init(){
        i18nUtils = this;
    }

    public static String message(String key) {
        return i18nUtils.resourceAccessor.getMessage(key);
    }

}
