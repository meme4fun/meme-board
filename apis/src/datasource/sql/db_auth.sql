CREATE TABLE `user_tb`
(
    `user_id`      int unsigned NOT NULL AUTO_INCREMENT,
    `address`      varchar(64)                       DEFAULT NULL COMMENT '''',
    `invite_code`  varchar(16)  NOT NULL,
    `inviter`      int unsigned                      DEFAULT NULL,
    `invite_l1`    int                               DEFAULT '0',
    `invite_l2`    int                               DEFAULT '0',
    `create_tm_ms` timestamp(3) NOT NULL             DEFAULT CURRENT_TIMESTAMP(3),
    `update_tm_ms` timestamp(3) NOT NULL             DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `address_idx` (`address`) USING BTREE,
    UNIQUE KEY `invite_code_idx` (`invite_code`) USING BTREE,
    KEY `inviter_idx` (`inviter`),
    KEY `create_tm_ms_idx` (`create_tm_ms`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='';

CREATE TABLE `tg_users_tb`
(
    `id`                       int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '',
    `user_id`                  int                               DEFAULT NULL COMMENT '',
    `tg_id`                    bigint                            DEFAULT NULL COMMENT 'telegram ',
    `first_name`               varchar(32) CHARACTER SET utf8mb4 DEFAULT '',
    `last_name`                varchar(32) CHARACTER SET utf8mb4 DEFAULT '',
    `username`                 varchar(255)                      DEFAULT '' COMMENT '',
    `is_bot`                   tinyint(1)                        DEFAULT 0,
    `is_premium`               tinyint(1)                        DEFAULT 0,
    `added_to_attachment_menu` tinyint(1)                        DEFAULT 0,
    `allows_write_to_pm`       tinyint(1)                        DEFAULT 0,
    `photo_url`                text COMMENT '',
    `create_tm_ms`             timestamp(3) NOT NULL             DEFAULT CURRENT_TIMESTAMP(3),
    `update_tm_ms`             timestamp(3) NOT NULL             DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`),
    UNIQUE KEY `tg_id_idx` (`tg_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT ='';
