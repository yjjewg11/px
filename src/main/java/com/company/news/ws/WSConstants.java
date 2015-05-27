package com.company.news.ws;

public class WSConstants {
	
	static public final String TaskCategory_MaterialRecord = "MaterialRecord";//收录
	static public final String TaskCategory_MaterialEdit = "MaterialEdit";//上载
	static public final String TaskCategory_ProgramEdit = "ProgramEdit";//节目制作
	static public final String TaskCategory_MaterialAudit = "MaterialAudit";//通稿审查
	static public final String TaskCategory_ProgramAudit = "ProgramAudit";//节目审片
	//static public final String TaskCategory_ProgramDub = "ProgramDub";//配音
	static public final String TaskCategory_ProgramPreDub="ProgramPreDub";//前配音
	static public final String TaskCategory_ProgramPostDub="ProgramPostDub";//后配音
	static public final String TaskCategory_SimpleEdit = "SimpleEdit"; // 草编;
	static public final String TaskCategory_RoutineEdit = "RoutineEdit"; //常规编辑;
	
	//简编
	static public final String TaskCategory_WebProgramEdit = "WebProgramEdit"; //简编编辑;
	
	static public final String WSPageOfSize = "WSPageOfSize"; //返回的最大条数
		
	static public final String TaskCategory_MaterialScript = "MaterialScript";//通稿
	static public final String TaskCategory_ProgramScript = "ProgramScript";//文稿
	
	static public final String TaskCategory_Material = "Material";//通稿
	static public final String TaskCategory_Program = "Program";//文稿
	
	static public final String TaskCategory_Coldoc = "Coldoc";//配音
	static public final String TaskCategory_Pubdoc = "Pubdoc";//配音
	
	static public final String Priority_General = "general";//普通
	static public final String Priority_Urgent = "urgent";//紧急
	
	static public final String TaskStatus_Posted = "posted";//已下发
	static public final String TaskStatus_Finished = "finished";//已完成
	static public final String TaskStatus_Canceled = "canceled";//已取消
	
	static public final String InvokeResponseType_Status_Success = "success";//成功
	static public final String InvokeResponseType_Status_Faileds = "failed";//失败
	
	
	static public final String SeparatorChar = "_";//已取消
	
	static public final String DateFormat = "yyyy-MM-dd HH:mm:ss";//日期时间格式
	
	
	//-----------   查询接口 -------
	//扩展属性中
	static public final String QUERY_CONDITION_KEYWORDS = "keywords";//关键字
	static public final String QUERY_CONDITION_COLUMNS = "columns";//栏目CODE
	static public final String QUERY_CONDITION_CHANNELCODE = "channelCode";//频道CODE
	static public final String QUERY_CONDITION_CATEGORY = "category";//题材分类
	static public final String QUERY_CONDITION_PHASE = "phase";//时段CODE
	static public final String QUERY_CONDITION_DOCID = "DocId";//DocId
	static public final String QUERY_CONDITION_GROUPTYPE = "GroupType";//GroupType
	static public final String QUERY_CONDITON_ISSHOWED = "isShowed";//是否播出
	
	static public final String QUERY_CONDITON_Voiceactor = "Voiceactor";//配音人
	static public final String QUERY_CONDITON_Voiceactor_name = "配音人";//配音人
	
	
	static public final String QUERY_CHECKPOPEDOM = "checkPopedom";
	
	//返回时的类型--标识
	static public final String QUERY_CONDITION_CHANNELSTYPE = "ChannelType"; //频道
	static public final String QUERY_CONDITION_TIMEPERIODTYPE = "TimePeriodType"; //时段
	static public final String QUERY_CONDITION_COLUMNSTYPE = "ColumnsType"; //拟播栏目
	
	static public final String QUERY_CONDITION_CCTVColumnCode = "CCTVColumnCode"; //cctv台内栏目编码
	
	static public final String QUERY_CONDITION_PREBROADCAST = "PreBroadcast";//拟播时间
	static public final String QUERY_CONDITION_PREBROADCAST_NAME = "拟播时间";//拟播时间
	static public final String QUERY_CONDITION_BROADCAST = "Broadcast";//报播时间
	static public final String QUERY_CONDITION_CREATEDDATE = "Create";//稿件创建时间
	static public final String QUERY_CONDITION_BROADCAST_NAME = "报播时间";	
	static public final String QUERY_CONDITION_CREATEDDATE_NAME = "稿件创建时间";	
	static public final String QUERY_CONDITION_REPORTER = "Reporter";//记者
	static public final String QUERY_CONDITION_DIRECTOR = "Director";//主编
	static public final String QUERY_CONDITION_NLEPROGRAMEDITOR = "NLEProgramEditor";//节目编辑
	static public final String QUERY_CONDITION_NLEPROGRAMAUDIT = "NLEProgramAudit";//节目审查人
	static public final String QUERY_CONDITION_EXECUTOR = "Executor";//执行人
	static public final String QUERY_CONDITION_ISEARLIERDUB = "isearlierdub";//是否先配音	
	static public final String QUERY_CONDITION_PLAYDATE = "playdate";
	static public final String QUERY_CONDITION_GENERALEDITOR = "generalEditor";
	static public final String QUERY_CONDITION_EDITOR = "Editor";//编辑
	static public final String QUERY_CONDITION_SIGNEDREPORTER = "SignedReporter";//署名记者
	
	static public final String QUERY_CONDITION_CreatedBy = "CreatedBy";//创建人
	static public final String QUERY_CONDITION_Docoutauthor = "Docoutauthor";//通稿台外记者
	static public final String QUERY_CONDITION_MainCharacters = "MainCharacters";//通稿台外记者
	
	//状态类型--标识
	static public final String QUERY_CONDITION_ScriptAudit = "ScriptAudit";//文稿审查状态
	static public final String QUERY_CONDITION_ScriptAudit_NAME = "文稿审查状态";//文稿审查状态
	
	static public final String QUERY_CONDITION_SCRIPTSTATUS = "ScriptStatus";//文稿状态
	static public final String QUERY_CONDITION_SCRIPTSTATUS_NAME = "文稿状态";//文稿状态
	static public final String QUERY_CONDITION_PROGRAMSTATUS = "ProgramStatus";//节目状态
	static public final String QUERY_CONDITION_PROGRAMSTATUS_NAME = "节目状态";//节目状态
	
	//状态类型--选题
	static public final String QUERY_CONDITION_ListPlanAudit = "ListPlanAudit";//选题审查状态
	static public final String QUERY_CONDITION_ListPlanAudit_NAME = "选题审查状态";
	
	static public final String QUERY_CONDITION_MakedPoint_Status = "MakedPoint_Status";//标注点状态
	static public final String QUERY_CONDITION_MakedPoint_Status_NAME = "标注点状态";//标注点状态
	    
	static public final String QUERY_CONDITION_PGMSECSTATUS = "ProgramDub";//配音状态
	static public final String QUERY_CONDITION_PGMSECSTATUS_NAME = "配音状态";//配音状态
	static public final String QUERY_CONDITION_PLAYLISTSTATUS = "PlayList";
	static public final String QUERY_CONDITION_PLAYLISTSTATUS_NAME = "串联单状态";
	static public final String QUERY_CONDITION_Subjecttype = "Subjecttype";
	static public final String QUERY_CONDITION_Subjecttype_NAME = "题材分类";
	static public final String QUERY_CONDITION_Emphasislevel = "Emphasislevel";
	static public final String QUERY_CONDITION_Emphasislevel_NAME = "重要程度";
	static public final String QUERY_CONDITION_Secrectclassid = "Secrectclassid";//机密等级
	
	static public final String QUERY_CONDITION_Appshowcolumnids = "Appshowcolumnids";//栏目约稿栏目id
	static public final String QUERY_CONDITION_Appshowdates = "Appshowdates";//栏目约稿拟播日期
	
	
	//文稿状态
	static public final String SCRIPTSTATUS_STATUS_FINSHED = "editing";//编辑中   -->未提交1
	//static public final String SCRIPTSTATUS_STATUS_UNFINSHED = "unfinished";//编辑未完成  -->未提交1
	
	static public final String NEWS_ENTITY_STATUS_UNDERFIRSTCHECKUP = "ready";//待初审3
	static public final String NEWS_ENTITY_STATUS_UNDERFINALCHECKUP = "1thpassed";//待终审4
	static public final String NEWS_ENTITY_STATUS_PASSED = "finalpassed";//终审通过0
	static public final String NEWS_ENTITY_STATUS_REJECTION = "nopassed";//打回-1
	//节目状态
	static public final String NEWS_ENTITY_programedit_NOPGM = "nopgm";//unfinished	制作未完成  -1(infoshare自己用的)
	
	static public final String NEWS_ENTITY_programedit_UNFINISHED = "unfinished";//unfinished	制作未完成  0
	static public final String NEWS_ENTITY_programedit_REDO = "redo";//redo	重新制作    1
	static public final String NEWS_ENTITY_programedit_SIMPLEEDITFINISHED = "simpleeditfinished";//simpleeditfinished	初编完成   2
	static public final String NEWS_ENTITY_programedit_DELICATEEDITFINISHED = "Delicateeditfinished";//Delicateeditfinished	精编完成   3
	static public final String NEWS_ENTITY_programedit_SUBMITSYNTHESIZE = "submitSynthesize";//submitSynthesize	提交合成   4
	static public final String NEWS_ENTITY_programedit_SYNTHESIZEFAILED = "Synthesizefailed";//Synthesizefailed	合成失败   5
	static public final String NEWS_ENTITY_programedit_SYNTHESIZEFINISHED = "Synthesizefinished";//Synthesizefinished	合成完毕   6
	static public final String NEWS_ENTITY_programedit_AUDITFEEDBACK = "Auditfeedback";//Auditfeedback	审片退回   7
	static public final String NEWS_ENTITY_programedit_AUDITPASSED = "Auditpassed";//Auditpassed	审片通过   8
	static public final String NEWS_ENTITY_programedit_BROADCASFEEDBACK = "Broadcastfeedback";//Broadcastfeedback	演播退回   9
	static public final String NEWS_ENTITY_programedit_1THEDITNOPASSED = "1theditnopassed";//1theditnopassed:在Info是重做，在ML是退回给记者(一审制作退回) 10
	static public final String NEWS_ENTITY_programedit_2THEDITNOPASSED = "2theditnopassed";//退回到编辑状态(二审制作退回) 11
	static public final String NEWS_ENTITY_programedit_SYNTHESIZING = "Synthesizing";//正在合成 12
	static public final String NEWS_ENTITY_programedit_SYNTHESIZELOWFINISHED = "SynthesizeLowfinished";//低码率合成完毕 13
	static public final String NEWS_ENTITY_programedit_AUTOTECHCENSORPASSED = "Autotechcensorpassed";//完成自动技审 14
	static public final String NEWS_ENTITY_programedit_REPLAYAUDIT = "ReplayAudit";//ReplayAudit重播待审15
	static public final String NEWS_ENTITY_programedit_PUBLISHED = "Published";//已发布（发布到网络库）20
	
	//简编状态
	static public final String NEWS_ENTITY_programedit_WebUnfinished = "WebUnfinished";//简编编辑
	static public final String NEWS_ENTITY_programedit_WebFinished = "WebFinished";//简编完成
	static public final String NEWS_ENTITY_programedit_WebSubmitAudit = "WebSubmitAudit";//简编送审
	//static public final String NEWS_ENTITY_programedit_Auditpassed = "Auditpassed";//审查通过
	//static public final String NEWS_ENTITY_programedit_Auditfeedback = "Auditfeedback";//审查退回
	
	
	
	//配音状态
	static public final String NEWS_ENTITY_pgmsecstatus_UNFINISHED = "unfinished"; // 配音未完成
	static public final String NEWS_ENTITY_pgmsecstatus_FINISHED = "finished"; // 配音完成
	static public final String NEWS_ENTITY_pgmsecstatus_WAIT = "wait";//等待配音
	
	
	//获取文稿内容样式*--标识
	static public final String QUERY_DOCCONTENTTYPE_FULLCONTENT = "FullContent";//带标签
	static public final String QUERY_DOCCONTENTTYPE_NOTFORMATTAGS = "NoFormatTags";//不带标签
	static public final String QUERY_DOCCONTENTTYPE_ONLYPROLOG = "OnlyProlog";//返回导语
	static public final String QUERY_DOCCONTENTTYPE_ANNOUNCECONTENT = "AnnounceContent";//返回正文
	
	//节目文件类型type的约定
	static public final String ProgramFileType_HIGH = "high";//高质量 1L
	static public final String ProgramFileType_LOW = "low";//低质量 0L
	
	//扩展属性，审片退回前，调用接口使用key。
	static public final String ExtendAttribute_ID_AuditBack_CheckCopyProgram="AuditBack_CheckCopyProgram";
	//审片退回调用
	static public final String ExtendAttribute_Value_AuditBack_CheckCopyProgram_AuditBack="AuditBack";
	//3表示退回已通过的原节目。
	static public final String ExtendAttribute_ID_Auditpassed_copy_flag="Auditpassed_copy_flag";
	
	//3表示退回已通过的原节目。
	static public final String ExtendAttribute_ID_Auditpassed_copy_columncodes="Auditpassed_copy_columncodes";
	
	//ML 记录AB岛对应接口地址的id
	static public final String ExtendAttribute_ID_ML_Server_ID="ML_Server_ID";
	
	   //标注点
    static public final String ExtendAttribute_ID_MakedPoint="MakedPoint";
	
    //是否自动入媒资
    static public final String ExtendAttribute_ID_MamPgmImport="MamPgmImport";
	//复制稿件类别IsCopied
	static public final String ProgramIsCopied_NOTCOPY = "0";//不是复制稿件
	static public final String ProgramIsCopied_COPY_NOTSTART= "1";//是复制稿件但未做过节目
	static public final String ProgramIsCopied_COPY_STARTED = "2";//是复制稿件且做过节目
	//获取节目时操作标记
	static public final String COPYTYPE = "copyType";//复制节目操作分类
	static public final String COPYTYPE_NEW = "new";//是复制节目 ，但不复制原稿件的节目 信息
	static public final String COPYTYPE_COPY = "copy";//是复制节目 ，复制原稿件的节目 信息
	
	//查询前配音时，要求满足的稿件流程状态
	static public final String QUERYPREDUB_OF_NEWS_ENTITY_STATUS = "QueryPreDubOfNewsEntityStatus";
	
	//创建选题及相关使用用
	//reportby：上报人员 appperson 执行人 createdby：录入人  --选题用
	static public final String LISTPLAN_REPORTBY = "reportby";//上报人员
	static public final String LISTPLAN_APPPERSON= "appperson";//执行人
	static public final String LISTPLAN_CREATEDBY = "createdby";//录入人
	static public final String PUBDOCID_RELATED = "pubdocId";//通稿ID
	static public final String TRANSFERREQUEST_LINKMAN = "linkman";//联系人
	static public final String TRANSFERREQUEST_CONTACTWAY = "contactway";//联系方式
	static public final String TRANSFERREQUEST_PUBDOCCONTENT = "pubdocContent";//通稿内容
	static public final String TRANSFERREQUEST_PUBDOCTITLE = "pubdocTitle";//通稿标题
	static public final String TRANSFERREQUEST_PUBDOCKEYWORD = "pubdocKeyword";//通稿关键词
	static public final String TRANSFERREQUEST_PUBDOCSUBJECTTYPE = "pubdocSubjectType";//通稿题材类型
	static public final String TRANSFERREQUEST_PUBDOCOCCURDATE = "pubdocOccurdate";//通稿发生日期
	static public final String TRANSFERREQUEST_PUBDOCOCCURPLACE = "pubdocOccurplace";//通稿发生地点
	static public final String TRANSFERREQUEST_SENDTIME = "sendTime";//通稿上报日期
	static public final String TRANSFERREQUEST_REPORTOR = "reportor";//台外记者
	
	//日期类型（OccurDate：发生日期 appshowdate：拟播日期）
	static public final String LISTPLAN_OCCURDATE = "DateOccur";//发生日期
	static public final String LISTPLAN_APPSHOWDATE = "appshowdate";//拟播日期
	
	
	static public final String Doc_Columnname = "Columnname";//主要人物(相关人物)
	//查询时自定义扩展属性使用 
	//static public final String LISTPLAN_OCCURLOCATION = "OccurLocation";//发生地点
	static public final String LISTPLAN_MAINCHARACTERS = "Actors";//主要人物(相关人物)
	static public final String LISTPLAN_INFOSOURCE = "SourceFrom";//来源
	static public final String LISTPLAN_SUBJECTTYPE = "Subjecttype";//节目分类(题材分类)
	static public final String LISTPLAN_PgmType= "PgmType";//节目分类(题材分类)
	static public final String LISTPLAN_AUTHORCODE = "Authorcode";//记者 
	static public final String LISTPLAN_SECRECTCLASS = "PgmLevel";//节目等级(机密)
	static public final String LISTPLAN_PROGRAMLENGH = "Programelengh";//节目时长
	static public final String LISTPLAN_PUBLISHEDDATE = "publishedDate";//发布时间为当前时间 
	static public final String LISTPLAN_CREATEDATE = "CreateDate";//创建时间
	static public final String LISTPLAN_CREATORNAME = "CreatorName";//创建人
	static public final String LISTPLAN_PUBLISHEDTYPE = "PublishedType";//发布类型
	static public final String LISTPLAN_TERMINALID = "TerminalID";//终端标识
	static public final String LISTPLAN_DOCPROVIDER = "DocProvider";//供稿人
	static public final String IMAGEVPSPATH = "ImageVpsPath";//文稿中图片全路径
	static public final String TEMPLATEID = "TemplateId";//字幕模板ID
	
}
