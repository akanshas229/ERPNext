# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt
import frappe

def execute(filters=None):
    columns = get_columns(filters)
    data = get_data(filters)
    return columns, data

def get_columns(filters):
    return [
        {"label": "Employee", "fieldname": "employee", "fieldtype": "Data", "width": 100},
        {"label": "Employee Name", "fieldname": "employee_name", "fieldtype": "Data", "width": 150},
        {"label": "Department", "fieldname": "department", "fieldtype": "Data", "width": 100},
        {"label": "Attendance Device ID", "fieldname": "attendance_device_id", "fieldtype": "Data", "width": 100},
        {"label": "Shift Start", "fieldname": "shift_start", "fieldtype": "Datetime", "width": 130},
        {"label": "Payment Days", "fieldname": "payment_days", "fieldtype": "Float", "width": 100},
        {"label": "Start Date", "fieldname": "start_date", "fieldtype": "Date", "width": 100},
        {"label": "OT Hour", "fieldname": "ot_hour", "fieldtype": "Float", "width": 100},
    ]


def get_data(filters):
	query = f"""
			SELECT 
			ta.employee, 
			ta.department,
			ta.employee_name,
			tss.attendance_device_id,
			tec.shift_start,
			tec.shift_end,
			tss.payment_days,
			tss.start_date ,
			tei.ot_hour 
		from tabAttendance ta 
		LEFT JOIN `tabEmployee Checkin` tec 
		ON tec.employee = ta.employee
		LEFT JOIN `tabSalary Slip` tss 
		ON tss.employee = ta.employee
		LEFT JOIN `tabEmployee Incentive` tei
		ON tei.employee = ta.employee  
		 """
	return frappe.db.sql(query, as_dict=1)
# # Copyright (c) 2025, pinkcity and contributors
# # For license information, please see license.txt

# import frappe


# def execute(filters=None):
# 	columns = get_columns(filters)
# 	data = get_data(filters)
# 	return columns, data


# def get_columns(filters):
# 	return [
# 		{"label": "Employee", "fieldname": "employee", "fieldtype": "Data", "width": 100},
# 		{"label": "Attendance Device id", "fieldname": "attendance_device_id", "fieldtype": "Data", "width": 100},
# 		{"label": "Employee Name", "fieldname": "employee_name", "fieldtype": "Data", "width": 100},
# 		{"label": "department", "fieldname": "department", "fieldtype": "Data", "width": 100},
# 		{"label": "Start", "fieldname": "shift_start", "fieldtype": "Date", "width": 100},
# 		{"label": "payment Days", "fieldname": "payment_days", "fieldtype": "Data", "width": 100},
# 		{"label": "OT", "fieldname": "ot_hour", "fieldtype": "Data", "width": 100},

# 	]


# # def get_data(filters):
# # 	query = f"""
# # 			SELECT 
# # 			ta.employee, 
# # 			ta.department,
# # 			ta.employee_name,
# # 			tss.attendance_device_id,
# # 			tec.shift_start,
# # 			tec.shift_end,
# # 			tss.payment_days,
# # 			tss.start_date ,
# # 			tei.ot_hour 
# # 		from tabAttendance ta 
# # 		LEFT JOIN `tabEmployee Checkin` tec 
# # 		ON tec.employee = ta.employee
# # 		LEFT JOIN `tabSalary Slip` tss 
# # 		ON tss.employee = ta.employee
# # 		LEFT JOIN `tabEmployee Incentive` tei
# # 		ON tei.employee = ta.employee  
# # 		 """
# # 	return frappe.db.sql(query, as_dict=1)

# def get_data(filters):
# 	conditions = get_conditions(filters)

# 	query = f"""
# 		SELECT 
# 			ta.employee, 
# 			ta.department,
# 			ta.employee_name,
# 			tss.attendance_device_id,
# 			tec.shift_start,
# 			tec.shift_end,
# 			tss.payment_days,
# 			tss.start_date,
# 			tei.ot_hour 
# 		FROM `tabAttendance` ta 
# 		LEFT JOIN `tabEmployee Checkin` tec ON tec.employee = ta.employee
# 		LEFT JOIN `tabSalary Slip` tss ON tss.employee = ta.employee
# 		LEFT JOIN `tabEmployee Incentive` tei ON tei.employee = ta.employee
# 		WHERE {conditions}
# 	"""

	
# 	data = frappe.db.sql(query, as_dict=1)
# 	print("=== DEBUG: Report Data ===")
# 	for row in data:
# 		print(row)
# 	frappe.msgprint(f"{len(data)} records fetched")

# 	return data



# def get_conditions(filters):
#     conditions = []

#     if filters.get("company"):
#         conditions.append("tss.company = '{}'".format(filters["company"]))

#     if filters.get("employee"):
#         conditions.append("ta.employee = '{}'".format(filters["employee"]))

#     if filters.get("from_date") and filters.get("to_date"):
#         conditions.append("ta.attendance_date BETWEEN '{}' AND '{}'".format(
#             filters["from_date"], filters["to_date"]
#         ))

#     return " AND ".join(conditions) if conditions else "1=1"
