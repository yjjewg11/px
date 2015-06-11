var Group_EventRow = React.createClass({ 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      <tr className={className} onClick={ajax_group_edit.bind(this,event )}>
        <td>{event.brand_name}</td>
        <td>{event.company_name}</td>
        <td>{event.address}</td>
        <td>{event.create_time}</td>
      </tr>
    );
  }
}); 

var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;


var Group_EventsTable = React.createClass({
	handleClick: function(m) {
		 if(this.props.handleClick){
			 this.props.handleClick(m);
		 }
	  },
  render: function() {
    return (
    <div>
    <AMUIReact_ButtonToolbar>
	    <AMUIReact_Button amStyle="primary" onClick={this.handleClick.bind(this, "add_group")} round>添加分校</AMUIReact_Button>
	  </AMUIReact_ButtonToolbar>
	  <hr/>
      <AMUIReact_Table {...this.props}>  
        <thead> 
          <tr>
            <th>品牌名</th>
            <th>机构全称</th>
            <th>公司地址</th>
            <th>	</th>
          </tr> 
        </thead>
        <tbody>
          {this.props.events.map(function(event) {
            return (<Group_EventRow key={event.id} event={event} />);
          })}
        </tbody>
      </AMUIReact_Table>
      </div>
    );
  }
});
    
    var Group_edit = React.createClass({ 
    	 getInitialState: function() {
    		    return this.props.formdata;
    		  },
    	 handleChange: function(event) {
    		    this.setState($('#editGroupForm').serializeJson());
    		  },
    	  render: function() {
    		  var o = this.state;
    	    return (
    	    		<div>
    	    		<div className="header">
    	    		  <div className="am-g">
    	    		    <h1>添加机构</h1>
    	    		  </div>
    	    		  <hr />
    	    		</div>
    	    		<div className="am-g">
    	    		  <div className="am-u-lg-6 am-u-md-8 am-u-sm-centered">
    	    		  
    	    		<form id="editGroupForm" method="post" className="am-form">
    	    		<input type="hidden" name="uuid"  value={o.uuid}/>
    	    	    <input type="hidden" name="type"  value={o.type}/>
    	    	      <label htmlFor="brand_name">品牌名:</label>
    	    	      <input type="email" name="brand_name" id="brand_name" value={o.brand_name} onChange={this.handleChange} placeholder="机构名不能为空！，且长度不能超过45位！"/>
    	    	      <br/>
    	    	       <label htmlFor="company_name">机构全称:</label>
    	    	      <input type="text" name="company_name" id="company_name" value={o.company_name} onChange={this.handleChange} placeholder="机构名不能为空！，且长度不能超过45位！"/>
    	    	      <br/>
    	    	       <label htmlFor="address">公司地址:</label>
    	    	      <input type="text" name="address" id="address" value={o.address} onChange={this.handleChange} placeholder="联系地址不能为空！，且长度不能超过64位！"/>
    	    	      <br/>
    	    	       <label htmlFor="map_point">地址坐标:</label>
    	    	      <input type="text" name="map_point" id="map_point" value={o.map_point} onChange={this.handleChange} placeholder="拾取坐标后，复制到这里。格式：104.074822,30.6623"/> 
    	    	      <a href="http://api.map.baidu.com/lbsapi/getpoint/index.html" target="_blank">坐标拾取</a>
    	    	      <br/>
    	    	       <label htmlFor="link_tel">公司电话:</label>
    	    	      <input type="text" name="link_tel" id="link_tel" value={o.link_tel} onChange={this.handleChange} placeholder=""/>
    	    	      <br/>
    	    	      <button type="button"  onClick={ajax_group_save}  className="am-btn am-btn-primary">提交</button>
    	    	     </form>

    	    	     </div>
    	    	   </div>
    	    	   
    	    	   </div>
    	    );
    	  }
    	}); 
