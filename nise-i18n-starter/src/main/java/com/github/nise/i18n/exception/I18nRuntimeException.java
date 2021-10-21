/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.i18n.exception;

import java.text.MessageFormat;

/**
 * 国际化异常定义
 * @author huzhihui
 * @version $ v 0.1 2021/10/21 20:37 huzhihui Exp $$
 */
public class I18nRuntimeException extends RuntimeException {

    private Integer code;

    private I18nRuntimeException() {
    }

    public I18nRuntimeException(String pattern, String... arguments) {
        super(MessageFormat.format(pattern, arguments));
    }

    public I18nRuntimeException(Integer code, String pattern, String... arguments) {
        super(MessageFormat.format(pattern, arguments));
        this.code = code;
    }

    public I18nRuntimeException(Throwable cause, String pattern, String... arguments) {
        super(MessageFormat.format(pattern, arguments), cause);
    }

    public I18nRuntimeException(Throwable cause, Integer code, String pattern, String... arguments) {
        this(cause, MessageFormat.format(pattern, arguments));
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
