/**
 * zhihuihu.github.io.
 * Copyright (c) 2016-2019 All Rights Reserved.
 */
package com.github.nise.mybatis.plus.properties;

import lombok.Data;

/**
 * 属性配置类
 * @author huzhi
 * @version $ v 0.1 2021/10/31 19:27 huzhi Exp $$
 */
@Data
public class NiseMybatisPlusProperties {

    /** 是否开启 */
    private Boolean enabled;

    /**
     * 单数据库服务配置
     */
    @Data
    public static class SingleSchema{

        /** 是否开启 */
        private Boolean enabled;
        /** Schema文件路径 */
        private String path;

    }
}
