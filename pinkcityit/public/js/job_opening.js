frappe.ui.form.on("Job Opening", {
  refresh(frm) {

        if( ( !frm.is_new() && frm.doc.status=="Open" )  ) {
            frm.add_custom_button(__("Copy Link"), function() {
                frappe.utils.copy_to_clipboard('https://reports.pinkcityindia.com/api/erp/job-apply3?job_id='+frm.doc.name+'&host='+window.location.host)
            });
        }
        
    if(frm.doc.workflow_state == "Draft" && !frm.is_new()) {
        // frm.set_intro('Please check and update job opening details and proceed to next stage', 'red');
        frm.set_intro('Please check details and send it for management approval', 'red');
    }
  }
});
