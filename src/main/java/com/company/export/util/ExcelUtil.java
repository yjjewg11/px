package com.company.export.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

import org.apache.commons.lang.StringUtils;

import com.company.news.SystemConstants;
import com.company.news.cache.CommonsCache;
import com.company.news.entity.PClass;
import com.company.news.entity.Student;
import com.company.news.entity.UserTeacher;
import com.company.news.rest.util.TimeUtils;

public class ExcelUtil {
	
	/**
	 * 获得默认表格设置
	 * @return
	 */
	private static  WritableCellFormat getWritableFontForHeader(){
		WritableFont wf = new WritableFont(WritableFont.createFont("宋体"), 12,
				WritableFont.BOLD);
		WritableCellFormat cf = new WritableCellFormat(wf);
		try {
		cf.setAlignment(jxl.format.Alignment.CENTRE);
		cf.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 单元格的内容垂直方向居中
		cf.setBorder(Border.ALL, BorderLineStyle.THIN);
		} catch (WriteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}// 单元格中的内容水平方向居中
		return cf;
	}
	/**
	 * 获得默认表格设置
	 * @return
	 */
	private static  WritableCellFormat getWritableFontForBody(){
		WritableFont wf = new WritableFont(WritableFont.createFont("宋体"), 12,
				WritableFont.NO_BOLD);
		WritableCellFormat cf = new WritableCellFormat(wf);
		try {
		cf.setAlignment(jxl.format.Alignment.CENTRE);
		cf.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 单元格的内容垂直方向居中
		cf.setBorder(Border.ALL, BorderLineStyle.THIN);
		} catch (WriteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}// 单元格中的内容水平方向居中
		return cf;
	}
	/**
	 * 默认导出花名册1
	 * @param response
	 * @param fname
	 * @param list
	 * @throws Exception
	 */
	public static void outputPrintWriterStream(HttpServletResponse response,
			String fname, List<Student> list) throws Exception {
		response.setHeader("Pragma", "no-cache");
		fname = java.net.URLEncoder.encode(fname,"UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(fname.getBytes("UTF-8"),"GBK") + ".xls");
		response.setContentType("application/msexcel");// 定义输出类型
		response.setCharacterEncoding(SystemConstants.Charset);

		createExcel(response.getOutputStream(), list);

		// out.close();
	}

	/**
	 * 2
	 * @param os
	 * @param list
	 * @throws IOException
	 * @throws RowsExceededException
	 * @throws WriteException
	 */
	public static void createExcel(OutputStream os, List<Student> list) throws IOException, RowsExceededException,
			WriteException {
		// 创建工作区
		WritableWorkbook workbook = Workbook.createWorkbook(os);
		// 创建新的一页，sheet只能在工作簿中使用
		WritableSheet sheet = workbook.createSheet("sheet1", 0);

		// 构造表头
		sheet.mergeCells(0, 0, 7, 0);// 添加合并单元格，第一个参数是起始列，第二个参数是起始行，第三个参数是终止列，第四个参数是终止行
		WritableFont bold = new WritableFont(WritableFont.ARIAL, 16,
				WritableFont.BOLD);// 设置字体种类和黑体显示,字体为Arial,字号大小为10,采用黑体显示
		WritableCellFormat titleFormate = new WritableCellFormat(bold);// 生成一个单元格样式控制对象
		titleFormate.setAlignment(jxl.format.Alignment.CENTRE);// 单元格中的内容水平方向居中
		titleFormate.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 单元格的内容垂直方向居中
		sheet.setColumnView(0, 25);
		sheet.setColumnView(1, 25);
		sheet.setColumnView(2, 10);
		sheet.setColumnView(3, 25);
		sheet.setColumnView(4, 30);
		sheet.setColumnView(5, 30);
		sheet.setColumnView(6, 30);
		sheet.setColumnView(7, 10);

		Label title = new Label(0, 0, "幼儿园基本情况登记表", titleFormate);
		sheet.setRowView(0, 600, false);// 设置第一行的高度
		sheet.addCell(title);
		WritableCellFormat cf=getWritableFontForHeader();
		sheet.mergeCells(0, 1, 2, 1);
		Label youerxinxi = new Label(0, 1, "幼儿信息", cf);
		sheet.addCell(youerxinxi);

		sheet.mergeCells(3, 1, 6, 1);
		Label jiatingxinxi = new Label(3, 1, "家庭信息", cf);
		sheet.addCell(jiatingxinxi);

		sheet.mergeCells(7, 1, 7, 2);
		Label beizhu = new Label(7, 1, "备注", cf);
		sheet.addCell(beizhu);

		Label youerxingming = new Label(0, 2, "幼儿姓名", cf);
		sheet.addCell(youerxingming);

		Label idcard = new Label(1, 2, "身份证号", cf);
		sheet.addCell(idcard);

		Label xingbie = new Label(2, 2, "性别", cf);
		sheet.addCell(xingbie);

		Label xingming = new Label(3, 2, "姓名", cf);
		sheet.addCell(xingming);

		Label gongzuodanwei = new Label(4, 2, "工作单位", cf);
		sheet.addCell(gongzuodanwei);

		Label lianxidianhua = new Label(5, 2, "联系电话", cf);
		sheet.addCell(lianxidianhua);

		Label zhuzhi = new Label(6, 2, "住址", cf);
		sheet.addCell(zhuzhi);

		createStudentCell(sheet, list);

		// 将内容写到输出流中，然后关闭工作区，最后关闭输出流
		workbook.write();
		workbook.close();
		os.close();
	}

	/**
	 * 3
	 * @param sheet
	 * @throws WriteException
	 * @throws RowsExceededException
	 */
	private static void createStudentCell(WritableSheet sheet,
			List<Student> list) throws RowsExceededException, WriteException {
		WritableCellFormat cf=getWritableFontForBody();
		int i = 3;
		for (Student s : list) {
			sheet.mergeCells(0, i, 0, i + 1);
			Label youerxingming = new Label(0, i, s.getName(), cf);
			sheet.addCell(youerxingming);

			sheet.mergeCells(1, i, 1, i + 1);
			Label idcard = new Label(1, i, s.getIdcard(), cf);
			sheet.addCell(idcard);

			sheet.mergeCells(2, i, 2, i + 1);
			Label xingbie = new Label(2, i, s.getSex() != 1 ? "男" : "女", cf);
			sheet.addCell(xingbie);

			Label fu_xingming = new Label(3, i, "父亲姓名:" + (s.getBa_name()!=null?s.getBa_name():""), cf);
			sheet.addCell(fu_xingming);
			Label ma_xingming = new Label(3, i + 1, "母亲姓名:" + (s.getMa_name()!=null?s.getMa_name():""), cf);
			sheet.addCell(ma_xingming);

			Label fu_gongzuodanwei = new Label(4, i, s.getBa_work(), cf);
			sheet.addCell(fu_gongzuodanwei);

			Label ma_gongzuodanwei = new Label(4, i + 1, s.getMa_work(), cf);
			sheet.addCell(ma_gongzuodanwei);

			Label fu_lianxidianhua = new Label(5, i, s.getBa_tel(), cf);
			sheet.addCell(fu_lianxidianhua);

			Label ma_lianxidianhua = new Label(5, i + 1, s.getMa_tel(), cf);
			sheet.addCell(ma_lianxidianhua);

			sheet.mergeCells(6, i, 6, i + 1);
			Label zhuzhi = new Label(6, i, s.getAddress(), cf);
			sheet.addCell(zhuzhi);

			sheet.mergeCells(7, i, 7, i + 1);
			Label beizhu = new Label(7, i, "", cf);
			sheet.addCell(beizhu);
			
			i=i+2;

		}

	}

	/**
	 * 金太阳国际新城幼儿园-花名册模版
	 * @param response
	 * @param fname
	 * @param list
	 * @param classlist
	 * @throws Exception
	 */
	public static void outXLS_huaMingce(HttpServletResponse response,
			String fname, List<Student> list,List<PClass> classlist) throws Exception{
		response.setHeader("Pragma", "no-cache");
		fname = java.net.URLEncoder.encode(fname,"UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(fname.getBytes("UTF-8"),"GBK") + ".xls");
		response.setContentType("application/msexcel");// 定义输出类型
		response.setCharacterEncoding(SystemConstants.Charset);
//		createExcel_huaMingce(response.getOutputStream(), list,classlist);
		OutputStream os=response.getOutputStream();
		
		// 创建工作区
				WritableWorkbook workbook = Workbook.createWorkbook(os);
				// 创建新的一页，sheet只能在工作簿中使用
				WritableSheet sheet = workbook.createSheet("幼儿园花名册", 0);

				// 构造表头
				sheet.mergeCells(0, 0, 7, 0);// 添加合并单元格，第一个参数是起始列，第二个参数是起始行，第三个参数是终止列，第四个参数是终止行
				WritableFont bold = new WritableFont(WritableFont.ARIAL, 16,
						WritableFont.BOLD);// 设置字体种类和黑体显示,字体为Arial,字号大小为10,采用黑体显示
				WritableCellFormat titleFormate = new WritableCellFormat(bold);// 生成一个单元格样式控制对象
				titleFormate.setAlignment(jxl.format.Alignment.CENTRE);// 单元格中的内容水平方向居中
				titleFormate.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 单元格的内容垂直方向居中

				sheet.setColumnView(0, 6);
				sheet.setColumnView(1, 12);
				sheet.setColumnView(2, 6);
				sheet.setColumnView(3, 14);
				sheet.setColumnView(4, 14);
				sheet.setColumnView(5, 12);
				sheet.setColumnView(6, 16);
				sheet.setColumnView(7, 24);

				Label title = new Label(0, 0, "幼儿园花名册", titleFormate);
				sheet.setRowView(0, 600, false);// 设置第一行的高度
				sheet.addCell(title);
				WritableCellFormat cf=getWritableFontForHeader();
//				sheet.mergeCells(0, 1, 2, 1);
				sheet.addCell(new Label(0, 1, "序号", cf));
				sheet.addCell(new Label(1, 1, "学生姓名", cf));
				sheet.addCell(new Label(2, 1, "性别", cf));
				sheet.addCell(new Label(3, 1, "出生日期", cf));
				sheet.addCell(new Label(4, 1, "年级/班级", cf));
				sheet.addCell(new Label(5, 1, "家长姓名", cf));
				sheet.addCell(new Label(6, 1, "家长联系电话", cf));
				sheet.addCell(new Label(7, 1, "查验结果", cf));
				
				Integer index=2;
				PClass clazz=null;
				 cf=getWritableFontForBody();
				for (Student s : list) {
					sheet.addCell(new Label(0, index, (index-1)+"", cf));
					sheet.addCell(new Label(1, index, s.getName(), cf));
					sheet.addCell(new Label(2, index,  s.getSex() != 1 ? "男" : "女", cf));
					String bday=s.getBirthday();
					if(bday!=null)bday=bday.replaceAll(".", "-");
					sheet.addCell(new Label(3, index, s.getBirthday(), cf));
					//效率优化
					if(clazz==null||!clazz.getUuid().equals( s.getClassuuid())){
						clazz=getClassByuuid( s.getClassuuid(),classlist);
					}
					String className="";
					if(clazz!=null){
						className=clazz.getName();
					}
					sheet.addCell(new Label(4, index, className, cf));
					//优先取妈妈姓名.
					String jiazhang=s.getMa_name();
					String tel=s.getMa_tel();
					if(StringUtils.isBlank(jiazhang)){
						jiazhang=s.getBa_name();
						tel=s.getBa_tel();
					}
					
					sheet.addCell(new Label(5, index,jiazhang, cf));
					sheet.addCell(new Label(6, index, tel, cf));
					sheet.addCell(new Label(7, index, "", cf));
					
					
					
					index++;
				}
				// 将内容写到输出流中，然后关闭工作区，最后关闭输出流
				workbook.write();
				workbook.close();
				os.close();
		
	}
	
	/**
	 * 金太阳国际新城幼儿园-武侯区城乡居民医疗保险银行代扣批量导入表
	 * @param response
	 * @param fname
	 * @param list
	 * @param classlist
	 * @throws Exception
	 */
	public static void outXLS_yiliaobaoxian(HttpServletResponse response,
			String fname, List<Student> list,List<PClass> classlist) throws Exception{
		response.setHeader("Pragma", "no-cache");
		fname = java.net.URLEncoder.encode(fname,"UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(fname.getBytes("UTF-8"),"GBK") + ".xls");
		response.setContentType("application/msexcel");// 定义输出类型
		response.setCharacterEncoding(SystemConstants.Charset);
//		createExcel_huaMingce(response.getOutputStream(), list,classlist);
		OutputStream os=response.getOutputStream();
		
		// 创建工作区
				WritableWorkbook workbook = Workbook.createWorkbook(os);
				// 创建新的一页，sheet只能在工作簿中使用
				WritableSheet sheet = workbook.createSheet("武侯区城乡居民医疗保险银行代扣批量导入表", 0);
				// 构造表头
////				sheet.mergeCells(0, 0, 14, 0);// 添加合并单元格，第一个参数是起始列，第二个参数是起始行，第三个参数是终止列，第四个参数是终止行
//				WritableFont bold = new WritableFont(WritableFont.ARIAL, 16,
//						WritableFont.BOLD);// 设置字体种类和黑体显示,字体为Arial,字号大小为10,采用黑体显示
//				WritableCellFormat titleFormate = new WritableCellFormat(bold);// 生成一个单元格样式控制对象
//				titleFormate.setAlignment(jxl.format.Alignment.CENTRE);// 单元格中的内容水平方向居中
//				titleFormate.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 单元格的内容垂直方向居中

				sheet.setColumnView(0, 5);
				sheet.setColumnView(1, 10);
				sheet.setColumnView(2, 22);
				sheet.setColumnView(3, 12);
				sheet.setColumnView(4, 12);
				sheet.setColumnView(5, 10);
				sheet.setColumnView(6, 12);
				sheet.setColumnView(7, 10);
				sheet.setColumnView(8, 10);
				sheet.setColumnView(9, 10);
				sheet.setColumnView(10, 14);
				sheet.setColumnView(11, 20);
				sheet.setColumnView(12, 18);
				sheet.setColumnView(13, 18);

//				Label title = new Label(0, 0, "幼儿园花名册", titleFormate);
//				sheet.setRowView(0, 600, false);// 设置第一行的高度
//				sheet.addCell(title);
				WritableCellFormat cf=getWritableFontForBody();
//				sheet.mergeCells(0, 0, 2, 0);
				sheet.addCell(new Label(0, 0, "序号", cf));
				sheet.addCell(new Label(1, 0, "姓名", cf));
				sheet.addCell(new Label(2, 0, "身份证号", cf));
				sheet.addCell(new Label(3, 0, "社保号", cf));
				sheet.addCell(new Label(4, 0, "代扣银行", cf));
				sheet.addCell(new Label(5, 0, "代扣帐号", cf));
				sheet.addCell(new Label(6, 0, "代扣户名", cf));
				sheet.addCell(new Label(7, 0, "年级", cf));
				sheet.addCell(new Label(8, 0, "班级", cf));
				sheet.addCell(new Label(9, 0, "联系人", cf));
				sheet.addCell(new Label(10, 0, "联系电话", cf));
				sheet.addCell(new Label(11, 0, "联系地址", cf));
				sheet.addCell(new Label(12, 0, "基本参保档次", cf));
				sheet.addCell(new Label(13, 0, "大病参保档次", cf));
				Integer index=1;
				PClass clazz=null;
				 cf=getWritableFontForBody();
				for (Student s : list) {
					sheet.addCell(new Label(0, index, (index)+"", cf));
					sheet.addCell(new Label(1, index, s.getName(), cf));
					sheet.addCell(new Label(2, index,  s.getIdcard(), cf));
					sheet.addCell(new Label(3, index, "", cf));
					sheet.addCell(new Label(4, index, "", cf));
					sheet.addCell(new Label(5, index, "", cf));
					sheet.addCell(new Label(6, index, "", cf));
					sheet.addCell(new Label(7, index, "", cf));
					//效率优化
					if(clazz==null||!clazz.getUuid().equals( s.getClassuuid())){
						clazz=getClassByuuid( s.getClassuuid(),classlist);
					}
					String className="";
					if(clazz!=null){
						className=clazz.getName();
					}
					sheet.addCell(new Label(8, index, className, cf));
					//优先取妈妈姓名.
					String jiazhang=s.getMa_name();
					String tel=s.getMa_tel();
					if(StringUtils.isBlank(jiazhang)){
						jiazhang=s.getBa_name();
						tel=s.getBa_tel();
					}
					
					sheet.addCell(new Label(9, index,jiazhang, cf));
					sheet.addCell(new Label(10, index, tel, cf));
					sheet.addCell(new Label(11, index, s.getAddress(), cf));
					sheet.addCell(new Label(12, index, "", cf));
					sheet.addCell(new Label(13, index, "", cf));
					index++;
				}
				// 将内容写到输出流中，然后关闭工作区，最后关闭输出流
				workbook.write();
				workbook.close();
				os.close();
		
	}
	

	
	static public PClass getClassByuuid(String uuid,List<PClass> classlist){
		if(StringUtils.isBlank(uuid))return null;
		for (PClass s : classlist) {
			if(uuid.equals(s.getUuid())){
				return s;
			}
		}
		return null;
		
		
	}
	public static void outXLS_TeacherhuaMingce(HttpServletResponse response,
			String fname, List<UserTeacher> list) throws Exception {
		response.setHeader("Pragma", "no-cache");
		fname = java.net.URLEncoder.encode(fname,"UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(fname.getBytes("UTF-8"),"GBK") + ".xls");
		response.setContentType("application/msexcel");// 定义输出类型
		response.setCharacterEncoding(SystemConstants.Charset);
//		createExcel_huaMingce(response.getOutputStream(), list,classlist);
		OutputStream os=response.getOutputStream();
		
		// 创建工作区
				WritableWorkbook workbook = Workbook.createWorkbook(os);
				// 创建新的一页，sheet只能在工作簿中使用
				WritableSheet sheet = workbook.createSheet("教师花名册", 0);
				// 构造表头
////				sheet.mergeCells(0, 0, 14, 0);// 添加合并单元格，第一个参数是起始列，第二个参数是起始行，第三个参数是终止列，第四个参数是终止行
//				WritableFont bold = new WritableFont(WritableFont.ARIAL, 16,
//						WritableFont.BOLD);// 设置字体种类和黑体显示,字体为Arial,字号大小为10,采用黑体显示
//				WritableCellFormat titleFormate = new WritableCellFormat(bold);// 生成一个单元格样式控制对象
//				titleFormate.setAlignment(jxl.format.Alignment.CENTRE);// 单元格中的内容水平方向居中
//				titleFormate.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 单元格的内容垂直方向居中

				sheet.setColumnView(0, 5);
				sheet.setColumnView(1, 10);
				sheet.setColumnView(2, 5);
				sheet.setColumnView(3, 5);
				sheet.setColumnView(4, 10);
				sheet.setColumnView(5, 22);
				sheet.setColumnView(6, 12);
				sheet.setColumnView(7, 18);
				sheet.setColumnView(8, 22);
				sheet.setColumnView(9, 10);
				WritableCellFormat cf=getWritableFontForBody();
//				sheet.mergeCells(0, 0, 2, 0);
				sheet.addCell(new Label(0, 0, "序号", cf));
				sheet.addCell(new Label(1, 0, "姓名", cf));
				sheet.addCell(new Label(2, 0, "性别", cf));
				sheet.addCell(new Label(3, 0, "年龄", cf));
				sheet.addCell(new Label(4, 0, "学历", cf));
				sheet.addCell(new Label(5, 0, "毕业院校及专业", cf));
				sheet.addCell(new Label(6, 0, "所教学科", cf));
				sheet.addCell(new Label(7, 0, "专业技术职称", cf));
				sheet.addCell(new Label(8, 0, "教师资格证编号", cf));
				sheet.addCell(new Label(9, 0, "备注", cf));
				Integer index=1;
				 cf=getWritableFontForBody();
				 
				 List sexList=CommonsCache.getBaseDataListByTypeuuid("sex");
				 List xueliList=CommonsCache.getBaseDataListByTypeuuid("xueli");
				for (UserTeacher s : list) {
					sheet.addCell(new Label(0, index, (index)+"", cf));
					sheet.addCell(new Label(1, index, s.getRealname(), cf));
					sheet.addCell(new Label(2, index, CommonsCache.getBaseDatavalue(s.getSex(), sexList), cf));
					sheet.addCell(new Label(3, index, TimeUtils.getCurrentAgeByBirthdate(s.getBirthday()), cf));
					sheet.addCell(new Label(4, index,  CommonsCache.getBaseDatavalue(s.getXueli(), sexList), cf));
					sheet.addCell(new Label(5, index, s.getGraduated(), cf));
					sheet.addCell(new Label(6, index, s.getTeaching_subject(), cf));
					sheet.addCell(new Label(7, index, s.getProfessional_title(), cf));
					sheet.addCell(new Label(8, index, s.getTeacher_certificate_number(), cf));
					sheet.addCell(new Label(9, index, "专职", cf));
					
					index++;
				}
				// 将内容写到输出流中，然后关闭工作区，最后关闭输出流
				workbook.write();
				workbook.close();
				os.close();
		
	}
	public static void outXLS_yiliaobaoxian(HttpServletResponse response,
			String fname, List<UserTeacher> list) throws Exception {
		response.setHeader("Pragma", "no-cache");
		fname = java.net.URLEncoder.encode(fname,"UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(fname.getBytes("UTF-8"),"GBK") + ".xls");
		response.setContentType("application/msexcel");// 定义输出类型
		response.setCharacterEncoding(SystemConstants.Charset);
//		createExcel_huaMingce(response.getOutputStream(), list,classlist);
		OutputStream os=response.getOutputStream();
		
		// 创建工作区
				WritableWorkbook workbook = Workbook.createWorkbook(os);
				// 创建新的一页，sheet只能在工作簿中使用
				WritableSheet sheet = workbook.createSheet("教师基本情况登记表", 0);
				// 构造表头
////				sheet.mergeCells(0, 0, 14, 0);// 添加合并单元格，第一个参数是起始列，第二个参数是起始行，第三个参数是终止列，第四个参数是终止行
//				WritableFont bold = new WritableFont(WritableFont.ARIAL, 16,
//						WritableFont.BOLD);// 设置字体种类和黑体显示,字体为Arial,字号大小为10,采用黑体显示
//				WritableCellFormat titleFormate = new WritableCellFormat(bold);// 生成一个单元格样式控制对象
//				titleFormate.setAlignment(jxl.format.Alignment.CENTRE);// 单元格中的内容水平方向居中
//				titleFormate.setVerticalAlignment(jxl.format.VerticalAlignment.CENTRE);// 单元格的内容垂直方向居中

				sheet.setColumnView(0, 5);
				sheet.setColumnView(1, 10);
				sheet.setColumnView(2, 5);
				sheet.setColumnView(3, 5);
				sheet.setColumnView(4, 10);
				sheet.setColumnView(5, 12);
				sheet.setColumnView(6, 12);
				sheet.setColumnView(7, 12);
				sheet.setColumnView(8, 12);
				sheet.setColumnView(9, 20);
				sheet.setColumnView(10, 20);
				sheet.setColumnView(11, 20);
				sheet.setColumnView(12, 20);
				WritableCellFormat cf=getWritableFontForBody();
//				sheet.mergeCells(0, 0, 2, 0);
				sheet.addCell(new Label(0, 0, "序号", cf));
				sheet.addCell(new Label(1, 0, "姓名", cf));
				sheet.addCell(new Label(2, 0, "性别", cf));
				sheet.addCell(new Label(3, 0, "民族", cf));
				sheet.addCell(new Label(4, 0, "年龄", cf));
				sheet.addCell(new Label(5, 0, "职务", cf));
				sheet.addCell(new Label(6, 0, "学历", cf));
				sheet.addCell(new Label(7, 0, "是否具有学前教育专业学历", cf));
				sheet.addCell(new Label(8, 0, "是否取得幼教资格证", cf));
				sheet.addCell(new Label(9, 0, "身份证号码", cf));
				sheet.addCell(new Label(10, 0, "家庭住址", cf));
				sheet.addCell(new Label(11, 0, "联系方式（手机）", cf));
				sheet.addCell(new Label(12, 0, "备注", cf));
				Integer index=1;
				 cf=getWritableFontForBody();
				 
				 List sexList=CommonsCache.getBaseDataListByTypeuuid("sex");
				 List xueliList=CommonsCache.getBaseDataListByTypeuuid("xueli");
				 List yesOrNoList=CommonsCache.getBaseDataListByTypeuuid("yesOrNo");
				for (UserTeacher s : list) {
					sheet.addCell(new Label(0, index, (index)+"", cf));
					sheet.addCell(new Label(1, index, s.getRealname(), cf));
					sheet.addCell(new Label(2, index, CommonsCache.getBaseDatavalue(s.getSex(), sexList), cf));
					sheet.addCell(new Label(3, index, s.getNation(), cf));
					sheet.addCell(new Label(4, index, TimeUtils.getCurrentAgeByBirthdate(s.getBirthday()), cf));
					sheet.addCell(new Label(5, index, s.getZhiwu(), cf));
					sheet.addCell(new Label(6, index,  CommonsCache.getBaseDatavalue(s.getXueli(), xueliList), cf));
					sheet.addCell(new Label(7, index,  CommonsCache.getBaseDatavalue(s.getYouxueqianjiaoyu(), yesOrNoList), cf));
					sheet.addCell(new Label(8, index,  CommonsCache.getBaseDatavalue(s.getYoujiaozige(), yesOrNoList), cf));
					sheet.addCell(new Label(9, index, s.getIdcard(), cf));
					sheet.addCell(new Label(10, index, s.getAddress(), cf));
					sheet.addCell(new Label(11, index, s.getTel(), cf));
					sheet.addCell(new Label(12, index, s.getNote(), cf));
					
					index++;
				}
				// 将内容写到输出流中，然后关闭工作区，最后关闭输出流
				workbook.write();
				workbook.close();
				os.close();
		
	}
	public static void outXLS_doorrecord(HttpServletResponse response,
			String fname, List<Object[]> list) throws Exception {
		response.setHeader("Pragma", "no-cache");
		fname = java.net.URLEncoder.encode(fname,"UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(fname.getBytes("UTF-8"),"GBK") + ".xls");
		response.setContentType("application/msexcel");// 定义输出类型
		response.setCharacterEncoding(SystemConstants.Charset);
//		createExcel_huaMingce(response.getOutputStream(), list,classlist);
		OutputStream os=response.getOutputStream();
		
		// 创建工作区
				WritableWorkbook workbook = Workbook.createWorkbook(os);
				// 创建新的一页，sheet只能在工作簿中使用
				WritableSheet sheet = workbook.createSheet("幼儿园门禁记录表", 0);

				sheet.setColumnView(0, 12);
				sheet.setColumnView(1, 12);
				sheet.setColumnView(2, 12);
				sheet.setColumnView(3, 12);
				sheet.setColumnView(4, 12);
				sheet.setColumnView(5, 12);
				sheet.setColumnView(6, 12);
				sheet.setColumnView(7, 12);
				sheet.setColumnView(8, 12);
				sheet.setColumnView(9, 12);
				sheet.setColumnView(10, 12);
				sheet.setColumnView(11, 12);
				sheet.setColumnView(12, 12);
				
				WritableCellFormat cf=getWritableFontForBody();
//				sheet.mergeCells(0, 0, 2, 0);
				
				sheet.addCell(new Label(0, 0, "原始卡号", cf));
				sheet.addCell(new Label(1, 0, "用户卡号", cf));
				sheet.addCell(new Label(2, 0, "用户编号", cf));
				sheet.addCell(new Label(3, 0, "用户名", cf));
				sheet.addCell(new Label(4, 0, "部门名称", cf));
				sheet.addCell(new Label(5, 0, "性别", cf));
				sheet.addCell(new Label(6, 0, "身份证号", cf));
				sheet.addCell(new Label(7, 0, "出生日期", cf));
				sheet.addCell(new Label(8, 0, "家庭住址", cf));
				sheet.addCell(new Label(9, 0, "邮编", cf));
				sheet.addCell(new Label(10, 0, "联系电话", cf));
				sheet.addCell(new Label(11, 0, "入学日期", cf));
				sheet.addCell(new Label(12, 0, "有效期", cf));
				
				Integer index=1;
				 cf=getWritableFontForBody();
				 
				 List sexList=CommonsCache.getBaseDataListByTypeuuid("sex");
				for (Object[] s : list) {
					for(int i=0;i<13;i++){
						
						//测试使用
//						if(i==0||i==1){
//							String t="";
//							if(s[2]!=null)t=s[2]+"";
//							sheet.addCell(new Label(i, index, t, cf));
//							continue;
//						}
						//end 测试用
//原始卡号	用户卡号	用户编号	用户名	部门名称	性别	身份证号	出生日期	家庭住址	[邮编	 联系电话	入学日期	有效期]固定空	
						//	sheet.addCell(new Label(2, index, CommonsCache.getBaseDatavalue(s.getSex(), sexList), cf));
						if(i==9||i==10||i==11){
							sheet.addCell(new Label(i, index, "", cf));
						}else if(i==12){
							sheet.addCell(new Label(i, index, "2050/8/1", cf));
						}else if(i==5){//性别
							String t="";
							if(s[i]!=null){
								t=CommonsCache.getBaseDatavalue(Integer.valueOf(s[i]+""), sexList);
							}
							sheet.addCell(new Label(i, index, t, cf));
						}else{
							String t="";
							if(s[i]!=null)t=s[i]+"";
							sheet.addCell(new Label(i, index, t, cf));
						}
					}
					index++;
				}
				// 将内容写到输出流中，然后关闭工作区，最后关闭输出流
				workbook.write();
				workbook.close();
				os.close();
		
	}
}
