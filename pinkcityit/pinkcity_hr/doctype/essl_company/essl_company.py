# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe, pymssql , datetime
from frappe.model.document import Document

class ESSLCompany(Document):
	
	def db_insert(self, *args, **kwargs):
		pass

	

	def load_from_db(self):
		server = '192.168.5.110'
		user = 'esslNew'
		password = 'admin@122'
		database = 'etimetracklite1'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
						CompanyId name,
						CompanyFName company_name,
						CompanySName short_name,
						CompanyEmail email,
						CompanyWebsite website,	
						CompanyAddress address,
						CompanyIsVisible visible_to_all,
						GETDATE() creation,
						GETDATE() modified
					FROM Companies
					WHERE CompanyId = '{self.name}'
					"""
		
		cursor.execute(query)
		row = cursor.fetchone()
		super(Document, self).__init__(row)


	def db_update(self, *args, **kwargs):
		pass

	@staticmethod
	def get_list(args):
		server = '192.168.5.110'
		user = 'esslNew'
		password = 'admin@122'
		database = 'etimetracklite1'

		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		start = int(args.get("start") or 0)
		page_length = int(args.get("page_length") or 0) 

		order_by = args.get("order_by", 'name desc')
		order_by = order_by.replace('`tabESSL Company`.', '')
		order_by = order_by.replace('`', '')


		query = f"""SELECT 
						CompanyId name,
						CompanyFName company_name,
						CompanySName short_name,
						CompanyEmail email,
						CompanyWebsite website,	
						CompanyAddress address,
						GETDATE() creation,
						GETDATE() modified
					FROM Companies
					"""
		
		query = query + f""" 
					ORDER BY {order_by}
					OFFSET {start} ROWS
					FETCH NEXT {page_length} ROWS ONLY """
		
		cursor.execute(query)
		all_row = cursor.fetchall()
		return all_row

	@staticmethod
	def get_count(args):
		server = '192.168.5.110'
		user = 'esslNew'
		password = 'admin@122'
		database = 'etimetracklite1'

		total_no = 0 
		conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
		cursor = conn.cursor(as_dict=True)

		query = f"""SELECT 
						COUNT (CompanyId) total_no
					FROM Companies 
					"""
		

		cursor.execute(query)
		row = cursor.fetchone()
		total_no = row.get("total_no", 0) 
		return  total_no


	@staticmethod
	def get_stats(args):
		pass

@frappe.whitelist()
def employee_checkin():

	company_id = int(frappe.form_dict.get("company_id", 0) or 0)
	date = frappe.form_dict.get("date" , '')
	start_time = frappe.form_dict.get("start_time", '08:00:00') 
	end_time = frappe.form_dict.get("end_time", '07:59:59') 

	company_name = ""
	
	if company_id == 4:
		company_name = "Pinkcity Jewelhouse Private Ltd-Mahapura"
	if company_id == 2:
		company_name = "Pinkcity Jewelhouse Private Limited- Unit 1"
	if company_id == 3:
		company_name = "Pinkcity Jewelhouse Private Limited-Unit 2"
	if company_id == 8:
		company_name = "PINKCITY COLORSTONES PVT. LTD."
	if company_id == 9:
		company_name = "ATELIER PINKCITY PRIVATE LIMITED"
	
	getEmployeeCheck(company_name, date, start_time, end_time)

	frappe.response["status"] = True
	frappe.response["msg"] = "All Employee Checkin."


def getEmployeeCheck(company, date, start_time = '08:00:00', end_time='07:59:59') :
	server = '192.168.5.110'
	user = 'esslNew'
	password = 'admin@122'
	database = 'etimetracklite1'

	conn = pymssql.connect(server=server, user=user, password=password, database=database, port=5555,  tds_version=r'7.0')
	cursor = conn.cursor(as_dict=True)

	all_employee = frappe.db.get_all('Employee',
										filters={
											'status': 'Active',
											'company': company,
										},
										fields=['employee', 'employee_name', 'attendance_device_id'],
										# order_by='date desc',
										# as_dict=True
									)



	conditions = ""

	current_date = datetime.datetime.strptime(str(date) , '%Y-%m-%d')
	next_date = current_date + datetime.timedelta(days=1)
	month = current_date.month
	year = current_date.year
	next_month = next_date.month
	next_year = next_date.year


	conditions += f" AND LogDate >= '{current_date.strftime('%Y-%m-%d')} {start_time}'"
	conditions += f" AND LogDate <= '{next_date.strftime('%Y-%m-%d')} {end_time}'"

	for employee in all_employee:
		frappe.response["hello"] = "hi22"
		if employee.get("attendance_device_id", False) :
			frappe.response["hello2"] = "hi33"
			frappe.response["attendance_device_id"] = employee.get("attendance_device_id", False)
			if month == next_month:
				frappe.response["here"] = "hi44"
				query = f"""    SELECT 
								dl.UserId,
								MIN(dl.LogDate) in_time,
								MAX(dl.LogDate) out_time,
								MIN(dl.DeviceLogId) in_time_log_id,
								MAX(dl.DeviceLogId) out_time_log_id
							FROM DeviceLogs_{month}_{year} dl 
							WHERE 
								dl.UserId = '{employee.get("attendance_device_id", False)}'
								{conditions}
							GROUP BY dl.UserId
						"""
			else :
				frappe.response["here"] = "hi55"
				# query = f"""SELECT 
				# 				dl.UserId,
				# 				MIN(dl.LogDate) in_time,
				# 				MAX(dl.LogDate) out_time,
				# 				MIN(dl.DeviceLogId) in_time_log_id,
				# 				MAX(dl.DeviceLogId) out_time_log_id
				# 			FROM DeviceLogs_{month}_{year} dl 
				# 			WHERE 
				# 				dl.UserId = '{employee.get("attendance_device_id", False)}'
				# 				{conditions}
				# 			GROUP BY dl.UserId
				# 		UNION 
				# 			SELECT 
				# 				dl2.UserId,
				# 				MIN(dl2.LogDate) in_time,
				# 				MAX(dl2.LogDate) out_time,
				# 				MIN(dl2.DeviceLogId) in_time_log_id,
				# 				MAX(dl2.DeviceLogId) out_time_log_id
				# 			FROM DeviceLogs_{next_month}_{next_year} dl2 
				# 			WHERE 
				# 				dl2.UserId = '{employee.get("attendance_device_id", False)}'
				# 				{conditions}
				# 			GROUP BY dl2.UserId
						# """
				
				query = f"""SELECT 
								dl.UserId,
								MIN(dl.LogDate) in_time,
								MAX(dl.LogDate) out_time,
								MIN(dl.DeviceLogId) in_time_log_id,
								MAX(dl.DeviceLogId) out_time_log_id
							FROM 
								( 	SELECT 
										LogDate, UserId, DeviceLogId
									FROM DeviceLogs_{month}_{year}  
									WHERE 
										UserId = '{employee.get("attendance_device_id", False)}'
										{conditions}
								UNION
									SELECT 
										LogDate, UserId, DeviceLogId
									FROM DeviceLogs_{next_month}_{next_year} 
									WHERE 
										UserId = '{employee.get("attendance_device_id", False)}'
										{conditions}
								) dl 
							WHERE 
								dl.UserId = '{employee.get("attendance_device_id", False)}'
										{conditions}
							GROUP BY dl.UserId
						"""
				frappe.response["query"] = query
								# AND UserId = 'PM0538'
				
			cursor.execute(query)
			checkInData = cursor.fetchone()

			if checkInData :
				if checkInData.get('in_time', False) :
					if checkInData.get('out_time', False) :
						if checkInData.get('out_time') == checkInData.get('in_time') :
							addEmployeeCheckIn(employee.get("employee", ""), checkInData.get('in_time'), "IN", checkInData.get('in_time_log_id'))
						else :
							addEmployeeCheckIn(employee.get("employee", ""), checkInData.get('in_time'), "IN", checkInData.get('in_time_log_id'))
							addEmployeeCheckIn(employee.get("employee", ""), checkInData.get('out_time'), "OUT", checkInData.get('out_time_log_id'))


def addEmployeeCheckIn(employee, time, log_type, device_id):
	if frappe.db.exists("Employee Checkin", {"employee": employee, 
											 "time": time,
											 "log_type":log_type}) :
		pass
	else :
		checkInDoc = frappe.new_doc('Employee Checkin') 
		checkInDoc.employee = employee
		checkInDoc.time = time
		checkInDoc.log_type = log_type
		checkInDoc.device_id = device_id
		checkInDoc.save()

def CheckinMahapura():
	date = datetime.date.today()
	previous_date = date - datetime.timedelta(days=1)
	getEmployeeCheck("Pinkcity Jewelhouse Private Ltd-Mahapura", previous_date, '07:00:00', '06:59:59')

def CheckinUnit1():
	date = datetime.date.today()
	previous_date = date - datetime.timedelta(days=1)
	getEmployeeCheck("Pinkcity Jewelhouse Private Limited- Unit 1", previous_date, '08:00:00', '07:59:59')

def CheckinUnit2():
	date = datetime.date.today()
	previous_date = date - datetime.timedelta(days=1)
	getEmployeeCheck("Pinkcity Jewelhouse Private Limited-Unit 2", previous_date, '08:00:00', '07:59:59')

def CheckinColorstone():
	date = datetime.date.today()
	previous_date = date - datetime.timedelta(days=1)
	getEmployeeCheck("PINKCITY COLORSTONES PVT. LTD.", previous_date, '07:00:00', '06:59:59')

# def applyAttendance():
# 	date = datetime.date.today()
# 	markAttendance("ColorStones Unit Shift", date)
# 	markAttendance("Mahapura Unit Shift", date)
# 	markAttendance("Unit 1 Shift Sitapura", date)
# 	markAttendance("Unit 2 Shift Sitapura", date)

def applyAttendanceColorstone():
	date = datetime.date.today()
	markAttendance("ColorStones Unit Shift", date)

def applyAttendanceMahapura():
	date = datetime.date.today()
	markAttendance("Mahapura Unit Shift", date)

def applyAttendanceUnit1():
	date = datetime.date.today()
	markAttendance("Unit 1 Shift Sitapura", date)

def applyAttendanceUnit2():
	date = datetime.date.today()
	markAttendance("Unit 2 Shift Sitapura", date)



def markAttendance(shift_name, date):
	shift_doc = frappe.get_cached_doc('Shift Type', shift_name)
	old_last_sync_of_checkin = datetime.datetime.strptime(str(shift_doc.last_sync_of_checkin), "%Y-%m-%d %H:%M:%S")
	shift_doc.last_sync_of_checkin = str(date.today()) + " " + str(old_last_sync_of_checkin.time())

	previous_date = date - datetime.timedelta(days=1)
	previous_date = datetime.datetime.strptime(str(previous_date), "%Y-%m-%d")
	shift_doc.process_attendance_after = str(previous_date.date())

	shift_doc.process_auto_attendance()