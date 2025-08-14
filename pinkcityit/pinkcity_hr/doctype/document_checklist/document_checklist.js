// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on('Document Checklist', {
	// refresh: function(frm) {

	// }
});
const DOCUMENTS = [{
	"name": "Resume/CV",
	"category": "Staff",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Employment Form (Interview Form)",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Photographs",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Test Papers And Results (Trail Form)",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Joining Form",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Index Form",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Previous Company Verification",
	"category": "Staff",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Offer Letter",
	"category": "Staff",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "1",
},
{
	"name": "Investment Declereation Form",
	"category": "Staff",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "PF Registration",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "ESIC Registration",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "Form 'F' (Gratuity Form)",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "ESIC E Pehchan Card Print Out",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "Form-2 (Nomination Form)",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "Cost To Company-Structure",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "Company ID CARD",
	"category": "Both",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "LOI / Appointment",
	"category": "Worker",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "NDA",
	"category": "Staff",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "Uniform",
	"category": "Worker",
	"sod": "Current Employer",
	"use_by": "HR",
	"section": "2",
},
{
	"name": "10th Mark Sheet",
	"category": "Both",
	"sod": "Educational",
	"use_by": "HR",
	"section": "3",
},
{
	"name": "12th Mark Sheet",
	"category": "Both",
	"sod": "Educational",
	"use_by": "HR",
	"section": "3",
},
{
	"name": "Degree Certificate / Provisional Degree Certificate",
	"category": "Both",
	"sod": "Educational",
	"use_by": "HR",
	"section": "3",
},
{
	"name": "Graduate Certificate",
	"category": "Both",
	"sod": "Educational",
	"use_by": "HR",
	"section": "3",
},
{
	"name": "Post-Graduate Certificate",
	"category": "Both",
	"sod": "Educational",
	"use_by": "HR",
	"section": "3",
},
{
	"name": "Any Other Degree / Certificate",
	"category": "Both",
	"sod": "Educational",
	"use_by": "HR",
	"section": "3",
},
{
	"name": "Appointment Letter Of Previous Company",
	"category": "Both",
	"sod": "Previous",
	"use_by": "HR",
	"section": "4",
},
{
	"name": "Last Three Month Salary Slip / Bank Statement",
	"category": "Both",
	"sod": "Previous",
	"use_by": "HR",
	"section": "4",
},
{
	"name": "Relieving Letter Employers",
	"category": "Both",
	"sod": "Previous",
	"use_by": "HR",
	"section": "4",
},
{
	"name": "Experience Letter",
	"category": "Both",
	"sod": "Previous",
	"use_by": "HR",
	"section": "4",
},
{
	"name": "Form 16",
	"category": "Staff",
	"sod": "Previous",
	"use_by": "HR",
	"section": "4",
},
{
	"name": "Any Other",
	"category": "Both",
	"sod": "Previous",
	"use_by": "HR",
	"section": "4",
},
{
	"name": "PAN Card Copy",
	"category": "Both",
	"sod": "ID Proof",
	"use_by": "HR",
	"section": "5",
},
{
	"name": "Aadhar Card Copy",
	"category": "Both",
	"sod": "ID Proof",
	"use_by": "HR",
	"section": "5",
},
{
	"name": "ID Proof & DOB Prof, Driving Licence, Voter ID",
	"category": "Both",
	"sod": "ID Proof",
	"use_by": "HR",
	"section": "5",
},
{
	"name": "Bank Passbook Copy / Cheque Book Copy",
	"category": "Both",
	"sod": "ID Proof",
	"use_by": "HR",
	"section": "5",
},
{
	"name": "File Check (All Documents Are Listed As Per Check List)",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "Essl Registration (Biomatric Code Issue)",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "ERP Registration",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "Appointment Letter",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "Confirmation Letter",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "Promotion Letter",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "Transfer Letter",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "Other Letter",
	"category": "Both",
	"sod": "Payroll Registration Process",
	"use_by": "Payroll",
	"section": "6",
},
{
	"name": "Resignation / NODUES",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "Exit Interview Form",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "F&F Sheet",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "Essl Exit (Biomatric)",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "ERP Exit",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "ESI Exit",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "PF Exit",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "Gratuity Exit",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
{
	"name": "Any Other",
	"category": "Both",
	"sod": "Exit Process",
	"use_by": "Payroll",
	"section": "7",
},
]

const DC_TABLE_FIELDNAME = "document_checklist_table";

const PAYROLL_ROLES = ["Payroll"]

frappe.ui.form.on('Document Checklist', {
	refresh(frm) {
		// your code here
		// setupDocuments(frm);
		payrollReadOnly(frm);
		disableDragDrop(frm, DC_TABLE_FIELDNAME)
		removeTableButtons(frm, DC_TABLE_FIELDNAME);
		detectTableRowClick(frm);
		correctDocuments();
		removeCheckButtons(frm, DC_TABLE_FIELDNAME);
	},
	category: (frm) => {
		setupDocuments(frm);
		payrollReadOnly(frm);
	}
})

function getFrm(frm) {
	return frm ? frm : cur_frm
}

function any(iterable) {
	for (var index = 0; index < iterable.length; index++) {
		if (iterable[index]) return true;
	}
	return false;
}

function all(iterable) {
	for (var index = 0; index < iterable.length; index++) {
		if (!iterable[index]) return false;
	}
	return true;
}

function containsAny(main_arr, search_arr) {
	var temp = []
	main_arr.forEach(item => {
		temp.push(search_arr.indexOf(item) >= 0 ? true : false)
	})
	return any(temp)
}

function clearTableData(frm, table_fieldname) {
	frm.clear_table(table_fieldname);
}

function getAvailableDocuments(frm) {
	var frm = getFrm(frm)
	try {
		var data = frm.doc[DC_TABLE_FIELDNAME];
		var new_data = []
		var new_data_names = []
		if (data.length > 0) {
			data.forEach(d => {
				if (d.available) {
					new_data.push(d)
					new_data_names.push(d.document)
				}
			})
		}
		return [new_data, new_data_names]
	} catch (err) {
		return [
			[],
			[]
		]
	}

}

function isDocumentsAvailable(available_documents) {
	try {
		if (available_documents[0].length > 0) {
			return true
		}
	} catch (err) { }
	return false
}

function findInAvailableDocuments(available_documents, name) {
	var document_names = available_documents[1];
	return document_names.indexOf(name) >= 0 ? true : false
}

// function disable_drag_drop(frm, table_fieldname) {
//     frm.page.body.find(`[data-fieldname="${table_fieldname}"] [data-idx] .row-index`).removeClass('sortable-handle');
// }

function disableDragDrop(frm, table_fieldname) {
	var grid_rows = frm.fields_dict[table_fieldname].grid.grid_rows;
	$.map(grid_rows, (grid_row) => {
		var child_nodes = grid_row.row[0].childNodes;
		if (child_nodes) {
			$(child_nodes[0]).removeClass('sortable-handle');
		}
	})
}

function setupDocuments(frm) {
	var frm = getFrm(frm);
	var category = frm.doc.category;

	var available_documents = getAvailableDocuments(frm);

	clearTableData(frm, DC_TABLE_FIELDNAME)

	DOCUMENTS.forEach((item, index) => {
		if (item.category == category | item.category == "Both") {

			var row = frm.add_child(DC_TABLE_FIELDNAME);
			row.document = item.name;
			row.sod = item.sod;
			row.category = category;
			row.use_by = item.use_by;
			row.section = item.section

			if (isDocumentsAvailable(available_documents)) {
				if (findInAvailableDocuments(available_documents, item.name)) {
					row.available = 1
				}
			}

		}
	})
	frm.refresh_fields(DC_TABLE_FIELDNAME);
	removeTableButtons(frm, DC_TABLE_FIELDNAME);
	detectTableRowClick(frm);
}

function handleRowColor(frm, table_fieldname, index, read_only) {
	var row = frm.fields_dict[table_fieldname].grid.get_row(index)
	var wrapper = row.wrapper;
	if (wrapper.length > 0) {
		var row_div = wrapper[0];
		if (read_only) {
			row_div.style.backgroundColor = "#fff5f5"
			// row_div.style.color = "#ffffff"
		} else {
			row_div.style.backgroundColor = "#f5fff6"
			// row_div.style.color = "#ffffff"
		}
	}
}

function payrollReadOnly(frm) {
	var user_roles = frappe.user_roles;
	var role_check = containsAny(user_roles, PAYROLL_ROLES)

	var rows = frm.fields_dict[DC_TABLE_FIELDNAME].get_value()

	$.map(rows, (item, index) => {
		var grid_row = frm.fields_dict[DC_TABLE_FIELDNAME].grid.get_row(index)

		var read_only = !role_check;

		if (read_only && item.use_by == "Payroll") {
			grid_row.docfields.forEach((df) => {
				if (!df.read_only) {
					df.read_only = read_only
				}
			})
			handleRowColor(frm, DC_TABLE_FIELDNAME, index, read_only);
		} else {
			handleRowColor(frm, DC_TABLE_FIELDNAME, index, false);
		}

	})
}

function toggleAvailable(grid_row) {
	if (!grid_row.on_grid_fields_dict.available.df.read_only) {
		var frm = getFrm();
		grid_row.doc.available = !grid_row.doc.available
		frm.refresh_fields(DC_TABLE_FIELDNAME);
		// frm.refresh()
		frm.doc.__unsaved = 1
		frm.page.set_indicator("Not Saved", "orange")
		// pureSave(frm);
	}
}

function removeTableButtons(frm, table_fieldname) {
	var row_button_class_list = [".grid-move-row", ".grid-duplicate-row", ".grid-insert-row", ".grid-insert-row-below", ".grid-delete-row"]
	var table = frm.fields_dict[table_fieldname];
	var grid_rows = table.grid.grid_rows;

	function removeRowButtons(wrapper) {
		try {
			$.map(row_button_class_list, btn => {
				var item = wrapper.querySelector(btn)
				item.remove();
			})
		} catch (err) {

		}
	}
	try {
		$.map(grid_rows, grid_row => {
			var wrapper = grid_row.wrapper[0];
			// console.log("grid_row.wrapper : ", wrapper)
			var open_form_button = grid_row.open_form_button[0];
			// var data_row = wrapper.querySelector(".data-row.row")
			open_form_button.addEventListener("click", (event) => {
				event.stopPropagation();
				removeRowButtons(wrapper)
			})
			open_form_button.onclick = (event) => {
				event.stopPropagation();
				removeRowButtons(wrapper)
			}
			wrapper.onclick = (event) => {
				event.stopPropagation();
				removeRowButtons(wrapper)
				toggleAvailable(grid_row);

			}
		})

		var grid_buttons = table.grid.grid_buttons;
		$.map(grid_buttons, grid_button => {
			grid_button.remove()
		})
	} catch (err) {
		console.log("Error : ", err)
	}


}

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();

	return div.firstChild;
}

function createSelector(selector_list, symbol) {
	symbol = symbol ? symbol : "."
	var selector = ""


	selector_list.forEach(item => {
		selector += symbol + item
	})
	return selector
}

function removeCheckButtons(frm, table_fieldname) {
	var table = frm.fields_dict[table_fieldname];
	var grid_rows = [...table.grid.grid_rows];
	grid_rows.push(frm.fields_dict[table_fieldname].grid.header_row)
	$.map(grid_rows, grid_row => {
		var wrapper = grid_row.wrapper[0];
		var row_check_html = createElementFromHTML(grid_row.row_check_html);
		var class_list = [...row_check_html.classList]
		var class_selector = createSelector(class_list, ".")
		var check = wrapper.querySelector(class_selector)
		check.remove();
	})
}


var lastSelectedRow = null;

function detectTableRowClick(frm) {
	function handleOnClick(grid_rows, target_row) {
		try {
			grid_rows = [...grid_rows]
			var click_index = grid_rows.indexOf(target_row)
			var grid_row = frm.fields_dict[DC_TABLE_FIELDNAME].grid.get_row(click_index);
			// var row_data = frm.fields_dict[DC_TABLE_FIELDNAME].grid.data[click_index];
			// last_design_no = row_data.id_no;
			// last_design_code = row_data.design_code;
			toggleAvailable(grid_row)
		} catch (err) {

		}
	}

	try {
		var parent = frm.fields_dict[DC_TABLE_FIELDNAME].grid.parent;
		var form_grid = parent.querySelector(`div.form-grid`);
		var grid_body = form_grid.querySelector("div.grid-body");
		var grid_rows = grid_body.querySelectorAll("div.data-row");

		// Create a new instance of MutationObserver
		var observer = new MutationObserver(function (mutationsList) {
			for (var mutation of mutationsList) {
				var target = mutation.target;
				if (mutation.attributeName === 'class') {
					if (target != lastSelectedRow & target.classList.contains("editable-row")) {
						handleOnClick(grid_rows, target)
					}
					// Your logic when the class changes
				} else {
					lastSelectedRow = target;
				}
			}
		});

		// Start observing the target element for attribute changes

		$.map(grid_rows, (grid_row) => {
			observer.observe(grid_row, {
				attributes: true
			});
			// grid_row.onclick = (event)=>{
			//     handleOnClick(grid_rows, grid_row)
			// };
		})
	} catch (err) {

	}

}

function notEmpty(value) {
	return value ? true : false
}

function pureCall(frm, action, callback = null) {
	// Save Actions : ["Save", "Update", "Amend", "Cancel"]
	// specified here because there are keyboard shortcuts to save
	var working_label = {
		"Save": __("Saving", null, "Freeze message while saving a document"),
		"Submit": __("Submitting", null, "Freeze message while submitting a document"),
		"Update": __("Updating", null, "Freeze message while updating a document"),
		"Amend": __("Amending", null, "Freeze message while amending a document"),
		"Cancel": __("Cancelling", null, "Freeze message while cancelling a document"),
	}[toTitle(action)];

	var freeze_message = working_label ? __(working_label) : "";

	frappe.call({
		method: "frappe.desk.form.save.savedocs",
		args: {
			doc: frm.doc,
			action: action
		},
		callback: function (r) {
			$(document).trigger("save", [frm.doc]);
			if (notEmpty(callback)) {
				callback(r);
			}
		},
		error: function (r) {
			if (notEmpty(callback)) {
				callback(r);
			}
		},
		btn: "",
		freeze_message: freeze_message
	})
}

function pureSave(frm, callback = null) {
	pureCall(frm, "Save", callback);
}

function correctDocuments() {
	var frm = getFrm();
	var category = frm.doc.category;
	var data = frm.doc[DC_TABLE_FIELDNAME];
	var FILTER_DOCUMENTS = [];
	if (data.length) {
		DOCUMENTS.forEach((item, index) => {
			if (item.category == category | item.category == "Both") {
				FILTER_DOCUMENTS.push(item)
			}

			try {
				var grid_row = frm.fields_dict[DC_TABLE_FIELDNAME].grid.get_row(index)
				grid_row.docfields.forEach((df) => {
					if (!df.read_only && df.fieldname == "document") {
						df.read_only = true
					}
				})
			} catch (err) {

			}
		})

		FILTER_DOCUMENTS.forEach((item, index) => {
			var d = data[index];
			d.document = item.name;
		})
		frm.refresh_fields(DC_TABLE_FIELDNAME);
		// frm.save()
	}
}

$(document).on("form-load", () => {
	var frm = getFrm();
	if (frm.doc.__islocal) {
		setupDocuments(frm)
	}
	removeTableButtons(frm, DC_TABLE_FIELDNAME);
})


window.containsAny = containsAny
window.all = all
window.any = any
window.disableDragDrop = disableDragDrop