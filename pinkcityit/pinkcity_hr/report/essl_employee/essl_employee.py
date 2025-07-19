# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe import _


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	
	return columns, data


def get_columns():
	return [
		{"fieldname":"Location", "fieldtype":"Data", "label":"Location", "width":120},
		{"fieldname":"UserId", "fieldtype":"Data", "label":"Employee Code", "width":140},
		{"fieldname":"EmployeeName", "fieldtype":"Data", "label":"Employee Name", "width":160},
		{"fieldname":"Designation", "fieldtype":"Data", "label":"Designation", "width":140},
		{"fieldname":"LogDate", "fieldtype":"Datetime", "label":"Date", "width":160},
		{"fieldname":"DeviceFName", "fieldtype":"Data", "label":"Device Name", "width":120},
		{"fieldname":"Status", "fieldtype":"Data", "label":"Status", "width":120},
		{"fieldname":"EmployementType", "fieldtype":"Data", "label":"Employement Type", "width":120},
		{"fieldname":"DeviceLogId", "fieldtype":"Int", "label":"Device Log Id", "width":140},
		
	]

def get_data(filters):
	server = '192.168.5.110'
	user = 'esslNew'
	password = 'admin@122'
	database = 'etimetracklite1'
	conditions = ""

	month = 1
	year = 2025

	if filters.get("company"):
		if filters.get("company") == "Pinkcity Jewelhouse Private Ltd-Mahapura":
			conditions += " e.location = 'PC-M' "
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1":
			conditions += " e.location = 'PC-I' "
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited-Unit 2":
			conditions += " e.location = 'PC-II' "
		if filters.get("company") == "PINKCITY COLORSTONES PVT. LTD.":
			conditions += " e.location = 'SILVER' "
		if filters.get("company") == "ATELIER PINKCITY PRIVATE LIMITED":
			conditions += " e.location = 'Atelier' "
		# else :
		# 	conditions += " e.location = 'PC-M' "
	
	if filters.get("month"):
		month = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		].index(filters["month"]) + 1

	if filters.get("year"):
		year = filters["year"]
	
	if filters.get("employee_name"):
		conditions += f" AND e.EmployeeName LIKE '%"+filters.get("employee_name")+"%'"
	
	if filters.get("employee_code"):
		conditions += f" AND dl.UserId LIKE '%"+filters.get("employee_code")+"%'"
	
	if filters.get("designation"):
		conditions += f" AND e.Designation LIKE '%"+filters.get("designation")+"%'"
	
	if filters.get("logdate"):
		conditions += f" AND CAST(dl.LogDate AS DATE) = '"+filters.get("logdate")+"'"

	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	
	query = f"""SELECT 
						d.DeviceFName,
						dl.UserId,
						dl.LogDate,
						dl.DeviceLogId,
						e.EmployeeName,
						e.Location,
						e.Designation,
						e.EmployementType,
						e.Status
				FROM DeviceLogs_{month}_{year} dl
				LEFT JOIN Employees e ON e.EmployeeCode = dl.UserId
				LEFT JOIN Devices d ON d.DeviceId  = dl.DeviceId 
				WHERE {conditions}
				ORDER BY dl.LogDate DESC 
										"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row

