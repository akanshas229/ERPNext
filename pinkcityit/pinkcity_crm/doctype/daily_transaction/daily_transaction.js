frappe.ui.form.on('Daily Transaction', {


	refresh(frm) {
		// your code here.


	},
	scan: function (frm) {
		const scanner = new frappe.ui.Scanner({
			dialog: true, // open camera scanner in a dialog
			multiple: false, // stop after scanning one value
			on_scan(data) {
				// handle_scanned_barcode(data.decodedText);
				console.log(data);
				// update_bag_transaction(frm, data.decodedText);
			}
		});
	},
	barcode: function (frm) {
		if (frm.doc.barcode) {
			var barcode = frm.doc.barcode.replace('\n', '');
			barcode = barcode.trim();
			fetchEmployeeDetails(frm, barcode, 'barcode', 'bag_transaction', 'employee_code', 'employee_name', 'sub_department', 'designation');
		}
	},

	company: function (frm) {
		if (frm.doc.company) {
			frm.set_value('re_work_company', frm.doc.company);
			frm.set_value('mix_work_company', frm.doc.company);
		}
	},

	re_work_barcode: function (frm) {
		if (frm.doc.re_work_barcode) {
			var re_work_barcode = frm.doc.re_work_barcode.replace('\n', '');
			re_work_barcode = re_work_barcode.trim();
			fetchEmployeeDetails(frm, re_work_barcode, 're_work_barcode', 're_work_daily', 're_work_emp_code', 're_work_emp_name', 're_work_sub_dpt', 're_work_designation');
		}
	},

	mix_work_barcode: function (frm) {
		if (frm.doc.mix_work_barcode) {
			var mix_work_barcode = frm.doc.mix_work_barcode.replace('\n', '');
			mix_work_barcode = mix_work_barcode.trim();
			fetchEmployeeDetails(frm, mix_work_barcode, 'mix_work_barcode', 'mix_work_daily', 'mix_work_emp_code', 'mix_work_emp_name', 'mix_work_sub_dpt', 'mix_work_designation');
		}
	},


});



frappe.ui.form.on("DT Bag Transaction", {
	out_time: function (frm, cdt, cdn) {
		updateOutTimeManually(frm, cdt, cdn)
	},
	in_quantity: function (frm, cdt, cdn) {
		frm.enable_save();
		var child = locals[cdt][cdn];
		frappe.model.set_value(cdt, cdn, 'diff_qty', parseFloat(checkDigit(child.in_quantity)) - parseFloat(checkDigit(child.out_quantity)));
		if (child.in_quantity > child.bag_quantity) {
			frappe.model.set_value(cdt, cdn, 'in_quantity', 0);
			frappe.throw("In Quantity should be less than Bag Quantity");
			frm.disable_save();
		}
	},
	out_quantity: function (frm, cdt, cdn) {
		frm.enable_save();
		var child = locals[cdt][cdn];
		frappe.model.set_value(cdt, cdn, 'diff_qty', parseFloat(checkDigit(child.in_quantity)) - parseFloat(checkDigit(child.out_quantity)));
		if (child.out_quantity > child.in_quantity) {
			frappe.model.set_value(cdt, cdn, 'out_quantity', 0);
			frappe.throw("Out Quantity should be less than IN Quantity");
			frm.disable_save();
		}
	},


	update_out_time: function (frm, cdt, cdn) {
		updateOutTime(frm, cdt, cdn);
	},


});


function update_bag_transaction(frm, data, field_name, table_name, emp_code, emp_name, emp_sub_dpt, emp_designation) {
	frappe.dom.freeze();
	console.log("data : ", data);
	// frm.set_value(field_name, '');
	if (frm.doc[emp_code]) {
		$.ajax({
			url: "https://reports.pinkcityindia.com/api/emr/checkBagDetails",
			type: "get",
			data: {
				'bag_no': data,
				'company_code': frm.doc.company,
			},
			dataType: "json",
			beforeSend: function (request) {
				request.withCredentials = false;
			},
			success: function (obj) {
				frappe.dom.unfreeze();
				console.log("Response:", obj);
				if (obj.status) {

					var check_bag = 0;
					if (frm.doc[table_name]) {
						for (let i = 0; i < frm.doc[table_name].length; i++) {
							if (obj.data.bag_data.bag_no == frm.doc[table_name][i].bag_no && frm.doc[table_name][i].employee_code == frm.doc[emp_code]) {
								// check_bag = 1;

								if (frm.doc[table_name][i].out_time) {
									// check_bag = 0;
									// console.log("hi25:");
									// frappe.warn('Are you sure you want to update out time again ?',
									// 'This will update out time again for bag ' + data,
									// 		() => {
									// 				updateOutTime(frm, frm.doc.bag_transaction[i].doctype, frm.doc.bag_transaction[i].name)
									// 		},
									// 		'Continue',
									// 		true // Sets dialog as minimizable
									// )
								} else {
									check_bag = 1;
									console.log("hi26:");
									frm.doc[table_name][i].out_time = frappe.datetime.get_datetime_as_string();
									frm.doc[table_name][i].out_quantity = frm.doc[table_name][i].bag_quantity;
									frm.doc[table_name][i].diff_qty = parseFloat(checkDigit(frm.doc[table_name][i].in_quantity)) - parseFloat(checkDigit(frm.doc.bag_transaction[i].out_quantity));
									frm.doc[table_name][i].difference_minute = moment(frm.doc[table_name][i].out_time).diff(frm.doc[table_name][i].in_time, 'minutes', true);
									frm.refresh_fields("bag_transaction");
									frm.save();

									frappe.show_alert({
										message: __('Bag ' + frm.doc[table_name][i].bag_no + ' out time is updated.'),
										indicator: 'green'
									}, 5);
								}


							}
						}
					}

					console.log("check_bag : ", check_bag);

					if (check_bag == 0) {
						if (obj.data.bag_data) {

							console.log("hi27:");
							var childTable = frm.add_child(table_name);
							childTable.bag_no = obj.data.bag_data.bag_no;
							childTable.order_no = obj.data.bag_data.order_no;
							childTable.bag_id = obj.data.bag_data.BIdNo;
							childTable.design_code = obj.data.bag_data.BOdDmCd;
							childTable.bag_quantity = obj.data.bag_data.BQty;
							childTable.in_quantity = obj.data.bag_data.BQty;
							childTable.diff_qty = obj.data.bag_data.BQty;
							childTable.customer_code = obj.data.bag_data.OmCmCd;
							childTable.customer_name = obj.data.bag_data.customer_name;
							childTable.in_time = frappe.datetime.get_datetime_as_string();
							childTable.employee_code = frm.doc[emp_code];
							childTable.employee_name = frm.doc[emp_name];
							childTable.sub_department = frm.doc[emp_sub_dpt];
							childTable.designation = frm.doc[emp_designation];
							childTable.stone_quantity = parseFloat(checkDigit(obj.data.bag_data.stone_qty)).toFixed(3);
							childTable.diamond_quantity = parseFloat(checkDigit(obj.data.bag_data.dia_qty)).toFixed(3);
							childTable.design_bom_weight = parseFloat(checkDigit(obj.data.bag_data.bom_wt)).toFixed(3);
							childTable.total_stone_quantity = parseFloat(parseFloat(checkDigit(obj.data.bag_data.BQty)) * parseFloat(checkDigit(obj.data.bag_data.stone_qty))).toFixed(3);
							childTable.total_diamond_quantity = parseFloat(parseFloat(checkDigit(obj.data.bag_data.BQty)) * parseFloat(checkDigit(obj.data.bag_data.dia_qty))).toFixed(3);
							childTable.total_design_bom_weight = parseFloat(parseFloat(checkDigit(obj.data.bag_data.BQty)) * parseFloat(checkDigit(obj.data.bag_data.bom_wt))).toFixed(3);
							frm.save();

							frappe.show_alert({
								message: __('Bag ' + obj.data.bag_data.bag_no + ' is successfully added.'),
								indicator: 'green'
							}, 5);
						}
					}

					frm.refresh_fields("bag_transaction");

				} else {
					frappe.msgprint(obj.msg);
				}
			},
			error: function (obj) {
				console.log("Error response:", obj);
				frappe.msgprint("Something went wrong.");
			},
		});
	} else {
		frappe.msgprint("Please scan employee barcode first.");
	}
}


function fetchEmployeeDetails(frm, data, field_name, table_name, emp_code, emp_name, emp_sub_dpt, emp_designation) {
	console.log("emp data : ", data)
	// frm.set_value('employee_barcode', '');
	frm.set_value(field_name, '');
	frappe.db.get_list("Employee", {
		fields: ["*"],
		filters: {
			name: data,
			company: frm.doc.company,
			status: 'Active'
		},
	}).then((obj) => {
		if (obj.length == 0) {
			update_bag_transaction(frm, data, field_name, table_name, emp_code, emp_name, emp_sub_dpt, emp_designation);
			// frappe.msgprint("No employee details found for barcode");
		}
		for (var i = 0; i < obj.length; i++) {
			frm.set_value(emp_code, obj[i].name);
			frm.set_value(emp_name, obj[i].employee_name);
			frm.set_value(emp_sub_dpt, obj[i].custom_sub_department);
			frm.set_value(emp_designation, obj[i].designation);

			frappe.show_alert({
				message: __('Employee : ' + obj[i].employee_name + ', is set for Transaction.'),
				indicator: 'green'
			}, 5);
		}
	});
}


function updateOutTime(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var out_time = frappe.datetime.get_datetime_as_string();
	frappe.model.set_value(cdt, cdn, "out_time", out_time);
	frappe.model.set_value(cdt, cdn, "difference_minute", moment(out_time).diff(child.in_time, 'minutes', true));

	frappe.show_alert({
		message: __('Bag ' + child.bag_no + ' out time is updated again.'),
		indicator: 'green'
	}, 5);
}


function updateOutTimeManually(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var out_time = child.out_time;
	// frappe.model.set_value(cdt, cdn, "out_time", out_time);
	frappe.model.set_value(cdt, cdn, "difference_minute", moment(out_time).diff(child.in_time, 'minutes', true));

	frappe.show_alert({
		message: __('Bag ' + child.bag_no + ' out time is updated again.'),
		indicator: 'green'
	}, 5);
}


function checkDigit(value) {
	if (value > 0) {
		return value;
	} else {
		return 0;
	}
}


// function auto_submit_docs(frm) {

// 	if (frm.doc.docstatus === 0) {

// 		frm.doc.docstatus = 1;
// 		frm.save();

// 		frm.doc.auto_submit_attempted = 1;
// 	}
// }


// let code = "";
// let reading = false;
//
// document.addEventListener('keypress', e => {
//   //usually scanners throw an 'Enter' key at the end of read
//    if (e.keyCode === 13) {
//           if(code.length >= 6) {
//             console.log(code);
// 						var barcode = code.replace('\n', '');
// 						barcode = barcode.trim();
// 						fetchEmployeeDetails(cur_frm, barcode);
//             code = "";
//             /// code ready to use
//          }
//     } else {
//         code += e.key; //while this is not an 'enter' it stores the every key
//     }
//
//     //run a timeout of 200ms at the first read and clear everything
//     if(!reading) {
//         reading = true;
//         setTimeout(() => {
//             code = "";
//             reading = false;
//         }, 200);  //200 works fine for me but you can adjust it
//     }
// });



// "daily": [
// 	"your_app.your_module.doctype.your_doctype_name.auto_submit_docs"
// ]