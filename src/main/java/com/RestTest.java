/**
 * @author Glan.duanyj
 * @date 2014-05-12
 * @project rest_demo
 */
package com;

import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.util.Date;

import org.apache.commons.beanutils.BeanUtils;

import com.company.news.entity.Student;
import com.company.news.jsonform.StudentJsonform;


public class RestTest {
	private String accountSid;
	private String authToken;
	
	public String getAccountSid() {
		return accountSid;
	}
	public void setAccountSid(String accountSid) {
		this.accountSid = accountSid;
	}
	public String getAuthToken() {
		return authToken;
	}
	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}

	/**
	 * 测试说明 参数顺序，请参照各具体方法参数名称
	 * 参数名称含义，请参考rest api 文档
	 * @author Glan.duanyj
	 * @date 2014-06-30
	 * @param params[]
	 * @return void
	 * @throws Exception 
	 * @method main
	 */
	public static void main(String[] args) throws Exception {
 
		String[] keys="fsadf/dafdf.kf".split("/");
		
		
		
	System.out.print(keys.length);
	}
}
