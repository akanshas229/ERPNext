# Copyright (c) 2025, pinkcity and contributors
# For license information, please see license.txt

import frappe, pymssql
from frappe.model.document import Document

class DailyTransaction(Document):
	pass


			
@frappe.whitelist()
def get_bag_details():
    # data = {}
    # data['status'] = False
    # data['data'] = []
    # data['msg'] = "Something Went Wrong."
    
    server = '192.168.2.5'
    user = 'Pankaj.Kumar'
    password = 'admin@123'
    database = 'Emr'
    try:
        # bag_no = '24/P/12207'
        bag_no = frappe.form_dict.get("bag_no", "")
        company_name = frappe.form_dict.get("company_code", 'PC')

        
        company_code = "PC"

        if company_name == "Pinkcity Jewelhouse Private Limited- Unit 1":
            server = '192.168.5.88'
            company_code = "PJ"
        

        if company_name == "Pinkcity Jewelhouse Private Limited-Unit 2":
            server = '192.168.5.88'
            company_code = "PJ2"

        conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
        cursor = conn.cursor(as_dict=True)
        
                        # (SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_qty,
                        # (SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'D' ) dia_qty
                        # (SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_wt,
                        # (SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'D' ) dia_wt,
                        # (SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo AND OrRmCtg NOT IN ('C', 'D') ) bom_wt
                        

        # connectionString = f"DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={user};PWD={password};Trusted_Connection=yes;Encrypt=no;"
        # connectionString = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};UID={user};PWD={password};TrustServerCertificate=yes;Trusted_Connection=yes;Encrypt=no;"
        # connectionString = f"DRIVER=/usr/lib/x86_64-linux-gnu/libodbc.so;SERVER={server};DATABASE={database};UID={user};PWD={password};TrustServerCertificate=yes;Trusted_Connection=yes"
        # conn = pyodbc.connect(connectionString)

        query = f"""SELECT 
                        Bag.BIdNo, Bag.BOdDmCd, Bag.BQty,
                        CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) order_no,
                        CONCAT(BYy, '/', BChr, '/', BNo) bag_no,
                        OrdMst.OmCmCd,
                        OrdDsg.OdCmStmpInst,
                        (SELECT MAX(DsgMst.DmCtg) FROM DsgMst WHERE DsgMst.DmIdNo = BDmIdNo ) DmCtg,
                        (SELECT MAX(CustMst.CmName) FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer_name
                    FROM Bag 
                    JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
                    JOIN OrdDsg ON OrdDsg.OdIdNo = Bag.BOdIdNo
                    LEFT JOIN CustMst ON CustMst.CmCd = OrdMst.OmCmCd
                    WHERE 
                        CONCAT(BYy, '/', BChr, '/', BNo)  = '{bag_no}'
                        AND Bag.BCoCd = '{company_code}' """

        cursor.execute(query)
        row = cursor.fetchone()
        if row.get("bag_no", False) :
            frappe.response['status'] = True
            frappe.response['data'] = row
            frappe.response['msg'] = "Bag details found"
        else :
            frappe.response['status'] = False
            frappe.response['data'] = row
            frappe.response['msg'] = "Bag details not found"
        
        cursor.close()
        conn.close()
    except Exception as e :
        frappe.response['status'] = False
        frappe.response['data'] = []
        frappe.response['msg'] = e

    # frappe.response['server'] = server
    # frappe.response['user'] = user
    # frappe.response['password'] = password
    # frappe.response['database'] = database
    
    # frappe.response["data"] = data



			
@frappe.whitelist()
def get_bag_more_details():
    
    server = '192.168.2.5'
    user = 'Pankaj.Kumar'
    password = 'admin@123'
    database = 'Emr'
    try:
        bag_no = frappe.form_dict.get("bag_no", "")
        company_name = frappe.form_dict.get("company_code", 'PC')

        
        company_code = "PC"

        if company_name == "Pinkcity Jewelhouse Private Limited- Unit 1":
            server = '192.168.5.88'
            company_code = "PJ"
        

        if company_name == "Pinkcity Jewelhouse Private Limited-Unit 2":
            server = '192.168.5.88'
            company_code = "PJ2"

        conn = pymssql.connect(server=server, user=user, password=password, database=database, port=1433,  tds_version=r'7.0')
        cursor = conn.cursor(as_dict=True)


        # (SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_wt,
        # (SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'D' ) dia_wt,

                        # (SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' AND OrSetScd LIKE 'W%' ) stone_wset_qty,
                        # (SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' AND OrSetScd NOT LIKE 'W%' ) stone_hset_qty,

        query = f"""SELECT 
                        Bag.BIdNo, Bag.BOdDmCd, Bag.BQty,
                        CONCAT(BOdTc, '/', BOdYy, '/', BOdChr, '/', BOdNo) order_no,
                        CONCAT(BYy, '/', BChr, '/', BNo) bag_no,
                        OrdMst.OmCmCd,
                        OrdDsg.OdCmStmpInst,
                        (SELECT MAX(DsgMst.DmCtg) FROM DsgMst WHERE DsgMst.DmIdNo = BDmIdNo ) DmCtg,
                        (SELECT MAX(CustMst.CmName) FROM CustMst WHERE CustMst.CmCd = OrdMst.OmCmCd ) customer_name,
                        (SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_qty,
                        (SELECT SUM(OrdRm.OrWsQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_wset_qty,
                        (SELECT SUM(OrdRm.OrHsQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'C' ) stone_hset_qty,
                        (SELECT SUM(OrdRm.OrQty) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo and OrRmCtg = 'D' ) dia_qty,
                        (SELECT SUM(OrdRm.OrWt) FROM OrdRm WHERE OrdRm.OrOdIdNo = Bag.BOdIdNo AND OrRmCtg NOT IN ('C', 'D') ) bom_wt
                    FROM Bag 
                    JOIN OrdMst ON OrdMst.OmIdNo = Bag.BOmIdNo
                    JOIN OrdDsg ON OrdDsg.OdIdNo = Bag.BOdIdNo
                    LEFT JOIN CustMst ON CustMst.CmCd = OrdMst.OmCmCd
                    WHERE 
                        CONCAT(BYy, '/', BChr, '/', BNo)  = '{bag_no}'
                        AND Bag.BCoCd = '{company_code}' """

        cursor.execute(query)
        row = cursor.fetchone()
        if row.get("bag_no", False) :
            frappe.response['status'] = True
            frappe.response['data'] = row
            frappe.response['msg'] = "Bag details found"
        else :
            frappe.response['status'] = False
            frappe.response['data'] = row
            frappe.response['msg'] = "Bag details not found"
        
        cursor.close()
        conn.close()
    except Exception as e :
        frappe.response['status'] = False
        frappe.response['data'] = []
        frappe.response['msg'] = e


@frappe.whitelist()
def submit_daily_transaction():
    daily_t_data = frappe.get_all(
        'Daily Transaction',
        filters={'docstatus': 0},
        fields=['*'],
    )
    
    for transaction in daily_t_data:
        doc = frappe.get_doc('Daily Transaction', transaction.name)
        doc.submit()