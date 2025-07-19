# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql, datetime, calendar

def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	# })
	month = 1
	year = 2025


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
		year = int(filters["year"])



	updated_data = []
	
	month_range = calendar.monthrange(year, month)
	for day in range(1, month_range[1]) :
		in_time_init = datetime.datetime(year, month, day, hour=8)
		out_time_init = datetime.datetime(year, month, day+1, hour=7, minute=59, second=59)
		for row in data:
			if row.get("LogDate", False) :
				log_date = row.get("LogDate")
				log_date = datetime.datetime.strptime(str(row.get("LogDate")), '%Y-%m-%d %H:%M:%S')
				if log_date >= in_time_init and log_date <= out_time_init :
					check = 0
					for x in updated_data :
						if x.get('date', False) :
							if x.get('date') == in_time_init.date() :
								x['out_time'] = log_date
								check = 1
					
					if check == 0 :
						temp_data = {}
						temp_data['Location'] = row.get("Location")
						temp_data['CompanyName'] = row.get("CompanyName")
						temp_data['EmployeeCode'] = row.get("EmployeeCode")
						temp_data['EmployeeName'] = row.get("EmployeeName")
						temp_data['Status'] = row.get("Status")
						temp_data['date'] = in_time_init.date()
						temp_data['in_time'] = log_date 
						updated_data.append(temp_data)
	
	for row in updated_data:

		row['attend_status'] = '<span style="color:red">Absent<span>'

		row['work_duration'] = ''
		row['less_hour'] = ''
		row['excess_hour'] = ''
		row['ot'] = ''
		row['total_duration'] = ''

		
		row['total_shift_second'] = 0
		row['total_less_second'] = 0
		row['total_excess_second'] = 0
		row['total_ot_second'] = 0
		row['total_dur_second'] = 0

		deafult_shift_second = 8.5 * 60 * 60
		total_dur_second = 0
		total_shift_second = 0
		total_less_second = 0
		total_excess_second = 0
		total_ot_second = 0

		
		if row.get('in_time', False) :
			if row.get('out_time', False) :

				if row.get('out_time') == row.get('in_time') :
					row['out_time'] = ''
					continue

				in_time_org = datetime.datetime.strptime(str(row.get('in_time')), '%Y-%m-%d %H:%M:%S')
				out_time_org = datetime.datetime.strptime(str(row.get('out_time')), '%Y-%m-%d %H:%M:%S')
				diff_org = out_time_org - in_time_org
				total_dur_second = diff_org.total_seconds()

				if total_dur_second <= 0.2 * 60 * 60:
					continue;
				
				row['total_duration'] = secondToHourMinute(total_dur_second)

				in_time_shift = datetime.datetime.strptime(str(row.get("date")) + " 09:30:00", '%Y-%m-%d %H:%M:%S')
				out_time_shift = datetime.datetime.strptime(str(row.get("date")) + " 18:00:00", '%Y-%m-%d %H:%M:%S')
				in_time_diff = in_time_shift - in_time_org
				out_time_diff = out_time_org - out_time_shift
				total_shift_second = deafult_shift_second

				if in_time_diff.total_seconds() < 0 :
					total_shift_second = total_shift_second + in_time_diff.total_seconds()
				if out_time_diff.total_seconds() < 0 :
					total_shift_second = total_shift_second + out_time_diff.total_seconds()
				if out_time_diff.total_seconds() >= 1 * 60 * 60 :
					total_ot_second = out_time_diff.total_seconds()
					row['ot'] = secondToHourMinute(total_ot_second)

				shift_time  = secondToHourMinute(total_shift_second)
				total_shift_minute = total_shift_second / 60
				
				total_shift_hour = int(total_shift_minute / 60)
				if total_shift_hour >= 6 and total_shift_minute >= 30 :
					row['attend_status'] = '<span style="color:green">Present<span>'
					total_less_second = deafult_shift_second - total_shift_second
					if total_less_second > 0 :
						row['less_hour'] = secondToHourMinute(total_less_second)

				if (total_shift_hour >= 4 and total_shift_minute >= 30 ) and  ( total_shift_hour <= 6 and total_shift_minute < 30 ) :
					row['attend_status'] = '<span style="color:blue">Half Day<span>'

				row['work_duration'] = secondToHourMinute(total_shift_second)


				total_excess_second = total_dur_second - total_shift_second - total_ot_second
				if total_excess_second >= 1 * 60 * 60 :
					row['excess_hour'] = secondToHourMinute(total_excess_second)
				else :
					total_excess_second = 0
				

				
				row['total_shift_second'] = total_shift_second 
				row['total_less_second'] = total_less_second 
				row['total_excess_second'] = total_excess_second 
				row['total_ot_second'] = total_ot_second
				row['total_dur_second'] = total_dur_second  
				
				# frappe.msgprint("total_dur_second : "+str(total_dur_second) )
				# frappe.msgprint("total_shift_second : "+str(total_shift_second) )
				# frappe.msgprint("total_ot_second : "+str(total_ot_second) )
				# frappe.msgprint("deafult_shift_second : "+str(deafult_shift_second) )
				# frappe.msgprint("total_less_second : "+str(total_less_second) )
				

	
	all_shift_second = 0
	all_less_second = 0
	all_excess_second = 0
	all_ot_second = 0
	all_dur_second = 0

	for row in updated_data:
		all_shift_second += float(row.get("total_shift_second", 0) or 0)
		all_less_second += float(row.get("total_less_second", 0) or 0)
		all_excess_second += float(row.get("total_excess_second", 0) or 0)
		all_ot_second += float(row.get("total_ot_second", 0) or 0)
		all_dur_second += float(row.get("total_dur_second", 0) or 0)
	
		
	updated_data.append({
		"EmployeeName":"<p><b> Total</b></p>" ,
		"work_duration": secondToHourMinute(all_shift_second),
		"less_hour": secondToHourMinute(all_less_second),
		"excess_hour": secondToHourMinute(all_excess_second),
		"ot": secondToHourMinute(all_ot_second),
		"total_duration": secondToHourMinute(all_dur_second),
	})

				
	return columns, updated_data, data


def get_columns():
	return [

		{"fieldname":"Location", "fieldtype":"Data", "label":"Location", "width":100},
		{"fieldname":"CompanyName", "fieldtype":"Data", "label":"Company", "width":110},
		{"fieldname":"EmployeeCode", "fieldtype":"Data", "label":"Employee Code", "width":130},
		{"fieldname":"EmployeeName", "fieldtype":"Data", "label":"Employee Name", "width":160},
		{"fieldname":"Status", "fieldtype":"Data", "label":"Employee Status", "width":100},
		{"fieldname":"date", "fieldtype":"Date", "label":"Date", "width":160},
		{"fieldname":"in_time", "fieldtype":"Datetime", "label":"In Time", "width":160},
		{"fieldname":"out_time", "fieldtype":"Datetime", "label":"Out Time", "width":160},
		{"fieldname":"work_duration", "fieldtype":"Data", "label":"Work Duration", "width":120},
		{"fieldname":"less_hour", "fieldtype":"Data", "label":"Less Hour", "width":120},
		{"fieldname":"excess_hour", "fieldtype":"Data", "label":"Excess Hour", "width":120},
		{"fieldname":"ot", "fieldtype":"Data", "label":"OT", "width":80},
		{"fieldname":"total_duration", "fieldtype":"Data", "label":"Total Duration", "width":140},
		{"fieldname":"attend_status", "fieldtype":"Data", "label":"Status", "width":100},
		{"fieldname":"remarks", "fieldtype":"Data", "label":"Remarks", "width":150},
		
	]

def get_data(filters):
	server = '192.168.5.110'
	user = 'esslNew'
	password = 'admin@122'
	database = 'etimetracklite1'
	conditions = ""


	month = 1
	year = 2025

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

	

	if filters.get("company"):
		if filters.get("company") == "Pinkcity Jewelhouse Private Ltd-Mahapura":
			conditions = " AND Employees.CompanyId = 4 "
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1":
			conditions = " AND Employees.CompanyId = 2 "
		if filters.get("company") == "Pinkcity Jewelhouse Private Limited-Unit 2":
			conditions = " AND Employees.CompanyId = 3 "
		if filters.get("company") == "PINKCITY COLORSTONES PVT. LTD.":
			conditions = " AND Employees.CompanyId = 8 "
		if filters.get("company") == "ATELIER PINKCITY PRIVATE LIMITED":
			conditions = " AND Employees.CompanyId = 9 "
	
	if filters.get("employee_name"):
		conditions += f" AND Employees.EmployeeName LIKE '%"+filters.get("employee_name")+"%'"
	
	if filters.get("employee_code"):
		conditions += f" AND Employees.EmployeeCode LIKE '%"+filters.get("employee_code")+"%'"
	
	
	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)


					
	
	query = f"""SELECT 
					EmployeeCode,
					EmployeeName,
					Location,
					Status,
					CompanyId,
					CASE 
						WHEN CompanyId = 4 THEN 'Mahapura'
						WHEN CompanyId = 2 THEN 'Unit-1'
						WHEN CompanyId = 3 THEN 'Unit-2'
						WHEN CompanyId = 8 THEN 'Colorstone'
						WHEN CompanyId = 9 THEN 'Atelier'
						ELSE '-'
					END AS CompanyName,
					LogDate

				FROM Employees 
				LEFT JOIN  DeviceLogs_{month}_{year} dl ON EmployeeCode = dl.UserId
				WHERE Status = 'Working'  
					AND EmployeeName NOT LIKE '%del%'
					{conditions}
				"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row

def secondToHourMinute(seconds):
	temp_time = datetime.timedelta(seconds=seconds)
	return temp_time
