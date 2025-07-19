# # Copyright (c) 2025, Pink city IT team and contributors
# # For license information, please see license.txt

import frappe
from frappe.model.document import Document

class DailyTransaction(Document):
	pass

@frappe.whitelist()
def submit_daily_transaction():
    daily_t_data = frappe.db.get_all('Daily Transaction',
        filters={
            'docstatus': 0
        },
        fields=['*'],
        order_by='creation desc',
    )
    for transaction in daily_t_data:
        doc = frappe.get_doc('Daily Transaction', transaction.name)        
        if doc.docstatus == 0:
            doc.submit()

# def send_daily_report():
#     now = datetime.datetime.now()
#     if now.minute == 1:
#         # Logic to generate and send the report
#         frappe.sendmail(recipients=["akansha.saxena@pinkcityindia.com"], subject="Daily Report", message="Here's the daily report.")
#         frappe.logger().info("Daily report sent successfully")



# your_app/your_module/doctype/daily_transaction/auto_submit.py

# def auto_submit_daily_transactions():
#     docs = frappe.get_all("Daily Transaction", filters={"docstatus": 0})
#     for d in docs:
#         try:
#             doc = frappe.get_doc("Daily Transaction", d.name)
#             doc.submit()
#             frappe.db.commit()
#         except Exception as e:
#             frappe.log_error(f"Auto Submit Failed for {d.name}: {e}", "Daily Transaction Auto Submit")
