package com.company.news;

/**
 * 权限常量定义
 * <p>
 * Title：PopedomConstants.java
 * </p>
 * <p>
 * Description：news-webapp
 * </p>
 * <p>
 * Copyright：Copyright (c)2007 Sobey,Inc
 * </p>
 * <p>
 * Company：Sobey,Inc
 * </p>
 * 
 * @author David.liu 2007-9-25
 * @version 1.0
 */
public interface PopedomConstants {
//	 ~交换管理 Start
	static final String Score_Popedom = "Score";//评分
	
//	 ~交换管理 Start
	static final String NewsTransferrequest_PopedomTransferRequestNew = "TRNew";// 1．	新建约传权限
	static final String NewsTransferrequest_PopedomTransferRequestPressing = "TRPressing";// 2．	紧急约传权限
	static final String NewsTransferrequest_PopedomTransferRequestDelete = "TRDelete";// 3．	约传删除权限
	static final String NewsTransferrequest_PopedomTransferRequestFirstAuthen = "TRFirstAuthen";// 4．	约传初审权限
	static final String NewsTransferrequest_PopedomTransferRequestModifyAuthened = "TRModifyAuthened";//  5．	修改已终审约传权限
	// ~交换管理 End
//	 ~策划管理 Start
	static final String NewsMastermind_PopedomMMNew = "MMNew";// 1．	新建权限
	static final String NewsMastermind_PopedomMMFView = "MMFView";// 2.	查看策划主案权限
	static final String NewsMastermind_PopedomMMFEdit = "MMFEdit";// 3.	编辑策划主案权限
	static final String NewsMastermind_PopedomMMFOpen = "MMFOpen";// 4.	打开策划主案权限
	static final String NewsMastermind_PopedomMMSCreate = "MMSCreate";// 5.	新建策划子项权限
	static final String NewsMastermind_PopedomMMSView = "MMSView";// 6.	查看策划子项权限
	static final String NewsMastermind_PopedomMMSOpen = "MMSOpen";// 7.	打开策划子项权限
	static final String NewsMastermind_PopedomMMDelete = "MMDelete";// 8.	删除策划权限
	static final String NewsMastermind_PopedomMMSDelete = "MMSDelete";// 9.	删除策划子项权限
	static final String NewsMastermind_MMISAmend = "MMISAmend";// 9.	修改已签发策划权限
	
	// ~策划管理 End	
	// ~线索权限定义 Start
	static final String NEWSTHREAD_PopedomNewsThreadSned = "NTSned";// 报选题
	static final String NEWSTHREAD_PopedomNewsThreadNew = "NTNew";// 新建线索
	static final String NEWSTHREAD_PopedomNewsThreadDelete = "NTDelete";// 删除线索
	static final String NEWSTHREAD_PopedomNewsThreadPublish = "NTPublish";// 发布线索
	// ~线索权限定义 End

	// ~选题权限定义 Start
	// ~选题权限定义 Start
	static final String LISTPLAN_PopedomListPlanNew = "LPNew";// 新建选题
	static final String LISTPLAN_PopedomStagekeyNew = "SKNew";//新建阶段性重点
	static final String LISTPLAN_PopedomSRNew = "SRNew";//新建系列报道
	static final String LISTPLAN_PopedomListPlanDelete = "LPDelete";// 删除选题
	static final String LISTPLAN_PopedomListPlanFirstAuthen = "LPFirstAuthen";// 初审选题
	static final String LISTPLAN_PopedomListPlanModifyAuthened = "LPModifyAuthened";// 修改已终审选题
	//static final String LISTPLAN_PopedomListPlanAllocate = "PopedomListPlanAllocate";// 选题指派
//	static final String LISTPLAN_PopedomListPlanLastAuthen = "PopedomListPlanLastAuthen";// 终审选题
	static final String LISTPLAN_PopedomListPlanLastAuthen = "LPLastAuthen";// 终审选题
	static final String LISTPLAN_LPRESTORE = "LPRestore"; //选题恢复上报
	static final String LISTPLAN_ASSIGN = "LPAssign";// 选题指派
	static final String LISTPLAN_SUPER = "LPSuper";//选题策划组
	static final String LISTPLAN_CreteCheckDoc = "CreateCheckDoc";//上报签发稿
	static final String LISTPLAN_RelevancyStagekey = "LPStagekey";//关联阶段性重点
	static final String LISTPLAN_Levelup = "LPLevelup";//升格
	static final String LISTPLAN_Claim = "LPClaim";//认领
//	static final String LISTPLAN_PopedomListPlanPostNew = "PopedomListPlanPostNew";// 补报选题
//	static final String LISTPLAN_PopedomListPlanQuery = "PopedomListPlanQuery";// 查询选题
//	static final String LISTPLAN_PopedomListPlanTeamTransmit = "PopedomListPlanTeamTransmit";// 选题组内转发
//	static final String LISTPLAN_PopedomListPlanView = "PopedomListPlanView";// 选题一览

	// ~选题权限定义 End
	// ~选题派工权限定义 Start
	static final String TOPICANDINTERVIEW_PopedomTopicAndInterviewNew = "TTNew";// 新建选题派工
	static final String TOPICANDINTERVIEW_PopedomTopicAndInterviewDelete = "TTDelete";// 删除选题派工
	static final String TOPICANDINTERVIEW_PopedomTopicAndInterviewFirstAuthen = "TTFirstAuthen";// 初审选题派工
	static final String TOPICANDINTERVIEW_PopedomTopicAndInterviewModifyAuthened = "TTModifyAuthened";// 修改已终审选题派工
	//static final String LISTPLAN_PopedomListPlanAllocate = "PopedomListPlanAllocate";// 选题派工指派
	static final String TOPICANDINTERVIEW_PopedomListPlanLastAuthen = "PopedomListPlanLastAuthen";// 选题派工选题
	static final String TOPICANDINTERVI41EW_ASSIGN = "TTAssign";// 选题派工指派
//	static final String LISTPLAN_PopedomListPlanPostNew = "PopedomListPlanPostNew";// 补报选题
//	static final String LISTPLAN_PopedomListPlanQuery = "PopedomListPlanQuery";// 查询选题
//	static final String LISTPLAN_PopedomListPlanTeamTransmit = "PopedomListPlanTeamTransmit";// 选题组内转发
//	static final String LISTPLAN_PopedomListPlanView = "PopedomListPlanView";// 选题一览

	// ~选题权限定义 End
	
	
	
	// ~播出情况登记权限定义 Start
	static final String PLAYOUTLOG_PopedomPLAYOUTLOGADD = "PLAYOUTLOGADD";// 新建播出情况登记
	static final String PLAYOUTLOG_PopedomPLAYOUTLOGDELETE = "PLAYOUTLOGDELETE";// 删除播出情况登记
	static final String PLAYOUTLOG_PopedomPLAYOUTLOGEDITE = "PLAYOUTLOGEDITE";// 编辑播出情况登记
	// ~播出情况登记权限定义 End
	//通稿（采访稿）
	static final String PDNew = "PDNew";// 新建通稿（采访稿)
	static final String PDDelete = "PDDelete";// 通稿（采访稿)删除  
	static final String PDAuthen = "PDAuthen";// 通稿（采访稿)审查 
	static final String PDModifyAuthened = "PDModifyAuthened";// 通稿（采访稿)修改已定稿
	static final String PDLocalUploadMaterial = "PDLocalUploadMaterial";// 通稿地方台上传素材权限
	static final String PDOutSideModify= "PDOutSideModify";// 外电通稿编辑权限
	static final String PDCheckvideo= "PDCheckvideo";// 通稿视频审查权限
	
	//文稿
	static final String CDNew = "CDNew";// 新建文稿
	static final String CDDelete = "CDDelete";// 文稿删除  
	static final String CDFirstAuthen = "CDFirstAuthen";//初审权限
	static final String CDSecondAuthen = "CDSecondAuthen";//二审权限
	static final String CDAuthen = "CDAuthen";// 文稿审查(终审) 权限
	static final String CDModifyAuthened = "CDModifyAuthened";// 文稿修改已定稿
	static final String ColumnDocQuery = "ColumnDocQuery";  //栏目查询权限
	static final String ColumnBroadCast = "ColumnBroadCast";  //栏目维护权限
	static final String ColumnDub = "ColumnDub";  //配音权限
	static final String CDAppShow = "CDAppShow";  //报播权限
	static final String CDUnderLay = "CDUnderLay";  //入垫播权限
	static final String CreateCheckDoc = "CreateCheckDoc";  //上报签发稿权限
	static final String Decoratetask = "Decoratetask";  //文稿终审后日常包装创建权限
	static final String CDCheckvideo= "CDCheckvideo";// 移动审片视频审查权限，废弃：移动文稿中，是否显示审查按钮。目前使用移动审片APP来审查。
	static final String APPCheckvideo= "APPCheckvideo";// 移动审片登陆权限
	static final String CDCheckvideoDocapp= "CDCheckvideoDocapp";// 文稿视频审查权限
	static final String CDEndCheckBack = "CDEndCheckBack";  //终审退回
	static final String CDForceUnlock = "CDForceUnlock";  //强制解锁编辑权限
	
	//常熟台要求的审片2审流程。
	static final String APPCheckvideoFirst= "APPCheckvideoFirst";// 文稿视频审查权限
	static final String APPCheckvideoSecond= "APPCheckvideoSecond";// 文稿视频审查权限

	//西安台定制需求-BS审片和ipad审片定制权限-节目审查限制权限（定制权限）
	/*
	 *Ipad审片和Web审片定制需求：
1.  常规审片流程保留。应用场景台内用户。
2.  定制特殊审片流程，指定用户只能审查指定文稿节目。指定用户不能查看串联单模块。
对应特殊审片流程，Ipad审片客户端还是共用一个版本，Web审片共用一个版本，通过权限来限制，细节如下，其中一些需要确认，
下面以特殊用户A，ipad审片为例(Web审片原理相同)：
网管对用户A授权：功能权限：节目审查权限，节目审查权限（定制权限）。
                                                栏目权限：A栏目，B栏目
         用户B（台内人员），登录Infoshare打开文稿D1编辑页面，在节目编辑上，添加上用户A。

         A登录ipad审片，根据权限屏蔽串联单模块。只显示节目模块。（定制）
         节目模块的查询条件有（时间，节目状态：合成完毕，审查通过，退回），目前逻辑默认查询条件（时间：当天，节目状态：合成完毕）。是否默认条件定制为：（时间：当天，节目状态：审片完成？）（需要确认指定用户审查，是审查节目状态:合成完毕，还是审查完成的？）
         节目模块查询后台特殊过滤条件，根据文稿节目编辑包含用户A的才能查询出来进行过滤。
         
         （需求：专门的人看专门的节目，不能互相看节目，支持意见录入，人工通知退回）
定制：审片界面功能定制按钮：通过，屏蔽退回按钮，人工通知退回。

	 */
	static final String APPDZLimitCheckvideo= "APPDZLimitCheckvideo";// 节目审查限制权限（定制权限,西安台使用）
	// ~文稿权限定义 Start
	////新建
//	static final String DOC_PopedomDocNew = "CDNew";//"PopedomDocNew";// 新建文稿
//	static final String SYS_PopedomSystemManage = "PopedomSystemManage";// 系统管理权限
//	////查詢
//	static final String DOC_PopedomDocQuery = "PopedomDocQuery";// 文稿查询
//	static final String DOC_PopedomDocView = "PopedomDocView";// 文稿一览
//	static final String DOC_PopedomColDocView = "PopedomColDocView";// 栏目稿件一览   add
//	static final String DOC_PopedomMyDocView = "PopedomMyDocView";// 我的文稿查询
//	static final String DOC_PopedomMyModifyDocView = "PopedomMyModifyDocView";// 我的待修改稿件查询
//	static final String DOC_PopedomDocStatistic = "PopedomDocStatistic";// 文稿统计
//	static final String DOC_PopedomColDocStatistic = "PopedomColDocStatistic";// 栏目文稿统计      add
//	////删除
//	static final String DOC_PopedomDocDelete = "PopedomDocDelete";// 删除文稿
//	static final String DOC_PopedomColDocDelete = "PopedomColDocDelete";// 栏目稿删除   add
//	////修改
//	static final String DOC_PopedomDocEditPass = "PopedomDocEditPass";// 修改已定稿
//	////報播
	////非编素材检索相关~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	static final String ETJuniorCensor = "ETJuniorCensor";//初级审查权
	static final String ETMiddleCensor = "ETMiddleCensor";//中级审查权
	static final String SeniorCensor = "SeniorCensor";//终级审查权
	static final String SeniorModify = "SeniorModify";//终级修改权
	
	static final String ET_PopedomETAdministrator = "ETAdministrator";//资源管理员
	static final String ET_PopedomColumnClipMaintain = "ColumnClipMaintain";//资源维护权
	static final String ET_PopedomColumnClipQuery = "ColumnClipQuery";//资源查询权
	//读权限类型
	static final int    ET_PopedomReadType_Public = 0;//公开
	static final int    ET_PopedomReadType_Private = 1;//私有
	static final int    ET_PopedomReadType_Column = 2;//栏目
	static final int    ET_PopedomReadType_Condition = 3;//条件
	//访问者类型
	static final int    ET_PopedomVisitorType_User = 1;//用户
	static final int    ET_PopedomVisitorType_Group = 2;//组
//	//////審查
//	static final String DOC_PopedomDocFirstAuthen = "PopedomDocFirstAuthen";// 初审文稿 (已废除)
//	static final String DOC_PopedomDocLastAuthen = "PopedomDocLastAuthen";// 终审文稿 (已废除)
//	static final String DOC_PopedomDocAppDocFirstAuthen = "PopedomDocAppDocFirstAuthen";// 初审报播
//	static final String DOC_PopedomDocAppDocLastAuthen = "PopedomDocAppDocLastAuthen";// 终审报播
//	//文稿数据权限
//	////文稿評分
//	static final String DOC_PopedomDocScore = "PopedomDocScore";// 文稿评分
//	static final String DOC_PopedomDocScoreCancel = "PopedomDocScoreCancel";// 文稿评分退回
//	static final String DOC_PopedomDocScoreCensor = "PopedomDocScoreCensor";// 文稿评分审查
//	static final String DOC_PopedomDocForceUnlock = "PopedomDocForceUnlock";// 强制解除别人对文稿的锁定权
	// ~文稿权限定义 End

	// ~串联单权限定义 Start
	static final String DOCLLIST_PopedomLListNew = "LLNew";// -新建串联单
	static final String DOCLLIST_PopedomLListDelete = "LLDelete";// -删除串联单
	static final String DOCLLIST_PopedomLListAuthen = "LLAuthen";// -审查串联单
	static final String DOCLLIST_PopedomLListMOdifyAuthened = "LLModifyAuthened";// -修改终审通过的串联单
	static final String DOCLLIST_PopedomLListMOdifyIsShowed = "LLModifyIsShowed";// -修改已播串联单权限
	static final String DOCLLIST_PopedomLLTRelease = "LLTRelease";//串联单模板签发权限
	static final String DOCLLIST_PopedomLLTStart = "LLTStart";//串联单模板启用权限
	
	
//	static final String DOCLLIST_PopedomScriptInRDSRead = "PopedomScriptInRDSRead";// -串联单内文稿读权限
//
//
//	static final String DOCLLIST_PopedomScriptInRDSWrite = "PopedomScriptInRDSWrite";// -串联单内文稿写权限
//
//
//	static final String DOCLLIST_PopedomLListEditShowedProgram = "PopedomLListEditShowedProgram";// -编辑已播串联单
//
//
//	static final String DOCLLIST_PopedomLListView = "PopedomLListView";// -串联单一览
//
//
//	static final String DOCLLIST_PopedomRDSWrite = "PopedomRDSWrite";// -串联单写权限
//	static final String DOCLLIST_PopedomRDSRead = "PopedomRDSRead";// -串联单读权限
//
	static final String DOCLLIST_PopedomLListTemplateView = "PopedomLListTemplateView";// -查看串联单模板
//
//
	static final String DOCLLIST_PopedomLListTemplateNew = "LLTNew";// -新建串联单模板
//
//
//	static final String DOCLLIST_PopedomLListQueryShowed = "PopedomLListQueryShowed";// -查询所有已播串联单
//	static final String DOCLLIST_PopedomLListQueryNotShowed = "PopedomLListQueryNotShowed";// -查询未播串联单
//
//
//	static final String DOCLLIST_PopedomLListQuery24Out = "PopedomLListQuery24Out";// -查询24小时外已播串联单
//	static final String DOCLLIST_PopedomLListPlayAndAdjust = "PopedomLListPlayAndAdjust";// -播出(调整)串联单
//
//
//	static final String DOCLLIST_PopedomLListPlay = "PopedomLListPlay";// -串联单播出(确认)
//	
//
//
//	static final String DOCLLIST_PopedomLListLastAuthen = "PopedomLListLastAuthen";// -终审串联单
//
//
//	static final String DOCLLIST_PopedomLListFirstAuthen = "PopedomLListFirstAuthen";// -初审串联单
//
//
//	static final String DOCLLIST_PopedomPassProgram = "PopedomPassProgram";// -终审通过的串联单 - 定稿权
//
//	//static final String DOCLLIST_PopedomUserCheckDocListFirstAuth = "PopedomUserCheckDocListFirstAuth";// -串联单一审权限
//
//
//	//static final String DOCLLIST_PopedomUserCheckDocListSectAuth = "PopedomUserCheckDocListSectAuth";// -串联单二审权限
//	
//	static final String DOCLLIST_PopedomLlistContextLocked = "PopedomLlistContextLocked";//内容锁定
//	static final String DOCLLIST_PopedomLlistMoveLocked = "PopedomLlistMoveLocked";//编排锁定
//	static final String DOCLLIST_PopedomLlistExternaldocEdit = "PopedomLlistExternaldocEdit";//编辑外来信息
//	
//	static final String DOCLLIST_PopedomTechDocGradeFromLList = "PopedomTechDocGradeFromLList";
	
	//串联单数据权限

	static final String DOCLLIST_PopedomColumnQuery = "ColumnQuery";  //栏目查询权限
	static final String DOCLLIST_PopedomColumnMaintain = "ColumnMaintain";  //栏目维护权限
	
	// ~串联单权限定义 End

	// ~采访计划权限定义 Start
	static final String COVERPLAN_PopedomCoverplanNew = "CPNew";// 新建
	static final String COVERPLAN_PopedomCoverplanDelete = "CPDelete";// 删除采访计划
	static final String COVERPLAN_PopedomCoverPlanEditPass = "CPModifyAuthened";// 修改通过审查的采访计划
	static final String COVERPLAN_PopedomCoverPlanFirstAuthen = "CPFirstAuthen";// 初审采访计划
	static final String COVERPLAN_PopedomCoverplanAssign= "CPAssign";// 指派
	// ~采访计划权限定义 End

	// ~公共通讯录权限定义 Start
	static final String Pub_ADDRESSLIST_POPEDOMPUBADDRESSLISTMANAGE = "PopedomPubAddresslistManage";// 公共通讯录管理


	static final String Pub_ADDRESSLIST_POPEDOMPUBADDRESSLISTVIEW = "PopedomPubAddresslistView";// 公共通讯录查看


	// ~公共通讯录权限定义 End
	
	// ~设备维修权限定义 Start
	static final String NewsEquipmaintain_PopedomEquipMaintainQuery = "PopedomEquipMaintainQuery";// 设备报修查询
	static final String NewsEquipmaintain_PopedomEquipMaintainFactory = "PopedomEquipMaintainFactory";// 设备维修商

	static final String NewsEquipmaintain_PopedomEquipMaintainAuthen = "PopedomEquipMaintainAuthen";// 设备报修审批
	static final String NewsEquipmaintain_PopedomEquipMaintainApp = "PopedomEquipMaintainApp";// 设备报修申请



	// ~设备维修录权限定义 End
	
	// ~采访设备借出权限定义 Start
	static final String NewsEquipinout_PopedomEquipOutView = "PopedomEquipOutView";// 采访设备借出查询
	static final String NewsEquipinout_PopedomEquipOut = "PopedomEquipOut";//采访设备借出(归还)
	static final String NewsEquipinout_PopedomEquipGeneralView = "PopedomEquipGeneralView";// 采访设备清单
	static final String NewsEquipinout_PopedomEquipEquipType = "PopedomEquipEquipType";// 采访设备类型维护

	// ~采访设备借出权限定义 End
	
	//外来稿件----------------------------------------
	static final String EXTERNALDOC_PopedomDirect_ModifyTitle = "PopedomDirect_ModifyTitle";//修改直播节目信息
	static final String	EXTERNALDOC_PopedomExternalInfo_DirectQuery = "PopedomExternalInfo_DirectQuery";//直播节目查询
	static final String	EXTERNALDOC_PopedomExternalInfo_APTN = "PopedomExternalInfo_APTN";       //APTN稿件查询
	static final String	EXTERNALDOC_PopedomExternalInfo_LocalDoc = "PopedomExternalInfo_LocalDoc";  //地方台稿件查询

	static final String	EXTERNALDOC_PopedomExternalInfo_Reuters = "PopedomExternalInfo_Reuters";  //路透社稿件查询
	static final String	EXTERNALDOC_PopedomExternalInfo_XINHUA_CHINESE = "PopedomExternalInfo_XINHUA_CHINESE";  //新华社中文稿查询
	static final String	EXTERNALDOC_PopedomExternalInfo_XINHUA_ENGLISH = "PopedomExternalInfo_XINHUA_ENGLISH";  //新华社英文稿查询
	static final String	EXTERNALDOC_PopedomExternalInfo_XINHUA_PICTURE = "PopedomExternalInfo_XINHUA_PICTURE";  //新华社图片查询

	static final String	EXTERNALDOC_PopedomExternalInfo_Del_APTN = "PopedomExternalInfo_Del_APTN";   //删除APTN稿件
	static final String	EXTERNALDOC_PopedomExternalInfo_Del_LocalDoc = "PopedomExternalInfo_Del_LocalDoc";   //删除地方台稿件

	static final String	EXTERNALDOC_PopedomExternalInfo_Del_Reuters = "PopedomExternalInfo_Del_Reuters";  //删除路透（Reuters）稿件

	static final String	EXTERNALDOC_PopedomExternalInfo_Del_XIHUA_CHN = "PopedomExternalInfo_Del_XIHUA_CHN"; //删除新华社中文稿件

	static final String EXTERNALDOC_PopedomExternalInfo_Del_XIHUA_ENG = "PopedomExternalInfo_Del_XIHUA_ENG";  //删除新华社英 文稿件	
	static final String EXTERNALDOC_PopedomExternalInfo_Del_XIHUA_PIC = "PopedomExternalInfo_Del_XIHUA_ PIC";  //删除新华社图片稿件

	static final String EXTERNALDOC_PopedomExternalInfo_AppShow = "PopedomExternalInfo_AppShow"; //报播外来稿件
	static final String	EXTERNALDOC_PopedomExternalInfo_EmbodyQuery = "PopedomExternalInfo_EmbodyQuery"; //总控收录查询
	static final String	EXTERNALDOC_PopedomExternalInfo_FastQuery = "PopedomExternalInfo_FastQuery"; //固定约传查询
	static final String EXTERNALDOC_PopedomFastSheet_Modify = "PopedomFastSheet_Modify"; //修改固定约传信息
	static final String EXTERNALDOC_PopedomZKSheet_ModifyTitle = "PopedomZKSheet_ModifyTitle"; //地方部修改总控约传收录单的标题和内容


	static final String NEWS_DeviceApply_Popedomaudit = "PRAuthen";
	//线索库远程稿件管理权限
	static final String NEWS_ExchangeDoc_Popedommanage = "NTLManage";
	static final String NEWS_ExchangeDoc_Popedombackup = "PERDBackup";//归档
	static final String NEWS_ExchangeDoc_Popedompublish = "PERDPublish";//发布
	//-----------------------------------------------
	static final String NEWS_Infolist_Popedomaudit = "InfoListMMEdit";
	
	//菜单权限
	static final String Menu_xinjianwengao = "Menu_xinjianwengao";//新建文稿
	static final String Menu_xinjiantonggao = "Menu_xinjiantonggao";//新建通稿
}
