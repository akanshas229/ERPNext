frappe.ui.form.on('NPD', {
	refresh: function (frm) {

		$("#npd-pd_sheet_tab-tab").on('click', function () {
			cur_frm.doc['metal_type1'] = cur_frm.doc.metal_type;
			cur_frm.refresh_field('metal_type1');

			cur_frm.doc['2d_design_no'] = cur_frm.doc.design_code;
			cur_frm.refresh_field('2d_design_no');

			cur_frm.doc['three_design'] = cur_frm.doc.three_d_code;
			cur_frm.refresh_field('three_design');

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
		});


		frm.set_query('cad_designer', (frm) => {
			return { filters: { designer_type: '3D Designer' } };
		});

		// frm.set_query('designer_name', (frm) => {
		// 	return { filters: { designer_type : '3D Designer' } };
		// });


	},


});





frappe.ui.form.on('NPD Plating CT', {
	plating_type: function (frm, cdt, cdn) {
		generate_code(frm, cdt, cdn);
	},
	micron: function (frm, cdt, cdn) {
		generate_code(frm, cdt, cdn);
	},
	gold_kt: function (frm, cdt, cdn) {
		generate_code(frm, cdt, cdn);
	},
	color: function (frm, cdt, cdn) {
		generate_code(frm, cdt, cdn);
	},
	gold: function (frm, cdt, cdn) {
		generate_code(frm, cdt, cdn);
	},
	anti_tarnish: function (frm, cdt, cdn) {
		generate_code(frm, cdt, cdn);
	},

});


frappe.ui.form.on('Opportunity Stone CT', {
	item_group_new: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	stone_type: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	stone_name: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	cut_name: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	shape_name: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	size: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	width: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	qty: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	setting_type: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},

	medium: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},
	description: function (frm, cdt, cdn) {
		update_pd_tab(frm);
	},
});


frappe.ui.form.on('Opportunity Diamond CT', {
	item_group: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	item_sub: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},
	diamond_name: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	diamond_shape: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	diamond_size: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	diamond_width: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	diamond_cut: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	diamond_color: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	setting_type: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	quantity: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},

	diamond_quality: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	},
	description: function (frm, cdt, cdn) {
		update_pd_diamond(frm, cdt, cdn);
	}
});


frappe.ui.form.on('NPD Test Finding CT', {
	metal_name: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	metal_type: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	kt: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	item_category: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	cut: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	depth: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	shape: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	size: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	length: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	color: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	width: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	brand: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	finding_code: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	finding_type: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},

	description: function (frm, cdt, cdn) {
		update_pd_finding(frm);
	},
});


function generate_code(frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	var plating_value = child.plating_type;
	var micron_value = child.micron;
	var gold_kt_value = child.gold_kt;
	var color_value = child.color;
	var gold_value = child.gold;
	var anti_tarnish_value = child.anti_tarnish;

	var plating_codes = {
		"Flash Gold Plating": "PLT-FLSH",
		"Flash Rhodium": "PLT-FLSH",
		"Micron Plating": "PLT-MIC",
	};

	var plating_code = plating_codes[plating_value] || "";


	// Handle plating thickness based on selected plating value
	if (plating_value === "Micron Plating") {
		frm.set_df_property(child.parentfield, 'read_only', 0, frm.docname, 'micron', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 0, frm.docname, 'gold_kt', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 0, frm.docname, 'color', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 0, frm.docname, 'gold', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 0, frm.docname, 'anti_tarnish', child.name);
		frm.set_df_property(child.parentfield, 'options', ["0.25 Micron",
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
		].join('\n'), frm.docname, 'micron', child.name);

		if (!micron_value || micron_value === "N/A") {
			frappe.model.set_value(cdt, cdn, 'micron', "0.25 Micron");
		}

		if (micron_value == "0.25 Micron" || micron_value == "0.50 Micron" || micron_value == "1.00 Micron" || micron_value == "1.50 Micron" ||
			micron_value == "2.00 Micron" || micron_value == "2.50 Micron" || micron_value == "3.00 Micron") {
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
		frappe.model.set_value(cdt, cdn, 'micron', '3 to 5 miles');
		frappe.model.set_value(cdt, cdn, 'gold_kt', "N/A");
		frappe.model.set_value(cdt, cdn, 'anti_tarnish', "N/A");
		frm.set_df_property(child.parentfield, 'read_only', 1, frm.docname, 'micron', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 1, frm.docname, 'gold_kt', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 1, frm.docname, 'anti_tarnish', child.name);

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
		frappe.model.set_value(cdt, cdn, 'micron', 'Flash Rhodium');
		frappe.model.set_value(cdt, cdn, 'gold_kt', "N/A");
		frappe.model.set_value(cdt, cdn, 'anti_tarnish', "N/A");
		frm.set_df_property(child.parentfield, 'read_only', 1, frm.docname, 'micron', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 1, frm.docname, 'gold_kt', child.name);
		frm.set_df_property(child.parentfield, 'read_only', 1, frm.docname, 'anti_tarnish', child.name);

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

	frappe.model.set_value(cdt, cdn, 'plating_code', plating_code);
	frm.refresh_field(child.parentfield);
}

function update_pd_tab(frm) {
	if (frm.doc.stone_details) {
		if (frm.doc.stone_details.length == 0) {
			frm.doc.stone_details = [];
			frm.doc.pd_stoned = [];
		}
		var check_data = 0;
		for (let i = 0; i < frm.doc.stone_details.length; i++) {
			check_data = 0;
			if (frm.doc.pd_stoned) {
				for (let j = 0; j < frm.doc.pd_stoned.length; j++) {
					if (frm.doc.stone_details[i].idx == frm.doc.pd_stoned[j].idx) {
						// console.log("hi14#");
						check_data = 1;
						frm.doc.pd_stoned[j].item_group_new = frm.doc.stone_details[i].item_group_new;
						frm.doc.pd_stoned[j].item_sub_group = frm.doc.stone_details[i].item_sub_group;
						frm.doc.pd_stoned[j].stone_name = frm.doc.stone_details[i].stone_name;
						frm.doc.pd_stoned[j].cut_name = frm.doc.stone_details[i].cut_name;
						frm.doc.pd_stoned[j].shape_name = frm.doc.stone_details[i].shape_name;
						frm.doc.pd_stoned[j].size = frm.doc.stone_details[i].size;
						frm.doc.pd_stoned[j].width = frm.doc.stone_details[i].width;
						frm.doc.pd_stoned[j].qty = frm.doc.stone_details[i].qty;
						frm.doc.pd_stoned[j].setting_type = frm.doc.stone_details[i].setting_type;
						frm.doc.pd_stoned[j].quality = frm.doc.stone_details[i].quality;
						frm.doc.pd_stoned[j].medium = frm.doc.stone_details[i].medium;
						frm.doc.pd_stoned[j].mine = frm.doc.stone_details[i].mine;
						frm.doc.pd_stoned[j].description = frm.doc.stone_details[i].description;
					}
				}
				if (check_data == 0) {
					let new_child = frm.add_child('pd_stoned');
					new_child.item_group_new = frm.doc.stone_details[i].item_group_new;
					new_child.item_sub_group = frm.doc.stone_details[i].item_sub_group;
					// new_child.stone_type = frm.doc.stone_details[i].stone_type;
					new_child.stone_name = frm.doc.stone_details[i].stone_name;
					new_child.cut_name = frm.doc.stone_details[i].cut_name;
					new_child.shape_name = frm.doc.stone_details[i].shape_name;
					new_child.size = frm.doc.stone_details[i].size;
					new_child.width = frm.doc.stone_details[i].width;
					new_child.qty = frm.doc.stone_details[i].qty;
					new_child.setting_type = frm.doc.stone_details[i].setting_type;
					new_child.medium = frm.doc.stone_details[i].medium;
					new_child.quality = frm.doc.stone_details[i].quality;
					new_child.mine = frm.doc.stone_details[i].mine;
					new_child.description = frm.doc.stone_details[i].description;
				}
			} else {
				frm.doc.stone_details = [];
				frm.doc.pd_stoned = [];
			}

		}
		frm.refresh_field("pd_stoned");
		frm.refresh_field("stone_details");
	}


}



function update_pd_diamond(frm, cdt, cdn) {
	if (frm.doc.diamond_details) {
		if (frm.doc.diamond_details.length == 0) {
			frm.doc.diamond_details = [];
			frm.doc.pd_diamondd = [];
		}
		var check_data = 0;
		console.log("hi11#");
		for (let i = 0; i < frm.doc.diamond_details.length; i++) {
			console.log("hi12#");
			check_data = 0;
			if (frm.doc.pd_diamondd) {
				for (let j = 0; j < frm.doc.pd_diamondd.length; j++) {
					if (frm.doc.diamond_details[i].idx == frm.doc.pd_diamondd[j].idx) {
						console.log("hi13#");
						check_data = 1;
						frm.doc.pd_diamondd[j].item_group = frm.doc.diamond_details[i].item_group;
						frm.doc.pd_diamondd[j].item_sub = frm.doc.diamond_details[i].item_sub;
						frm.doc.pd_diamondd[j].diamond_name = frm.doc.diamond_details[i].diamond_name;
						frm.doc.pd_diamondd[j].diamond_cut = frm.doc.diamond_details[i].diamond_cut;
						frm.doc.pd_diamondd[j].diamond_shape = frm.doc.diamond_details[i].diamond_shape;
						frm.doc.pd_diamondd[j].diamond_size = frm.doc.diamond_details[i].diamond_size;
						frm.doc.pd_diamondd[j].diamond_width = frm.doc.diamond_details[i].diamond_width;
						frm.doc.pd_diamondd[j].diamond_quality = frm.doc.diamond_details[i].diamond_quality;
						frm.doc.pd_diamondd[j].diamond_color = frm.doc.diamond_details[i].diamond_color;
						frm.doc.pd_diamondd[j].setting_type = frm.doc.diamond_details[i].setting_type;
						frm.doc.pd_diamondd[j].quantity = frm.doc.diamond_details[i].quantity;
						frm.doc.pd_diamondd[j].description = frm.doc.diamond_details[i].description;
					}
				}
				if (check_data == 0) {
					let new_child = frm.add_child('pd_diamondd');
					new_child.item_group = frm.doc.diamond_details[i].item_group;
					new_child.item_sub = frm.doc.diamond_details[i].item_sub;
					new_child.diamond_name = frm.doc.diamond_details[i].diamond_name;
					new_child.diamond_shape = frm.doc.diamond_details[i].diamond_shape;
					new_child.quantity = frm.doc.diamond_details[i].quantity;
					new_child.diamond_cut = frm.doc.diamond_details[i].diamond_cut;
					new_child.diamond_size = frm.doc.diamond_details[i].diamond_size;
					new_child.diamond_width = frm.doc.diamond_details[i].diamond_width;
					new_child.diamond_quality = frm.doc.diamond_details[i].diamond_quality;
					new_child.diamond_color = frm.doc.diamond_details[i].diamond_color;
					new_child.setting_type = frm.doc.diamond_details[i].setting_type;
					new_child.description = frm.doc.diamond_details[i].description;
				}
			} else {
				frm.doc.diamond_details = [];
				frm.doc.pd_diamondd = [];
			}
		}
		frm.refresh_field("diamond_details");
		frm.refresh_field("pd_diamondd");
	}
}


function update_pd_finding(frm) {
	if (frm.doc.finding_details) {
		if (frm.doc.finding_details.length == 0) {
			frm.doc.finding_details = [];
			frm.doc.finding_details_pd = [];
		}
		var check_data = 0;
		for (let i = 0; i < frm.doc.finding_details.length; i++) {
			check_data = 0;
			if (frm.doc.finding_details_pd) {
				for (let j = 0; j < frm.doc.finding_details_pd.length; j++) {

					if (frm.doc.finding_details[i].idx == frm.doc.finding_details_pd[j].idx) {

						check_data = 1;
						frm.doc.finding_details_pd[j].metal_name = frm.doc.finding_details[i].metal_name;
						frm.doc.finding_details_pd[j].metal_type = frm.doc.finding_details[i].metal_type;
						frm.doc.finding_details_pd[j].kt = frm.doc.finding_details[i].kt;
						frm.doc.finding_details_pd[j].item_category = frm.doc.finding_details[i].item_category;
						frm.doc.finding_details_pd[j].cut = frm.doc.finding_details[i].cut;
						frm.doc.finding_details_pd[j].depth = frm.doc.finding_details[i].depth;
						frm.doc.finding_details_pd[j].shape = frm.doc.finding_details[i].shape;
						frm.doc.finding_details_pd[j].size = frm.doc.finding_details[i].size;
						frm.doc.finding_details_pd[j].length = frm.doc.finding_details[i].length;
						frm.doc.finding_details_pd[j].color = frm.doc.finding_details[i].color;
						frm.doc.finding_details_pd[j].width = frm.doc.finding_details[i].width;
						frm.doc.finding_details_pd[j].brand = frm.doc.finding_details[i].brand;
						frm.doc.finding_details_pd[j].finding_code = frm.doc.finding_details[i].finding_code;
						frm.doc.finding_details_pd[j].finding_type = frm.doc.finding_details[i].finding_type;
						frm.doc.finding_details_pd[j].description = frm.doc.finding_details[i].description;
						frm.doc.finding_details_pd[j].quantity = frm.doc.finding_details[i].quantity;

					}
				}
				if (check_data == 0) {
					let new_child = frm.add_child('finding_details_pd');
					new_child.metal_name = frm.doc.finding_details[i].metal_name;
					new_child.metal_type = frm.doc.finding_details[i].metal_type;
					new_child.kt = frm.doc.finding_details[i].kt;
					new_child.item_category = frm.doc.finding_details[i].item_category;
					new_child.cut = frm.doc.finding_details[i].cut;
					new_child.depth = frm.doc.finding_details[i].depth;
					new_child.shape = frm.doc.finding_details[i].shape;
					new_child.size = frm.doc.finding_details[i].size;
					new_child.length = frm.doc.finding_details[i].length;
					new_child.color = frm.doc.finding_details[i].color;
					new_child.width = frm.doc.finding_details[i].width;
					new_child.brand = frm.doc.finding_details[i].brand;
					new_child.finding_code = frm.doc.finding_details[i].finding_code;
					new_child.finding_type = frm.doc.finding_details[i].finding_type;
					new_child.description = frm.doc.finding_details[i].description;
					new_child.quantity = frm.doc.finding_details[i].quantity;
				}
			} else {
				frm.doc.finding_details = [];
				frm.doc.finding_details_pd = [];
			}
		}
		frm.refresh_field("finding_details_pd");
	}
}



