# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql, datetime
from frappe import _


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)

	for row in data:
		# in_time = row.get('in_time')
		# out_time = row.get('out_time')
		row['attend_status'] = '<span style="color:red">Absent<span>'
		row['total_duration'] = 0.00
		row['work_duration'] = 0.00
		row['ot'] = 0.00
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
				total_dur_minute = total_dur_second / 60
				total_dur_hour = int(total_dur_minute / 60) 
				total_dur_hour_minute = int(round(total_dur_minute % 60)) 
				row['total_duration'] = f"{total_dur_hour}.{str(total_dur_hour_minute).zfill(2)}"
				in_time_shift = datetime.datetime.strptime(filters.get("attendance_date") + " 09:30:00", '%Y-%m-%d %H:%M:%S')
				out_time_shift = datetime.datetime.strptime(filters.get("attendance_date") + " 18:00:00", '%Y-%m-%d %H:%M:%S')
				# in_time_diff = in_time_shift- in_time_org
				# out_time_diff = out_time_shift - out_time_org
				in_time_diff = in_time_shift - in_time_org
				out_time_diff = out_time_org - out_time_shift
				# frappe.msgprint(str(in_time_diff.total_seconds()))
				# frappe.msgprint(str(out_time_diff.total_seconds()))
				total_shift_second = shift_seconds = 8.5 * 60 * 60
				if in_time_diff.total_seconds() < 0 :
					total_shift_second = total_shift_second + in_time_diff.total_seconds()
					# frappe.msgprint(str(in_time_diff.total_seconds()))
				if out_time_diff.total_seconds() < 0 :
					total_shift_second = total_shift_second + out_time_diff.total_seconds()
				# total_shift_second = shift_seconds - ( in_time_diff.total_seconds() + out_time_diff.total_seconds() )
				if out_time_diff.total_seconds() >= 1 * 60 * 60 :
					total_ot_second = out_time_diff.total_seconds()
					# total_shift_second = total_dur_second - total_ot_second
					total_ot_minute = total_ot_second / 60
					total_ot_hour = int(total_ot_minute / 60) 
					total_ot_hour_minute = int(round(total_ot_minute % 60 )) 
					row['ot'] = f"{total_ot_hour}.{str(total_ot_hour_minute).zfill(2)}"
				total_shift_minute = total_shift_second / 60
				total_shift_hour = int(total_shift_minute / 60)
				if total_shift_hour >= 6 :
					row['attend_status'] = '<span style="color:green">Present<span>'
				if total_shift_hour >= 3 and total_shift_hour < 6 :
					row['attend_status'] = '<span style="color:blue">Half Day<span>'
				total_shift_hour_minute = int(round(total_shift_minute % 60 )) 
				row['work_duration'] = f"{total_shift_hour}.{str(total_shift_hour_minute).zfill(2)}"
				# frappe.msgprint(str(in_time_shift))
				# frappe.msgprint(str(out_time_shift))
				# frappe.msgprint(str(out_time_diff.total_seconds()))



	return columns, data


def get_columns():
	return [

		{"fieldname":"Location", "fieldtype":"Data", "label":"Location", "width":100},
		{"fieldname":"CompanyName", "fieldtype":"Data", "label":"Company", "width":110},
		{"fieldname":"EmployeeCode", "fieldtype":"Data", "label":"Employee Code", "width":130},
		{"fieldname":"EmployeeName", "fieldtype":"Data", "label":"Employee Name", "width":160},
		{"fieldname":"Status", "fieldtype":"Data", "label":"Employee Status", "width":100},
		{"fieldname":"in_time", "fieldtype":"Datetime", "label":"In Time", "width":160},
		{"fieldname":"out_time", "fieldtype":"Datetime", "label":"Out Time", "width":160},
		{"fieldname":"work_duration", "fieldtype":"Data", "label":"Work Duration", "width":120},
		{"fieldname":"ot", "fieldtype":"Data", "label":"OT", "width":80},
		{"fieldname":"total_duration", "fieldtype":"Data", "label":"Total Duration", "width":140},
		{"fieldname":"attend_status", "fieldtype":"Data", "label":"Status", "width":100},
		{"fieldname":"Remark", "fieldtype":"Data", "label":"Remark", "width":150},
		
	]

def get_data(filters):
	server = '192.168.5.110'
	user = 'esslNew'
	password = 'admin@122'
	database = 'etimetracklite1'
	conditions = ""
	join_conditions = ""
	join_conditions_2 = ""

	month = 1
	year = 2025
	# next_month = 2
	# next_year = 2025
	current_date = '2025-01-01'
	next_date = '2025-01-02'


	
	# fmt = '%Y-%m-%d %H:%M:%S'

	# fmt = '%Y-%m-%d %H:%M:%S'
	current_date = datetime.datetime.strptime('2010-01-01', '%Y-%m-%d')
	# d2 = datetime.datetime.strptime('2010-01-03 20:15:14', fmt)


	if filters.get("attendance_date"):
		current_date = datetime.datetime.strptime(filters.get("attendance_date"), '%Y-%m-%d')
		next_date = current_date + datetime.timedelta(days=1)
		# next_date = datetime.datetime.strptime(str(next_date), '%Y-%m-%d')
		month = current_date.month
		year = current_date.year
		next_month = next_date.month
		next_year = next_date.year
		# frappe.msgprint(str(current_date))
		# frappe.msgprint(str(next_date))


		join_conditions += f" AND LogDate >= '{current_date.strftime('%Y-%m-%d')} 08:00:00'"
		join_conditions += f" AND LogDate <= '{next_date.strftime('%Y-%m-%d')} 07:59:59'"



		join_conditions_2 += f" LogDate >= '{current_date.strftime('%Y-%m-%d')} 08:00:00'"
		join_conditions_2 += f" AND LogDate <= '{next_date.strftime('%Y-%m-%d')} 07:59:59'"

		# frappe.msgprint(join_conditions)

		# if month == next_month:
		# 	query = f"""SELECT 
		# 					e.EmployeeCode,
		# 					e.EmployeeName,
		# 					e.Location,
		# 					e.Status,
		# 					MIN(dl.LogDate) in_time,
		# 					MAX(dl.LogDate) out_time
		# 				FROM Employees e 
		# 				LEFT JOIN  DeviceLogs_{month}_{year} dl ON e.EmployeeCode = dl.UserId
		# 															{join_conditions}
		# 				WHERE e.Status = 'Working'  {conditions}
		# 				GROUP BY e.EmployeeCode,
		# 						 e.EmployeeName,
		# 					     e.Location, 
		# 					     e.Status"""
		# else :
		# 	query = f"""SELECT 
		# 					e.EmployeeCode,
		# 					e.EmployeeName,
		# 					e.Location,
		# 					e.Status,
		# 					MIN(dl.LogDate) in_time,
		# 					MAX(dl.LogDate) out_time
		# 				FROM Employees e 
		# 				LEFT JOIN  DeviceLogs_{month}_{year} dl ON e.EmployeeCode = dl.UserId
		# 															{join_conditions}
		# 				WHERE e.Status = 'Working'  {conditions}
		# 				GROUP BY e.EmployeeCode,
		# 						e.EmployeeName,
		# 						e.Location, 
		# 						e.Status
		# 			UNION 
		# 				SELECT 
		# 					e.EmployeeCode,
		# 					e.EmployeeName,
		# 					e.Location,
		# 					e.Status,
		# 					MIN(dl2.LogDate) in_time,
		# 					MAX(dl2.LogDate) out_time
		# 				FROM Employees e 
		# 				LEFT JOIN  DeviceLogs_{next_month}_{next_year} dl2 ON e.EmployeeCode = dl2.UserId
		# 															{join_conditions}
		# 				WHERE e.Status = 'Working'  {conditions}
		# 				GROUP BY e.EmployeeCode,
		# 						e.EmployeeName,
		# 						e.Location, 
		# 						e.Status"""



	if filters.get("company"):
		# conditions = " AND Employees.location = 'PC-M' "
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
					MIN(LogDate) in_time,
					MAX(LogDate) out_time
				FROM Employees 
				LEFT JOIN  
						( 	SELECT 
								LogDate, UserId
							FROM DeviceLogs_{month}_{year}  
							WHERE 
								{join_conditions_2}
						UNION
							SELECT 
								LogDate, UserId
							FROM DeviceLogs_{next_month}_{next_year} 
							WHERE 
								{join_conditions_2}
						) dl ON dl.UserId = EmployeeCode
				WHERE Status = 'Working'  
					AND EmployeeName NOT LIKE '%del%'
					{conditions}
				GROUP BY EmployeeCode,
				EmployeeName,
				Location, 
				Status,
				CompanyId"""
	

	if month == next_month:
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
						MIN(LogDate) in_time,
						MAX(LogDate) out_time
					FROM Employees 
					LEFT JOIN  DeviceLogs_{month}_{year} dl ON EmployeeCode = dl.UserId
					{join_conditions}
					WHERE Status = 'Working'  
						AND EmployeeName NOT LIKE '%del%'
						{conditions}
					GROUP BY EmployeeCode,
					EmployeeName,
					Location, 
					Status,
					CompanyId"""

	cursor.execute(query)
	all_row = cursor.fetchall()
	return all_row