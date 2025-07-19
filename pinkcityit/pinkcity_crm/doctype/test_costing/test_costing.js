frappe.ui.form.on('Test Costing', {


	onload_post_render: function (frm) {

		const $labelsToColor = $(`label.control-label:contains("USD Converstion Rate ($)"),
																			label.control-label:contains("Weight Addition %"),
																			label.control-label:contains("Anti Tarnish"),
																			label.control-label:contains("Gold"),
																			label.control-label:contains("Color"),
																			label.control-label:contains("Gold KT"),
																			label.control-label:contains("Micron"),
																			label.control-label:contains("Plating"),
																			label.control-label:contains("Plating Thickness"),
																			label.control-label:contains("Product Type"),
																			label.control-label:contains("Price UOM"),
																			label.control-label:contains("Customer Name"),
																			label.control-label:contains("Quotation No. / Project Id"),
																			label.control-label:contains("Design Code"),
																			label.control-label:contains("Metal Type"),
																			label.control-label:contains("Metal Loss %"),
																			label.control-label:contains("Costing Currency"),
																			label.control-label:contains("Weight Loss Addition %"),
																			label.control-label:contains("Labour Rate ($)"),
																			label.control-label:contains("Metal Weight (For Pricing)"),
																			label.control-label:contains("Surface Area"),
																			label.control-label:contains("Ounce Rate ($)"),
																			label.control-label:contains("Micron Rate ($)")`);

		$labelsToColor.css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});

		const $labelsToColors = $(`label.control-label:contains("Other Platings"),
																	label.control-label:contains("Other Plating Cost"),
																	label.control-label:contains("Total Plating Cost")`);

		$labelsToColors.css({
			'color': 'black',
			'font-weight': 'bold'
		});

		const $buttons = $(`  .btn.btn-xs.btn-default[data-fieldname="update_value_additions"],
																	.btn.btn-xs.btn-default[data-fieldname="update_all_value_addition_on_twenty"],
																	.btn.btn-default.btn-sm[data-fieldname="image"]`);

		$buttons.css({
			'background-color': '#93b48f',
			'color': 'white',
			'border': '1px solid green'
		});


		const $inputField = $(`input[data-fieldname="findings_in_dollar"],
																	input[data-fieldname="amount_in_dollar_in_plating"] ,
																	input[data-fieldname="total_plating_cost"] ,
																	input[data-fieldname="total_labour_cost"],
																	input[data-fieldname="total_diamondcost_in_dollar"],
																	input[data-fieldname="amount_in_dollar_in_metal"],
																	input[data-fieldname="amount_in_dollar_in_metal"],
																	input[data-fieldname="amount_in_dollar_in_metal"]`);

		$inputField.css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});


		$($($($('div[data-fieldname ="total_stone_cost_in_dollar"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="total_setting_per_pcs_in_dolllar_master"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="total_charges"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="total_labour_constin_not_inc"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});


		$($($($('div[data-fieldname ="revise_weight"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="amount_in_dollar_in_metal"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="findings_in_dollar"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="total_labour_cost"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="total_diamondcost_in_dollar"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$($($($('div[data-fieldname ="amount_in_dollar_in_plating"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$('label.control-label:contains("Value Addition Percent")').css({
			'color': 'rgb(110, 110, 235);',
			'font-weight': 'bold'
		});


		$('.section-head').css('text-decoration', 'underline');
		$('.section-head').children().css('text-decoration', 'underline');
		$('.control-label').css('font-weight', 'bold');
		$('.control-label').css('font-size', '12.5px');
		$('.grid-heading-row').css('font-weight', 'bold');
		$('.grid-heading-row').css('color', '#000000');

		var html_style = `<style>
															.nav {
																	display: flex;
																	padding-left: 0;
																	margin-bottom: 0;
																	list-style: none;
																	/* flex-direction: row; */
																	/* flex-wrap: nowrap; */
																	justify-content: space-evenly;
															}

															.nav-link.active {
																	color: Red !important;
																	font: message-box;
															}
									</style>`
		$('body').append(html_style);

		var grid = frm.fields_dict['stone_child'].grid;
		for (var i = 0; i < grid.grid_rows.length; i++) {
			var row = grid.grid_rows[i];
			var field_name = "stone_name";
			var docfield = row.docfields.find(df => df.fieldname === field_name);
			docfield.read_only = 0;
		}
		grid.refresh();
	},
	onload: function (frm) {
		let grid = frm.fields_dict['stone_child'].grid;
		if (grid && grid.grid_rows && grid.grid_rows.length > 0) {
			if (grid.grid_rows.length > 20) {
				enableSearchFilter(grid);
			}
			showSearchInChildTable(grid);
		}
		grid.refresh();
	},
	refresh: function (frm) {
		let grid = frm.fields_dict['stone_child'].grid;

		if (grid && grid.grid_rows && grid.grid_rows.length > 20) {
			enableSearchFilter(grid);
		}
		showSearchInChildTable(grid);
	},
	setup: function (frm) {

		// default set to zero while duplicate
		// frm.set_value('metal_value_add_deleted', 0);
		// frm.set_value('setting_value_add_deleted', 0);
		// frm.set_value('labour_value_add_deleted', 0);
		// frm.set_value('finding_value_add_deleted', 0);
		// frm.set_value('plating_value_add_deleted', 0);
		//
		// if(frm.doc.customer == "Monica Vinader Ltd") { frm.set_value('purchase', 'Red');}
	},



	refresh: function (frm) {

		if (frm.is_new()) {
			frm.set_value('creation_date', frappe.datetime.get_today());
		}

		//   calculate_total_cost(frm);
		updateHtmlFormFields(frm);
		updateMetalTypeLabel(frm, frm.doc.metal_type);
		updatePlatingProductType(frm);

		frm.get_field("setting_child").grid.grid_buttons.addClass('hidden');
		frm.get_field("diamond_setting_child").grid.grid_buttons.addClass('hidden');

		frm.set_query('currency', () => {
			return {
				filters: {
					name: ['in', ['USD', 'INR']]
				}
			}
		})

		frm.set_query('metal_type', () => {
			return {
				filters: {
					name: ['in', [
						'Silver 925',
						'Silver 999',
						'Re Cycle Silver 925',
						'Re Cycle Silver 999',
						'Bronze',
						'Brass',
						'Zinc',
						'G24kt',
						'09 Kt Yellow Gold',
						'09 Kt Rose Gold',
						'09 Kt White Gold',
						'10 Kt Yellow Gold',
						'10 Kt Rose Gold',
						'10 Kt White Gold',
						'14 Kt Yellow Gold',
						'14 Kt Rose Gold',
						'14 Kt White Gold',
						'18 Kt Yellow Gold',
						'18 Kt Rose Gold',
						'18 Kt White Gold',
						'22 Kt Yellow Gold',
						'22 Kt Rose Gold',
						'22 Kt White Gold',
						'Mix Metal',
						'G14kt',
						'G18kt',
						'G22kt',
						'G9kt',
						'Gold / 9kt']]
				}
			}
		})

		frm.set_query('metal_type', 'mix_metal', (frm, cdt, cdn) => {
			return {
				filters: {
					name: ['in', [
						'Silver 925',
						'Silver 999',
						'Re Cycle Silver 925',
						'Re Cycle Silver 999',
						'Bronze',
						'Brass',
						'Zinc',
						'G24kt',
						'09 Kt Yellow Gold',
						'09 Kt Rose Gold',
						'09 Kt White Gold',
						'10 Kt Yellow Gold',
						'10 Kt Rose Gold',
						'10 Kt White Gold',
						'14 Kt Yellow Gold',
						'14 Kt Rose Gold',
						'14 Kt White Gold',
						'18 Kt Yellow Gold',
						'18 Kt Rose Gold',
						'18 Kt White Gold',
						'22 Kt Yellow Gold',
						'22 Kt Rose Gold',
						'22 Kt White Gold',
						'G14kt',
						'G18kt',
						'G22kt',
						'G9kt',
						'Gold / 9kt']]
				}
			}

		});


		frm.set_query('uom', 'labour_detail', (frm, cdt, cdn) => {
			var child = locals[cdt][cdn];
			if (child.labour_type == "CFP" ||
				child.labour_type == "Additional Chain Labour" ||
				child.labour_type == "One OFF Charges" ||
				child.labour_type == "Resin") {
				return {
					filters: {
						name: ['in', ['Pcs', 'Gram']]
					}
				}
			} else {
				return {
					filters: {
						name: ['in', ['Pcs']]
					}
				}
			}

		});


		frm.set_query('uom', 'co_labour_constin_not_inc', (frm, cdt, cdn) => {
			var child = locals[cdt][cdn];
			if (child.labour_type == "Product Development Charge") {
				return {
					filters: {
						name: ['in', ['Pcs']]
					}
				}
			}
		});

	},





	/// ==========================================  Metal Base ===========================  start ========================================
	purchase: function (frm) { // Costing Stage -- only use for monica client
		frm.enable_save();
		if (frm.doc.purchase === "Green") {
			if (frm.doc.workflow_state === "Price Submitted To Client") {
				frm.set_value("workflow_state", "Price Submitted To Client");
				// frm.set_value("workflow_state", "PO Recieved");
			} else {
				frappe.msgprint(__('Cannot transition directly to "Price Submitted To Client" from the current state.'));
				frm.disable_save();
			}
		} else if (frm.doc.purchase === "Yellow") {
			frm.set_value("workflow_state", "Price Submitted To Client");
		} else if (frm.doc.purchase === "Red") {
			frm.set_value("workflow_state", "Draft");
		}
	},

	customer: function (frm) {
		updatePlatingProductType(frm);
		if (frm.doc.customer == "Varni Jewels INC(HB)") {
			frm.set_value('usd_converstion_rate', 80);
		} else {
			frm.set_value('usd_converstion_rate', 75);
		}

		if (frm.doc.stone_child) {
			for (var i = 0; i < frm.doc.stone_child.length; i++) {
				calculate_total_stone_cost(frm, frm.doc.stone_child[i].doctype, frm.doc.stone_child[i].name)
			}
		}
		if (frm.doc.diamond_costing) {
			for (var i = 0; i < frm.doc.diamond_costing.length; i++) {
				calculate_total_diamond_cost(frm, frm.doc.diamond_costing[i].doctype, frm.doc.diamond_costing[i].name)
			}
		}

	},

	metal_type: function (frm) {
		if (frm.doc.metal_type == "Mix Metal") {
			frm.set_value('metal_weights', 0);
			frm.set_df_property('metal_weights', 'read_only', 1);
		} else {
			frm.set_df_property('metal_weights', 'read_only', 0)
		}

		if (frm.doc.metal_type === 'G24kt' ||
			frm.doc.metal_type === 'Silver 925' ||
			frm.doc.metal_type === 'Silver 999' ||
			frm.doc.metal_type === 'Re Cycle Silver 925' ||
			frm.doc.metal_type === 'Re Cycle Silver 999' ||
			frm.doc.metal_type === '09 Kt Yellow Gold' ||
			frm.doc.metal_type === '09 Kt Rose Gold' ||
			frm.doc.metal_type === '09 Kt White Gold' ||
			frm.doc.metal_type === '10 Kt Yellow Gold' ||
			frm.doc.metal_type === '10 Kt Rose Gold' ||
			frm.doc.metal_type === '10 Kt White Gold' ||
			frm.doc.metal_type === '14 Kt Yellow Gold' ||
			frm.doc.metal_type === '14 Kt Rose Gold' ||
			frm.doc.metal_type === '14 Kt White Gold' ||
			frm.doc.metal_type === '18 Kt Yellow Gold' ||
			frm.doc.metal_type === '18 Kt Rose Gold' ||
			frm.doc.metal_type === '18 Kt White Gold' ||
			frm.doc.metal_type === '22 Kt Yellow Gold' ||
			frm.doc.metal_type === '22 Kt Rose Gold' ||
			frm.doc.metal_type === '22 Kt White Gold'
		) {
			frm.set_value('conversion_per_grams', 31.100);
		} else if (frm.doc.metal_type === 'Brass' || frm.doc.metal_type === 'Bronze' || frm.doc.metal_type === 'Zinc') {
			frm.set_value('conversion_per_grams', 1);
		} else if (frm.doc.metal_type === 'Mix Metal') {
			// frm.set_value('conversion_per_grams', 1);
		}

		calculate_us_dollar_per_gram(frm);
		updateMetalTypeLabel(frm, frm.doc.metal_type);
		calculate_total_cost(frm);

	},

	ounce_rate: function (frm) {
		calculate_us_dollar_per_gram(frm);
	},

	currency: function (frm) {

		if (frm.doc.currency == "INR") { frm.set_value('usd_converstion_rate', 1); }
		else { frm.set_value('usd_converstion_rate', 75); }

		if (frm.doc.stone_child) {
			for (var i = 0; i < frm.doc.stone_child.length; i++) {
				calculate_total_stone_cost(frm, frm.doc.stone_child[i].doctype, frm.doc.stone_child[i].name)
			}
		}
		if (frm.doc.diamond_costing) {
			for (var i = 0; i < frm.doc.diamond_costing.length; i++) {
				calculate_total_diamond_cost(frm, frm.doc.diamond_costing[i].doctype, frm.doc.diamond_costing[i].name)
			}
		}

		// update_value_additions(frm);
		// calculate_total_cost(frm);
		frm.refresh_fields();
	},

	conversion_per_grams: function (frm) {
		calculate_us_dollar_per_gram(frm);
	},

	loss_percent: function (frm) {
		calculate_us_dollar_per_gram(frm);
	},

	// usd_converstion_rate: function (frm) {
	// 	if (frm.doc.stone_child) {
	// 			for (var i = 0; i < frm.doc.stone_child.length; i++) {
	// 					calculate_total_stone_cost(frm, frm.doc.stone_child[i].doctype, frm.doc.stone_child[i].name)
	// 			}
	// 	}
	// 	if (frm.doc.diamond_costing) {
	// 			for (var i = 0; i < frm.doc.diamond_costing.length; i++) {
	// 					calculate_total_diamond_cost(frm, frm.doc.diamond_costing[i].doctype, frm.doc.diamond_costing[i].name)
	// 			}
	// 	}
	// },


	/// ==========================================  Metal Base ===========================  end ========================================


	/// ==========================================  Design ===========================  start ========================================
	design_code: function (frm) {
		fetch_design_bom_details(frm);
		frm.set_value("main_design_code", frm.doc.design_code);
	},
	design_code_2d: function (frm) {
		frm.set_value("main_design_code", frm.doc.design_code_2d);
	},
	design__type: function (frm) {
		if (frm.doc.design__type == "2D Design") {
			frm.clear_table('bom_details');
			frm.clear_table('diamond_costing');
			frm.clear_table('stone_child');
			frm.clear_table('findings_list');

			frm.set_value("design_code", "");
			frm.set_value("design_description", "");
			frm.set_value("design_category", "");
			frm.set_value("image", "");
			// frm.set_value("stone_image", "");
		} else if (frm.doc.design__type == "3D Design") {
			frm.set_value("design_code_2d", "");
		}
	},

	metal_weights: function (frm) {
		calculate_revise_weight(frm);
		// calculate_labour_rate(frm, cdt, cdn);
	},
	/// ==========================================  Design ===========================  end ========================================


	/// ==========================================  Metal ===========================  start =======================================
	weight_addition: function (frm) {
		calculate_revise_weight(frm);
	},

	// amount_in_dollar_in_metal: function (frm) {
	// // 		caluclate_amount_in_metal_in_inr(frm);
	// // 		calculate_total_cost(frm);
	// 		update_value_additions(frm);
	// // 		// calculate_total_cost_gp(frm);
	// },
	//
	// amount_in_inr_in_metal: function (frm) {
	// 		caluclate_amount_in_metal_in_inr(frm);
	// },

	/// ==========================================  Metal ===========================  end ========================================



	/// ==========================================  Finding ===========================  start =======================================

	// total_findings_in_inr: function (frm) {
	// 		calculate_findings_cost_master(frm);
	// },
	//
	// findings_in_dollar: function (frm) {
	// // 		calculate_findings_cost_master(frm);
	// 		update_value_additions(frm);
	// // 		calculate_total_cost(frm);
	// },

	/// ==========================================  Finding ===========================  end ========================================


	/// ==========================================  Labour ===========================  start ========================================
	// total_labour_cost: function (frm) {
	// 		update_value_additions(frm);
	// // 		calculate_total_cost(frm);
	// },
	//
	// total_labour_constin_not_inc: function (frm) {
	// 		calculate_total_cost(frm);
	// },
	/// ==========================================  Labour ===========================  end ========================================


	/// ==========================================  Stone ===========================  start =======================================

	// total_stone_cost_in_dollar: function (frm) {
	// 		calculate_total_cost(frm);
	// },

	/// ==========================================  Stone ===========================  end ========================================


	/// ==========================================  Plating ===========================  start =======================================


	// =========== Micron Plating =====================================================
	plating: function (frm) {
		generate_code(frm);
		calculate_plating_pricing(frm);
	},

	micron: function (frm) {
		generate_code(frm);
		calculate_plating_pricing(frm);
	},

	gold_kt: function (frm) {
		generate_code(frm);
	},

	color: function (frm) {
		generate_code(frm);
	},

	gold: function (frm) {
		generate_code(frm);
	},

	anti_tarnish: function (frm) {
		generate_code(frm);
	},

	surface_area: function (frm) {
		calculate_plating_pricing(frm);
	},

	micron_plating_ounce_rate: function (frm) {
		calculate_plating_pricing(frm);
	},

	product_type: function (frm) {
		calculate_plating_pricing(frm);
	},

	uom_in_plating: function (frm) {
		calculate_plating_pricing(frm);
	},

	plating_charge: function (frm, cdt, cdn) {
		calculate_plating_pricing(frm);
	},


	// =========== Second Plating =====================================================
	plating_types: function (frm) {
		generate_code_second_plating(frm);
		calculate_plating_pricing_second_plating(frm);
	},
	microns: function (frm) {
		generate_code_second_plating(frm);
		calculate_plating_pricing_second_plating(frm);
	},
	gold_kts: function (frm) {
		generate_code_second_plating(frm);
	},
	colors: function (frm) {
		generate_code_second_plating(frm);
	},
	golds: function (frm) {
		generate_code_second_plating(frm);
	},
	anti_tarnishs: function (frm) {
		generate_code_second_plating(frm);
	},
	surface: function (frm) {
		calculate_plating_pricing_second_plating(frm);
	},
	design_weightss: function (frm) {
		calculate_plating_pricing_second_plating(frm);
	},
	micron_plating_ounce_rate_second_plating: function (frm) {
		calculate_plating_pricing_second_plating(frm);
	},
	plating_charg: function (frm, cdt, cdn) {
		calculate_plating_pricing_second_plating(frm);
	},
	product_types: function (frm) {
		calculate_plating_pricing_second_plating(frm);
	},
	pric_uom: function (frm) {
		calculate_plating_pricing_second_plating(frm);
	},

	/// ==========================================  Plating ===========================  end ========================================

	before_save: function (frm) {
		// update_setting_child(frm);
		// diamond_update_setting_child(frm);
		// update_value_additions(frm);

		calculate_us_dollar_per_gram(frm);
		// calculate_revise_weight(frm);

		calculate_labour_cost_master(frm);
		calculate_labour_cost_master_not_inc(frm);
		calculate_findings_cost_master(frm);

		update_master_total_stone_cost(frm);
		update_setting_child(frm);

		update_master_total_diamond_cost(frm);
		diamond_update_setting_child(frm);

		update_master_total_stone_cost_in_setting(frm);
		calculate_other_charges_master(frm);

		calculate_total_value_addition(frm);
	},


})

function enableSearchFilter(grid) {
	grid.show_search = true;
	grid.refresh();
}
function showSearchInChildTable(grid) {
	const searchRow = grid.$wrapper.find('.data-row.row');
	if (searchRow && searchRow.length > 0) {
		frm.doc.docstatus = 0
		searchRow.show();
	} else {
		console.error('Search row not found.');
	}
}
/// ==========================================  Child Tables  ===========================  start ========================================


// ==============  Metal Base =====================================

frappe.ui.form.on('CO Metal Type', {
	metal_type: function (frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		if (child.metal_type === '09 Kt Yellow Gold' ||
			child.metal_type === '09 Kt Rose Gold' ||
			child.metal_type === '09 Kt White Gold' ||
			child.metal_type === '10 Kt Yellow Gold' ||
			child.metal_type === '10 Kt Rose Gold' ||
			child.metal_type === '10 Kt White Gold' ||
			child.metal_type === '14 Kt Yellow Gold' ||
			child.metal_type === '14 Kt Rose Gold' ||
			child.metal_type === '14 Kt White Gold' ||
			child.metal_type === '18 Kt Yellow Gold' ||
			child.metal_type === '18 Kt Rose Gold' ||
			child.metal_type === '18 Kt White Gold' ||
			child.metal_type === '22 Kt Yellow Gold' ||
			child.metal_type === '22 Kt Rose Gold' ||
			child.metal_type === '22 Kt White Gold' ||
			child.metal_type === 'G24kt'
		) {
			frappe.model.set_value(cdt, cdn, 'conversion_per_gram', 31.10);
		} else if (child.metal_type === 'Silver 925' ||
			child.metal_type === 'Silver 999' ||
			child.metal_type === 'Re Cycle Silver 925' ||
			child.metal_type === 'Re Cycle Silver 999'
		) {
			frappe.model.set_value(cdt, cdn, 'conversion_per_gram', 31.100);
		} else if (child.metal_type === 'Brass' || child.metal_type === 'Bronze' || child.metal_type === 'Zinc') {
			frappe.model.set_value(cdt, cdn, 'conversion_per_gram', 1);
		}

		calculate_us_dollar_per_gram_in_child(frm, cdt, cdn);
	},
	metal_loss: function (frm, cdt, cdn) {
		calculate_us_dollar_per_gram_in_child(frm, cdt, cdn);
	},
	ounce_rate: function (frm, cdt, cdn) {
		calculate_us_dollar_per_gram_in_child(frm, cdt, cdn);
	},
	// final_metal_cost_per_gram: function (frm, cdt, cdn) {
	//     update_master_final_metal_cost_per_gram(frm);
	// },
	metal_weight: function (frm, cdt, cdn) {
		calculate_us_dollar_per_gram_in_child(frm, cdt, cdn);
	},
	conversion_per_gram: function (frm, cdt, cdn) {
		calculate_us_dollar_per_gram_in_child(frm, cdt, cdn);
	},
	// metal_cost_per_gram: function (frm, cdt, cdn) {
	//     calculate_final_cost_in_child(frm, cdt, cdn);
	// },
	weight_addition: function (frm, cdt, cdn) {
		calculate_us_dollar_per_gram_in_child(frm, cdt, cdn)
	},
	mix_metal_remove: function (frm, cdt, cdn) {
		update_master_final_metal_cost_per_gram(frm);
	}
})



// ==============  Labour =====================================

frappe.ui.form.on('CO Labour Costin', {
	labour_type: function (frm, cdt, cdn) {
		calculate_labour_rate(frm, cdt, cdn);
	},
	uom: function (frm, cdt, cdn) {
		calculate_labour_rate(frm, cdt, cdn);
	},
	labour_cost_uom: function (frm, cdt, cdn) {
		calculate_labour_rate(frm, cdt, cdn)
	},
	design_weight: function (frm, cdt, cdn) {
		calculate_labour_rate(frm, cdt, cdn)
	},
	form_render: function (frm, cdt, cdn) {
		const $labelsToColor = $(`label.control-label:contains("Labour Type"),
																	label.control-label:contains("UOM"),
																	label.control-label:contains("Labour Cost (Uom $)")`);
		$labelsToColor.css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});
	},

	labour_detail_remove: function (frm, cdt, cdn) {
		calculate_labour_cost_master(frm);
	},

});


frappe.ui.form.on('Co Labour Constin Not Inc', {
	labour_type: function (frm, cdt, cdn) {
		calculate_labour_rate_not_inc(frm, cdt, cdn);
	},
	uom: function (frm, cdt, cdn) {
		calculate_labour_rate_not_inc(frm, cdt, cdn);
	},
	labour_cost_uom: function (frm, cdt, cdn) {
		calculate_labour_rate_not_inc(frm, cdt, cdn)
	},
	labour_cost: function (frm, cdt, cdn) {
		calculate_labour_cost_master_not_inc(frm);
	},
	design_weight: function (frm, cdt, cdn) {
		calculate_labour_rate_not_inc(frm, cdt, cdn)
	},
	form_render: function (frm, cdt, cdn) {
		const $labelsToColor = $(`label.control-label:contains("Labour Type"),
																	label.control-label:contains("UOM"),
																	label.control-label:contains("Labour Cost (Uom $)")`);
		$labelsToColor.css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});
	},

	co_labour_constin_not_inc_remove: function (frm, cdt, cdn) {
		calculate_labour_cost_master_not_inc(frm);
	},

});



// ==============  Finding =====================================

frappe.ui.form.on('CO Finding', {
	weight: function (frm, cdt, cdn) {
		calculate_finding_rate(frm, cdt, cdn);
	},
	quantity: function (frm, cdt, cdn) {
		calculate_finding_rate(frm, cdt, cdn);
	},
	rate_gram: function (frm, cdt, cdn) {
		calculate_finding_rate(frm, cdt, cdn);
	},
	// rate_in_dollar: function (frm, cdt, cdn) {
	//     calculate_finding_rate(frm, cdt, cdn);
	//     calculate_findings_cost_master(frm);
	// },
	finding_uom: function (frm, cdt, cdn) {
		calculate_finding_rate(frm, cdt, cdn);
	},
	findings_list_remove: function (frm, cdt, cdn) {
		calculate_findings_cost_master(frm);
	},
	form_render: function (frm, cdt, cdn) {
		const $labelsToColor = $(`label.control-label:contains("UOM"),
																	label.control-label:contains("Rate ($)")`);
		$labelsToColor.css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});

		const $labelssToColor = $(`label.control-label:contains("Finding Type"),
																	 label.control-label:contains("Weight"),
																	 label.control-label:contains("Quantity"),
																	 label.control-label:contains("Finding Code"),
																	 label.control-label:contains("Description")`);
		$labelssToColor.css({
			'color': 'rgb(207 32 111)',
			'font-weight': 'bold'
		});

		const $labelsssToColor = $(`label.control-label:contains("Design Description"),
																		label.control-label:contains("Design Weight (For Pricing)"),
																		label.control-label:contains("Addition Weight"),
																		label.control-label:contains("Metal Weight For Costing"),
																		label.control-label:contains("Total Findings Weight"),
																		label.control-label:contains("Total Weight"),
																		label.control-label:contains("Total Diamond Weight"),
																		label.control-label:contains("Design Weight"),
																		label.control-label:contains("Total Quantity")`);
		$labelsssToColor.css({
			'color': '#333c44',
			'font-weight': 'bold'
		});

		$(`label.control-label:contains("Metal Weight (For Pricing)"),
					 label.control-label:contains("Weight Addition %")`).css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});
	},

});



// ==============  Stone =====================================

frappe.ui.form.on('CO Stone Child Costing', {
	stone_name: function (frm, cdt, cdn) {
		// let child = locals[cdt][cdn];

		// if (child.stone_name) {
		//     frappe.db.get_doc("Gemstone", child.stone_name).then((doc) => {

		//         console.log(doc);
		//     var check = 0;
		//     if(doc.short_name) {
		//         if(doc.short_name.length == 3){
		//             check = 1;
		//         }
		//     }
		//     if(check == 1) {
		//         // frappe.model.set_value(cdt,cdn,'stone_short_name', doc.short_name);
		//         generate_stone_code(frm,cdt,cdn);
		//     }
		//     else {
		//         frappe.model.set_value(cdt,cdn,'stone_name', "");
		//        // frappe.msgprint("Please update the stone short name.");
		//     }

		//         // if (doc.short_name && doc.short_name.length === 3) {
		//         //     frappe.model.set_value(cdt, cdn, 'stone_short_name', doc.short_name)
		//         //         .then(() => {
		//         //             console.log("Updated stone_short_name:", doc.short_name);
		//         //             return frappe.model.set_value(cdt, cdn, 'stone_code', '');
		//         //         })
		//         //         .then(() => {
		//         //             console.log("Cleared stone_code before regenerating...");
		//         //             generate_stone_code(frm, cdt, cdn);
		//         //             frm.refresh_field('stone_child');
		//         //         });
		//         // } else {
		//         //     frappe.model.set_value(cdt, cdn, 'stone_name', "").then(() => {
		//         //         frappe.msgprint("Please update the stone short name.");
		//         //     });
		//         // }
		//     });
		// }

		update_setting_child(frm);
		fetch_stones_price_details(frm, cdt, cdn);
	},


	shape_name: function (frm, cdt, cdn) {
		let child = locals[cdt][cdn];

		// if (child.shape_name) {
		//     frappe.db.get_doc("Stone Shape", child.shape_name).then((doc) => {

		//         console.log(doc);
		//         var check = 0;
		//         if(doc.shape_aliases) {
		//             if(doc.shape_aliases.length == 2  ){
		//                 check = 1;
		//             }
		//         }
		//         if(check == 1) {
		//             // frappe.model.set_value(cdt,cdn,'stone_short_shape', doc.shape_aliases);
		//             generate_stone_code(frm,cdt,cdn);
		//         }
		//         else {
		//             frappe.model.set_value(cdt,cdn,'shape', "");
		//             frappe.msgprint("Please update the shape short name.");
		//         }

		//         // if (doc.shape_aliases && doc.shape_aliases.length === 2) {
		//         //     frappe.model.set_value(cdt, cdn, 'stone_short_shape', doc.shape_aliases)
		//         //         .then(() => {
		//         //             console.log("Updated stone_short_shape:", doc.shape_aliases);
		//         //             return frappe.model.set_value(cdt, cdn, 'stone_code', ''); // Reset stone_code first
		//         //         })
		//         //         .then(() => {
		//         //             console.log("Cleared stone_code before regenerating...");
		//         //             generate_stone_code(frm, cdt, cdn);
		//         //             frm.refresh_field('stone_child');
		//         //         });
		//         // } else {
		//         //     frappe.model.set_value(cdt, cdn, 'shape_name', "").then(() => {
		//         //         frappe.msgprint("Please update the shape short name.");
		//         //     });
		//         // }
		//     });
		// }
		fetch_stones_price_details(frm, cdt, cdn);
	},

	cut_name: function (frm, cdt, cdn) {
		let child = locals[cdt][cdn];

		// if (child.cut_name) {
		//     frappe.db.get_doc("Stone Cut", child.cut_name).then((doc) => {

		//         console.log(doc);
		//         var check = 0;
		//         if(doc.cut_aliases) {
		//             if(doc.cut_aliases.length == 2){
		//                 check = 1;
		//             }
		//         }
		//         if(check == 1) {
		//             // frappe.model.set_value(cdt,cdn,'stone_short_cut', doc.cut_aliases);
		//             generate_stone_code(frm,cdt,cdn);
		//         }
		//         else {
		//             frappe.model.set_value(cdt,cdn,'cut', "");
		//             frappe.msgprint("Please update the cut short name.");
		//         }

		//         // if (doc.cut_aliases && doc.cut_aliases.length === 2) {
		//         //     frappe.model.set_value(cdt, cdn, 'stone_short_cut', doc.cut_aliases)
		//         //         .then(() => {
		//         //             console.log("Updated stone_short_cut:", doc.cut_aliases);
		//         //             return frappe.model.set_value(cdt, cdn, 'stone_code', '');
		//         //         })
		//         //         .then(() => {
		//         //             console.log("Cleared stone_code before regenerating...");
		//         //             generate_stone_code(frm, cdt, cdn);
		//         //             frm.refresh_field('stone_child');
		//         //         });
		//         // } else {
		//         //     frappe.model.set_value(cdt, cdn, 'cut_name', "").then(() => {
		//         //         frappe.msgprint("Please update the cut short name.");
		//         //     });
		//         // }
		//     });
		// }
		fetch_stones_price_details(frm, cdt, cdn);
	},

	quality: function (frm, cdt, cdn) {
		let child = locals[cdt][cdn];

		// if (child.quality) {
		//     frappe.db.get_doc("Stone Quality", child.quality).then((doc) => {

		//         console.log(doc);
		//         var check = 0;
		//         if(doc.quality_aliases) {
		//             if(doc.quality_aliases.length == 2){
		//                 check = 1;
		//             }
		//         }
		//         if(check == 1) {
		//             // frappe.model.set_value(cdt,cdn,'stone_short_quality', doc.quality_aliases);
		//             generate_stone_code(frm,cdt,cdn);
		//         }
		//         else {
		//             frappe.model.set_value(cdt,cdn,'quality', "");
		//             frappe.msgprint("Please update the quality short name.");
		//         }

		//         // if (doc.quality_aliases && doc.quality_aliases.length === 2) {
		//         //     frappe.model.set_value(cdt, cdn, 'stone_short_quality', doc.quality_aliases)
		//         //         .then(() => {
		//         //             console.log("Updated stone_short_quality:", doc.quality_aliases);
		//         //             return frappe.model.set_value(cdt, cdn, 'stone_code', '');
		//         //         })
		//         //         .then(() => {
		//         //             console.log("Cleared stone_code before regenerating...");
		//         //             generate_stone_code(frm, cdt, cdn);
		//         //             frm.refresh_field('stone_child');
		//         //         });
		//         // } else {
		//         //     frappe.model.set_value(cdt, cdn, 'quality', "").then(() => {
		//         //         frappe.msgprint("Please update the quality short name.");
		//         //     });
		//         // }
		//     });
		// }
		fetch_stones_price_details(frm, cdt, cdn);
	},
	size: function (frm, cdt, cdn) {
		generate_stone_code(frm, cdt, cdn);
		fetch_stones_price_details(frm, cdt, cdn);
		update_setting_child(frm);
	},
	width: function (frm, cdt, cdn) {
		generate_stone_code(frm, cdt, cdn);
		fetch_stones_price_details(frm, cdt, cdn);
		update_setting_child(frm);
	},
	height: function (frm, cdt, cdn) {
		fetch_stones_price_details(frm, cdt, cdn);
	},
	medium: function (frm, cdt, cdn) {
		fetch_stones_price_details(frm, cdt, cdn);
	},
	uom: function (frm, cdt, cdn) {
		calculate_total_stone_cost(frm, cdt, cdn);
		fetch_stones_price_details(frm, cdt, cdn);
	},
	qty: function (frm, cdt, cdn) {
		calculate_total_stone_cost(frm, cdt, cdn);
		update_setting_child(frm);
	},
	weight_per_pcs_cts: function (frm, cdt, cdn) {
		calculate_total_stone_cost(frm, cdt, cdn);
	},


	price: function (frm, cdt, cdn) {
		calculate_total_stone_cost(frm, cdt, cdn);
	},

	value_addition: function (frm, cdt, cdn) {
		calculate_total_stone_cost(frm, cdt, cdn);
	},

	setting_category: function (frm, cdt, cdn) {
		update_setting_child(frm);
	},
	setting_type: function (frm, cdt, cdn) {
		update_setting_child(frm);
	},
	stone_setting_price: function (frm, cdt, cdn) {
		update_setting_child(frm);
	},
	setting_currency: function (frm, cdt, cdn) {
		update_setting_child(frm);
	},
	send_details_to_stone_dpt: function (frm, cdt, cdn) {

		if (frm.is_new()) {
			frappe.msgprint("Please Save the form first");
		} else {
			sendStoneDetail(frm, cdt, cdn);
			// fetch_stones_price_details(frm, cdt, cdn);
		}

		// sendStoneDetail(frm, cdt, cdn);
		// fetch_stones_price_details(frm, cdt, cdn);
		// generate_stone_code(frm,cdt,cdn);
		// generate_stone_code(frm, cdt, cdn);
	},
	price_accepted: function (frm, cdt, cdn) {
		update_stone_price_quot(frm, cdt, cdn, 'Price Accepted')
	},

	price_rejected: function (frm, cdt, cdn) {
		update_stone_price_quot(frm, cdt, cdn, 'Price Rejected')
	},

	remove_table: function (frm, cdt, cdn) {
		// var stone_generated_val
		frappe.model.set_value(cdt, cdn, "stone_generated_val", "");
	},
	stone_child_remove: function (frm, cdt, cdn) {
		update_master_total_stone_cost(frm);
		update_setting_child(frm);
	},


	form_render: function (frm, cdt, cdn) {

		fetch_stones_price_details(frm, cdt, cdn);

		const $labelsToColor = $(`label.control-label:contains("Purchase Price ₹ (Uom)"),
		                              label.control-label:contains("Setting Type"),
		                              label.control-label:contains("UOM"),
		                              label.control-label:contains("Stone"),
		                              label.control-label:contains("Shape"),
		                              label.control-label:contains("Cut "),
		                              label.control-label:contains("Quality"),
		                              label.control-label:contains("Height"),
		                              label.control-label:contains("Color"),
		                              label.control-label:contains("Total Weight"),
		                              label.control-label:contains("Setting Price (Pcs $)"),
		                              label.control-label:contains("Value Addition (%)") `);

		$labelsToColor.css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});


		$($($($('div[data-fieldname ="qty"]')).children().children()[1]).children()[1]).css({
			'background-color': 'rgb(224 37 37 / 44%)',
			'color': 'rgb(255 255 255)',
			'border': '1px solid #ccc'
		});

		$('label.control-label:contains("Stone Child")').css({
			'color': '#333c44',
			'font-weight': 'bold'
		});

		$('label.control-label:contains("Total Stone Cost")').css({
			'color': '#333c44',
			'font-weight': 'bold'
		});

		$('label.control-label:contains("Total Stone Setting Cost ($)")').css({
			'color': '#333c44',
			'font-weight': 'bold'
		});

		$('label.control-label:contains("Stone Sales Price")').css({
			'color': '#333c44',
			'font-weight': 'normal'
		});

		$('label.control-label:contains("Per Stone Cost")').css({
			'color': '#333c44',
			'font-weight': 'normal'
		});

		const $labelssToColorss = $(`label.control-label:contains("Quantity (No. Of Pcs)"),
																		 label.control-label:contains("Length"),
																		 label.control-label:contains("Description (As Per DM)"),
																		 label.control-label:contains("Width") `);
		$labelssToColorss.css({
			'color': 'rgb(207 32 111)',
			'font-weight': 'bold'
		});

	},


});



// ==============  Diamond =====================================

frappe.ui.form.on('CO Diamond Costin', {

	uom: function (frm, cdt, cdn) {
		calculate_total_diamond_cost(frm, cdt, cdn);
	},


	diamond_price: function (frm, cdt, cdn) {
		calculate_total_diamond_cost(frm, cdt, cdn);
	},

	value_addition: function (frm, cdt, cdn) {
		calculate_total_diamond_cost(frm, cdt, cdn)
	},

	total_weight_diamond: function (frm, cdt, cdn) {
		calculate_total_diamond_cost(frm, cdt, cdn);
	},

	quantity_no_of_pcs: function (frm, cdt, cdn) {
		calculate_total_diamond_cost(frm, cdt, cdn);
		diamond_update_setting_child(frm);
	},

	diamond_name: function (frm, cdt, cdn) {
		diamond_update_setting_child(frm);
	},
	diamond_size: function (frm, cdt, cdn) {
		diamond_update_setting_child(frm);
	},
	diamond_width: function (frm, cdt, cdn) {
		diamond_update_setting_child(frm);
	},
	diamond_sett_price: function (frm, cdt, cdn) {
		diamond_update_setting_child(frm);
	},
	setting_type: function (frm, cdt, cdn) {
		diamond_update_setting_child(frm);
	},
	diamond_setting_currency: function (frm, cdt, cdn) {
		diamond_update_setting_child(frm);
	},
	setting_category: function (frm, cdt, cdn) {
		diamond_update_setting_child(frm);
	},

	diamond_costing_remove: function (frm, cdt, cdn) {
		update_master_total_diamond_cost(frm);
		diamond_update_setting_child(frm);
	},

	form_render: function (frm, cdt, cdn) {
		const $labelsToColor = $(`label.control-label:contains("Diamond Purchase Price (₹)"),
																	label.control-label:contains("Total Diamond Weight"),
																	label.control-label:contains("Setting Price (Pcs $)"),
																	label.control-label:contains("Setting Type"),
																	label.control-label:contains("UOM"),
																	label.control-label:contains("Height"),
																	label.control-label:contains("Name"),
																	label.control-label:contains("Cut"),
																	label.control-label:contains("Shape"),
																	label.control-label:contains("Size"),
																	label.control-label:contains("Quality"),
																	label.control-label:contains("Color"),
																	label.control-label:contains("Weight (Cost per cts)"),
																	label.control-label:contains("Value Addition (%)")`);
		$labelsToColor.css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});

		const $labelssssToColorss = $(`label.control-label:contains("Quantity (No. Of Pcs)"),
																			 label.control-label:contains("Description"),
																			 label.control-label:contains("Length"),
																			 label.control-label:contains("Width")`);
		$labelssssToColorss.css({
			'color': 'rgb(207 32 111)',
			'font-weight': 'bold'
		});

		$('label.control-label:contains("Design Description")').css({
			'color': '#333c44',
			'font-weight': 'bold'
		});

		$('label.control-label:contains("Total Stone Setting Cost ($)")').css({
			'color': '#333c44',
			'font-weight': 'bold'
		});

	},

});



// ==============  Diamond =====================================

frappe.ui.form.on('CO Setting Child', {
	// setting_price_rs: function (frm, cdt, cdn) {
	//     calculate_total_setting_cost(frm, cdt, cdn);
	//     // update_value_additions(frm);
	// },
	// setting_currency: function (frm, cdt, cdn) {
	//     update_setting_child(frm);
	// },
	setting_child_remove: function (frm, cdt, cdn) {
		update_master_total_stone_cost_in_setting(frm);
	},
	form_render: function (frm, cdt, cdn) {
		const $labelsToColor = $('label.control-label:contains("Setting Price per pcs (₹)")');
		$labelsToColor.css({
			'color': '#6e6eeb',
			'font-weight': 'bold'
		});

	},

});

frappe.ui.form.on('CO Diamond Setting Child', {
	// diamond_setting_price_rs: function (frm, cdt, cdn) {
	//     diamond_update_total_and_dollar(frm, cdt, cdn);
	//     update_master_total_stone_cost_in_setting(frm);
	//     update_value_additions(frm);
	// },
	// diamond_setting_currency: function (frm, cdt, cdn) {
	//
	//     diamond_update_setting_child(frm);
	//
	// },
	diamond_setting_child_remove: function (frm, cdt, cdn) {
		update_master_total_stone_cost_in_setting(frm);
	},

});


// ==============  Plating =====================================

frappe.ui.form.on('CO Platings', {
	plating_type: function (frm, cdt, cdn) {
		other_plating_calculations(frm, cdt, cdn);
		// generate_code_other_plating(frm, cdt, cdn);
	},
	plating_price: function (frm, cdt, cdn) {
		other_plating_calculations(frm, cdt, cdn);
	},
	price_uom: function (frm, cdt, cdn) {
		other_plating_calculations(frm, cdt, cdn);
	},
	design_weight: function (frm, cdt, cdn) {
		other_plating_calculations(frm, cdt, cdn);
	},
	other_platings_remove: function (frm, cdt, cdn) {
		calculate_other_plating_cost_master(frm);
	},
});


// ==============  Other Charges =====================================
frappe.ui.form.on('CO Other Charges', {
	other_charge_uom: function (frm, cdt, cdn) {
		calculate_other_charge(frm, cdt, cdn);
	},
	rate: function (frm, cdt, cdn) {
		calculate_other_charge(frm, cdt, cdn);
	},
	co_other_charges_remove: function (frm, cdt, cdn) {
		calculate_other_charges_master(frm);
	},
});



// ==============  Value Addition =====================================
frappe.ui.form.on('CO Value Addition', {
	cost_in_dollar: function (frm, cdt, cdn) {
		update_amount_in_dollar_value_added(frm, cdt, cdn);
	},
	value_addition_on_weight: function (frm, cdt, cdn) {
		update_amount_in_dollar_value_added(frm, cdt, cdn);
	},
	// amount_in_dollar_value_added: function (frm, cdt, cdn) {
	//     calculate_total_value_addition(frm);
	// },
	before_value_additions_remove: function (frm, cdt, cdn) {
		var child = locals[cdt][cdn];
		if (child.category == "Metal") { frm.set_value('metal_value_add_deleted', 1) }
		if (child.category == "Setting") { frm.set_value('setting_value_add_deleted', 1) }
		if (child.category == "Labour") { frm.set_value('labour_value_add_deleted', 1) }
		if (child.category == "Findings") { frm.set_value('finding_value_add_deleted', 1) }
		if (child.category == "Plating") { frm.set_value('plating_value_add_deleted', 1) }
	},

	onload_post_render: function (frm) {
		const $labelsToColor = $(`label.control-label:contains("Amount")`);

		$labelsToColor.css({
			'color': 'black',
			'font-weight': 'bold'
		});
	},
	value_additions_remove: function (frm, cdt, cdn) {
		calculate_total_value_addition(frm);
	}
});



/// ==========================================  Child Tables  ===========================  end ========================================




/// ==========================================  Metal Base ===========================  start ======================================

function updatePlatingProductType(frm) {

	if (frm.doc.customer) {
		if (frm.doc.customer === "Monica Vinader Ltd") {
			// Set specific options for "Monica Vinader Ltd" for both fields
			frm.set_df_property('product_types', 'options', [
				"Chain Product",
				"NON - Chain Product",
				"18K Gold For Chains",
				"24K Gold Plating For Non chain Products",
				"18KT with .5 um 23KT Gold For Chains"
			]);
			frm.set_df_property('product_type', 'options', [
				"Chain Product",
				"NON - Chain Product",
				"18K Gold For Chains",
				"24K Gold Plating For Non chain Products",
				"18KT with .5 um 23KT Gold For Chains"
			]);
		} else {
			frm.set_df_property('product_types', 'options', [
				"Chain Product",
				"NON - Chain Product"
			]);
			frm.set_df_property('product_type', 'options', [
				"Chain Product",
				"NON - Chain Product"
			]);
		}
	}

	frm.refresh_field('product_types');
	frm.refresh_field('product_type');
}


function calculate_us_dollar_per_gram(frm) {

	if (frm.doc.metal_type != "Mix Metal") {
		var us_dollar_per_gram = 0;
		if (checkDigit(frm.doc.conversion_per_grams) > 0) {
			us_dollar_per_gram = checkDigit(frm.doc.ounce_rate) / checkDigit(frm.doc.conversion_per_grams);

			if (frm.doc.metal_type === 'G24kt') {
				us_dollar_per_gram *= (24 / 24);
			} else if (frm.doc.metal_type == '09 Kt Yellow Gold' ||
				frm.doc.metal_type == '09 Kt Rose Gold' ||
				frm.doc.metal_type == '09 Kt White Gold') {
				us_dollar_per_gram *= (.375);
			} else if (frm.doc.metal_type == '10 Kt Yellow Gold' ||
				frm.doc.metal_type == '10 Kt Rose Gold' ||
				frm.doc.metal_type == '10 Kt White Gold') {
				us_dollar_per_gram *= (.417);
			} else if (frm.doc.metal_type == '14 Kt Yellow Gold' ||
				frm.doc.metal_type == '14 Kt Rose Gold' ||
				frm.doc.metal_type == '14 Kt White Gold') {
				us_dollar_per_gram *= (.585);
			} else if (frm.doc.metal_type == '18 Kt Yellow Gold' ||
				frm.doc.metal_type == '18 Kt Rose Gold' ||
				frm.doc.metal_type == '18 Kt White Gold') {
				us_dollar_per_gram *= (.75);
			} else if (frm.doc.metal_type == '22 Kt Yellow Gold' ||
				frm.doc.metal_type == '22 Kt Rose Gold' ||
				frm.doc.metal_type == '22 Kt White Gold') {
				us_dollar_per_gram *= (.9167);
			}
		}
		frm.set_value('us_dollar_per_gram', us_dollar_per_gram);

		frm.set_value('final_cost', parseFloat(checkDigit(us_dollar_per_gram + (us_dollar_per_gram *
			(checkDigit(frm.doc.loss_percent) / 100)))).toFixed(3));

		frm.set_df_property('weight_addition', 'read_only', 0);
	}
	calculate_revise_weight(frm);

}



////////  child table func ----- 'CO Metal Type' =====================  start ==================================

function calculate_us_dollar_per_gram_in_child(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var metal_cost_per_gram = 0;
	if (checkDigit(child.conversion_per_gram) > 0) {
		metal_cost_per_gram = checkDigit(child.ounce_rate) / checkDigit(child.conversion_per_gram);
		if (child.metal_type == '09 Kt Yellow Gold' || child.metal_type == '09 Kt Rose Gold' || child.metal_type == '09 Kt White Gold') {
			metal_cost_per_gram *= (.375);
		} else if (child.metal_type == '10 Kt Yellow Gold' || child.metal_type == '10 Kt Rose Gold' || child.metal_type == '10 Kt White Gold') {
			metal_cost_per_gram *= (.417);
		} else if (child.metal_type == '14 Kt Yellow Gold' || child.metal_type == '14 Kt Rose Gold' || child.metal_type == '14 Kt White Gold') {
			metal_cost_per_gram *= (.585);
		} else if (child.metal_type == '18 Kt Yellow Gold' || child.metal_type == '18 Kt Rose Gold' || child.metal_type == '18 Kt White Gold') {
			metal_cost_per_gram *= (.75);
		} else if (child.metal_type == '22 Kt Yellow Gold' || child.metal_type == '22 Kt Rose Gold' || child.metal_type == '22 Kt White Gold') {
			metal_cost_per_gram *= (.9167);
		} else if (child.metal_type == 'G24kt') {
			metal_cost_per_gram *= (24 / 24);
		}
	}
	frappe.model.set_value(cdt, cdn, 'metal_cost_per_gram', metal_cost_per_gram);

	var final_metal_cost_per_gram = parseFloat(parseFloat(checkDigit(metal_cost_per_gram)) + (parseFloat(checkDigit(child.metal_cost_per_gram)) * (parseFloat(checkDigit(child.metal_loss)) / 100)));
	frappe.model.set_value(cdt, cdn, 'final_metal_cost_per_gram', parseFloat(final_metal_cost_per_gram).toFixed(3));

	var additional_weight = parseFloat(checkDigit(child.metal_weight)) * parseFloat(checkDigit(child.weight_addition) / 100);
	var metal_weight_for_costin = parseFloat(checkDigit(child.metal_weight)) + parseFloat(checkDigit(additional_weight));
	var final_metal_cost = parseFloat(checkDigit(child.final_metal_cost_per_gram)) * parseFloat(checkDigit(metal_weight_for_costin));
	frappe.model.set_value(cdt, cdn, 'additional_weight', parseFloat(checkDigit(additional_weight)).toFixed(3));
	frappe.model.set_value(cdt, cdn, 'metal_weight_for_costin', parseFloat(checkDigit(metal_weight_for_costin)).toFixed(3));
	frappe.model.set_value(cdt, cdn, 'final_metal_cost', parseFloat(checkDigit(final_metal_cost)).toFixed(3));

	update_master_final_metal_cost_per_gram(frm);
}





function update_master_final_metal_cost_per_gram(frm) {
	if (frm.doc.metal_type == "Mix Metal") {
		var final_cost = 0;
		var mix_metal_weight = 0;
		var weight_addition = 0;
		var value_added_weight = 0;
		var revise_weight = 0;
		var amount_in_dollar_in_metal = 0;

		if (frm.doc.mix_metal) {
			frm.doc.mix_metal.forEach(child => {
				final_cost += parseFloat(checkDigit(child.final_metal_cost_per_gram));
				mix_metal_weight += parseFloat(checkDigit(child.metal_weight));
				weight_addition += parseFloat(checkDigit(child.weight_addition));
				value_added_weight += parseFloat(checkDigit(child.additional_weight));
				revise_weight += parseFloat(checkDigit(child.metal_weight_for_costin));
				amount_in_dollar_in_metal += parseFloat(checkDigit(child.final_metal_cost));
			});
		}
		frm.set_value('metal_weights', parseFloat(mix_metal_weight).toFixed(3));
		frm.set_value('final_cost', parseFloat(final_cost).toFixed(3));
		frm.set_value('weight_addition', parseFloat(weight_addition).toFixed(3));
		frm.set_value('value_added_weight', parseFloat(value_added_weight).toFixed(3));
		frm.set_value('revise_weight', parseFloat(revise_weight).toFixed(3));
		frm.set_value('amount_in_dollar_in_metal', parseFloat(amount_in_dollar_in_metal).toFixed(3));
		// var design_weightplating = checkDigit(frm.doc.design_weightplating);
		// if (isNaN(design_weightplating) || design_weightplating === "" || design_weightplating === null || design_weightplating === undefined) {
		//     frm.set_value('design_weightplating', parseFloat(checkDigit(revise_weight)).toFixed(3));
		// }

		// if(checkDigit(frm.doc.design_weightplating) >= 0) { }
		// else { frm.set_value('design_weightplating', parseFloat(checkDigit(revise_weight)).toFixed(3)); }
		frm.set_df_property('weight_addition', 'read_only', 1);
	}

	calculate_revise_weight(frm);
}

////////  child table func ----- 'CO Metal Type' =====================  end ==================================

/// ==========================================  Metal Base ===========================  end ========================================




/// ==========================================  Design ===========================  start ========================================

function fetch_design_bom_details(frm) {
	if (frm.doc.design_code) {
		frappe.call({
			method: 'frappe.client.get',
			args: {
				doctype: 'EMR Design 3D Library',
				name: frm.doc.design_code
			},
			callback: function (r) {
				console.log(r);
				if (r.message && r.message.design_bom_details) {

					frm.clear_table('diamond_costing');
					frm.clear_table('stone_child');
					frm.clear_table('findings_list');
					r.message.design_bom_details.forEach(detail => {

						if (detail.category == "D") {
							var childTableDiamondProc = frm.add_child("diamond_costing");
							childTableDiamondProc.diamond_code = detail.raw_material_code;
							childTableDiamondProc.description = detail.raw_material_code_name;
							childTableDiamondProc.diamond_size = detail.length;
							childTableDiamondProc.diamond_width = detail.width;
							// childTableDiamondProc.diamond_weight_cost_per_cts = detail.weight;
							childTableDiamondProc.quantity_no_of_pcs = detail.quantity;
						}
						if (detail.category == "C") {
							var childTableStoneProc = frm.add_child("stone_child");
							childTableStoneProc.stone_code = detail.raw_material_code;
							childTableStoneProc.description = detail.raw_material_code_name;
							childTableStoneProc.size = detail.length;
							childTableStoneProc.width = detail.width;
							// childTableStoneProc.weight_per_pcs_cts = detail.weight;
							childTableStoneProc.qty = detail.quantity;
						}
						if (detail.category != "C" && detail.category != "D") {
							if (detail.raw_material_code == "S925" ||
								detail.raw_material_code == "S999" ||
								detail.raw_material_code == "G09P" ||
								detail.raw_material_code == "G09W" ||
								detail.raw_material_code == "G09Y" ||
								detail.raw_material_code == "G10P" ||
								detail.raw_material_code == "G10PCHN" ||
								detail.raw_material_code == "G10W" ||
								detail.raw_material_code == "G10Y" ||
								detail.raw_material_code == "G14P" ||
								detail.raw_material_code == "G14Y" ||
								detail.raw_material_code == "G14YFDK030" ||
								detail.raw_material_code == "G14YVED" ||
								detail.raw_material_code == "G18P" ||
								detail.raw_material_code == "G18W" ||
								detail.raw_material_code == "G22Y" ||
								detail.raw_material_code == "G9WLOCK" ||
								detail.raw_material_code == "B999"
							) {

								console.log(detail.raw_material_code)

							} else {
								var childTableStoneProc = frm.add_child("findings_list");
								childTableStoneProc.finding_code = detail.raw_material_code;
								childTableStoneProc.description = detail.raw_material_code_name;
								childTableStoneProc.weight = detail.weight;
								childTableStoneProc.quantity = detail.quantity;
								childTableStoneProc.finding_type = detail.category;
							}

						}
					});
					// Refresh the table to show the new entries
					frm.refresh_field('diamond_costing');
					frm.refresh_field('stone_child');
					frm.refresh_field('findings_list');
					frm.refresh_field('stone_image')

					// update_setting_child(frm);
					// diamond_update_setting_child(frm);


					calculate_findings_cost_master(frm);

					update_master_total_stone_cost(frm);
					update_setting_child(frm);

					update_master_total_diamond_cost(frm);
					diamond_update_setting_child(frm);

					update_master_total_stone_cost_in_setting(frm);
				}
			},
			error: function (error) {
				frappe.msgprint(__('An error occurred while fetching BOM details.'));
				console.error(error);
			}
		});
	}
}

function calculate_revise_weight(frm) {
	frm.set_value('design_weight', parseFloat(checkDigit(frm.doc.metal_weights)).toFixed(3));

	if (frm.doc.metal_type == "Mix Metal") {
		frm.set_df_property('weight_addition', 'read_only', 1);
	}
	else {
		var value_added_weight = parseFloat(checkDigit(frm.doc.metal_weights)) * (parseFloat(checkDigit(frm.doc.weight_addition)) / 100);
		var revise_weight = parseFloat(checkDigit(frm.doc.metal_weights)) + parseFloat(checkDigit(value_added_weight))
		frm.set_value('value_added_weight', parseFloat(checkDigit(value_added_weight)).toFixed(3));
		frm.set_value('revise_weight', parseFloat(checkDigit(revise_weight)).toFixed(3));
		//   var design_weightplating = checkDigit(frm.doc.design_weightplating);
		if (checkDigit(frm.doc.design_weightplating) > 0) { }
		else { frm.set_value('design_weightplating', parseFloat(checkDigit(revise_weight)).toFixed(3)); }
		frm.set_value('amount_in_dollar_in_metal', parseFloat(checkDigit(frm.doc.revise_weight) * checkDigit(frm.doc.final_cost)).toFixed(3));
		frm.set_df_property('weight_addition', 'read_only', 0);
	}
	if (frm.doc.labour_detail) {
		for (var i = 0; i < frm.doc.labour_detail.length; i++) {
			calculate_labour_rate(frm, frm.doc.labour_detail[i].doctype, frm.doc.labour_detail[i].name);
		}
	}
	if (frm.doc.co_other_charges) {
		for (var i = 0; i < frm.doc.co_other_charges.length; i++) {
			calculate_other_charge(frm, frm.doc.co_other_charges[i].doctype, frm.doc.co_other_charges[i].name);
		}
	}
	calculate_plating_pricing(frm)
	calculate_plating_pricing_second_plating(frm)
}


/// ==========================================  Design ===========================  end ========================================




/// ==========================================  Finding ===========================  start ========================================

function calculate_finding_rate(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var rate_in_dollar = 0;
	if (child.finding_uom == 'Gram') {
		rate_in_dollar = parseFloat(checkDigit(child.weight)) * parseFloat(checkDigit(child.rate_gram));
	} else if (child.finding_uom == 'Pcs') {
		rate_in_dollar = parseFloat(checkDigit(child.quantity)) * parseFloat(checkDigit(child.rate_gram));
	} else {
		console.error('Invalid uom:', child.finding_uom);
	}
	frappe.model.set_value(cdt, cdn, 'rate_in_dollar', parseFloat(rate_in_dollar).toFixed(3));
	calculate_findings_cost_master(frm);
}

function calculate_findings_cost_master(frm) {
	var findings_in_dollar = 0;
	var total_findings_weight = 0;
	if (frm.doc.findings_list) {
		frm.doc.findings_list.forEach(child => {
			findings_in_dollar += parseFloat(checkDigit(child.rate_in_dollar));
			total_findings_weight += parseFloat(checkDigit(child.weight));
		});
	}
	frm.set_value('findings_in_dollar', findings_in_dollar.toFixed(3));
	frm.set_value('total_findings_weight', total_findings_weight.toFixed(3));

	update_value_additions(frm);
	calculate_total_cost(frm);
}

/// ==========================================  Finding ===========================  end ========================================



/// ==========================================  Labour ===========================  start ========================================
function calculate_labour_rate(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var labour_cost = 0;
	if (child.uom === "Pcs") {
		labour_cost = parseFloat(checkDigit(child.labour_cost_uom)) * 1;
		frappe.model.set_value(cdt, cdn, "labour_cost", parseFloat(labour_cost).toFixed(3));
	}
	else if (child.uom === 'Gram') {
		labour_cost = parseFloat(checkDigit(frm.doc.revise_weight)) * parseFloat(checkDigit(child.labour_cost_uom));
		frappe.model.set_value(cdt, cdn, "labour_cost", parseFloat(labour_cost).toFixed(3));
	} else {
		frappe.model.set_value(cdt, cdn, "labour_cost", labour_cost);
	}

	calculate_labour_cost_master(frm);
}

function calculate_labour_cost_master(frm) {
	var total_labour_cost = 0;
	if (frm.doc.labour_detail) {
		frm.doc.labour_detail.forEach(child => {
			total_labour_cost += parseFloat(checkDigit(child.labour_cost));
		});
	}
	frm.set_value('total_labour_cost', parseFloat(total_labour_cost).toFixed(3));

	update_value_additions(frm);

	calculate_total_cost(frm);
}


function calculate_labour_rate_not_inc(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var labour_cost = 0;
	if (child.uom == "Pcs") {
		labour_cost = checkDigit(child.labour_cost_uom);
		frappe.model.set_value(cdt, cdn, "labour_cost", parseFloat(labour_cost).toFixed(3));
	}
	else {
		frappe.model.set_value(cdt, cdn, "labour_cost", labour_cost);
	}
	calculate_labour_cost_master(frm);
}


function calculate_labour_cost_master_not_inc(frm) {
	var total_labour_constin_not_inc = 0;
	if (frm.doc.co_labour_constin_not_inc) {
		frm.doc.co_labour_constin_not_inc.forEach(child => {
			total_labour_constin_not_inc += parseFloat(checkDigit(child.labour_cost));
		});
	}
	frm.set_value('total_labour_constin_not_inc', parseFloat(total_labour_constin_not_inc).toFixed(3));

	calculate_total_cost(frm);
	// frm.refresh_field('total_labour_constin_not_inc');
}


/// ==========================================  Labour ===========================  end ========================================



/// ==========================================  Stone ===========================  start ========================================
// function fetch_stone_procurement_data(frm) {
//     const stoneCodes = frm.doc.stone_child.map(child => child.raw_material_code);
//     stoneCodes.forEach(stoneCode => {
//         frappe.call({
//             method: "get_stone_procurement_list_api",
//             args: {
//                 stone_code: stoneCode,
//                 company: frm.doc.production_unit_name,
//             },
//             success: function (obj) {
//                 if (obj.obj.status) {
//                     const stoneData = obj.obj.data;
//                     stoneData.forEach(data => {
//                         const childTable = frm.add_child("stone_detail");
//                         childTable.stone_code = data.stone_code;
//                     });
//                     frm.refresh_fields("stone_detail");
//                 }
//             },
//             error: function (r) {
//                 console.error(r);
//             },
//         });
//     });
// }

function sendStoneDetail(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	frappe.dom.freeze();

	frappe.call({
		method: "send_to_stone_purchase_costing",
		type: "POST",
		args: {
			'stone_name': child.stone_name,
			'shape_name': child.shape_name,
			'cut_name': child.cut_name,
			'quality': child.quality,
			'length': child.size,
			'width': child.width,
			'height': child.height,
			'medium': child.medium,
			'qty': child.qty,
			'uom': child.uom,
			'stone_code': child.stone_code,
			'stone_generated_val': child.stone_generated_val,
			'costing_id': frm.doc.name,
			'design_id': frm.doc.main_design_code,
			'sales_person': frm.doc.owner,
			'client': frm.doc.customer,
			'metal_type': frm.doc.metal_type,
			'image': frm.doc.image,
			'client_code': frm.doc.clients_code,
		},
		error: function (obj) {
			console.log("hi22"); console.log(obj);
		},
		always: function (obj) {
			frappe.dom.unfreeze();
			// console.log("hi44");
			frappe.model.set_value(cdt, cdn, 'stone_generated_val', obj.data.data.name);
			if (obj.status) {
				frm.save();
			}
			frappe.msgprint(obj.data.msg);
			// generate_stone_code(frm,cdt,cdn);
			fetch_stones_price_details(frm, cdt, cdn)
		},
		// async: true,

	});
}



function fetch_stones_price_history_details(frm, cdt, cdn) {

	var child = locals[cdt][cdn];
	frm.set_df_property(child.parentfield, 'options', "", frm.docname, 'stone_price_history', child.name);

	frappe.db.get_list("Stone Price Request", {
		fields: ["*"],
		filters: {
			stone: child.stone_name,
			shape: child.shape,
			cut: child.cut_name,
			quality: child.quality,
			length: child.size,
			width: child.width,
			height: child.height,
			medium: child.medium,
			qty: child.qty,
			// 'price_accepted': priceAccepted,
			// 'price_rejected': priceRejected,

		},
	})
		.then((obj) => {

			console.log("obj : ", obj)
			var str = "";
			// var new_str = "";
			var j = 1; var k = 0;

			for (var i = 0; i < obj.length; i++) {
				if (obj[i].name == child.stone_generated_val) { }
				else {
					k++;
					if (k == 1) {
						str = " "
						str += '   <h5>Costing Stone Price History ::</h5> '
						str += '   <table  class="table   table-bordered table-striped" style="width:100%"> '
						str += '   <thead> '
						str += '       <tr style="text-align:center;text-shadow: 1px 1px 1px lightgrey, 3px 3px 5px lightgrey;"> '
						str += '          <td>S No.</td> '
						str += '          <td>Stone Purchase ID</td> '
						// str += '          <td>Stone Code</td> '
						str += '          <td>Stone Price</td> '
						str += '          <td>Weight Per Pcs(Cts)</td> '
						str += '          <td>Date</td> '
						str += '       </tr> '
						str += '    </thead> '
						str += '    <tbody >  ';
					}
					str += '<tr style="text-align:center;">';
					str += '    <td>' + k + '</td>';
					str += '    <td>' + checkString(obj[i].name) + '</td>';
					// str += '    <td>' + checkString(obj[i].stone_code) + '</td>';
					str += '    <td>' + checkString(obj[i].price) + '</td>';
					str += '    <td>' + checkString(obj[i].weight_per_pcs_cts) + '</td>';
					str += '    <td>' + checkString(obj[i].creation) + '</td>';
					str += '    <td>' + checkString(obj[i].btn_price) + '</td>';
					str += ' </tr> ';
				}
				if (k == obj.length) {
					str += '         </tbody> '
					str += '     </table>  ';
				}
			}

			if (obj.length == 0) {
				str = "No Stone history found.";
			}
			// str = new_str + str;
			frm.set_df_property(child.parentfield, 'options', str, frm.docname, 'stone_price_history', child.name);
			frm.refresh_field(child.parentfield);
		});
}

function update_stone_price_quot(frm, cdt, cdn, status) {
	var child = locals[cdt][cdn];

	if (child.stone_generated_val) {

		frappe.dom.freeze();
		frappe.call({
			// method: "pinkcityit.pinkcity_crm.doctype.stone_price_request.stone_price_request.update_stone_details",
			type: "POST",
			args: {
				'stone_generated_val': child.stone_generated_val,
				'status': status,
			},
			error: function (obj) {
				console.log("hi22");
				console.log(obj);
			},
			always: function (obj) {
				frappe.dom.unfreeze();
				// console.log("hi44");
				// frappe.model.set_value(cdt, cdn, 'stone_generated_val', obj.data.data.name);
				// if (obj.status) {
				// 	frm.save();
				// }
				frappe.msgprint(obj.data.msg);
				// generate_stone_code(frm,cdt,cdn);
				fetch_stones_price_details(frm, cdt, cdn)
			},
			// async: true,

		});

	} else {
		frappe.msgprint("Please create stone price request first.")
	}

}
function fetch_stones_price_details(frm, cdt, cdn) {
	fetch_stones_price_history_details(frm, cdt, cdn);

	var child = locals[cdt][cdn];
	frm.set_df_property(child.parentfield, 'options', "", frm.docname, 'stone_price_html', child.name);

	if (child.stone_generated_val) {
		frappe.db.get_doc("Stone Price Request", child.stone_generated_val).then((doc) => {
			console.log("Stone Price Request", doc);

			var new_str = " "
			new_str += '   <table  class="table   table-bordered table-new_striped" style="margin-top: -24px !important; width:100%"> '
			new_str += '   <thead> '
			new_str += '       <tr style="text-align:center;text-shadow: 1px 1px 1px lightgrey, 3px 3px 5px lightgrey;"> '
			new_str += '          <td>S No.</td> '
			new_str += '          <td>Stone Purchase ID</td> '
			// new_str += '          <td>Stone Code</td> '
			new_str += '          <td>Stone Price</td> '
			new_str += '          <td>Weight Per Pcs</td> '
			new_str += '          <td>Date</td> '
			new_str += '          <td>Remarks</td> '
			new_str += '          <td>Status</td> '
			new_str += '       </tr> '
			new_str += '    </thead> '
			new_str += '    <tbody >  ';

			if (doc.price_history.length) {
				for (var i = 0; i < doc.price_history.length; i++) {
					new_str += '<tr style="text-align:center;">';
					new_str += '    <td>' + (i + 1) + '</td>';
					new_str += '    <td>' + checkString(doc.name) + '</td>';
					// new_str += '    <td>' + checkString(doc.stone_code) + '</td>';
					new_str += '    <td>' + checkString(doc.price_history[i].price) + '</td>';
					new_str += '    <td>' + checkString(doc.price_history[i].weight_per_pcs_cts) + '</td>';
					new_str += '    <td>' + checkString(doc.price_history[i].creation) + '</td>';
					new_str += '    <td>' + checkString(doc.price_history[i].remarks) + '</td>';
					new_str += '    <td>' + checkString(doc.price_history[i].btn_price) + '</td>';
					new_str += ' </tr> ';
				}
			} else {
				new_str += '<tr style="text-align:center;">';
				new_str += '    <td> 1 </td>';
				new_str += '    <td>' + checkString(doc.name) + '</td>';
				// new_str += '    <td>' + checkString(doc.stone_code) + '</td>';
				new_str += '    <td></td>';
				new_str += '    <td></td>';
				new_str += '    <td>' + checkString(doc.creation) + '</td>';
				new_str += '    <td></td>';
				new_str += ' </tr> ';
			}

			new_str += '         </tbody> '
			new_str += '     </table>  ';

			frm.set_df_property(child.parentfield, 'options', new_str, frm.docname, 'stone_price_html', child.name);
			frm.refresh_field(child.parentfield);
		});
	}

}

// function fetch_stones_price_details(frm, cdt, cdn) {
// 	fetch_stones_price_history_details(frm, cdt, cdn);

// 	var child = locals[cdt][cdn];
// 	frm.set_df_property(child.parentfield, 'options', "", frm.docname, 'stone_price_html', child.name);

// 	if (child.stone_generated_val) {
// 		frappe.db.get_doc("Stone Price Request", child.stone_generated_val).then((doc) => {
// 			console.log("Stone Price Request", doc);

// 			var new_str = " "
// 			new_str += '   <table  class="table   table-bordered table-new_striped" style="margin-top: -24px !important; width:100%"> '
// 			new_str += '   <thead> '
// 			new_str += '       <tr style="text-align:center;text-shadow: 1px 1px 1px lightgrey, 3px 3px 5px lightgrey;"> '
// 			new_str += '          <td>S No.</td> '
// 			new_str += '          <td>Stone Purchase ID</td> '
// 			// new_str += '          <td>Stone Code</td> '
// 			new_str += '          <td>Stone Price</td> '
// 			new_str += '          <td>Weight Per Pcs</td> '
// 			new_str += '          <td>Date</td> '
// 			new_str += '          <td>Remarks</td> '
// 			new_str += '       </tr> '
// 			new_str += '    </thead> '
// 			new_str += '    <tbody >  ';

// 			if (doc.price_history.length) {
// 				for (var i = 0; i < doc.price_history.length; i++) {
// 					new_str += '<tr style="text-align:center;">';
// 					new_str += '    <td>' + (i + 1) + '</td>';
// 					new_str += '    <td>' + checkString(doc.name) + '</td>';
// 					// new_str += '    <td>' + checkString(doc.stone_code) + '</td>';
// 					new_str += '    <td>' + checkString(doc.price_history[i].price) + '</td>';
// 					new_str += '    <td>' + checkString(doc.price_history[i].weight_per_pcs_cts) + '</td>';
// 					new_str += '    <td>' + checkString(doc.price_history[i].creation) + '</td>';
// 					new_str += '    <td>' + checkString(doc.price_history[i].remarks) + '</td>';
// 					new_str += ' </tr> ';
// 				}
// 			} else {
// 				new_str += '<tr style="text-align:center;">';
// 				new_str += '    <td> 1 </td>';
// 				new_str += '    <td>' + checkString(doc.name) + '</td>';
// 				// new_str += '    <td>' + checkString(doc.stone_code) + '</td>';
// 				new_str += '    <td></td>';
// 				new_str += '    <td></td>';
// 				new_str += '    <td>' + checkString(doc.creation) + '</td>';
// 				new_str += '    <td></td>';
// 				new_str += ' </tr> ';
// 			}

// 			new_str += '         </tbody> '
// 			new_str += '     </table>  ';

// 			frm.set_df_property(child.parentfield, 'options', new_str, frm.docname, 'stone_price_html', child.name);
// 			frm.refresh_field(child.parentfield);
// 		});
// 	}

// }

function generate_stone_code(frm, cdt, cdn) {
	var child = locals[cdt][cdn];

	console.log("Generating stone code...");
	console.log("stone_short_name:", child.stone_short_name);
	console.log("stone_short_cut:", child.stone_short_cut);
	console.log("stone_short_shape:", child.stone_short_shape);
	console.log("length:", child.size);
	console.log("width:", child.width);
	console.log("stone_short_quality:", child.stone_short_quality);

	var stone_code = "";

	if (checkString(child.stone_short_name)) {
		stone_code += checkString(child.stone_short_name) + '';
	} else {
		stone_code += 'XXX';
	}

	if (checkString(child.stone_short_cut)) {
		stone_code += checkString(child.stone_short_cut) + '';
	} else {
		stone_code += 'XX';
	}

	if (checkString(child.stone_short_shape)) {
		stone_code += checkString(child.stone_short_shape) + '';
	} else {
		stone_code += 'XX';
	}

	stone_code += generate_stone_code_for_digit(child.size) + '';
	stone_code += generate_stone_code_for_digit(child.width) + '';

	if (checkString(child.stone_short_quality)) {
		stone_code += checkString(child.stone_short_quality);
	} else {
		stone_code += 'XX';
	}

	console.log("Final Generated Stone Code:", stone_code);

	// Check if the values exist in `locals` before setting them
	console.log("Before Setting Stone Code - child object:", child);

	frappe.model.set_value(cdt, cdn, 'stone_code', stone_code)
	// .then(() => {
	//     console.log("Stone code successfully set in form:", stone_code);
	//     frm.refresh_field('stone_child');
	// });
}



function generate_stone_code_for_digit(value) {
	var digit_code = '00';
	if (checkDigit(value)) {
		if (value < 10) {
			if (value % 1) { digit_code = value; }
			else { digit_code = '0' + value; }
		}
		else {
			digit_code = value;
		}
	}
	return digit_code;

}


function calculate_total_stone_cost(frm, cdt, cdn) {
	var child = locals[cdt][cdn];

	var weight_per_pcs_cts = 0;
	// if (child.uom == 'Cts' && parseFloat(checkDigit(child.qty)) > 0) {
	// 	weight_per_pcs_cts = parseFloat(checkDigit(child.total_weight)) / parseFloat(checkDigit(child.qty));
	// 	frappe.model.set_value(cdt, cdn, "weight_per_pcs_cts", parseFloat(checkDigit(weight_per_pcs_cts)).toFixed(3));
	// } else {
	// 	frappe.model.set_value(cdt, cdn, "weight_per_pcs_cts", weight_per_pcs_cts);
	// }


	var total_weight = 0;
	if (child.uom == 'Cts' && parseFloat(checkDigit(child.qty)) > 0) {
		total_weight = parseFloat(checkDigit(child.weight_per_pcs_cts)) * parseFloat(checkDigit(child.qty));
		frappe.model.set_value(cdt, cdn, "total_weight", parseFloat(checkDigit(total_weight)).toFixed(3));
	}
	else if (child.uom == "Pcs") {
		total_weight = parseFloat(checkDigit(child.weight_per_pcs_cts)) * parseFloat(checkDigit(child.qty));
		frappe.model.set_value(cdt, cdn, "total_weight", parseFloat(checkDigit(total_weight)).toFixed(3));
	}
	else {
		frappe.model.set_value(cdt, cdn, "total_weight", total_weight);
	}
	var value_addition_amount = parseFloat(checkDigit(child.price)) * (parseFloat(checkDigit(child.value_addition)) / 100);
	var revice_stone_price = parseFloat(checkDigit(child.price)) + parseFloat(value_addition_amount);
	var usd_converstion_rate = checkDigit(frm.doc.usd_converstion_rate) || 1;
	var sale_price_uom_dollar = 0;

	frappe.model.set_value(cdt, cdn, "value_addition_amount", parseFloat(checkDigit(value_addition_amount)).toFixed(3));
	frappe.model.set_value(cdt, cdn, 'revice_stone_price', parseFloat(checkDigit(revice_stone_price)).toFixed(3));


	var total_stone_cost = 0;
	if (child.uom == 'Cts') {
		total_stone_cost = checkDigit(child.total_weight) * checkDigit(child.revice_stone_price);
	} else if (child.uom == 'Pcs') {
		total_stone_cost = checkDigit(child.qty) * checkDigit(child.revice_stone_price);
	} else {
		console.error('Invalid uom:', child.uom);
	}
	frappe.model.set_value(cdt, cdn, 'total_stone_cost', parseFloat(checkDigit(total_stone_cost)).toFixed(3));

	sale_price_uom_dollar = parseFloat(checkDigit(revice_stone_price)) / checkDigit(frm.doc.usd_converstion_rate);
	frappe.model.set_value(cdt, cdn, "sale_price_uom_dollar", parseFloat(checkDigit(sale_price_uom_dollar)).toFixed(3));

	var stone_rate_in_dollar = total_stone_cost / usd_converstion_rate;

	frappe.model.set_value(cdt, cdn, 'stone_rate_in_dollar', parseFloat(checkDigit(stone_rate_in_dollar)).toFixed(3));

	var stone_priceper_cts = 0;
	var weight_per_pcs_cts = 0;
	if (child.uom == 'Cts') {
		stone_priceper_cts = (revice_stone_price * weight_per_pcs_cts) / usd_converstion_rate;
		frappe.model.set_value(cdt, cdn, 'stone_priceper_cts', parseFloat(checkDigit(stone_priceper_cts)).toFixed(3));
	} else if (child.uom == 'Pcs') {
		stone_priceper_cts = 0;
		frappe.model.set_value(cdt, cdn, 'stone_priceper_cts', '0');
	} else {
		console.error('Invalid uom:', child.uom);
	}

	update_master_total_stone_cost(frm);
}



function update_master_total_stone_cost(frm) {
	var stone_rate_in_dollar = 0;
	// var total_stone_cost_in_rs = 0;
	var total_weight = 0;
	var total_quantity = 0;
	if (frm.doc.stone_child) {
		frm.doc.stone_child.forEach(child => {
			// total_stone_cost_in_rs += parseFloat(checkDigit(child.total_stone_cost));
			total_weight += parseFloat(checkDigit(child.total_weight));
			total_quantity += parseFloat(checkDigit(child.qty));
			stone_rate_in_dollar += parseFloat(checkDigit(child.stone_rate_in_dollar));
		});

	}
	// frm.set_value('total_stone_cost_in_rs', total_stone_cost_in_rs.toFixed(3));
	frm.set_value('total_weight', total_weight.toFixed(3));
	frm.set_value('total_quantity', total_quantity.toFixed(3));
	frm.set_value('total_stone_cost_in_dollar', stone_rate_in_dollar.toFixed(3));

	calculate_total_cost(frm);
}

/// ==========================================  Stone ===========================  end ========================================



/// ==========================================  Diamond ===========================  end ========================================



function calculate_total_diamond_cost(frm, cdt, cdn) {
	var child = locals[cdt][cdn];

	var diamond_weight_cost_per_cts = 0;
	if (child.uom === 'Cts' && parseFloat(checkDigit(child.quantity_no_of_pcs)) > 0) {
		diamond_weight_cost_per_cts = parseFloat(checkDigit(child.total_weight_diamond)) / parseFloat(checkDigit(child.quantity_no_of_pcs));
		frappe.model.set_value(cdt, cdn, "diamond_weight_cost_per_cts", parseFloat(checkDigit(diamond_weight_cost_per_cts)).toFixed(3));
	} else {
		frappe.model.set_value(cdt, cdn, "diamond_weight_cost_per_cts", parseFloat(checkDigit(diamond_weight_cost_per_cts)).toFixed(3));
	}

	var usd_converstion_rate = checkDigit(frm.doc.usd_converstion_rate) || 1;
	var value_addition_amount = parseFloat(checkDigit(child.diamond_price)) * (parseFloat(checkDigit(child.value_addition)) / 100);
	var revise_diamond_price = parseFloat(checkDigit(child.diamond_price)) + parseFloat(value_addition_amount);

	// var usd_converstion_rate = checkDigit(frm.doc.usd_converstion_rate);
	frappe.model.set_value(cdt, cdn, "value_addition_amount", parseFloat(checkDigit(value_addition_amount)).toFixed(3));
	frappe.model.set_value(cdt, cdn, 'revise_diamond_price', parseFloat(checkDigit(revise_diamond_price)).toFixed(3));

	var diamond_sales_price_uom = parseFloat(revise_diamond_price) / parseFloat(usd_converstion_rate);
	frappe.model.set_value(cdt, cdn, 'diamond_sales_price_uom', parseFloat(checkDigit(diamond_sales_price_uom)).toFixed(3));

	var diamond_total_cost = 0;
	if (child.uom === 'Cts') {
		diamond_total_cost = parseFloat(checkDigit(child.total_weight_diamond)) * parseFloat(revise_diamond_price);
	} else if (child.uom === 'Pcs') {
		diamond_total_cost = parseFloat(checkDigit(child.quantity_no_of_pcs)) * parseFloat(revise_diamond_price);
	} else {
		console.error('Invalid uom:', child.uom);
	}
	frappe.model.set_value(cdt, cdn, 'diamond_total_cost', parseFloat(checkDigit(diamond_total_cost)).toFixed(3));

	var diamond_price_per_cts = (parseFloat(revise_diamond_price) * parseFloat(diamond_weight_cost_per_cts)) / parseFloat(usd_converstion_rate);
	frappe.model.set_value(cdt, cdn, 'diamond_price_per_cts', parseFloat(checkDigit(diamond_price_per_cts)).toFixed(3));

	var diamond_rate_in_dollar = parseFloat(diamond_total_cost) / parseFloat(usd_converstion_rate);
	frappe.model.set_value(cdt, cdn, 'diamond_rate_in_dollar', parseFloat(checkDigit(diamond_rate_in_dollar)).toFixed(3));

	update_master_total_diamond_cost(frm);
}


function update_master_total_diamond_cost(frm) {
	var total_diamondcost_in_dollar = 0;
	// var diamond_total_cost = 0;
	var total_diamond_weight = 0;

	if (frm.doc.diamond_costing) {
		frm.doc.diamond_costing.forEach(child => {
			total_diamondcost_in_dollar += parseFloat(checkDigit(child.diamond_rate_in_dollar));
			// diamond_total_cost += checkDigit(child.diamond_total_cost);
			total_diamond_weight += parseFloat(checkDigit(child.total_weight_diamond));
		});
	}
	// diamond_total_cost = checkDigit(diamond_total_cost);

	// frm.set_value('diamond_total_cost', diamond_total_cost.toFixed(2));
	frm.set_value('total_diamond_weight', parseFloat(checkDigit(total_diamond_weight)).toFixed(3));
	frm.set_value('total_diamondcost_in_dollar', parseFloat(checkDigit(total_diamondcost_in_dollar)).toFixed(3));

	calculate_total_cost(frm);
}



/// ==========================================  Diamond ===========================  end ========================================




/// ==========================================  Setting ===========================  start ========================================


function update_setting_child(frm) {
	const usd_converstion_rate = parseFloat(checkDigit(frm.doc.usd_converstion_rate)) || 1;
	if (frm.doc.stone_child) {
		if (frm.doc.stone_child.length == 0) {
			frm.doc.stone_child = [];
			frm.doc.setting_child = [];
		}
		var check_data = 0;
		// console.log("hi11#");
		for (let i = 0; i < frm.doc.stone_child.length; i++) {
			// console.log("hi12#");
			check_data = 0;
			if (frm.doc.setting_child) {
				for (let j = 0; j < frm.doc.setting_child.length; j++) {
					// console.log("hi13#");
					if (frm.doc.stone_child[i].idx == frm.doc.setting_child[j].idx) {
						// console.log("hi14#");
						check_data = 1;
						frm.doc.setting_child[j].stone_name = frm.doc.stone_child[i].stone_name;
						frm.doc.setting_child[j].quantity = frm.doc.stone_child[i].qty;
						frm.doc.setting_child[j].setting_category = frm.doc.stone_child[i].setting_category;
						frm.doc.setting_child[j].setting_type = frm.doc.stone_child[i].setting_type;
						frm.doc.setting_child[j].setting_price_rs = frm.doc.stone_child[i].stone_setting_price;
						frm.doc.setting_child[j].length = frm.doc.stone_child[i].size;
						frm.doc.setting_child[j].width = frm.doc.stone_child[i].width;
						frm.doc.setting_child[j].setting_currency = frm.doc.stone_child[i].setting_currency;
						if (frm.doc.setting_child[j].setting_currency == "INR") {
							frm.doc.setting_child[j].setting_price_rs = parseFloat(checkDigit(frm.doc.stone_child[i].stone_setting_price)) / usd_converstion_rate;
						} else if (frm.doc.setting_child[j].setting_currency == "USD") {
							frm.doc.setting_child[j].setting_price_rs = parseFloat(checkDigit(frm.doc.stone_child[i].stone_setting_price));
						}
						frm.doc.setting_child[j].total_setting_cost = parseFloat(checkDigit(frm.doc.setting_child[j].quantity)) * parseFloat(checkDigit(frm.doc.setting_child[j].setting_price_rs));
						frm.doc.setting_child[j].setting_price_dollar = parseFloat(checkDigit(frm.doc.setting_child[j].quantity)) * parseFloat(checkDigit(frm.doc.setting_child[j].setting_price_rs));
					}
				}
			}
			if (check_data == 0) {
				// console.log("hi15#");
				let new_child = frm.add_child('setting_child');
				new_child.quantity = frm.doc.stone_child[i].qty;
				new_child.stone_name = frm.doc.stone_child[i].stone_name;
				new_child.setting_type = frm.doc.stone_child[i].setting_type;
				new_child.setting_category = frm.doc.stone_child[i].setting_category;
				new_child.setting_price_rs = frm.doc.stone_child[i].stone_setting_price;
				new_child.length = frm.doc.stone_child[i].size;
				new_child.width = frm.doc.stone_child[i].width;
				new_child.setting_currency = frm.doc.stone_child[i].setting_currency;
				if (new_child.setting_currency == "INR") {
					new_child.setting_price_rs =
						parseFloat(checkDigit(frm.doc.stone_child[i].stone_setting_price)) / usd_converstion_rate;
				} else if (new_child.setting_currency == "USD") {
					new_child.setting_price_rs = parseFloat(checkDigit(frm.doc.stone_child[i].stone_setting_price));
				}
				new_child.total_setting_cost = parseFloat(checkDigit(new_child.quantity)) * parseFloat(checkDigit(new_child.setting_price_rs));
				new_child.setting_price_dollar = parseFloat(checkDigit(new_child.quantity)) * parseFloat(checkDigit(new_child.setting_price_rs));
			}
		}
	} else {
		frm.doc.stone_child = [];
		frm.doc.setting_child = [];
	}
	check_stone_and_setting_duplicacy(frm);

}


function check_stone_and_setting_duplicacy(frm) {
	var check_data = 0;
	// console.log("hi21#");
	for (let i = 0; i < frm.doc.setting_child.length; i++) {
		// console.log("hi22#");
		check_data = 0;
		for (let j = 0; j < frm.doc.stone_child.length; j++) {
			// console.log("hi23#");
			if (frm.doc.setting_child[i].idx == frm.doc.stone_child[j].idx) {
				// console.log("hi24#");
				check_data = 1;
			}
		}
		if (check_data == 0) {
			// console.log("hi25#");
			frm.doc.setting_child.pop(i)
			check_stone_and_setting_duplicacy(frm)
		}
	}

	frm.refresh_field('setting_child');

	update_master_total_stone_cost_in_setting(frm);

}



function diamond_update_setting_child(frm) {
	if (frm.doc.diamond_costing) {
		// console.log("hi666");
		const usd_converstion_rate = parseFloat(frm.doc.usd_converstion_rate) || 1;
		if (frm.doc.diamond_costing.length == 0) {
			// console.log("hi555");
			frm.doc.diamond_costing = [];
			frm.doc.diamond_setting_child = [];
		}
		var check_data = 0;
		// console.log("hi11#");
		for (let i = 0; i < frm.doc.diamond_costing.length; i++) {
			// console.log("hi12#");
			check_data = 0;
			if (frm.doc.diamond_setting_child) {
				for (let j = 0; j < frm.doc.diamond_setting_child.length; j++) {
					// console.log("hi13#");
					if (frm.doc.diamond_costing[i].idx == frm.doc.diamond_setting_child[j].idx) {
						// console.log("hi14#");
						check_data = 1;
						frm.doc.diamond_setting_child[j].diamond_name = frm.doc.diamond_costing[i].diamond_name;
						frm.doc.diamond_setting_child[j].quantity_no_of_pcs = frm.doc.diamond_costing[i].quantity_no_of_pcs;
						frm.doc.diamond_setting_child[j].diamond_setting_price_rs = frm.doc.diamond_costing[i].diamond_sett_price;
						frm.doc.diamond_setting_child[j].length = frm.doc.diamond_costing[i].diamond_size;
						frm.doc.diamond_setting_child[j].width = frm.doc.diamond_costing[i].diamond_width;
						frm.doc.diamond_setting_child[j].diamond_setting_type = frm.doc.diamond_costing[i].setting_type;
						frm.doc.diamond_setting_child[j].diamond_setting_currency = frm.doc.diamond_costing[i].diamond_setting_currency;
						frm.doc.diamond_setting_child[j].diamond_setting_ctegory = frm.doc.diamond_costing[i].setting_category;
						if (frm.doc.diamond_setting_child[j].diamond_setting_currency == "INR") {
							frm.doc.diamond_setting_child[j].diamond_setting_price_rs = frm.doc.diamond_costing[i].diamond_sett_price / usd_converstion_rate;
						} else if (frm.doc.diamond_setting_child[j].diamond_setting_currency == "USD") {
							frm.doc.diamond_setting_child[j].diamond_setting_price_rs = frm.doc.diamond_costing[i].diamond_sett_price;
						}
						frm.doc.diamond_setting_child[j].diamond_total_setting_cost = parseFloat(checkDigit(frm.doc.diamond_setting_child[j].quantity_no_of_pcs)) * parseFloat(checkDigit(frm.doc.diamond_setting_child[j].diamond_setting_price_rs));
						frm.doc.diamond_setting_child[j].diamond_setting_price_dollar = parseFloat(checkDigit(frm.doc.diamond_setting_child[j].quantity_no_of_pcs)) * parseFloat(checkDigit(frm.doc.diamond_setting_child[j].diamond_setting_price_rs));
					}
				}
			}
			if (check_data == 0) {
				// console.log("hi15#");
				let new_child = frm.add_child('diamond_setting_child');
				new_child.quantity_no_of_pcs = frm.doc.diamond_costing[i].quantity_no_of_pcs;
				new_child.diamond_name = frm.doc.diamond_costing[i].diamond_name;
				new_child.diamond_setting_price_rs = frm.doc.diamond_costing[i].diamond_sett_price;
				new_child.length = frm.doc.diamond_costing[i].diamond_size;
				new_child.width = frm.doc.diamond_costing[i].diamond_width;
				new_child.diamond_setting_type = frm.doc.diamond_costing[i].setting_type;
				new_child.diamond_setting_currency = frm.doc.diamond_costing[i].diamond_setting_currency;
				new_child.diamond_setting_ctegory = frm.doc.diamond_costing[i].setting_category;
				if (new_child.diamond_setting_currency === "INR") {
					new_child.diamond_setting_price_rs = frm.doc.diamond_costing[i].diamond_sett_price / usd_converstion_rate;
				} else if (new_child.diamond_setting_currency === "USD") {
					new_child.diamond_setting_price_rs = frm.doc.diamond_costing[i].diamond_sett_price;
				}
				new_child.diamond_total_setting_cost = parseFloat(checkDigit(new_child.quantity_no_of_pcs)) * parseFloat(checkDigit(new_child.diamond_setting_price_rs));
				new_child.diamond_setting_price_dollar = parseFloat(checkDigit(new_child.quantity_no_of_pcs)) * parseFloat(checkDigit(new_child.diamond_setting_price_rs));
			}
		}
	} else {
		// console.log("hi777")
		frm.doc.diamond_costing = [];
		frm.doc.diamond_setting_child = [];
	}
	check_diamond_and_setting_duplicacy(frm);
}


function check_diamond_and_setting_duplicacy(frm) {
	var check_data = 0;
	// console.log("hi21#");
	for (let i = 0; i < frm.doc.diamond_setting_child.length; i++) {
		// console.log("hi22#");
		check_data = 0;
		for (let j = 0; j < frm.doc.diamond_costing.length; j++) {
			// console.log("hi23#");
			if (frm.doc.diamond_setting_child[i].idx == frm.doc.diamond_costing[j].idx) {
				// console.log("hi24#");
				check_data = 1;
			}
		}
		if (check_data == 0) {
			// console.log("hi25#");
			frm.doc.diamond_setting_child.pop(i)
			check_diamond_and_setting_duplicacy(frm)
		}
	}

	frm.refresh_field('diamond_setting_child');

	// for (let i = 0; i < frm.doc.diamond_setting_child.length; i++) {
	//     diamond_update_total_and_dollar(frm, frm.doc.diamond_setting_child[i].doctype, frm.doc.diamond_setting_child[i].name);
	// }
	update_master_total_stone_cost_in_setting(frm);
	// update_value_additions(frm);

}


function update_master_total_stone_cost_in_setting(frm) {
	// var total_setting_cost_per_pcs_master = 0;
	var total_setting_per_pcs_in_dolllar_master = 0;
	var total_stone_setting_cost = 0;
	var total_diamond_setting_cost = 0;
	if (frm.doc.setting_child) {
		frm.doc.setting_child.forEach(child => {
			total_setting_per_pcs_in_dolllar_master += parseFloat(checkDigit(child.setting_price_dollar));
			total_stone_setting_cost += parseFloat(checkDigit(child.setting_price_dollar));
		});
	}
	if (frm.doc.diamond_setting_child) {
		frm.doc.diamond_setting_child.forEach(child => {
			total_setting_per_pcs_in_dolllar_master += parseFloat(checkDigit(child.diamond_setting_price_dollar));
			total_diamond_setting_cost += parseFloat(checkDigit(child.diamond_setting_price_dollar));
		});
	}
	frm.set_value('total_setting_per_pcs_in_dolllar_master', parseFloat(checkDigit(total_setting_per_pcs_in_dolllar_master)).toFixed(3));
	frm.set_value('total_stone_setting_cost', parseFloat(checkDigit(total_stone_setting_cost)).toFixed(3));
	frm.set_value('total_diamond_setting_cost', parseFloat(checkDigit(total_diamond_setting_cost)).toFixed(3));

	update_value_additions(frm);
	calculate_total_cost(frm);
}


/// ==========================================  Setting ===========================  end ========================================




/// ==========================================  Plating ===========================  start =======================================

function generate_code(frm) {
	var plating_value = frm.doc.plating;
	var micron_value = frm.doc.micron;
	var gold_kt_value = frm.doc.gold_kt;
	var color_value = frm.doc.color;
	var gold_value = frm.doc.gold;
	var anti_tarnish_value = frm.doc.anti_tarnish;

	var plating_codes = {
		"Flash Gold Plating": "PLT-FLSH",
		"Flash Rhodium": "PLT-FLSH",
		"Micron Plating": "PLT-MIC",
	};

	var plating_code = plating_codes[plating_value] || "";
	if (plating_value === "Micron Plating") {
		frm.set_df_property('micron', 'read_only', 0);
		frm.set_df_property('gold_kt', 'read_only', 0);
		frm.set_df_property('color', 'read_only', 0);
		frm.set_df_property('gold', 'read_only', 0);
		frm.set_df_property('anti_tarnish', 'read_only', 0);

		frm.set_df_property('micron', 'options', [
			"0.25 Micron",
			"0.50 Micron",
			"1.00 Micron",
			"1.50 Micron",
			"2.00 Micron",
			"2.50 Micron",
			"3.00 Micron",
			"N/A",
			"────────────────────",
			"0.25 (2600 - 3000)",
			"0.50 (2600 - 3000)",
			"1.00 (2600 - 3000)",
			"1.50 (2600 - 3000)",
			"2.00 (2600 - 3000)",
			"2.50 (2600 - 3000)",
			"3.00 (2600 - 3000)",
			"────────────────────",
			"0.25 (3100 - 3500)",
			"0.50 (3100 - 3500)",
			"1.00 (3100 - 3500)",
			"1.50 (3100 - 3500)",
			"2.00 (3100 - 3500)",
			"2.50 (3100 - 3500)",
			"3.00 (3100 - 3500)",
		].join('\n'));

		// Refresh field to apply new options
		frm.refresh_field('micron');

		if (!micron_value || micron_value === "N/A") {
			frm.set_value('micron', "0.25 Micron");
		}

		if (micron_value == "0.25 Micron" || micron_value == "0.50 Micron" || micron_value == "1.00 Micron" || micron_value == "1.50 Micron" ||
			micron_value == "2.00 Micron" || micron_value == "2.50 Micron" || micron_value == "3.00 Micron" ||
			micron_value == "0.25 (2600 - 3000)" || micron_value == "0.50 (2600 - 3000)" || micron_value == "1.00 (2600 - 3000)" || micron_value == "1.50 (2600 - 3000)" ||
			micron_value == "2.00 (2600 - 3000)" || micron_value == "2.50 (2600 - 3000)" || micron_value == "3.00 (2600 - 3000)" ||
			micron_value == "0.25 (3100 - 3500)" || micron_value == "0.50 (3100 - 3500)" || micron_value == "1.00 (3100 - 3500)" || micron_value == "1.50 (3100 - 3500)" ||
			micron_value == "2.00 (3100 - 3500)" || micron_value == "2.50 (3100 - 3500)" || micron_value == "3.00 (3100 - 3500)") {
			plating_code += '-' + micron_value.split(' ')[0];
		}

		if (gold_kt_value == "18KT" || gold_kt_value == "24KT") {
			plating_code += '-' + gold_kt_value.split(' ')[0];
		}

		if (color_value == "9 kt" || color_value == "10 kt" || color_value == "12 kt" || color_value == "14 kt" || color_value == "18 kt" ||
			color_value == "22 kt" || color_value == "24 kt") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (color_value == "Vintage" || color_value == "Hamilton") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (gold_value == "Yellow Gold") { plating_code += 'YG'; }
		if (gold_value == "Rose Gold") { plating_code += 'RG'; }

		if (anti_tarnish_value == "AT") { plating_code += '-AT'; }

	} else if (plating_value === "Flash Gold Plating") {



		frm.set_df_property('micron', 'read_only', 0);
		frm.set_df_property('micron', 'options', [
			"3 to 5 miles",
			"3 to 5 miles (2600 - 3000)",
			"3 to 5 miles (3100 - 3500)"
		].join('\n'));
		frm.set_value('gold_kt', "N/A");
		frm.set_value('anti_tarnish', "N/A");
		frm.set_df_property('gold_kt', 'read_only', 1);
		frm.set_df_property('anti_tarnish', 'read_only', 1);

		if (color_value == "9 kt" || color_value == "10 kt" || color_value == "12 kt" || color_value == "14 kt" || color_value == "18 kt" ||
			color_value == "22 kt" || color_value == "24 kt") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (color_value == "Vintage" || color_value == "Hamilton") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (gold_value == "Yellow Gold") { plating_code += 'YG'; }
		if (gold_value == "Rose Gold") { plating_code += 'RG'; }

	} else if (plating_value === "Flash Rhodium") {
		// frm.set_value('micron', 'Flash Rhodium');
		// frm.set_df_property('micron', 'read_only', 1);

		frm.set_df_property('micron', 'read_only', 0);
		frm.set_df_property('micron', 'options', [
			"Flash Rhodium",
			"Flash Rhodium (2600 - 3000)",
			"3 to 5 miles (3100 - 3500)"
		].join('\n'));

		frm.set_value('gold_kt', "N/A");
		frm.set_value('anti_tarnish', "N/A");
		frm.set_df_property('gold_kt', 'read_only', 1);
		frm.set_df_property('anti_tarnish', 'read_only', 1);

		if (color_value == "9 kt" || color_value == "10 kt" || color_value == "12 kt" || color_value == "14 kt" || color_value == "18 kt" ||
			color_value == "22 kt" || color_value == "24 kt") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (color_value == "Vintage" || color_value == "Hamilton") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (gold_value == "Yellow Gold") { plating_code += 'YG'; }
		if (gold_value == "Rose Gold") { plating_code += 'RG'; }

	}

	frm.set_value('code', plating_code);
}

function calculate_plating_pricing(frm) {
	var product_type = frm.doc.product_type || '';
	var micron = frm.doc.micron || '';
	var uom_in_plating = frm.doc.uom_in_plating || '';

	var micron_plating_ounce_rate = parseFloat(checkDigit(frm.doc.micron_plating_ounce_rate)) || 2500;
	var design_weightplating = parseFloat(checkDigit(frm.doc.design_weightplating));
	var surface_area = parseFloat(checkDigit(frm.doc.surface_area));
	var plating_charge = parseFloat(frm.doc.plating_charge);

	var plating_price = 0;
	var amount_in_dollar_in_plating = 0;

	if (micron == "0.25 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.30; }
			if (product_type == "NON - Chain Product") { plating_price = 0.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.40; }
		}
	}
	if (micron == "0.50 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.80; }
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.20; }
		}
	}
	if (micron == "1.00 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.20; }
			if (product_type == "NON - Chain Product") { plating_price = 1.00; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.80; }
		}
	}
	if (micron == "1.50 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.80; }
			if (product_type == "NON - Chain Product") { plating_price = 1.50; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 2.70; }
		}
	}
	if (micron == "2.00 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 2.40; }
			if (product_type == "NON - Chain Product") { plating_price = 2.00; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 3.60; }
		}
	}
	if (micron == "2.50 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.00; }
			if (product_type == "NON - Chain Product") { plating_price = 2.50; }
			if (product_type == "18K Gold For Chains") { plating_price = 2.24; }
			if (product_type == "24K Gold Plating For Non chain Products") { plating_price = 1.97; }
			if (product_type == "18KT with .5 um 23KT Gold For Chains") { plating_price = 2.55; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 4.5; }
		}
	}
	if (micron == "3.00 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.60; }
			if (product_type == "NON - Chain Product") { plating_price = 3.00; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 5.40; }
		}
	}
	if (micron == "3 to 5 miles") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.30; }
			if (product_type == "NON - Chain Product") { plating_price = 0.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.40; }
		}
	}
	if (micron == "Flash Rhodium") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}





	if (micron == "0.25 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.30; }
			if (product_type == "NON - Chain Product") { plating_price = 0.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.40; }
		}
	}
	if (micron == "0.50 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.00; }
			if (product_type == "NON - Chain Product") { plating_price = 0.70; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.50; }
		}
	}
	if (micron == "1.00 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.50; }
			if (product_type == "NON - Chain Product") { plating_price = 1.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 2.20; }
		}
	}
	if (micron == "1.50 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 2.20; }
			if (product_type == "NON - Chain Product") { plating_price = 1.80; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 3.20; }
		}
	}
	if (micron == "2.00 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.00; }
			if (product_type == "NON - Chain Product") { plating_price = 2.40; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 4.40; }
		}
	}
	if (micron == "2.50 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.60; }
			if (product_type == "NON - Chain Product") { plating_price = 3.00; }
			if (product_type == "18K Gold For Chains") { plating_price = 2.24; }
			if (product_type == "24K Gold Plating For Non chain Products") { plating_price = 1.97; }
			if (product_type == "18KT with .5 um 23KT Gold For Chains") { plating_price = 2.55; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 5.40; }
		}
	}
	if (micron == "3.00 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 4.40; }
			if (product_type == "NON - Chain Product") { plating_price = 3.60; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 6.50; }
		}
	}
	if (micron == "3 to 5 miles (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.35; }
			if (product_type == "NON - Chain Product") { plating_price = 0.25; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.50; }
		}
	}
	if (micron == "Flash Rhodium (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}


	if (micron == "0.25 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.40; }
			if (product_type == "NON - Chain Product") { plating_price = 0.30; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}
	if (micron == "0.50 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.20; }
			if (product_type == "NON - Chain Product") { plating_price = 0.80; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.80; }
		}
	}
	if (micron == "1.00 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.80; }
			if (product_type == "NON - Chain Product") { plating_price = 1.40; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 2.60; }
		}
	}
	if (micron == "1.50 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 2.50; }
			if (product_type == "NON - Chain Product") { plating_price = 2.10; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 3.80; }
		}
	}
	if (micron == "2.00 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.50; }
			if (product_type == "NON - Chain Product") { plating_price = 2.80; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 5.00; }
		}
	}
	if (micron == "2.50 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 4.20; }
			if (product_type == "NON - Chain Product") { plating_price = 3.50; }
			if (product_type == "18K Gold For Chains") { plating_price = 2.24; }
			if (product_type == "24K Gold Plating For Non chain Products") { plating_price = 1.97; }
			if (product_type == "18KT with .5 um 23KT Gold For Chains") { plating_price = 2.55; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 6.20; }
		}
	}
	if (micron == "3.00 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 5.00; }
			if (product_type == "NON - Chain Product") { plating_price = 4.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 7.50; }
		}
	}
	if (micron == "3 to 5 miles (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.35; }
			if (product_type == "NON - Chain Product") { plating_price = 0.25; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.50; }
		}
	}
	if (micron == "Flash Rhodium (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}
	var plating_price = parseFloat(checkDigit(plating_price)) * (parseFloat(checkDigit(micron_plating_ounce_rate) / 2500));
	frm.set_value('plating_price_non_chain_products', parseFloat(checkDigit(plating_price)).toFixed(3));

	plating_price = parseFloat(plating_price) + parseFloat(checkDigit(plating_charge));
	if (uom_in_plating === "Per Gram") {
		amount_in_dollar_in_plating = parseFloat(checkDigit(plating_price)) * parseFloat(checkDigit(design_weightplating));
	}
	if (uom_in_plating === "Per Pcs (On The Basis Of Surface Area)") {
		amount_in_dollar_in_plating = parseFloat(checkDigit(plating_price)) * (parseFloat(checkDigit(surface_area)) / 625);
	}
	frm.set_value('amount_in_dollar_in_plating', parseFloat(checkDigit(amount_in_dollar_in_plating)).toFixed(3));

	calculate_other_plating_cost_master(frm);
}



function generate_code_second_plating(frm) {
	var plating_value = frm.doc.plating_types;
	var micron_value = frm.doc.microns;
	var gold_kt_value = frm.doc.gold_kts;
	var color_value = frm.doc.colors;
	var gold_value = frm.doc.golds;
	var anti_tarnish_value = frm.doc.anti_tarnishs;

	var plating_codes = {
		"Flash Gold Plating": "PLT-FLSH",
		"Flash Rhodium": "PLT-FLSH",
		"Micron Plating": "PLT-MIC",
	};

	var plating_code = plating_codes[plating_value] || "";


	// Handle plating thickness based on selected plating value
	if (plating_value === "Micron Plating") {
		frm.set_df_property('microns', 'read_only', 0);
		frm.set_df_property('gold_kts', 'read_only', 0);
		frm.set_df_property('colors', 'read_only', 0);
		frm.set_df_property('golds', 'read_only', 0);
		frm.set_df_property('anti_tarnishs', 'read_only', 0);


		frm.set_df_property('microns', 'options', [
			"0.25 Micron",
			"0.50 Micron",
			"1.00 Micron",
			"1.50 Micron",
			"2.00 Micron",
			"2.50 Micron",
			"3.00 Micron",
			"N/A",
			"────────────────────",
			"0.25 (2600 - 3000)",
			"0.50 (2600 - 3000)",
			"1.00 (2600 - 3000)",
			"1.50 (2600 - 3000)",
			"2.00 (2600 - 3000)",
			"2.50 (2600 - 3000)",
			"3.00 (2600 - 3000)",
			"────────────────────",
			"0.25 (3100 - 3500)",
			"0.50 (3100 - 3500)",
			"1.00 (3100 - 3500)",
			"1.50 (3100 - 3500)",
			"2.00 (3100 - 3500)",
			"2.50 (3100 - 3500)",
			"3.00 (3100 - 3500)",
		].join('\n'));


		if (!micron_value || micron_value === "N/A") {
			frm.set_value('microns', "0.25 Micron");
		}

		if (micron_value == "0.25 Micron" || micron_value == "0.50 Micron" || micron_value == "1.00 Micron" || micron_value == "1.50 Micron" ||
			micron_value == "2.00 Micron" || micron_value == "2.50 Micron" || micron_value == "3.00 Micron" ||
			micron_value == "0.25 (2600 - 3000)" || micron_value == "0.50 (2600 - 3000)" || micron_value == "1.00 (2600 - 3000)" || micron_value == "1.50 (2600 - 3000)" ||
			micron_value == "2.00 (2600 - 3000)" || micron_value == "2.50 (2600 - 3000)" || micron_value == "3.00 (2600 - 3000)" ||
			micron_value == "0.25 (3100 - 3500)" || micron_value == "0.50 (3100 - 3500)" || micron_value == "1.00 (3100 - 3500)" || micron_value == "1.50 (3100 - 3500)" ||
			micron_value == "2.00 (3100 - 3500)" || micron_value == "2.50 (3100 - 3500)" || micron_value == "3.00 (3100 - 3500)") {
			plating_code += '-' + micron_value.split(' ')[0];
		}

		if (gold_kt_value == "18KT" || gold_kt_value == "24KT") {
			plating_code += '-' + gold_kt_value.split(' ')[0];
		}

		if (color_value == "9 kt" || color_value == "10 kt" || color_value == "12 kt" || color_value == "14 kt" || color_value == "18 kt" ||
			color_value == "22 kt" || color_value == "24 kt") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (color_value == "Vintage" || color_value == "Hamilton") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (gold_value == "Yellow Gold") { plating_code += 'YG'; }
		if (gold_value == "Rose Gold") { plating_code += 'RG'; }

		if (anti_tarnish_value == "AT") { plating_code += '-AT'; }
		// frm.set_df_property('micron', 'read_only', 0);

	} else if (plating_value === "Flash Gold Plating") {

		frm.set_df_property('microns', 'read_only', 0);
		frm.set_df_property('microns', 'options', [
			"3 to 5 miles",
			"3 to 5 miles (2600 - 3000)",
			"3 to 5 miles (3100 - 3500)"
		].join('\n'));
		frm.set_value('gold_kts', "N/A");
		frm.set_df_property('gold_kts', 'read_only', 1);
		frm.set_value('anti_tarnishs', "N/A");
		frm.set_df_property('anti_tarnishs', 'read_only', 1);

		if (color_value == "9 kt" || color_value == "10 kt" || color_value == "12 kt" || color_value == "14 kt" || color_value == "18 kt" ||
			color_value == "22 kt" || color_value == "24 kt") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (color_value == "Vintage" || color_value == "Hamilton") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (gold_value == "Yellow Gold") { plating_code += 'YG'; }
		if (gold_value == "Rose Gold") { plating_code += 'RG'; }

	} else if (plating_value === "Flash Rhodium") {
		// frm.set_value('microns', 'Flash Rhodium');
		// frm.set_df_property('microns', 'read_only', 1);
		frm.set_df_property('micron', 'read_only', 0);
		frm.set_df_property('micron', 'options', [
			"Flash Rhodium",
			"Flash Rhodium (2600 - 3000)",
			"3 to 5 miles (3100 - 3500)"
		].join('\n'));
		frm.set_value('gold_kts', "N/A");
		frm.set_df_property('gold_kts', 'read_only', 1);
		frm.set_value('anti_tarnishs', "N/A");
		frm.set_df_property('anti_tarnishs', 'read_only', 1);

		if (color_value == "9 kt" || color_value == "10 kt" || color_value == "12 kt" || color_value == "14 kt" || color_value == "18 kt" ||
			color_value == "22 kt" || color_value == "24 kt") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (color_value == "Vintage" || color_value == "Hamilton") {
			plating_code += '-' + color_value.split(' ')[0] + 'C';
		}

		if (gold_value == "Yellow Gold") { plating_code += 'YG'; }
		if (gold_value == "Rose Gold") { plating_code += 'RG'; }

	}

	frm.set_value('plating_codes', plating_code);
}


function calculate_plating_pricing_second_plating(frm) {
	var product_type = frm.doc.product_types || '';
	var micron = frm.doc.microns || '';
	var uom_in_plating = frm.doc.pric_uom || '';

	var micron_plating_ounce_rate = parseFloat(checkDigit(frm.doc.micron_plating_ounce_rate_second_plating)) || 2500;
	var design_weightss = parseFloat(checkDigit(frm.doc.design_weightss));
	var surface_area = parseFloat(checkDigit(frm.doc.surface));
	var plating_charge = parseFloat(frm.doc.plating_charg);

	var plating_price = 0;
	var amount_in_dollar_in_plating = 0;

	if (micron == "0.25 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.30; }
			if (product_type == "NON - Chain Product") { plating_price = 0.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.40; }
		}
	}
	if (micron == "0.50 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.80; }
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.20; }
		}
	}
	if (micron == "1.00 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.20; }
			if (product_type == "NON - Chain Product") { plating_price = 1.00; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.80; }
		}
	}
	if (micron == "1.50 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.80; }
			if (product_type == "NON - Chain Product") { plating_price = 1.50; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 2.70; }
		}
	}
	if (micron == "2.00 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 2.40; }
			if (product_type == "NON - Chain Product") { plating_price = 2.00; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 3.60; }
		}
	}
	if (micron == "2.50 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.00; }
			if (product_type == "NON - Chain Product") { plating_price = 2.50; }
			if (product_type == "18K Gold For Chains") { plating_price = 2.24; }
			if (product_type == "24K Gold Plating For Non chain Products") { plating_price = 1.97; }
			if (product_type == "18KT with .5 um 23KT Gold For Chains") { plating_price = 2.55; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 4.5; }
		}
	}
	if (micron == "3.00 Micron") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.60; }
			if (product_type == "NON - Chain Product") { plating_price = 3.00; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 5.40; }
		}
	}
	if (micron == "3 to 5 miles") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.30; }
			if (product_type == "NON - Chain Product") { plating_price = 0.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.40; }
		}
	}
	if (micron == "Flash Rhodium") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}



	if (micron == "0.25 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.30; }
			if (product_type == "NON - Chain Product") { plating_price = 0.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.40; }
		}
	}
	if (micron == "0.50 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.00; }
			if (product_type == "NON - Chain Product") { plating_price = 0.70; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.50; }
		}
	}
	if (micron == "1.00 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.50; }
			if (product_type == "NON - Chain Product") { plating_price = 1.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 2.20; }
		}
	}
	if (micron == "1.50 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 2.20; }
			if (product_type == "NON - Chain Product") { plating_price = 1.80; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 3.20; }
		}
	}
	if (micron == "2.00 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.00; }
			if (product_type == "NON - Chain Product") { plating_price = 2.40; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 4.40; }
		}
	}
	if (micron == "2.50 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.60; }
			if (product_type == "NON - Chain Product") { plating_price = 3.00; }
			if (product_type == "18K Gold For Chains") { plating_price = 2.24; }
			if (product_type == "24K Gold Plating For Non chain Products") { plating_price = 1.97; }
			if (product_type == "18KT with .5 um 23KT Gold For Chains") { plating_price = 2.55; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 5.40; }
		}
	}
	if (micron == "3.00 (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 4.40; }
			if (product_type == "NON - Chain Product") { plating_price = 3.60; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 6.50; }
		}
	}
	if (micron == "3 to 5 miles (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.35; }
			if (product_type == "NON - Chain Product") { plating_price = 0.25; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.50; }
		}
	}
	if (micron == "Flash Rhodium (2600 - 3000)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}


	if (micron == "0.25 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.40; }
			if (product_type == "NON - Chain Product") { plating_price = 0.30; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}
	if (micron == "0.50 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.20; }
			if (product_type == "NON - Chain Product") { plating_price = 0.80; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 1.80; }
		}
	}
	if (micron == "1.00 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 1.80; }
			if (product_type == "NON - Chain Product") { plating_price = 1.40; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 2.60; }
		}
	}
	if (micron == "1.50 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 2.50; }
			if (product_type == "NON - Chain Product") { plating_price = 2.10; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 3.80; }
		}
	}
	if (micron == "2.00 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 3.50; }
			if (product_type == "NON - Chain Product") { plating_price = 2.80; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 5.00; }
		}
	}
	if (micron == "2.50 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 4.20; }
			if (product_type == "NON - Chain Product") { plating_price = 3.50; }
			if (product_type == "18K Gold For Chains") { plating_price = 2.24; }
			if (product_type == "24K Gold Plating For Non chain Products") { plating_price = 1.97; }
			if (product_type == "18KT with .5 um 23KT Gold For Chains") { plating_price = 2.55; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 6.20; }
		}
	}
	if (micron == "3.00 (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 5.00; }
			if (product_type == "NON - Chain Product") { plating_price = 4.20; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 7.50; }
		}
	}
	if (micron == "3 to 5 miles (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "Chain Product") { plating_price = 0.35; }
			if (product_type == "NON - Chain Product") { plating_price = 0.25; }
		}
		if (uom_in_plating == "Per Pcs (On The Basis Of Surface Area)") {
			if (product_type == "NON - Chain Product") { plating_price = 0.50; }
		}
	}
	if (micron == "Flash Rhodium (3100 - 3500)") {
		if (uom_in_plating == "Per Gram") {
			if (product_type == "NON - Chain Product") { plating_price = 0.60; }
		}
	}
	var plating_price = parseFloat(checkDigit(plating_price)) * (parseFloat(checkDigit(micron_plating_ounce_rate) / 2500));
	frm.set_value('plating_price_nn_chain_product', parseFloat(checkDigit(plating_price)).toFixed(3));

	plating_price = parseFloat(plating_price) + parseFloat(checkDigit(plating_charge));

	if (uom_in_plating === "Per Gram") {
		amount_in_dollar_in_plating = parseFloat(checkDigit(plating_price)) * parseFloat(checkDigit(design_weightss));
	}
	if (uom_in_plating === "Per Pcs (On The Basis Of Surface Area)") {
		amount_in_dollar_in_plating = parseFloat(checkDigit(plating_price)) * (parseFloat(checkDigit(surface_area)) / 625);
	}

	frm.set_value('amounts', parseFloat(checkDigit(amount_in_dollar_in_plating)).toFixed(3));

	calculate_other_plating_cost_master(frm);
}


function other_plating_calculations(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var design_weight = parseFloat(checkDigit(frm.doc.revise_weight));
	var amount = 0;

	if (!child.design_weight) {
		frappe.model.set_value(cdt, cdn, "design_weight", parseFloat(design_weight).toFixed(3));
	} else {
		design_weight = child.design_weight;
	}

	if (child.price_uom === "Per Pcs") {
		amount = parseFloat(checkDigit(child.plating_price));
	}
	else if (child.price_uom === "Per Gram") {
		amount = design_weight * parseFloat(checkDigit(child.plating_price));
	}

	frappe.model.set_value(cdt, cdn, "amount", parseFloat(checkDigit(amount)).toFixed(3));

	calculate_other_plating_cost_master(frm);
}

function calculate_other_plating_cost_master(frm) {

	var other_plating_cost = 0;
	if (frm.doc.other_platings) {
		frm.doc.other_platings.forEach(child => {
			other_plating_cost += parseFloat(checkDigit(child.amount)) || 0;
		});
	}
	frm.set_value('other_plating_cost', other_plating_cost.toFixed(3));

	var total_plating_cost = other_plating_cost + parseFloat(checkDigit(frm.doc.amount_in_dollar_in_plating)) + parseFloat(checkDigit(frm.doc.amounts));
	frm.set_value('total_plating_cost', parseFloat(checkDigit(total_plating_cost)).toFixed(3));

	update_value_additions(frm);
	calculate_total_cost(frm);
}

/// ==========================================  Plating ===========================  end ========================================



/// ==========================================  Other Charges ===========================  start =======================================
function calculate_other_charge(frm, cdt, cdn) {
	var child = locals[cdt][cdn];

	var charges = 0;
	if (child.other_charge_uom === "Pcs") {
		charges = parseFloat(checkDigit(child.rate));
	} else if (child.other_charge_uom === "Gram") {
		charges = parseFloat(checkDigit(child.rate)) * parseFloat(checkDigit(frm.doc.revise_weight));
	}

	frappe.model.set_value(cdt, cdn, "charges", parseFloat(checkDigit(charges)).toFixed(3));

	calculate_other_charges_master(frm);
}

function calculate_other_charges_master(frm) {
	var total_charges = 0;
	if (frm.doc.co_other_charges) {
		frm.doc.co_other_charges.forEach(child => {
			total_charges += parseFloat(checkDigit(child.charges));
		});
	}
	frm.set_value('total_charges', parseFloat(checkDigit(total_charges)).toFixed(3));

	calculate_total_cost(frm);
}

/// ==========================================  Other Charges ===========================  end ========================================



/// ==========================================  Value Addition ===========================  start ========================================

function update_feild_of_value_additions(frm, category, field, deleted_flag) {
	// console.log(" category :" , category)
	// console.log(" deleted_flag :" , deleted_flag)
	if (parseFloat(checkDigit(frm.doc[field])) > 0) { // For Metal -------------------
		// console.log(" category value  :" , frm.doc[field])
		if (parseFloat(checkDigit(frm.doc[deleted_flag])) == 0) {
			// console.log(" deleted_flag value  :" , frm.doc[deleted_flag])
			var check_data = 0;
			if (frm.doc.value_additions) {
				check_data = 0;
				for (let i = 0; i < frm.doc.value_additions.length; i++) {
					if (frm.doc.value_additions[i].category == category) {
						// console.log(" category update  :" , category)
						check_data = 1;
						frm.doc.value_additions[i].category = category;
						frm.doc.value_additions[i].cost_in_dollar = parseFloat(checkDigit(frm.doc[field]));
						frm.doc.value_additions[i].amount_in_dollar_value_added = parseFloat(parseFloat(checkDigit(frm.doc[field])) * (parseFloat(checkDigit(frm.doc.value_additions[i].value_addition_on_weight)) / 100)).toFixed(3)
					}
				}
			}
			if (check_data == 0) {
				// console.log(" category new  :" , category)
				frm.add_child('value_additions', {
					category: category,
					cost_in_dollar: frm.doc[field],
					value_addition_on_weight: 0,
					amount_in_dollar_value_added: 0,
				});
			}

		}
	}

	if (parseFloat(checkDigit(frm.doc[field])) <= 0) { // For Metal -------------------
		if (frm.doc.value_additions) {
			var check_index = -1;
			for (let i = 0; i < frm.doc.value_additions.length; i++) {
				if (frm.doc.value_additions[i].category == category) {
					check_index = i;
				}
			}
			if (check_index >= 0) {
				frm.doc.value_additions.splice(check_index, 1)
			}
		}
	}
}


function update_value_additions(frm) {

	update_feild_of_value_additions(frm, 'Metal', 'amount_in_dollar_in_metal', 'metal_value_add_deleted')
	update_feild_of_value_additions(frm, 'Setting', 'total_setting_per_pcs_in_dolllar_master', 'setting_value_add_deleted')
	update_feild_of_value_additions(frm, 'Labour', 'total_labour_cost', 'labour_value_add_deleted')
	update_feild_of_value_additions(frm, 'Findings', 'findings_in_dollar', 'finding_value_add_deleted')
	update_feild_of_value_additions(frm, 'Plating', 'total_plating_cost', 'plating_value_add_deleted')
	frm.refresh_field('value_additions');

	calculate_total_value_addition(frm);
}


function update_amount_in_dollar_value_added(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var amount_in_dollar_value_added = parseFloat(checkDigit(child.cost_in_dollar)) * (parseFloat(checkDigit(child.value_addition_on_weight)) / 100);
	frappe.model.set_value(cdt, cdn, 'amount_in_dollar_value_added', parseFloat(checkDigit(amount_in_dollar_value_added)).toFixed(3));

	calculate_total_value_addition(frm);
}


function calculate_total_value_addition(frm) {
	var total_value_addition = 0;
	if (frm.doc.value_additions) {
		frm.doc.value_additions.forEach(child => {
			total_value_addition += parseFloat(checkDigit(child.amount_in_dollar_value_added));
		});
	}
	frm.set_value('total_value_addition', parseFloat(checkDigit(total_value_addition)).toFixed(3));

	calculate_total_cost(frm);
}
/// ==========================================  Value Addition ===========================  end ========================================



/// ==========================================  Sale Price ===========================  start ========================================


function calculate_total_cost(frm) {

	frm.set_value('metal_cost_amount', parseFloat(checkDigit(frm.doc.amount_in_dollar_in_metal)).toFixed(3));
	frm.set_value('stone_cost_amount', parseFloat(checkDigit(frm.doc.total_stone_cost_in_dollar)).toFixed(3));
	frm.set_value('diamond_cost_amount', parseFloat(checkDigit(frm.doc.total_diamondcost_in_dollar)).toFixed(3));
	frm.set_value('setting_cost_amount', parseFloat(checkDigit(frm.doc.total_setting_per_pcs_in_dolllar_master)).toFixed(3));
	frm.set_value('labour_cost_amount', parseFloat(checkDigit(frm.doc.total_labour_cost)).toFixed(3));
	frm.set_value('findings_cost', parseFloat(checkDigit(frm.doc.findings_in_dollar)).toFixed(3));
	frm.set_value('plating_cost_in_ss', parseFloat(checkDigit(frm.doc.total_plating_cost)).toFixed(3));
	frm.set_value('labour_cost_not_inc', parseFloat(checkDigit(frm.doc.total_labour_constin_not_inc)).toFixed(3));
	frm.set_value('other_cost_not_inc_va', parseFloat(checkDigit(frm.doc.total_charges)).toFixed(3));

	var total_cost_for_ss = parseFloat(checkDigit(frm.doc.amount_in_dollar_in_metal)) + parseFloat(checkDigit(frm.doc.total_diamondcost_in_dollar)) + parseFloat(checkDigit(frm.doc.total_setting_per_pcs_in_dolllar_master)) +
		parseFloat(checkDigit(frm.doc.total_labour_cost)) + parseFloat(checkDigit(frm.doc.findings_in_dollar)) + parseFloat(checkDigit(frm.doc.total_plating_cost));
	frm.set_value('total_cost_for_ss', parseFloat(checkDigit(total_cost_for_ss)).toFixed(3));

	frm.set_value('value_addition_for_ss', parseFloat(checkDigit(frm.doc.total_value_addition)).toFixed(3));

	var revise_cost_for_ss = parseFloat(checkDigit(total_cost_for_ss)) + parseFloat(checkDigit(frm.doc.total_value_addition));
	frm.set_value('revise_cost_for_ss', parseFloat(checkDigit(revise_cost_for_ss)).toFixed(3));

	var total_ss_cost = parseFloat(checkDigit(revise_cost_for_ss)) + parseFloat(checkDigit(frm.doc.total_stone_cost_in_dollar)) + parseFloat(checkDigit(frm.doc.total_charges));
	frm.set_value('total_ss_cost', parseFloat(checkDigit(total_ss_cost)).toFixed(3));

	updateHtmlFormFields(frm);
}


function updateHtmlFormFields(frm) {
	$('#metal_cost_ss').val(format_currency(frm.doc.metal_cost_amount, frm.doc.currency));
	$('#diamond_cost_ss').val(format_currency(frm.doc.diamond_cost_amount, frm.doc.currency));
	$('#setting_cost_ss').val(format_currency(frm.doc.setting_cost_amount, frm.doc.currency));
	$('#labour_cost_ss').val(format_currency(frm.doc.labour_cost_amount, frm.doc.currency));
	$('#findings_costs').val(format_currency(frm.doc.findings_cost, frm.doc.currency));
	$('#plating_cost_ss').val(format_currency(frm.doc.plating_cost_in_ss, frm.doc.currency));
	$('#total_cost_ss').val(format_currency(frm.doc.total_cost_for_ss, frm.doc.currency));
	$('#value_addition_for_ss').val(format_currency(frm.doc.value_addition_for_ss, frm.doc.currency));
	$('#revise_cost_ss').val(format_currency(frm.doc.revise_cost_for_ss, frm.doc.currency));
	$('#stone_cost_ss').val(format_currency(frm.doc.stone_cost_amount, frm.doc.currency));
	$('#total_cost_in_ss').val(format_currency(frm.doc.total_ss_cost, frm.doc.currency));
	$('#labour_cost_not_inc').val(format_currency(frm.doc.labour_cost_not_inc, frm.doc.currency));
	$('#other_cost_not_inc_va').val(format_currency(frm.doc.other_cost_not_inc_va, frm.doc.currency));


	// 		if( ( frm.doc.customer == "Monica Vinader Ltd" && frm.doc.workflow_state == "Auto Draft" ) || frm.doc.customer.includes("Test") ) {
	// 	            $("#mv-feilds").attr("style", 'display:flex');
	// 	            $('#silver_increment').val(format_currency(frm.doc.silver_increment, frm.doc.currency, 5));
	// 	            $('#gold_increment').val(format_currency(frm.doc.gold_increment, frm.doc.currency, 5));
	// 	            $('#revise_price_for_mv').val(format_currency(frm.doc.revise_price_for_mv, frm.doc.currency, 5));
	// 	    }
	// 	 }

	$("#mv-feilds").attr("style", 'display:none');



	let workflowKey = `workflow_path_${frm.doc.name}`;

	let workflowPath = JSON.parse(localStorage.getItem(workflowKey)) || [];



	if (!workflowPath.includes(frm.doc.workflow_state)) {

		workflowPath.push(frm.doc.workflow_state);

		localStorage.setItem(workflowKey, JSON.stringify(workflowPath));

	}

	if (frm.doc.customer) {

		if (frm.doc.customer == "Monica Vinader Ltd") {

			if (frm.doc.workflow_state == "Auto Draft" ||

				(frm.doc.workflow_state == "Invoiced" && workflowPath.includes("Auto Draft"))) {



				$("#mv-feilds").attr("style", 'display:flex');
				$('#silver_increment').val(format_currency(frm.doc.silver_increment, frm.doc.currency, 5));
				$('#gold_increment').val(format_currency(frm.doc.gold_increment, frm.doc.currency, 5));
				$('#revise_price_for_mv').val(format_currency(frm.doc.revise_price_for_mv, frm.doc.currency, 5));

			}



		}
	}
	// frm.refresh_fields();
}


function updateMetalTypeLabel(frm, metalType) {
	if (frm.fields_dict['total_cost_ss']) {
		var tabLabel2 = frm.fields_dict['total_cost_ss'].$wrapper.find("label[for='tab1']");

		if (tabLabel2.length > 0) {
			if (metalType) {
				tabLabel2.text("Cost Head " + metalType);
			} else {
				tabLabel2.text("Cost Head");
			}
		}
	}
}

$("#costing-total_cost_tab-tab").on('click', function () {
	calculate_total_cost(cur_frm)
});

//// ==========================================  Sale Price ===========================  end ========================================


function checkDigit(value) {
	if (value > 0 || value < 0) { return value; }
	else { return 0; }
}


function checkString(value) {
	if (value) { return value; }
	else { return ''; }
}

