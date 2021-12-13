jQuery(document).ready(function ($) {
	const pageId   = tracking_ajax.page_id;
	const adminUrl = tracking_ajax.ajax_url;
	let marketoForms = $('form').filter(function() {
		return this.id.match(/mktoForm_/gm);
	});
	if ( marketoForms.length > 0 ) {
		waitForElementToDisplay( '.mktoField', function() {
			let forms = MktoForms2.allForms();
			let formIds = [];
			forms.forEach( form => {
				form.dirty = false;
				formIds.push( form.getId() );
				$( '#mktoForm_' + form.getId() ).find( '.mktoField' ).not( '.mktoFieldDescriptor' ).on( 'change', () => {
					if ( !form.dirty ) {
						form.dirty = true;
						let data = {
							action: 'mft_add_interaction',
							form_id: form.getId,
							page_id: pageId,
						}
						if ( data != null ) {
							$.ajax({
								type: "GET",
								dataType: "json",
								url: adminUrl,
								data: data,
							})
						}
					}
				});
				form.onSuccess( function(e) {
					let data = {
						action: 'mft_add_submission',
						form_id: form.getId,
						page_id: pageId,
					}
					if ( data != null ) {
						$.ajax({
							type: "GET",
							dataType: "json",
							url: adminUrl,
							data: data,
						})
					}
				} )
			});
			if ( $('#wp-admin-bar-mft-admin-bar').length ) {
				$.ajax({
					type: "POST",
					dataType: "json",
					url: adminUrl,
					data: {
						action: 'mft_get_forms_statistics',
						forms: formIds,
						page_id: pageId,
					},
					success: function (response) {
						if ( response.data.interactions_total ) {
							$('#mft-dropdown-interactions-count').text( response.data.interactions_total );
						} else {
							$('#mft-dropdown-interactions-count').text( '0' );
						}

						if ( response.data.submissions_total ) {
							$('#mft-dropdown-submissions-count').text( response.data.submissions_total );
						} else {
							$('#mft-dropdown-submissions-count').text( '0' );
						}

						if ( response.data.submission_rate ) {
							$('#mft-dropdown-submission-rate').text( response.data.submission_rate + '%' );
						} else {
							$('#mft-dropdown-submission-rate').text( '0' );
						}

						if ( response.data.abandonment_rate ) {
							$('#mft-dropdown-abandonment-rate').text( response.data.abandonment_rate + '%' );
						} else {
							$('#mft-dropdown-abandonment-rate').text( '0' );
						}

						interactionPoints = mft_calculate_points( response.data.interactions );
						submissionPoints = mft_calculate_points( response.data.submissions );

						$('.mft-chart-interactions').html(`
							<svg viewBox="0 0 300 50" class="chart">
								<polyline
								fill="none"
								stroke="#0074d9"
								stroke-width="2"
								points="` + interactionPoints + `"
								/>
							</svg>
						`);
						$('.mft-chart-submissions').html(`
							<svg viewBox="0 0 300 50" class="chart">
								<polyline
								fill="none"
								stroke="#ff0000"
								stroke-width="2"
								points="` + submissionPoints + `"
								/>
							</svg>
						`);

						if ( response.data.forms ) {
							$( '#mft-dropdown-form-id' ).text( response.data.forms );
						}
						if ( response.data.post_id ) {
							$('#mft-all-records').attr( 'href', '/wp-admin/post.php?post=' + response.data.post_id + '&action=edit' )
						} else {
							$('#mft-all-records').css( 'display', 'none' );
						}
						$('#mft-dropdown-loading').css( 'display', 'none' );
						$('#mft-dropdown-wrapper').css( 'display', 'block' );

					},
					error: function (response) {
						console.log(response)
					}
				})
			}
		}, 1000, 9000 );
		
	} else {
		$('#mft-dropdown-loading').text( 'No Marketo forms found' );
	}
	
	// HELPER FUNCTIONS
	function mft_calculate_points( object ){
		const keys = Object.values(object);
		let max    = Math.max(...keys);
		let points = '';
		let value  = 0;
		for ( let i = 0, position = 10; i < keys.length; i++, position += 10) {
			if ( max !== 0 ) {
				value = Math.round( ( 100 - (keys[i] / max * 100) ) / 2 );
			} else {
				value = 50;
			}
			points += position + ',' + value + ' '; 
		}
		return points;
	}
	function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
		let startTimeInMs = Date.now();
		(function loopSearch() {
			if (document.querySelector(selector) != null) {
				callback();
				return;
			}
			else {
				setTimeout(function () {
					if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
					return;
					loopSearch();
			}, checkFrequencyInMs);
		}
		})();
	}
});