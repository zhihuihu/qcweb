/**
 * zhihuihu.github.io.
 * Copyright (c) 2016-2019 All Rights Reserved.
 */
package com.github.nise.common.utils;

import lombok.Data;

/**
 * 消息响应类
 * @author huzhi
 * @version $ v 0.1 2021/10/23 20:43 huzhi Exp $$
 */
@Data
public class ResponseMessage<T> {

    /** 消息编码 */
    private Integer code;
    /** 消息信息 */
    private Integer message;
    /** 消息返回数据 */
    private T data;

}
