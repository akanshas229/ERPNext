// Copyright (c) 2025, pinkcity and contributors
// For license information, please see license.txt

frappe.ui.form.on("Photography Request", {
  refresh(frm) {
    updateImageView(frm);

    if (frm.doc.workflow_state == "Draft" && !frm.is_new()) {
      frm.set_intro(
        "Please fetch design details, based on <b>Company Code</b> and also assign this task to photograher before proceding to the next stage.",
        "red"
      );
    }

    frm.set_query("assigned_to_employee", function () {
      return {
        filters: {
          designer_type: "Photographer",
        },
      };
    });

    // your code here
  },

  setup(frm) {
    fetch_design_details_api(frm);
  },
  company_code: function (frm) {
    update_final_order_no(frm);
  },
  order_year: function (frm) {
    update_final_order_no(frm);
  },
  order_type: function (frm) {
    update_final_order_no(frm);
  },
  order_num: function (frm) {
    update_final_order_no(frm);
  },
  // fetch_order_details: function (frm) {
  //     fetch_order_details_api(frm);
  // },
  fetch_design_details: function (frm) {
    callAPI(frm)
  },
});

frappe.ui.form.on("Payment Reconciliation Invoice", {
  get_design_details: function (frm, cdt, cdn) {
    get_emr_design_details(frm, cdt, cdn);
  },
});


function callAPI(frm) {

  var company = "Pinkcity Jewelhouse Private Ltd-Mahapura"
  if (frm.doc.company_code == 'PJ') { company = 'Pinkcity Jewelhouse Private Limited- Unit 1' }
  if (frm.doc.company_code == 'PJ2') { company = 'Pinkcity Jewelhouse Private Limited-Unit 2' }
  $.ajax({
    //   url: "//reports.pinkcityindia.com/api/emr/getEMROrderDesignDetails",
    url: "https://reports.pinkcityindia.com/api/emr/getEMRSingleDesign",
    // cache: false,
    type: "get",
    data: {
      //   order_design_id: frm.doc.order_design_id,
      company: company,
      design_code: frm.doc.design_no,
    },
    dataType: "json",
    beforeSend: function (request) {
      request.withCredentials = false;
    },
    success: function (obj) {
      console.log(obj);
      if (obj.status) {
        // 	frappe.msgprint(obj.msg);
        // frm.set_value("design_no", obj.data.design_code);
        // frm.set_value("itemdesign_category", obj.data.design_category);
        // frm.set_value("metal", obj.data.karat); 
        frm.set_value("design_image", obj.data.file_name);
        // frm.set_value("customer_code", obj.data.customer_code);


      } else {
        frappe.msgprint(obj.msg);
      }
    },
    error: function (obj) {
      frappe.msgprint("Something went wrong.");
      console.log(obj);
    },
  });
}

function fetch_design_details_api(frm) {
  if (frm.doc.order_design_id && frm.doc.company_code && frm.doc.workflow_state == "Draft") {
    callAPI(frm)
  }
}



function update_final_order_no(frm) {
  var company_code = checkValue(frm.doc.company_code);
  var order_no_prefix = checkValue(frm.doc.order_no_prefix);
  var order_year = checkValue(frm.doc.order_year);
  var order_type = checkValue(frm.doc.order_type);
  var order_num = checkValue(frm.doc.order_num);
  frm.set_value("final_order_no", company_code + "/" + order_no_prefix + "/" + order_year + "/" + order_type + "/" + order_num);
}

function checkValue(value) {
  if (value) {
    return value;
  } else {
    return "";
  }
}

function updateImageView(frm) {
  var ImgView = `<style>
								    .gallery_1 {
								      border: 1px solid #ccc;
								    }

								    .gallery_1:hover {
								      border: 1px solid #777;
								    }

								    .gallery_1 img {
								      width: 100%;
								      height: 150px;
								    }

								    .desc1 {
								      padding: 15px;
								      text-align: center;
								    }

								    * {
								      box-sizing: border-box;
								    }

								    .responsive1 {
								      padding: 4px 6px;
								      float: left;
								      width: 24.99999%;
								    }

								    @media only screen and (max-width: 700px) {
								      .responsive1 {
								        width: 49.99999%;
								        margin: 6px 0;
								      }
								    }

								    @media only screen and (max-width: 500px) {
								      .responsive1 {
								        width: 100%;
								      }
								    }

								    .clearfix1:after {
								      content: "";
								      display: table;
								      clear: both;
								    }
								  </style> `;

  if (frm.doc.photography_links) {
    for (let i = 0; i <= frm.doc.photography_links.length; i++) {
      // console.log(frm.doc.photography_links[i])
      if (frm.doc.photography_links[i]) {
        // if(frm.doc.photography_links[i].media_type == "Image") {
        ImgView += `<div class="responsive1">
	                        <div class="gallery_1">
	                        <a target="_blank" href="${frm.doc.photography_links[i].file}">
	                            <img src="${frm.doc.photography_links[i].file}" 
	                            width="200" height="200">
	                        </a>
	                        <div class="desc1">Image - ${frm.doc.photography_links[i].idx}</div>
	                        </div>
	                    </div>`;
        // }
      }
    }
    frm.set_df_property("image_preview", "options", ImgView);
  }

}


// ImgView += `<div class="responsive1">
// 	                        <div class="gallery_1">
// 	                        <a target="_blank" href="${frm.doc.photography_links[i].file}">
// 	                            <img src="${frm.doc.photography_links[i].file}" alt="${frm.doc.photography_links[i].file_name}"
// 	                            width="200" height="200">
// 	                        </a>
// 	                        <div class="desc1">${frm.doc.photography_links[i].media_type}</div>
// 	                        </div>
// 	                    </div>`;