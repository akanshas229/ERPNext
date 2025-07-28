// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on("NPD Product Developement New", {
    refresh(frm) {

    },
    onload: function (frm) {
        if (frm.is_new() && !frm.doc.designer) {
            frm.set_value('designer', frm.doc.owner);
            console.log('Auto-set designer to', frm.doc.owner);
        }
    },
    metal_weight_three: function (frm) {
        total_cad_weight(frm)
    },

    finding_weight_three: function (frm) {
        total_cad_weight(frm)
    },
    finding_details_remove: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    before_save: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
        update_pd_tab(frm, cdt, cdn);
    },
    stone_details_remove: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },
    surface_area: function (frm) {
        frm.set_value('dimensions', frm.doc.surface_area);

    },
    collections_name: function (frm) {
        frm.set_value('collection_name', frm.doc.collections_name);

    },
    design_code: function (frm) {
        frm.set_value('2d_design_no', frm.doc.design_code);

    },
    metal_type: function (frm) {
        frm.set_value('metal_type1', frm.doc.metal_type);

    },
    cad_weight: function (frm) {
        frm.set_value('target_metal_weight', frm.doc.cad_weight)
    },
    refresh: function (frm) {

        frm.set_query('cad_designer', (frm) => {
            return { filters: { designer_type: '3D Designer' } };
        });

        frm.set_query('sub_desinger', (frm) => {
            return { filters: { designer_type: '3D Designer' } };
        });

        frm.set_query('designer_name', (frm) => {
            return { filters: { designer_type: '3D Designer' } };
        });

        frm.set_query('two_d', (frm) => {
            return { filters: { designer_type: '2D Designer' } };
        });


    },
});



frappe.ui.form.on('Opportunity Stone CT', {
    item_typekt: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },
    item_sub_group: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

    item_category: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

    cut_name: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

    shape_name: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

    size: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

    width: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

    quality: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

    remark: function (frm, cdt, cdn) {
        update_pd_tab(frm, cdt, cdn);
    },

});


frappe.ui.form.on('Opportunity Diamond CT', {

    item_sub: function (frm, cdt, cdn) {
        update_pd_diamond(frm, cdt, cdn);
    },
    depth: function (frm, cdt, cdn) {
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

    size: function (frm, cdt, cdn) {
        update_pd_diamond(frm, cdt, cdn);
    },

    diamond_quality: function (frm, cdt, cdn) {
        update_pd_diamond(frm, cdt, cdn);
    },


});


frappe.ui.form.on('NPD Test Finding CT', {

    kt: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    item_category: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    width: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    cut: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    depth: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    shape: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },


    size: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    length: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    color: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },

    remark: function (frm, cdt, cdn) {
        update_pd_finding(frm, cdt, cdn);
    },
});


function total_cad_weight(frm) {
    var cad_weight = frm.doc.metal_weight_three + frm.doc.finding_weight_three
    frm.set_value('cad_weight', cad_weight)
}


function update_pd_tab(frm, cdt, cdn) {
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
                        frm.doc.pd_stoned[j].item_typekt = frm.doc.stone_details[i].item_typekt;
                        frm.doc.pd_stoned[j].item_sub_group = frm.doc.stone_details[i].item_sub_group;
                        frm.doc.pd_stoned[j].item_category = frm.doc.stone_details[i].item_category;
                        frm.doc.pd_stoned[j].cut_name = frm.doc.stone_details[i].cut_name;
                        frm.doc.pd_stoned[j].shape_name = frm.doc.stone_details[i].shape_name;
                        frm.doc.pd_stoned[j].size = frm.doc.stone_details[i].size;
                        frm.doc.pd_stoned[j].width = frm.doc.stone_details[i].width;
                        frm.doc.pd_stoned[j].quality = frm.doc.stone_details[i].quality;
                        frm.doc.pd_stoned[j].remark = frm.doc.stone_details[i].remark;
                    }
                }
                if (check_data == 0) {
                    let new_child = frm.add_child('pd_stoned');
                    new_child.item_sub_group = frm.doc.stone_details[i].item_sub_group;
                    new_child.item_typekt = frm.doc.stone_details[i].item_typekt;
                    new_child.item_category = frm.doc.stone_details[i].item_category;
                    new_child.cut_name = frm.doc.stone_details[i].cut_name;
                    new_child.shape_name = frm.doc.stone_details[i].shape_name;
                    new_child.size = frm.doc.stone_details[i].size;
                    new_child.width = frm.doc.stone_details[i].width;
                    new_child.quality = frm.doc.stone_details[i].quality;
                    new_child.remark = frm.doc.stone_details[i].remark;
                }
            } else {
                frm.doc.stone_details = [];
                frm.doc.pd_stoned = [];
            }

        }
        frm.refresh_field("pd_stoned");
        frm.refresh_field("stone_details");
    }
    check_stone_and_pd_duplicacy(frm, cdt, cdn);

}

function check_stone_and_pd_duplicacy(frm, cdt, cdn) {
    var check_data = 0;
    console.log("hi21#");
    for (let i = 0; i < frm.doc.pd_stoned.length; i++) {
        console.log("hi22#");
        check_data = 0;
        for (let j = 0; j < frm.doc.stone_details.length; j++) {
            console.log("hi23#");
            if (frm.doc.pd_stoned[i].idx == frm.doc.stone_details[j].idx) {
                console.log("hi24#");
                check_data = 1;
            }
        }
        if (check_data == 0) {
            console.log("hi25#");
            frm.doc.pd_stoned.pop(i)
            check_stone_and_pd_duplicacy(frm)
        }
    }

    frm.refresh_field('pd_stoned');


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
                        frm.doc.pd_diamondd[j].item_sub = frm.doc.diamond_details[i].item_sub;
                        frm.doc.pd_diamondd[j].depth = frm.doc.diamond_details[i].depth;
                        frm.doc.pd_diamondd[j].diamond_shape = frm.doc.diamond_details[i].diamond_shape;
                        frm.doc.pd_diamondd[j].diamond_size = frm.doc.diamond_details[i].diamond_size;
                        frm.doc.pd_diamondd[j].diamond_width = frm.doc.diamond_details[i].diamond_width;
                        frm.doc.pd_diamondd[j].diamond_cut = frm.doc.diamond_details[i].diamond_cut;
                        frm.doc.pd_diamondd[j].diamond_color = frm.doc.diamond_details[i].diamond_color;
                        frm.doc.pd_diamondd[j].diamond_quality = frm.doc.diamond_details[i].diamond_quality;
                        frm.doc.pd_diamondd[j].size = frm.doc.diamond_details[i].size;
                    }
                }
                if (check_data == 0) {
                    let new_child = frm.add_child('pd_diamondd');
                    new_child.item_sub = frm.doc.diamond_details[i].item_sub;
                    new_child.depth = frm.doc.diamond_details[i].depth;
                    new_child.diamond_shape = frm.doc.diamond_details[i].diamond_shape;
                    new_child.diamond_cut = frm.doc.diamond_details[i].diamond_cut;
                    new_child.diamond_size = frm.doc.diamond_details[i].diamond_size;
                    new_child.diamond_width = frm.doc.diamond_details[i].diamond_width;
                    new_child.diamond_quality = frm.doc.diamond_details[i].diamond_quality;
                    new_child.diamond_color = frm.doc.diamond_details[i].diamond_color;
                    new_child.size = frm.doc.diamond_details[i].size;
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


function update_pd_finding(frm, cdt, cdn) {

    if (frm.doc.finding_details) {
        if (frm.doc.finding_details.length == 0) {
            frm.doc.finding_details = [];
            frm.doc.finding_details_pd = [];
        }
        var check_data = 0;
        console.log("hi11#");
        for (let i = 0; i < frm.doc.finding_details.length; i++) {
            console.log("hi12#");
            check_data = 0;
            if (frm.doc.finding_details_pd) {
                for (let j = 0; j < frm.doc.finding_details_pd.length; j++) {
                    console.log("hi13#");
                    if (frm.doc.finding_details[i].idx == frm.doc.finding_details_pd[j].idx) {
                        console.log("hi14#");
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
            }
            if (check_data == 0) {
                // console.log("hi15#");
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
        }
    } else {
        frm.doc.finding_details = [];
        frm.doc.finding_details_pd = [];
    }
    check_findings_and_pd_duplicacy(frm, cdt, cdn)
}


function check_findings_and_pd_duplicacy(frm, cdt, cdn) {
    var check_data = 0;
    console.log("hi21#");
    for (let i = 0; i < frm.doc.finding_details_pd.length; i++) {
        console.log("hi22#");
        check_data = 0;
        for (let j = 0; j < frm.doc.finding_details.length; j++) {
            console.log("hi23#");
            if (frm.doc.finding_details_pd[i].idx == frm.doc.finding_details[j].idx) {
                console.log("hi24#");
                check_data = 1;
            }
        }
        if (check_data == 0) {
            console.log("hi25#");
            frm.doc.finding_details_pd.pop(i)
            check_findings_and_pd_duplicacy(frm)
        }
    }

    frm.refresh_field('finding_details_pd');


}
