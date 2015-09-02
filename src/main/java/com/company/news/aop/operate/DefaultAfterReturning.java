package com.company.news.aop.operate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import com.company.news.entity.Logs;
import com.company.news.entity.User;
import com.company.news.rest.util.TimeUtils;
import com.company.news.service.AbstractServcice;
import com.company.web.listener.SessionListener;

@Aspect
@Component
public class DefaultAfterReturning {
	@Autowired
	@Qualifier("dbOperateOutput")
	public OperateOutput operateOutput;
	
	@Autowired  
	private HttpServletRequest request; 
	

	@AfterReturning(pointcut = "execution (public * com.company.news.service.*.count(..))"
			+ "||execution(public * com.company.news.service.*.login(..))"
			+ "||execution(public * com.company.news.service.*.save(..))"
			+ "||execution(public * com.company.news.service.*.add*(..))"
			+ "||execution(public * com.company.news.service.*.update*(..))"
			+ "||execution(public * com.company.news.service.*.delete(..))"
			+ "||execution(public * com.company.news.service.*.read(..))"
			+ "||execution(public * com.company.news.service.*.sendCode(..))"
			+ "||execution(public * com.company.news.service.*.VerifySmsCode(..))"
			+ "||execution(public * com.company.news.service.*.uploadImg(..))"
			+ "||execution(public * com.company.news.service.*.reg(..))"
			+ "||execution(public * com.company.news.service.*.dianzan(..))"
			+ "||execution(public * com.company.news.service.*.cancel*(..))"
			+ "||execution(public * com.company.news.service.*.push*(..))", returning = "_result")
	private void saveOperate(JoinPoint joinPoint,Object _result) {
		Logs logs=new Logs();
		logs.setCreate_time(TimeUtils.getCurrentTimestamp());
		logs.setModelname(((AbstractServcice)joinPoint.getTarget()).getEntityModelName());
		logs.setTarget(joinPoint.getSignature().toString());
		
		User user = SessionListener.getUserInfoBySession(request);
		if(user!=null){
		logs.setCreate_user(user.getName());
		logs.setCreate_useruuid(user.getUuid());
		}
				
		operateOutput.output(logs);

	}

}
