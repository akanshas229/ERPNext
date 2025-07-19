# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql, datetime, calendar
from frappe import _
from frappe.utils import flt

def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns()
	data = get_data(filters)
	# data.append({
	# 	"work_duration":"<p> Less Hour</p>" ,
	# 	"less_hour": round(less_hour , 2)
	# })
	month = 1
	year = 2025
	# next_month = 2
	# next_year = 2025
	# current_date = '2025-01-01'
	# next_date = '2025-01-02'

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


	# less_hour = sum(flt(d.get("less_hour", 0)) for d in data)

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
								# frappe.msgprint("hi11")
								x['out_time'] = log_date
								check = 1
					
					if check == 0 :
						temp_data = {}
						# frappe.msgprint("hi22")
						temp_data['Location'] = row.get("Location")
						temp_data['CompanyName'] = row.get("CompanyName")
						temp_data['EmployeeCode'] = row.get("EmployeeCode")
						temp_data['EmployeeName'] = row.get("EmployeeName")
						temp_data['Status'] = row.get("Status")
						temp_data['date'] = in_time_init.date()
						temp_data['in_time'] = log_date 
						updated_data.append(temp_data)
	
	# frappe.msgprint(str(updated_data))
			
	# data_1 = {}
	for row in updated_data:
		# in_time = row.get('in_time')
		# out_time = row.get('out_time')
		row['attend_status'] = '<span style="color:red">Absent<span>'
		# row['total_duration'] = 0.00
		# row['work_duration'] = 0.00
		# row['less_hour'] = 0.00
		# row['excess_hour'] = 0.00
		# row['ot'] = 0.00
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
				

				

				# if total_shift_hour >= 6 :
				# 	if float(row.get('work_duration', 0) or 0) <= 8.30 :
				# 		less_hour = 8 - total_shift_hour
				# 		if total_shift_hour_minute > 30 :
				# 			less_minute = (30 - total_shift_hour_minute) + 60 
				# 			less_hour = less_hour - 1 
				# 		else :
				# 			less_minute = 30 - total_shift_hour_minute
				# 		row['less_hour'] = f"{less_hour}.{str(less_minute).zfill(2)}"




	## .... excess hour for full day
			# total_shift_second = shift_seconds = 8.5 * 60 * 60
			# total_shift_minute = total_shift_second / 60
			# total_shift_hour = int(total_shift_minute / 60)

			# wrk_dur = float(row.get("work_duration") or 0)
			# work_duration_int = int(wrk_dur) / 1 
			# less_int = float(work_duration_int or 0) * 60
			# work_duration_flt = float(wrk_dur % 1) * 100
			# total_work_durations = float(less_int or 0) + float(work_duration_flt or 0)

			# ttl_dur = float(row.get("total_duration") or 0)
			# total_duration_int = int(ttl_dur) / 1 
			# total_less_int = float(total_duration_int or 0) * 60
			# total_duration_flt = float(ttl_dur % 1) * 100
			# totaldurations = float(total_less_int or 0) + float(total_duration_flt or 0)
			
			# ot_durs = float(row.get("ot") or 0)
			# ot_int = int(ot_durs) / 1 
			# ot_less_int = float(ot_int or 0) * 60
			# ot_flt = float(ot_durs % 1) * 100
			# total_ot_time = float(ot_less_int or 0) + float(ot_flt or 0)


			

			# if (total_shift_hour >= 1 and total_shift_minute >= 00 ) and  ( total_shift_hour < 4 and total_shift_minute < 30 ) :
			# 	excess_hour = totaldurations - total_work_durations - total_ot_time
			# 	hours = excess_hour // 60
			# 	minutes = excess_hour % 60 
			# 	excess_hour =f"{int(hours)}.{str(int(minutes)).zfill(2)}"
				
			# 	frappe.msgprint(str(excess_hour))
			# 	row['excess_hour'] = excess_hour

			# elif (total_shift_hour >= 4 and total_shift_minute >= 30 ) and  ( total_shift_hour < 6 and total_shift_minute < 30 ) :
			# 	excess_hour = totaldurations - total_work_durations - total_ot_time
			# 	hours = excess_hour // 60
			# 	minutes = excess_hour % 60 
			# 	excess_hour =f"{int(hours)}.{str(int(minutes)).zfill(2)}"
				
			# 	frappe.msgprint(str(excess_hour))
			# 	row['excess_hour'] = excess_hour
			# else:
			# 	excess_hour = totaldurations - total_work_durations - total_ot_time
			# 	hours = excess_hour // 60
			# 	minutes = excess_hour % 60 
			# 	excess_hour =f"{int(hours)}.{str(int(minutes)).zfill(2)}"
				
			# 	frappe.msgprint(str(excess_hour))
			# 	row['excess_hour'] = excess_hour
			## --..................ends
					
					

	
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
	
	# total_less_hour = 0
	# total_hour = 0
	# total_work_duration = 0
	# total_working_hour = 0
	# total_ot = 0
	# total_ot_hour = 0
	# total_excess = 0
	# total_excess_hour = 0
	# total__duration = 0
	# total__duration_hour = 0
	# for row in updated_data:
	# 	lsh = float(row.get("less_hour") or 0)
	# 	less_hour_int = int(lsh) / 1 
	# 	less_int = float(less_hour_int or 0) * 60
	# 	less_hour_flt = float(lsh % 1) * 100
	# 	total_less_hours = float(less_int or 0) + float(less_hour_flt or 0)
	# 	# total_less_hours += float(total_less_hours)
	# 	total_less_hour += total_less_hours
	# 	hours = total_less_hour // 60
	# 	minutes = total_less_hour % 60 
	# 	total_hour =f"{int(hours)}.{str(int(minutes)).zfill(2)}"

	# 	wk_duration = float(row.get("work_duration") or 0)
	# 	less_work = int(wk_duration) / 1
	# 	less_work_int = float(less_work or 0) * 60
	# 	less_work_flt = float(wk_duration % 1) * 100
	# 	total_work_dur = float(less_work_int or 0) + float(less_work_flt or 0)
	# 	total_work_duration += total_work_dur
	# 	work_hr = total_work_duration // 60
	# 	work_min = total_work_duration % 60
	# 	total_working_hour =f"{int(work_hr)}.{str(int(work_min)).zfill(2)}"

	# 	ot_duration = float(row.get("ot") or 0)
	# 	less_ot_time = int(ot_duration) / 1
	# 	less_ot_time_int = float(less_ot_time or 0) * 60
	# 	less_ot_time_flt = float(ot_duration % 1) * 100
	# 	total_ot_dur = float(less_ot_time_int or 0) + float(less_ot_time_flt or 0)
	# 	total_ot += total_ot_dur
	# 	ot_hr = total_ot // 60
	# 	ot_min = total_ot % 60
	# 	total_ot_hour =f"{int(ot_hr)}.{str(int(ot_min)).zfill(2)}"


	# 	excess_duration = float(row.get("excess_hour") or 0)
	# 	less_excess_time = int(excess_duration) / 1
	# 	less_excess_time_int = float(less_excess_time or 0) * 60
	# 	less_excess_time_flt = float(excess_duration % 1) * 100
	# 	total_excess_dur = float(less_excess_time_int or 0) + float(less_excess_time_flt or 0)
	# 	total_excess += total_excess_dur
	# 	excess_hr = total_excess // 60
	# 	excess_min = total_excess % 60
	# 	total_excess_hour =f"{int(excess_hr)}.{str(int(excess_min)).zfill(2)}"


	# 	total_durations = float(row.get("total_duration") or 0)
	# 	total_duration = int(total_durations) / 1
	# 	total_duration_int = float(total_duration or 0) * 60
	# 	total_duration_flt = float(total_durations % 1) * 100
	# 	total__dur = float(total_duration_int or 0) + float(total_duration_flt or 0)
	# 	total__duration += total__dur
	# 	excess_hr = total__duration // 60
	# 	excess_min = total__duration % 60
	# 	total__duration_hour =f"{int(excess_hr)}.{str(int(excess_min)).zfill(2)}"
		
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
