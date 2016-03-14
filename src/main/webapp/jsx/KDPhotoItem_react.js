var KDPhotoItem=function(){
			
		var module={
			group_uuid:null,
			query:function(){
				
			}
				
		}
/*
 * 学生列表服务器请求后绘制处理方法；
 * @</select>下拉多选框;
 * @handleChange_stutent_Selected:学校查询；
 * @handleChange_class_Selected::班级查询；
 * @btn_query_click:名字查找；
 * */
var Query_stutent_list_byRight = React.createClass({
		getInitialState: function() {
			return this.getStateByPropes(this.props); 
		  },
		getStateByPropes:function(nextProps){

			var classList=Store.getChooseClass(nextProps.group_uuid);
				classList=G_selected_dataModelArray_byArray(classList,"uuid","name");
			classList.unshift({value:"",label:"所有"});
			var status_list= G_selected_dataModelArray_byArray(Vo.getTypeList("student_status"),"key","val");
			status_list.unshift({value:"",label:"所有"});
			nextProps.status_list=status_list;
			nextProps.group_list.unshift({value:"",label:"所有"});
		   var queryForm={
				status:"",
				classuuid:"",
				name:"",
				groupuuid:nextProps.group_uuid
		   };
		   var obj= {
				queryForm:queryForm,
				pageNo:1,
				classList:classList,
				type:nextProps.type,
				list: []
		   };
		   return obj;
	  },
		
		
	   componentWillReceiveProps: function(nextProps) {
		 
		   this.setState(this.getStateByPropes(nextProps));
		},
	handleChange_selectgroup: function(val) {
	this.state.groupuuid=val;
	var classlist=Store.getChooseClass(val);
	
	this.state.classList=G_selected_dataModelArray_byArray(classlist,"uuid","name");
	this.state.classList.unshift({value:"",label:"所有"});
	this.handleChange();
},
	handleChange: function() {

		   var queryForm=$('#queryForm').serializeJson();
             this.state.queryForm=queryForm;
            this.setState(this.state);

	  }, 
	 pageClick: function(m) {
            var obj=this.state;
            if(m=="pre"){
                 
                 if(obj.pageNo<2){
                      G_msg_pop("第一页了");
                      return;
                 }
                 obj.pageNo=obj.pageNo-1;
                 this.ajax_list(obj);
                 return;
            }else if(m=="next"){
                 if(!obj.list||obj.list.length==0){
                      G_msg_pop("最后一页了");
                      return ;
                 }
                 obj.pageNo=obj.pageNo+1;
                 
                 this.ajax_list(obj);
                 return;
            }
       },
       handleClick_query: function(m) {
            this.state.pageNo=1;
             this.ajax_list();
         },
		componentDidMount: function() {
        this.ajax_list(); 
     },
		ajax_list:function(){
             var queryForm=this.state.queryForm;
             queryForm.pageNo=this.state.pageNo;

            $.AMUI.progress.start();
            var that=this;
            var url = hostUrl + "rest/student/querybyRight.json";
            $.ajax({
                 type : "GET",
                 url : url,
                 data :queryForm,
                 dataType : "json",
                 //async: false,//必须同步执行
                 success : function(data) {
                      $.AMUI.progress.done();
                      if (data.ResMsg.status == "success") {
                          that.ajax_callback( data.list);     
                      } else {
                           alert(data.ResMsg.message);
                           G_resMsg_filter(data.ResMsg);
                      }
                 },
                 error : G_ajax_error_fn
            });
            
       },
		ajax_callback:function(list){
            if (list== null ) this.state.list=[];
             else
              this.state.list=list.data;

             if(this.state.pageNo=="1")this.state.totalCount=list.totalCount;
              this.setState(this.state);
         },
		
render: function() {


	   var queryForm=this.state.queryForm;
             if(!this.state.totalCount)this.state.totalCount=0;
             if(!this.state.sum_num)this.state.sum_num=0;

	
    return (
      <div> 
        <G_px_help_List data={G_kd_help_msg.msg_help_list16}/>
	     
        <AMR_Panel>
       <AMR_ButtonToolbar> 
      
         <div className="am-fl am-margin-bottom-sm am-margin-left-xs">
         <AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "pre")} >上一页</AMR_Button>
        </div>     
          
          <div className="am-fl am-margin-bottom-sm am-margin-left-xs">
				 <AMR_Button amStyle="default" disabled="false" >共{this.state.totalCount}条,第{this.state.pageNo}页</AMR_Button>
 
        </div>     
        
          <div className="am-fl am-margin-bottom-sm am-margin-left-xs">
         <AMR_Button amStyle="default" onClick={this.pageClick.bind(this, "next")} >下一页</AMR_Button>
        </div>
	     </AMR_ButtonToolbar>
	     </AMR_Panel>

<form id="queryForm" method="post" className="am-form" action="javascript:void(0);">
 	 <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
	  <AMUIReact.Selected  className= "am-fl" name="groupuuid" onChange={this.handleChange_selectgroup} btnWidth="200"  placeholder="所有"  multiple= {false} data={this.props.group_list} btnStyle="primary" value={queryForm.groupuuid} />      
	   </div>  	 
	    <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
	   <AMUIReact.Selected  className= "am-fl"  name="classuuid" onChange={this.handleChange} btnWidth="200"   placeholder="所有"  multiple= {false} data={this.state.classList} btnStyle="primary" value={queryForm.classuuid} />      
	  </div>  
		   <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
	   <AMUIReact.Selected  className= "am-fl"name="status" onChange={this.handleChange} btnWidth="200"   placeholder="所有"  multiple= {false} data={this.props.status_list} btnStyle="primary" value={queryForm.status} />      
	  </div>  
	   <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
	    <input type="text"  name="name" value={queryForm.name}   onChange={this.handleChange}  placeholder="学生姓名"/>	  
	     </div>  
</form>
	    <div className="am-fl am-margin-bottom-xs am-margin-left-xs">
	   <button type="button"   onClick={this.handleClick_query}  className="am-btn am-btn-primary">搜索</button>
	  </div>  	

      <AMR_Table {...this.props}>  
        <thead> 
          <tr>
            <th>姓名</th>
            <th>昵称</th>
            <th>性别</th>
		      <th>状态</th>
            <th>出生日期</th>
            <th>班级</th>
            <th>身份证</th>
          </tr> 
        </thead>
        <tbody>
          {this.state.list.map(function(event) {
            return (<Query_EventRow_byRight key={event.uuid} event={event} />);
          })}
        </tbody>
      </AMR_Table>
      </div>
    );
  }
});
    

	return module;	
}();