// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt


frappe.ui.form.on("Appointment Letter Pinkcity", {
  refresh(frm) {
    // your code here
  },
  employee: (frm) => {
    frappe.db.get_doc('Employee', frm.doc.employee).then(doc => {
      console.log(doc)
      })

      frappe.db.get_list('Salary Structure Assignment', {
        fields: ['name', 'employee'],
        filters: {
          employee: frm.doc.employee,
          docstatus: 1
        },
        order_by: 'modified desc'
      }).then(records => {
        for(let i=0; i<records.length; i++){
          frm.set_value('salary_structure_id', records[0].name)
        }
        get_salary_detail(frm)
      })

  },
});


function get_salary_detail(frm) {
  console.clear();
    frappe.show_progress("Loading..", 0, 100, "Please wait");
    frappe
      .call({
        method:"pinkcityit.pinkcity_hr.doctype.appointment_letter_pinkcity.appointment_letter_pinkcity.get_salary_detail",
        args: {
          employee_docname: frm.doc.employee,
          salary_structure_assignment_docname: frm.doc.salary_structure_id,
        },
        callback: function (result, rt) {
          if (frm.doc.employee) {
            frappe.show_progress("Loading..", 100, 100, "Success!");
          } else {
            frappe.show_progress("Loading..", 100, 100, "Failed!");
          }
          var data = result.message;
          if (data) {
            // console.log("data : ", data);
            frm.set_value("json_data", JSON.stringify(data));
          }
        },
        error: function (err) {
          // console.log("Error : ", err);
          frappe.show_progress("Loading..", 100, 100, "Failed!");
        },
      })
      .then(() => {
        // Automatic Start
        setTimeout(() => {
          frappe.hide_progress();
        }, 1500);
        if (frm.doc.employee) {
          try {
            setTimeout(() => {
              // frm.save().then(() => {
              //   setTimeout(() => {
              //     frm.print_doc();
              //   }, 500);
              // });
            }, 500);
          } catch (err) {}
        }
        // Automatic End
      });
}
