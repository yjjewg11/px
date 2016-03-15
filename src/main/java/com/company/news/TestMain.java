package com.company.news;

import org.apache.commons.lang.StringUtils;

public class TestMain {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s="65d81b39-03b2-43c1-b8e3-8ca6dbb62723,ab75e0c0-ccdb-4e99-acdd-8c43e299a9dd,f28e0678-6f8f-4470-b59e-ea4dc709045c,c90fe1a6-918d-4a98-9e38-dc3cd3290073";
    	Long dd=Long.valueOf(StringUtils.countMatches(s, ","));
    	System.out.print(dd);
	}

}
