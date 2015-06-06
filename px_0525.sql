/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50067
Source Host           : localhost:3306
Source Database       : runman

Target Server Type    : MYSQL
Target Server Version : 50067
File Encoding         : 65001

Date: 2015-05-25 22:14:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `px_telsmscode`
-- ----------------------------
DROP TABLE IF EXISTS `px_telsmscode`;
CREATE TABLE `px_telsmscode` (
  `tel` varchar(18) NOT NULL,
  `code` varchar(8) NOT NULL,
  `createtime` datetime NOT NULL,
  PRIMARY KEY  (`tel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of px_telsmscode
-- ----------------------------
INSERT INTO `px_telsmscode` VALUES ('13628037994', '5719', '2015-05-13 16:22:00');

-- ----------------------------
-- Table structure for `px_time_schedule_relation`
-- ----------------------------
DROP TABLE IF EXISTS `px_time_schedule_relation`;
CREATE TABLE `px_time_schedule_relation` (
  `id` bigint(10) NOT NULL,
  `create_userid` bigint(10) NOT NULL,
  `create_time` datetime default NULL,
  `type` tinyint(1) NOT NULL,
  `relation_id` bigint(10) NOT NULL,
  `time_period` tinyint(1) NOT NULL,
  `start_time` varchar(12) default NULL,
  `end_time` varchar(12) default NULL,
  `total_time_length` int(4) default NULL,
  PRIMARY KEY  (`id`),
  KEY `t_sch_rel_create_userid` (`create_userid`),
  KEY `t_sch_rel_type` (`type`),
  KEY `t_sch_rel_relation_id` (`relation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of px_time_schedule_relation
-- ----------------------------

-- ----------------------------
-- Table structure for `px_training_course`
-- ----------------------------
DROP TABLE IF EXISTS `px_training_course`;
CREATE TABLE `px_training_course` (
  `id` bigint(10) NOT NULL auto_increment,
  `create_userid` bigint(10) NOT NULL,
  `create_time` datetime default NULL,
  `modify_time` datetime default NULL,
  `exercise_mode` tinyint(1) default NULL,
  `title` varchar(128) default NULL,
  `time_length` int(4) default NULL,
  `difficulty_degree` tinyint(1) default NULL,
  `max_students` int(4) default NULL,
  `context` text,
  `place` varchar(128) default NULL,
  `status` tinyint(1) default NULL,
  `price` float default NULL,
  `read_count` bigint(10) default NULL,
  PRIMARY KEY  (`id`),
  KEY `course_create_userid` (`create_userid`),
  KEY `course_create_time` (`create_time`),
  KEY `course_modify_time` (`modify_time`),
  KEY `course_exercise_mode` (`exercise_mode`),
  KEY `course_difficulty_degree` (`difficulty_degree`),
  KEY `course_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of px_training_course
-- ----------------------------

-- ----------------------------
-- Table structure for `px_training_plan`
-- ----------------------------
DROP TABLE IF EXISTS `px_training_plan`;
CREATE TABLE `px_training_plan` (
  `id` bigint(10) NOT NULL auto_increment,
  `create_userid` bigint(10) NOT NULL,
  `exercise_mode` tinyint(1) default NULL,
  `context` varchar(512) default NULL,
  `start_time` datetime default NULL,
  `end_time` datetime default NULL,
  `place` varchar(128) default NULL,
  `map_coordinates` varchar(64) default NULL,
  `runKM` int(11) default NULL,
  `px_times` int(11) default NULL,
  `price` float default NULL,
  `status` tinyint(4) default NULL,
  `receiving_order_time` datetime default NULL,
  `pay_time` datetime default NULL,
  `complete_time` datetime default NULL,
  `create_time` datetime default NULL,
  `trainer_id` bigint(10) default NULL,
  `appraise_level` tinyint(1) default NULL,
  `appraise_context` varchar(1024) default NULL,
  `appraise_time` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `in_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of px_training_plan
-- ----------------------------
INSERT INTO `px_training_plan` VALUES ('1', '4', '1', '', '2015-05-16 18:01:22', '2015-05-16 18:01:22', '东郊记忆', '116.307629,40.058359', '20', '30', '50.2', '1', null, null, null, '2015-05-13 23:40:41', null, null, null, null);
INSERT INTO `px_training_plan` VALUES ('2', '4', '1', '', '2015-07-07 00:00:00', '2015-07-07 00:00:00', '东郊记忆', '116.307629,40.058359', '20', '30', '50.2', '1', null, null, null, '2015-05-14 09:47:06', null, null, null, null);
INSERT INTO `px_training_plan` VALUES ('3', '4', null, '我就是我，不一样的烟火', null, null, null, null, null, null, null, '1', null, null, null, '2015-05-24 12:54:56', null, null, null, null);

-- ----------------------------
-- Table structure for `px_upload_file`
-- ----------------------------
DROP TABLE IF EXISTS `px_upload_file`;
CREATE TABLE `px_upload_file` (
  `id` bigint(10) unsigned NOT NULL auto_increment,
  `guid` varchar(32) NOT NULL,
  `create_userid` bigint(10) NOT NULL,
  `type` varchar(10) NOT NULL,
  `create_time` datetime default NULL,
  `file_path` varchar(512) default NULL,
  `content_type` varchar(32) default NULL,
  `file_size` bigint(16) default NULL,
  PRIMARY KEY  (`id`),
  KEY `in_upladfile_guid` (`guid`),
  KEY `in_upladfile_create_userid` (`create_userid`),
  KEY `in_upladfile_create_time` (`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of px_upload_file
-- ----------------------------
INSERT INTO `px_upload_file` VALUES ('2', '2c90008a4d66bc67014d66bc67800000', '4', 'head', '2015-05-18 19:15:33', 'H:/runman_upload/head/4_head_2c90008a4d66bc67014d66bc67800000.jpg', 'image/jpeg', '9184');

-- ----------------------------
-- Table structure for `px_user`
-- ----------------------------
DROP TABLE IF EXISTS `px_user`;
CREATE TABLE `px_user` (
  `id` bigint(10) unsigned NOT NULL auto_increment,
  `loginname` varchar(32) NOT NULL,
  `name` varchar(64) default NULL COMMENT '显示名',
  `password` varchar(32) NOT NULL,
  `tel` varchar(20) default NULL,
  `tel_verify` tinyint(1) default '0' COMMENT '0未验证，1验证',
  `email` varchar(64) default NULL,
  `email_verify` tinyint(1) default NULL,
  `real_name` varchar(64) default NULL,
  `birth` datetime default NULL,
  `identity_card` varchar(20) default NULL,
  `identity_card_imgurl` varchar(512) default NULL,
  `real_name_verify` tinyint(1) default '0',
  `sex` tinyint(1) default '0',
  `createtime` date default NULL,
  `online` tinyint(1) default NULL,
  `disable` tinyint(1) default NULL,
  `disable_reason` varchar(256) default NULL,
  `head_imgurl` varchar(512) default NULL,
  `city` varchar(64) default NULL,
  `logintime` date default NULL,
  `type` tinyint(1) default NULL,
  `context` varchar(1024) default NULL,
  `trainer_status` smallint(1) default NULL,
  `marathon_imgurl` varchar(512) default NULL,
  `marathon_verify` tinyint(1) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `un_loginname` (`loginname`),
  UNIQUE KEY `un_tel` (`tel`),
  UNIQUE KEY `un_emial` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `px_teacher`;
CREATE TABLE `px_teacher` (
  `id` bigint(10) unsigned NOT NULL auto_increment,
  `loginname` varchar(32) NOT NULL,
  `name` varchar(64) default NULL COMMENT '显示名',
  `password` varchar(32) NOT NULL,
  `tel` varchar(20) default NULL,
  `tel_verify` tinyint(1) default '0' COMMENT '0未验证，1验证',
  `email` varchar(64) default NULL,
  `email_verify` tinyint(1) default NULL,
  `real_name` varchar(64) default NULL,
  `birth` datetime default NULL,
  `identity_card` varchar(20) default NULL,
  `identity_card_imgurl` varchar(512) default NULL,
  `real_name_verify` tinyint(1) default '0',
  `sex` tinyint(1) default '0',
  `ishowflag` tinyint(1) default NULL,
  `createtime` date default NULL,
  `online` tinyint(1) default NULL,
  `disable` tinyint(1) default NULL,
  `disable_reason` varchar(256) default NULL,
  `head_imgurl` varchar(512) default NULL,
  `city` varchar(64) default NULL,
  `logintime` date default NULL,
  `type` tinyint(1) default NULL,
  `context` varchar(1024) default NULL,
  `trainer_status` smallint(1) default NULL,
  `marathon_imgurl` varchar(512) default NULL,
  `marathon_verify` tinyint(1) default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `un_loginname` (`loginname`),
  UNIQUE KEY `un_tel` (`tel`),
  UNIQUE KEY `un_emial` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of px_user
-- ----------------------------
INSERT INTO `px_user` VALUES ('1', 'test1', '', '1', '12345678901', null, 'test1@163.com', null, '', null, '', null, null, '0', '2015-05-10', null, '0', null, null, null, null, null, null, null, null, null);
INSERT INTO `px_user` VALUES ('4', '13628037994', '飨受人生', '1', null, '1', null, null, '猜猜猜', '2015-05-24 13:01:04', '1234567890123456', null, null, '0', '2015-05-13', null, '0', null, 'rest/uploadFile/getImgFile.json?guid=2c90008a4d66bc67014d66bc67800000', '成都', '2015-05-18', null, '我就是我，不一样的烟火', null, null, null);

-- ----------------------------
-- Table structure for `px_user_relation_training_course`
-- ----------------------------
DROP TABLE IF EXISTS `px_user_relation_training_course`;
CREATE TABLE `px_user_relation_training_course` (
  `id` bigint(10) NOT NULL auto_increment,
  `user_id` bigint(10) NOT NULL,
  `course_id` bigint(10) NOT NULL,
  `time_schedule_id` bigint(10) NOT NULL,
  `create_time` datetime default NULL,
  `status` tinyint(1) default NULL,
  `receiving_order_time` datetime default NULL,
  `pay_time` datetime default NULL,
  `complete_time` datetime default NULL,
  `appraise_level` tinyint(1) default NULL,
  `appraise_context` varchar(1024) default NULL,
  `appraise_time` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `rel_course_user_id` (`user_id`),
  KEY `rel_course_course_id` (`course_id`),
  KEY `rel_course_time_schedule_id` (`time_schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of px_user_relation_training_course
-- ----------------------------
