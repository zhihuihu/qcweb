/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.swagger.properties;

import lombok.Data;

/**
 * 配置属性
 * @author huzhihui
 * @version $ v 0.1 2021/10/19 21:30 huzhihui Exp $$
 */
@Data
public class SwaggerProperties {

    /** 是否开启swagger */
    private Boolean enabled;
    /** api的包路径 */
    private String apiBasePackage;
    /** 标题 */
    private String title = "nise";
    /** 描述 */
    private String description = "nise";
    /** 联系人 */
    private Contact contact;
    /** 版本 */
    private String version = "1.0.0";

    @Data
    public static class Contact{

        /** 用户名 */
        private String username = "nise user";
        /** 网站 */
        private String website = "https://github.com/zhihuihu/nise-parent";
        /** 电子邮箱 */
        private String email = "email@email.com";

    }

}
