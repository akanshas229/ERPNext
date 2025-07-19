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
        {"label": "Device ID", "fieldname": "attendance_device_id", "fieldtype": "Data", "width": 150},
        {"label": "Employee Name", "fieldname": "employee_name", "fieldtype": "Data", "width": 120},
        {"label": "Gross Pay", "fieldname": "gross_monthly_salary", "fieldtype": "Data", "width": 100},
        {"label": "Deduction Total", "fieldname": "total_deduction", "fieldtype": "Int", "width": 100},
        {"label": "Net Amount", "fieldname": "total_net_gross", "fieldtype": "Data", "width": 120},
        {"label": "Basic", "fieldname": "default_basic", "fieldtype": "Data", "width": 120},
        {"label": "HRA", "fieldname": "house_rent_allowance", "fieldtype": "Data", "width": 120},
        {"label": "CCA", "fieldname": "city_compensatory_allowance", "fieldtype": "Data", "width": 120},
        {"label": "TA (Default)", "fieldname": "travelling_allowance", "fieldtype": "Data", "width": 120},
        {"label": "WA (Default)", "fieldname": "washing_allowance", "fieldtype": "Data", "width": 120},
	]
# def get_data(filters):
# 	conditions = get_conditions(filters)
# 	query=f"""SELECT 
# 				tss.employee,	
# 				tss.attendance_device_id,
# 				tss.employee_name,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'B' ) basic,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'CCA' ) city_compensatory_allowance,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'WA' ) washing_allowance,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'HRA' ) house_rent_allowance,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'OT' ) overtime,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'A' ) arrear,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'IP' ) incentive_pay,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'LE' ) leave_encashment,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'TA' ) travelling_allowance,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'ABRY' ) abry_scheme,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'PF' ) employee_contribution_pf,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'ESI' ) employee_contribution_esi,
# 				( SELECT SUM(tsd.amount) FROM `tabSalary Detail` AS tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'LHD' ) late_hours_deduction,
				
# 				(tss.gross_monthly_salary - tss.net_pay) AS total_deduction,
# 				(
# 					(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr IN ('B', 'CCA', 'WA', 'HRA', 'OT', 'A', 'IP', 'LE', 'TA', 'ABRY'))
# 					- 
# 					(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'LHD')
# 				) AS total_net_gross
# 				tss.gross_monthly_salary,
# 				tss.net_pay,
# 				FROM `tabSalary Slip` tss  
# 				WHERE {conditions}"""
# 	return frappe.db.sql(query, as_dict=1)
def get_data(filters):
	conditions = get_conditions(filters)
	query = f"""
		
		SELECT 
			tss.employee,	
			tss.attendance_device_id,
			tss.employee_name,
			tss.gross_monthly_salary,
			DATE(tss.`creation`) AS create_date ,
			
			(SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'B') AS default_basic,
			(SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'CCA') AS city_compensatory_allowance,
			(SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'WA') AS washing_allowance,
			(SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'HRA') AS house_rent_allowance,
			(SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'TA') AS travelling_allowance,
			(SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'LHD') AS late_hours_deduction,
			CASE
				WHEN (SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'B') > 15000
				THEN 15000 * 0.12
				ELSE (SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'B') * 0.12
			END AS calculated_pf,

			tss.gross_monthly_salary,
			
			(
				(tss.gross_monthly_salary - 
					COALESCE((SELECT SUM(tsd.default_amount) FROM `tabSalary Detail` tsd 
							WHERE tsd.parent = tss.name AND tsd.abbr = 'WA'), 0)
				) * 0.0075 + 0.50
			) AS calculated_esi,

			(
				COALESCE((
					SELECT SUM(tsd.default_amount) 
					FROM `tabSalary Detail` tsd 
					WHERE tsd.parent = tss.name AND tsd.abbr IN ('B', 'CCA', 'WA', 'HRA', 'TA')
				), 0)
				- 
				CASE
					WHEN (
						SELECT SUM(tsd.default_amount) 
						FROM `tabSalary Detail` tsd 
						WHERE tsd.parent = tss.name AND tsd.abbr = 'B'
					) > 15000
					THEN 15000 * 0.12
					ELSE (
						SELECT SUM(tsd.default_amount) 
						FROM `tabSalary Detail` tsd 
						WHERE tsd.parent = tss.name AND tsd.abbr = 'B'
					) * 0.12
				END
				- 
				CASE
					WHEN (
						SELECT SUM(tsd.default_amount)
						FROM `tabSalary Detail` tsd
						WHERE tsd.parent = tss.name AND tsd.abbr = 'ESI'
					) > 0
					THEN (
						(tss.gross_monthly_salary -
							COALESCE((
								SELECT SUM(tsd.default_amount)
								FROM `tabSalary Detail` tsd
								WHERE tsd.parent = tss.name AND tsd.abbr = 'WA'
							), 0)
						) * 0.0075 + 0.50
					)
					ELSE 0
				END
				- COALESCE((
					SELECT SUM(tsd.default_amount) 
					FROM `tabSalary Detail` tsd 
					WHERE tsd.parent = tss.name AND tsd.abbr = 'LHD'
				), 0)
			) AS total_net_gross,



			(
				CASE
					WHEN (
						SELECT SUM(tsd.default_amount)
						FROM `tabSalary Detail` tsd
						WHERE tsd.parent = tss.name AND tsd.abbr = 'B'
					) > 15000
					THEN 15000 * 0.12
					ELSE (
						SELECT SUM(tsd.default_amount)
						FROM `tabSalary Detail` tsd
						WHERE tsd.parent = tss.name AND tsd.abbr = 'B'
					) * 0.12
				END
				+
				CASE
					WHEN (
						SELECT SUM(tsd.default_amount)
						FROM `tabSalary Detail` tsd
						WHERE tsd.parent = tss.name AND tsd.abbr = 'ESI'
					) > 0
					THEN (
						(tss.gross_monthly_salary -
							COALESCE((
								SELECT SUM(tsd.default_amount)
								FROM `tabSalary Detail` tsd
								WHERE tsd.parent = tss.name AND tsd.abbr = 'WA'
							), 0)
						) * 0.0075 + 0.50
					)
					ELSE 0
				END
			) AS total_deduction

		FROM `tabSalary Slip` tss  
		INNER JOIN (
			SELECT employee, MAX(posting_date) AS max_date
			FROM `tabSalary Slip`
			GROUP BY employee
		) latest
		ON tss.employee = latest.employee AND tss.posting_date = latest.max_date

		WHERE {conditions}
		GROUP BY employee, DATE(tss.`creation`) DESC
		ORDER BY DATE(tss.`creation`) DESC

	"""
	return frappe.db.sql(query, as_dict=1)
		# GROUP BY employee
		# ORDER BY tss.creation DESC

				# (tss.gross_pay - tss.net_pay) AS total_deduction,
				# (earned_gross - late_hours_deduction ) AS total_net_gross
				# (basic + city_compensatory_allowance + washing_allowance + house_rent_allowance + overtime + arrear + incentive_pay + leave_encashment + travelling_allowance + abry_scheme ) AS earned_gross

# def get_data(filters):
# 	conditions = get_conditions(filters)
# 	query = f"""
# 		SELECT 
# 			tss.employee,	
# 			tss.attendance_device_id,
# 			tss.employee_name,
# 			DATE(tss.`posting_date`) AS create_date,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'B') AS basic,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'CCA') AS city_compensatory_allowance,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'WA') AS washing_allowance,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'HRA') AS house_rent_allowance,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'OT') AS overtime,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'A') AS arrear,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'IP') AS incentive_pay,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'LE') AS leave_encashment,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'TA') AS travelling_allowance,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'ABRY') AS abry_scheme,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'PF') AS employee_contribution_pf,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'ESI') AS employee_contribution_esi,
# 			(SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr = 'LHD') AS late_hours_deduction,

# 			tss.gross_monthly_salary,
# 			(
# 				COALESCE((SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr IN ('B', 'CCA', 'WA', 'HRA', 'OT', 'A', 'IP', 'LE', 'TA', 'ABRY')), 0) 
# 				-
# 				COALESCE((SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr IN ('ESI', 'PF', 'LHD')), 0)
# 			) AS total_net_gross,
# 			(tss.gross_monthly_salary - (
# 											COALESCE((SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr IN ('B', 'CCA', 'WA', 'HRA', 'OT', 'A', 'IP', 'LE', 'TA', 'ABRY')), 0) 
# 											-
# 											COALESCE((SELECT SUM(tsd.amount) FROM `tabSalary Detail` tsd WHERE tsd.parent = tss.name AND tsd.abbr IN ('ESI', 'PF', 'LHD')), 0) 
# 										)) AS total_deduction

# 		FROM `tabSalary Slip` tss  
# 		WHERE {conditions}
# 		GROUP BY employee
# 		ORDER BY DATE(tss.`posting_date`) DESC

# 	"""
# 		# ORDER BY employee_name
# 		# WHERE {conditions}
# 	return frappe.db.sql(query, as_dict=1)

# 				# (tss.gross_pay - tss.net_pay) AS total_deduction,
# 				# (earned_gross - late_hours_deduction ) AS total_net_gross
# 				# (basic + city_compensatory_allowance + washing_allowance + house_rent_allowance + overtime + arrear + incentive_pay + leave_encashment + travelling_allowance + abry_scheme ) AS earned_gross

def get_conditions(filters):
    conditions = ""
    
    if filters.get("company"):
        conditions += "tss.company = '{}'".format(filters.get("company"))

    if filters.get("employee_name"):
        
        conditions += " AND tss.employee_name = '{}'".format(filters.get("employee_name"))
    
    return conditions
