/**
 * https://github.com/zhihuihu
 * Copyright (c) 2016-2021 All Rights Reserved.
 */
package com.github.nise.i18n.handler;

import com.github.nise.i18n.config.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * 重定义资源获取
 * @author huzhihui
 * @version $ v 0.1 2021/10/21 20:38 huzhihui Exp $$
 */
public class I18nResourceBundleMessageSource extends ReloadableResourceBundleMessageSource {

    private static final Logger logger = LoggerFactory.getLogger(I18nResourceBundleMessageSource.class);
    private static final String RESOURCE_PATH_PARENT = "classpath*:i18n/**/*.properties";

    public I18nResourceBundleMessageSource() {
        this.init();
    }

    protected void init() {
        logger.info("start init AppI18nMessageResource...");

        try {
            this.setBasenames(this.getAllBasename());
        } catch (IOException ex) {
            logger.error(ex.getMessage());
        }

        this.setDefaultEncoding(Constant.DEFAULT_ENCODING);
        logger.info("finish init AppI18nMessageResource...");
    }


    private String[] getAllBasename() throws IOException {
        List<String> baseNames = new ArrayList();
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = resolver.getResources(Constant.CLASSPATH_FILE);

        for (Resource resource : resources) {
            String fileName = resource.getFilename();
            if (!fileName.contains(Constant.UNDERLINE)) {
                String filePath = resource.getURL().toString();
                int lastIndex = filePath.lastIndexOf(Constant.DEFAULT_CONCAT);
                String basename = filePath.substring(0, lastIndex);
                baseNames.add(basename);
            }
        }
        logger.info("国际化资源按照字母进行升序排序");
        baseNames.sort(Comparator.comparing(String::toString));
        baseNames.forEach((t) -> {
            logger.info("排序后 国际资源文件: {} ", t);
        });
        return baseNames.toArray(new String[0]);
    }

}
