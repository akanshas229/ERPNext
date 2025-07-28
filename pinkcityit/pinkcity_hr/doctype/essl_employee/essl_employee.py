# Copyright (c) 2025, Pink city IT team and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document


class ESSLEmployee(Document):
	
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
						e.EmployeeCode name,
						e.EmployeeName employee_name,
						d.DepartmentFName department,
						e.SubDepartment sub_department,
						e.Grade grade,
						e.Location location,
						ct.CategoryFName category,
						e.DOJ doj,
						e.Status status,
						e.Gender gender,
						e.EmployeeCode employee_code,
						c.CompanyFName company,	
						e.Designation designation,
						e.Team team,
						e.EmployementType employment_type,
						e.DOC doc,
						e.AadhaarNumber aadhar_card,
						e.EmployeeId employee_id,
						e.EnrolledDate creation,
						e.EnrolledDate modified
					FROM Employees e
					LEFT JOIN Companies c on c.CompanyId = e.CompanyId 
					LEFT JOIN Departments d on d.DepartmentId = e.DepartmentId
					LEFT JOIN Categories ct on ct.CategoryId = e.CategoryId
					WHERE e.EmployeeCode = '{self.name}'
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
		order_by = order_by.replace('`tabESSL Employee`.', '')
		order_by = order_by.replace('`', '')

		filters = args.get("filters", [])
		where_query = ""
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='employee_name':
				where_query = where_query + " e.EmployeeName " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='employee_code':
				where_query = where_query + " e.EmployeeCode " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='location':
				where_query = where_query + " e.Location " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='status':
				where_query = where_query + " e.Status " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			

		query = f"""SELECT 
						e.EmployeeCode name,
						e.EmployeeName employee_name,
						e.EmployeeCode employee_code,
						e.Designation designation,
						e.EmployementType employment_type,	
						e.Status status,
						e.Location location,
						e.EnrolledDate creation,
						e.EnrolledDate modified
					FROM Employees e
					"""
		if where_query :
			query = query + " WHERE  " + where_query

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

		filters = args.get("filters", [])
		where_query = ""
		i = 0
		for filter in filters :
			if i > 0 :
				where_query = where_query + " AND "
			if filter[1]=='employee_name':
				where_query = where_query + " e.EmployeeName " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='employee_code':
				where_query = where_query + " e.EmployeeCode " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='location':
				where_query = where_query + " e.Location " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			if filter[1]=='status':
				where_query = where_query + " e.Status " + filter[2] + " '" + filter[3] + "'"
				i = i + 1
			# if filters.get("company"):
			# 	if filters.get("company") == "Pinkcity Jewelhouse Private Ltd-Mahapura":
			# 		conditions += " e.location = 'PC-M' "
			# 	if filters.get("company") == "Pinkcity Jewelhouse Private Limited- Unit 1":
			# 		conditions += " e.location = 'PC-I' "
			# 	if filters.get("company") == "Pinkcity Jewelhouse Private Limited-Unit 2":
			# 		conditions += " e.location = 'PC-II' "
			# 	if filters.get("company") == "PINKCITY COLORSTONES PVT. LTD.":
			# 		conditions += " e.location = 'SILVER' "
			# 	if filters.get("company") == "ATELIER PINKCITY PRIVATE LIMITED":
			# 		conditions += " e.location = 'Atelier' "

		query = f"""SELECT 
					COUNT (e.EmployeeId) total_no
					FROM Employees e
					"""
		
		if where_query :
			query = query + " WHERE " + where_query

		cursor.execute(query)
		row = cursor.fetchone()
		total_no = row.get("total_no", 0) 
		return  total_no


	@staticmethod
	def get_stats(args):
		pass



@frappe.whitelist()
def create_job_applicant() :
	
	job_opening = frappe.form_dict.get("job_opening", "")
	name = frappe.form_dict.get("name", "")
	mobile = frappe.form_dict.get("mobile", "")
	email = frappe.form_dict.get("email", "")
	qualification = frappe.form_dict.get("qualification", "")
	gender = frappe.form_dict.get("gender", "")
	source = frappe.form_dict.get("source", "")
	source_name = frappe.form_dict.get("source_name", "")
	
	current_gross = frappe.form_dict.get("current_gross", "")
	expected_gross = frappe.form_dict.get("expected_gross", "")
	notice_period = frappe.form_dict.get("notice_period", "")
	experience = frappe.form_dict.get("experience", "")

	company_1 = frappe.form_dict.get("company_1", "")
	designation_1 = frappe.form_dict.get("designation_1", "")
	salary_1 = frappe.form_dict.get("salary_1", "")
	joining_date_1 = frappe.form_dict.get("joining_date_1", "")
	exit_date_1 = frappe.form_dict.get("exit_date_1", "")

	company_2 = frappe.form_dict.get("company_2", "")
	designation_2 = frappe.form_dict.get("designation_2", "")
	salary_2 = frappe.form_dict.get("salary_2", "")
	joining_date_2 = frappe.form_dict.get("joining_date_2", "")
	exit_date_2 = frappe.form_dict.get("exit_date_2", "")


	# company_3 = frappe.form_dict.get("company_3", "")
	# salary_3 = frappe.form_dict.get("salary_3", "")
	# joining_date_3 = frappe.form_dict.get("joining_date_3", "")
	# exit_date_3 = frappe.form_dict.get("exit_date_3", "")

	total_exp = frappe.form_dict.get("total_exp", "")
	reason = frappe.form_dict.get("reason", "")

	user_resume = frappe.form_dict.get("user_resume", "")

	data = {}

	doc = frappe.new_doc('Job Applicant')
	doc.job_title = job_opening
	doc.applicant_name = name
	doc.mobile_number = mobile
	doc.email_id = email
	doc.qualification = qualification
	doc.gender = gender

	doc.source = source
	doc.source_name = source_name

	doc.work_experience = experience
	if company_1:
		doc.append("work_history", {
					"company_name": company_1,
					"designation": designation_1,
					"salary": salary_1,
					"joining_date": joining_date_1,
					"exit_date": exit_date_1
				})
	if company_2:
		doc.append("work_history", {
					"company_name": company_2,
					"designation": designation_2,
					"salary": salary_2,
					"joining_date": joining_date_2,
					"exit_date": exit_date_2
				})
		
	# if company_3:
	# 	doc.append("work_history", {
	# 				"company_name": company_3,
	# 				"salary": salary_3,
	# 				"joining_date": joining_date_3,
	# 				"exit_date": exit_date_3
	# 			})
		
	doc.total_experience = total_exp
	doc.notice_period = notice_period
	doc.reason_of_job_change = reason

	doc.resume_link = user_resume

	doc.current_ctc_fixed = current_gross
	doc.expected_ctc = expected_gross

	doc.save()

	doc.add_comment('Comment', text='This form is save through pinkcityindia website.')

	data['status'] = True
	data['data'] = doc
	data['msg'] = "Your application is successfully submitted."
	frappe.response["data"] = data




@frappe.whitelist()
def create_job_applicant_updated() :
	
	job_opening = frappe.form_dict.get("job_opening", "")
	name = frappe.form_dict.get("name", "")
	mobile = frappe.form_dict.get("mobile", "")
	email = frappe.form_dict.get("email", "")
	qualification = frappe.form_dict.get("qualification", "")
	gender = frappe.form_dict.get("gender", "")
	source = frappe.form_dict.get("source", "")
	source_name = frappe.form_dict.get("source_name", "")
	
	current_gross = frappe.form_dict.get("current_gross", "")
	expected_gross = frappe.form_dict.get("expected_gross", "")
	notice_period = frappe.form_dict.get("notice_period", "")
	experience = frappe.form_dict.get("experience", "")

	company_1 = frappe.form_dict.get("company_1", "")
	designation_1 = frappe.form_dict.get("designation_1", "")
	salary_1 = frappe.form_dict.get("salary_1", "")
	joining_date_1 = frappe.form_dict.get("joining_date_1", "")
	exit_date_1 = frappe.form_dict.get("exit_date_1", "")

	company_2 = frappe.form_dict.get("company_2", "")
	designation_2 = frappe.form_dict.get("designation_2", "")
	salary_2 = frappe.form_dict.get("salary_2", "")
	joining_date_2 = frappe.form_dict.get("joining_date_2", "")
	exit_date_2 = frappe.form_dict.get("exit_date_2", "")


	# company_3 = frappe.form_dict.get("company_3", "")
	# salary_3 = frappe.form_dict.get("salary_3", "")
	# joining_date_3 = frappe.form_dict.get("joining_date_3", "")
	# exit_date_3 = frappe.form_dict.get("exit_date_3", "")

	total_exp = frappe.form_dict.get("total_exp", "")
	reason = frappe.form_dict.get("reason", "")

	user_resume = frappe.form_dict.get("user_resume", "")

	data = {}

	doc = frappe.new_doc('Job Applicant')
	doc.job_title = job_opening
	doc.applicant_name = name
	doc.mobile_number = mobile
	doc.email_id = email
	doc.qualification = qualification
	doc.gender = gender

	doc.source = source
	doc.source_name = source_name

	doc.work_experience = experience
	if company_1:
		doc.append("work_history", {
					"company_name": company_1,
					"designation": designation_1,
					"salary": salary_1,
					"joining_date": joining_date_1,
					"exit_date": exit_date_1
				})
	if company_2:
		doc.append("work_history", {
					"company_name": company_2,
					"designation": designation_2,
					"salary": salary_2,
					"joining_date": joining_date_2,
					"exit_date": exit_date_2
				})
		
	# if company_3:
	# 	doc.append("work_history", {
	# 				"company_name": company_3,
	# 				"salary": salary_3,
	# 				"joining_date": joining_date_3,
	# 				"exit_date": exit_date_3
	# 			})
		
	doc.total_experience = total_exp
	doc.notice_period = notice_period
	doc.reason_of_job_change = reason

	doc.resume_link = user_resume

	doc.current_ctc_fixed = current_gross
	doc.expected_ctc = expected_gross

	doc.save()

	doc.add_comment('Comment', text='This form is save through pinkcityindia website.')

	data['status'] = True
	data['data'] = doc
	data['msg'] = "Your application is successfully submitted."
	frappe.response["data"] = data



