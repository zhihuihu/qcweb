/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.common.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.math.BigDecimal;

/**
 * BigDecimal 序列化返回 默认小数点后为0的都不返回
 * @author huzhihui
 * @version $ v 0.1 2021/10/16 21:18 huzhihui Exp $$
 */
public class BigDecimalSerialize extends JsonSerializer<BigDecimal> {

    @Override
    public void serialize(BigDecimal bigDecimal, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        if (bigDecimal != null) {
            jsonGenerator.writeString(bigDecimal.stripTrailingZeros().toString());
        } else {
            jsonGenerator.writeString("");
        }
    }
}
