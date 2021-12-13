jQuery(document).ready(function(a){const e=tracking_ajax.page_id;const i=tracking_ajax.ajax_url;let t=a("form").filter(function(){return this.id.match(/mktoForm_/gm)});if(t.length>0){o(".mktoField",function(){let t=MktoForms2.allForms();let o=[];t.forEach(n=>{n.dirty=false;o.push(n.getId());a("#mktoForm_"+n.getId()).find(".mktoField").not(".mktoFieldDescriptor").on("change",()=>{if(!n.dirty){n.dirty=true;let t={action:"mft_add_interaction",form_id:n.getId,page_id:e};if(t!=null){a.ajax({type:"GET",dataType:"json",url:i,data:t})}}});n.onSuccess(function(t){let o={action:"mft_add_submission",form_id:n.getId,page_id:e};if(o!=null){a.ajax({type:"GET",dataType:"json",url:i,data:o})}})});if(a("#wp-admin-bar-mft-admin-bar").length){a.ajax({type:"POST",dataType:"json",url:i,data:{action:"mft_get_forms_statistics",forms:o,page_id:e},success:function(t){if(t.data.interactions_total){a("#mft-dropdown-interactions-count").text(t.data.interactions_total)}else{a("#mft-dropdown-interactions-count").text("0")}if(t.data.submissions_total){a("#mft-dropdown-submissions-count").text(t.data.submissions_total)}else{a("#mft-dropdown-submissions-count").text("0")}if(t.data.submission_rate){a("#mft-dropdown-submission-rate").text(t.data.submission_rate+"%")}else{a("#mft-dropdown-submission-rate").text("0")}if(t.data.abandonment_rate){a("#mft-dropdown-abandonment-rate").text(t.data.abandonment_rate+"%")}else{a("#mft-dropdown-abandonment-rate").text("0")}interactionPoints=n(t.data.interactions);submissionPoints=n(t.data.submissions);a(".mft-chart-interactions").html(`
							<svg viewBox="0 0 300 50" class="chart">
								<polyline
								fill="none"
								stroke="#0074d9"
								stroke-width="2"
								points="`+interactionPoints+`"
								/>
							</svg>
						`);a(".mft-chart-submissions").html(`
							<svg viewBox="0 0 300 50" class="chart">
								<polyline
								fill="none"
								stroke="#ff0000"
								stroke-width="2"
								points="`+submissionPoints+`"
								/>
							</svg>
						`);if(t.data.forms){a("#mft-dropdown-form-id").text(t.data.forms)}if(t.data.post_id){a("#mft-all-records").attr("href","/wp-admin/post.php?post="+t.data.post_id+"&action=edit")}else{a("#mft-all-records").css("display","none")}a("#mft-dropdown-loading").css("display","none");a("#mft-dropdown-wrapper").css("display","block")},error:function(t){console.log(t)}})}},1e3,9e3)}else{a("#mft-dropdown-loading").text("No Marketo forms found")}function n(t){const n=Object.values(t);let a=Math.max(...n);let e="";let i=0;for(let t=0,o=10;t<n.length;t++,o+=10){if(a!==0){i=Math.round((100-n[t]/a*100)/2)}else{i=50}e+=o+","+i+" "}return e}function o(o,n,a,e){let i=Date.now();(function t(){if(document.querySelector(o)!=null){n();return}else{setTimeout(function(){if(e&&Date.now()-i>e)return;t()},a)}})()}});