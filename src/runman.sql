/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50067
Source Host           : localhost:3306
Source Database       : runman

Target Server Type    : MYSQL
Target Server Version : 50067
File Encoding         : 65001

Date: 2015-05-17 11:59:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `run_telsmscode`
-- ----------------------------
DROP TABLE IF EXISTS `run_telsmscode`;
CREATE TABLE `run_telsmscode` (
  `tel` varchar(18) NOT NULL,
  `code` varchar(8) NOT NULL,
  `createtime` datetime NOT NULL,
  PRIMARY KEY  (`tel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of run_telsmscode
-- ----------------------------
INSERT INTO `run_telsmscode` VALUES ('13628037994', '5719', '2015-05-13 16:22:00');

-- ----------------------------
-- Table structure for `run_training_plan`
-- ----------------------------
DROP TABLE IF EXISTS `run_training_plan`;
CREATE TABLE `run_training_plan` (
  `id` bigint(10) NOT NULL auto_increment,
  `create_userid` bigint(10) NOT NULL,
  `exercise_mode` tinyint(1) default NULL,
  `context` varchar(512) default NULL,
  `start_time` datetime default NULL,
  `end_time` datetime default NULL,
  `place` varchar(128) default NULL,
  `map_coordinates` varchar(64) default NULL,
  `runKM` int(11) default NULL,
  `run_times` int(11) default NULL,
  `price` float default NULL,
  `status` tinyint(4) default NULL,
  `receiving_order_time` datetime default NULL,
  `pay_time` datetime default NULL,
  `complete_time` datetime default NULL,
  `create_time` datetime default NULL,
  `trainer_id` bigint(10) default NULL,
  `appraise_level` tinyint(1) default NULL,
  `appraise_context` varchar(512) default NULL,
  `appraise_time` datetime default NULL,
  PRIMARY KEY  (`id`),
  KEY `in_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of run_training_plan
-- ----------------------------
INSERT INTO `run_training_plan` VALUES ('1', '4', '1', '', '2015-05-16 18:01:22', '2015-05-16 18:01:22', '东郊记忆', '116.307629,40.058359', '20', '30', '50.2', '1', null, null, null, '2015-05-13 23:40:41', null, null, null, null);
INSERT INTO `run_training_plan` VALUES ('2', '4', '1', '', '2015-07-07 00:00:00', '2015-07-07 00:00:00', '东郊记忆', '116.307629,40.058359', '20', '30', '50.2', '1', null, null, null, '2015-05-14 09:47:06', null, null, null, null);

-- ----------------------------
-- Table structure for `run_uploadfile`
-- ----------------------------
DROP TABLE IF EXISTS `run_uploadfile`;
CREATE TABLE `run_uploadfile` (
  `id` bigint(10) unsigned NOT NULL auto_increment,
  `guid` varchar(32) NOT NULL,
  `create_userid` bigint(10) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `create_time` datetime default NULL,
  `file_path` varchar(512) default NULL,
  `content_type` varchar(32) default NULL,
  `file_size` bigint(16) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of run_uploadfile
-- ----------------------------

-- ----------------------------
-- Table structure for `run_user`
-- ----------------------------
DROP TABLE IF EXISTS `run_user`;
CREATE TABLE `run_user` (
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

-- ----------------------------
-- Records of run_user
-- ----------------------------
INSERT INTO `run_user` VALUES ('1', 'test1', '', '1', '12345678901', null, 'test1@163.com', null, '', null, '', null, null, '0', '2015-05-10', null, '0', null, null, null, null, null, null, null, null, null);
INSERT INTO `run_user` VALUES ('4', '13628037994', '飨受人生', '1', null, '1', null, null, null, null, null, null, null, null, '2015-05-13', null, '0', null, null, null, null, null, null, null, null, null);
