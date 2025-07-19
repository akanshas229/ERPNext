# Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	if not filters:
		filters = {}

	columns = get_columns(filters)
	data = get_data(filters)

	for row in data :
		row.total = float(row.get('april', 0) or 0)
		row.total += float(row.get('may', 0) or 0)
		row.total += float(row.get('june', 0) or 0)
		row.total += float(row.get('july', 0) or 0)
		row.total += float(row.get('aug', 0) or 0)
		row.total += float(row.get('sept', 0) or 0)
		row.total += float(row.get('oct', 0) or 0)
		row.total += float(row.get('nov', 0) or 0)
		row.total += float(row.get('dec', 0) or 0)
		row.total += float(row.get('jan', 0) or 0)
		row.total += float(row.get('feb', 0) or 0)
		row.total += float(row.get('march', 0) or 0)
		# row.total = round(row.get('total',0))
		# row.total = float(row.get('total')) / 10
		# row.total = round(row.get('total',0))
		# row.total = float(row.get('total')) * 10
		final_value = 0
		round_value = round(float(row.get('total',0) or 0)) 
		value = round_value / 10
		remainder = round_value % 10
		if remainder == 5 or remainder == 0 :
			final_value = round_value
		else :
			if remainder < 5:
				final_value = (int(value) * 10 ) + 5
			else :
				final_value = (int(value) + 1 ) * 10  
		# row.total_round = round(float(row.get('total',0) or 0)) / 10
		# row.total_before_rd = float(row.get('total_before_rd')) / 10
		# row.total_before_rd = round(row.get('total_before_rd',0))
		row.total_round = final_value
		# row.total_before_rd += float(row.get('june', 0) or 0)
		# row.total_before_rd += float(row.get('july', 0) or 0)
		# row.total_before_rd += float(row.get('aug', 0) or 0)
		# row.total_before_rd += float(row.get('sept', 0) or 0)
		# row.total_before_rd += float(row.get('oct', 0) or 0)
		# row.total_before_rd += float(row.get('nov', 0) or 0)
		# row.total_before_rd += float(row.get('dec', 0) or 0)
		# row.total_before_rd += float(row.get('jan', 0) or 0)
		# row.total_before_rd += float(row.get('feb', 0) or 0)
		# row.total_before_rd += float(row.get('march', 0) or 0)
		

	return columns, data
def get_columns(filters):

	year = "2025"
	if filters.get("year"):
		year = filters.get("year") 
	next_year = str(int(year or 2025) + 1)


	common_columns= [
		{"fieldname":"employee", "fieldtype":"Data", "label":"Employee ID", "width":130},
		{"fieldname":"employee_name", "fieldtype":"Data", "label":"Employee Name", "width":160},
		{"fieldname":"department", "fieldtype":"Data", "label":"Department", "width":200},
		{"fieldname":"status", "fieldtype":"Data", "label":"Status", "width":120},
		{"fieldname":"april", "fieldtype":"Data", "label":"April " + year , "width":110},
		{"fieldname":"may", "fieldtype":"Data", "label":"May " + year , "width":110},
		{"fieldname":"june", "fieldtype":"Data", "label":"June " + year , "width":110},
		{"fieldname":"july", "fieldtype":"Data", "label":"July " + year , "width":110},
		{"fieldname":"aug", "fieldtype":"Data", "label":"August " + year , "width":120},
		{"fieldname":"sept", "fieldtype":"Data", "label":"September " + year , "width":140},
		{"fieldname":"oct", "fieldtype":"Data", "label":"October " + year , "width":120},
		{"fieldname":"nov", "fieldtype":"Data", "label":"November " + year , "width":140},
		{"fieldname":"dec", "fieldtype":"Data", "label":"December " + year , "width":140},
		{"fieldname":"jan", "fieldtype":"Data", "label":"January " + next_year , "width":120},
		{"fieldname":"feb", "fieldtype":"Data", "label":"February " + next_year , "width":120},
		{"fieldname":"march", "fieldtype":"Data", "label":"March " + next_year , "width":120},
	]
	if filters.get("show") == "Bonus":
		return common_columns + [
			{"fieldname":"total", "fieldtype":"Float", "label":"Total ", "width":120},
			{"fieldname":"total_round", "fieldtype":"Int", "label":"Total (Round)", "width":130},
		]
	else:
		return common_columns + [
			{"fieldname":"total", "fieldtype":"Float", "label":"Total", "width":120},
		]

	

def get_data(filters):
	conditions = get_conditions(filters)

	year = "2025"
	if filters.get("year"):
		year = filters.get("year") 
	next_year = str(int(year or 2025) + 1)

	show = "Bonus"
	if filters.get("show"):
		show = filters.get("show")

	april = ""
	may = ""
	june = ""
	july = ""
	aug = ""
	sept = ""
	oct = ""
	nov = ""
	dec = ""
	jan = ""
	feb = ""
	march = ""
	


	if show == "Bonus" :
		april = bonus_query(4, int(year), 'april')
		may = bonus_query(5, int(year), 'may')
		june = bonus_query(6, int(year), 'june')
		july = bonus_query(7, int(year), 'july')
		aug = bonus_query(8, int(year), 'aug')
		sept = bonus_query(8, int(year), 'sept')
		oct = bonus_query(10, int(year), 'oct')
		nov = bonus_query(11, int(year), 'nov')
		dec = bonus_query(12, int(year), 'dec')
		jan = bonus_query(1, int(next_year), 'jan')
		feb = bonus_query(2, int(next_year), 'feb')
		march = bonus_query(3, int(next_year), 'march')
	

	if show == "Basic Amount" :
		april = basic_amount_query(4, int(year), 'april')
		may = basic_amount_query(5, int(year), 'may')
		june = basic_amount_query(6, int(year), 'june')
		july = basic_amount_query(7, int(year), 'july')
		aug = basic_amount_query(8, int(year), 'aug')
		sept = basic_amount_query(8, int(year), 'sept')
		oct = basic_amount_query(10, int(year), 'oct')
		nov = basic_amount_query(11, int(year), 'nov')
		dec = basic_amount_query(12, int(year), 'dec')
		jan = basic_amount_query(1, int(next_year), 'jan')
		feb = basic_amount_query(2, int(next_year), 'feb')
		march = basic_amount_query(3, int(next_year), 'march')


	if show == "Pay Days" :
		april = pay_day_query(4, int(year), 'april')
		may = pay_day_query(5, int(year), 'may')
		june = pay_day_query(6, int(year), 'june')
		july = pay_day_query(7, int(year), 'july')
		aug = pay_day_query(8, int(year), 'aug')
		sept = pay_day_query(8, int(year), 'sept')
		oct = pay_day_query(10, int(year), 'oct')
		nov = pay_day_query(11, int(year), 'nov')
		dec = pay_day_query(12, int(year), 'dec')
		jan = pay_day_query(1, int(next_year), 'jan')
		feb = pay_day_query(2, int(next_year), 'feb')
		march = pay_day_query(3, int(next_year), 'march')

	query = f"""SELECT 
					te.employee,
					te.employee_name,
					te.department,
					te.status,
					{april},
					{may},
					{june},
					{july},
					{aug},
					{sept},
					{oct},
					{nov},
					{dec},
					{jan},
					{feb},
					{march}
				FROM tabEmployee te
				WHERE {conditions}
				GROUP BY te.employee
				"""
	
	return frappe.db.sql(query, as_dict=1,)

def bonus_query(month, year, name) :
	query = f""" (  SELECT 
						CASE 
							WHEN tsd.amount >= 21000 THEN 0
							WHEN tsd.amount < 21000 AND tsd.amount >= 7000 THEN ((7000 * 8.33 / 100))
							WHEN tsd.amount < 7000 THEN  (ROUND(tsd.amount * 8.33 / 100, 2))
							ELSE 0
						END  bonus
					FROM `tabSalary Slip` tss 
					JOIN `tabSalary Detail` tsd ON tss.name = tsd.parent AND tsd.abbr = 'B' 
					WHERE tss.employee = te.employee
						AND MONTH(tss.start_date) = {month} 
						AND YEAR(tss.start_date) = {year} 
					LIMIT 1 ) `{name}` """
	return query


def basic_amount_query(month, year, name) :
	query = f""" (  SELECT tsd.amount 
					FROM `tabSalary Slip` tss 
					JOIN `tabSalary Detail` tsd ON tss.name = tsd.parent AND tsd.abbr = 'B' 
					WHERE tss.employee = te.employee
						AND MONTH(tss.start_date) = {month} 
						AND YEAR(tss.start_date) = {year} 
					LIMIT 1 ) `{name}` """
	return query


def pay_day_query(month, year, name) :
	query = f""" (  SELECT tss.payment_days 
					FROM `tabSalary Slip` tss 
					WHERE tss.employee = te.employee
						AND MONTH(tss.start_date) = {month} 
						AND YEAR(tss.start_date) = {year} 
					LIMIT 1 ) `{name}` """
	return query

def get_conditions(filters):
	conditions = ""

	if filters.get("company"):
		conditions += " te.company = '" + filters.get("company") +"' " 
	
	if filters.get("employee"):
		conditions += f" AND te.employee =  '" + filters.get("employee") +"' "

	if filters.get("status"):
		conditions += f" AND te.status =  '" + filters.get("status") +"' "

	return conditions
