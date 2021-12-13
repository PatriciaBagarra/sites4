function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = toTwelveHour(h);
    m = addLeadingZero(m);
    document.getElementById('iphone-time').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 10000);
}

function addLeadingZero(i) {
    if (i < 10) {
    	i = "0" + i;
    }
    return i;
}

function toTwelveHour(i) {
    if (i > 12) {
    	i -= 12;
   	}
    else if(i == 0){
    	i = 12;
    }
    return i;
}

function empty() {
    var x;
    x = document.getElementById("ctr-tool-next").value;
    if (x == "") {
        return false;
    };
}

function modifyCallout(){
	jQuery(".results .overlay").css("display", "block");
	var searchtxt = jQuery("#search-change").val();
	
	if(searchtxt.length > 0){
		jQuery.ajax({
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			dataType: "json",
			data: {
				'action': 'get_score',
				'keyword': keyword,
				'title_tag' : searchtxt
			},
			success:function(data){
				jQuery(".callouting p").html(searchtxt);
				var grade = data.grade;

				//Main Circle Score
				jQuery(".circle-grade").html(grade.charAt(0) + "<span>" + grade.charAt(1) + "</span>");
				jQuery(".ctr-score .circle").attr("stroke-dasharray", data.score + ", 100");
				jQuery("svg.ctr-score").removeClass("red yellow green").addClass(data.color);

				//Character Count Circle
				jQuery(".ctr-characters-grade").html(data.character_count);
				jQuery(".ctr-characters .circle").attr("stroke-dasharray", data.character_count + ", 100");
				jQuery("svg.ctr-characters").removeClass("red yellow green").addClass(data.title_between_50_60.color);

				//Word Count Circle
				jQuery(".ctr-words-grade").html(data.word_count);

				jQuery(".primary_keyword_in_title .group div").removeClass("red yellow green").addClass(data.title_contains_keyword.color);
				jQuery(".primary_keyword_in_title .disp").html(data.title_contains_keyword.description);

				jQuery(".contains_a_power_word .group div").removeClass("red yellow green").addClass(data.contain_power_words.color);
				jQuery(".contains_a_power_word .disp").html(data.contain_power_words.description);

				jQuery(".title_contains_numbers .group div").removeClass("red yellow green").addClass(data.title_contains_numbers.color);
				jQuery(".title_contains_numbers .disp").html(data.title_contains_numbers.description);

				jQuery(".contains_special_characters .group div").removeClass("red yellow green").addClass(data.title_contain_special_characters.color);
				jQuery(".contains_special_characters .disp").html(data.title_contain_special_characters.description);

				jQuery(".title_tag_length .group div").removeClass("red yellow green").addClass(data.title_between_50_60.color);
				jQuery(".title_tag_length .disp").html(data.title_between_50_60.description);

				jQuery(".sentiment_analysis .group div").removeClass("red yellow green").addClass(data.sentiment_analysis.color);
				jQuery(".sentiment_analysis .disp").html(data.sentiment_analysis.description);

				jQuery(".uses_title_case .group div").removeClass("red yellow green").addClass(data.title_use_case.color);
				jQuery(".uses_title_case .disp").html(data.title_use_case.description);

				jQuery(".results .overlay").css("display", "none");

			},
			error:function(errorThrown){
				console.log(errorThrown);
			}
		});
	}
}

jQuery(document).foundation();

jQuery(window).scroll(function(){
	jQuery("#main-header").css('background-position', 'center center, 50% ' + (50 - jQuery(window).scrollTop()/3) + '%');
});

jQuery(document).ready(function(){

	if(jQuery('.ctr-search').length > 0){
		let original_top = jQuery('.ctr-search').offset().top;
		jQuery(window).scroll(function(){
			if(original_top - jQuery(window).scrollTop() <= 0){
				jQuery('body').addClass('stuck');
			}
			else{
				jQuery('body').removeClass('stuck');	
			}
		});
		setTimeout(function(){
			if(jQuery('.results:visible').length > 0){
				jQuery('html, body').animate({
				    scrollTop: (jQuery(".results").offset().top - jQuery('.ctr-search').outerHeight())
				}, 1000);
			}
			else if(jQuery('.preview:visible').length > 0){
				jQuery('html, body').animate({
				    scrollTop: (jQuery(".preview").offset().top - jQuery('.ctr-search').outerHeight())
				}, 1000);
			}
		}, 100);
	}

	if(jQuery('.ctr-search .error').length > 0){

		setTimeout(function(){
			jQuery('.ctr-search .error').fadeOut(500, function(){ jQuery(this).remove(); });
		}, 3000);
	}

	jQuery(".ctr-tool input[name=verification]").click(function(){
		jQuery(".fake-placeholder").css("display", "none");
	});

	if(jQuery('.ctr-tool').length > 0){
		jQuery('.ctr-tool input[name="title_tag"]').change(function(){
			$input = jQuery('.ctr-tool input[name="title_tag"]').val();
			jQuery("#field_28p5d").val($input);
		});
		jQuery('.ctr-tool input[name="title_tag"]').blur(function() {
			if(jQuery('.ctr-tool input[name="title_tag"]').val() !== "") {
				jQuery('.ctr-tool div.button').attr('data-open','ctr-modal');
			} else {
				jQuery('.ctr-tool div.button').removeAttr('data-open');
			}
		});
	}

	if(jQuery('.serp-results').length > 0){
		jQuery.ajax({
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			dataType: "json",
			data: {
				'action': 'fetch_serp',
				'keyword': keyword,
				'entry_id': entry_id,
			},
			error:function(hollerback){
				jQuery('.serp-results').html("<h2>Technology Has Failed Us</h2><p class='head'>We're having a hard time pulling SERP data right now. Try refreshing the page.</p>");
			},
			success: function(hollerback){
				if(hollerback == -1){
					jQuery('.serp-results').html("<h2>Technology Has Failed Us</h2><p class='head'>We're having a hard time pulling SERP data right now. Try refreshing the page.</p>");
				}
				else{
					let serp = "";
					serp += "<h2>SERP Previews for <span class='fake-link'>"+ keyword +"</span></h2>";
					serp += "<p class='head'>Use the SERP info below for title tag inspiration</p>";
					serp += '<div class="small-12 medium-12 large-6 cell">' +
							'	<h3>'+ serp_organic_headers +'</h3><span data-tooltip tabindex="1" title="'+ top_organic_results +'"><i class="far fa-info-circle"></i></span>';

					for(x in hollerback.organic){
						if(x == 5){ break; }
						serp += '<div class="addsection">' +
	 							'	<span class="score ' + hollerback.organic[x].color + '">' + hollerback.organic[x].score + '</span>' +
	 							'	<a>' + hollerback.organic[x].title + '</a>' +
	 							'	<span class="nails">' + hollerback.organic[x].breadcrumb + '</span>' +
	 							'</div>';
	 				}
	 				serp +=	'</div>';

					serp += '<div class="small-12 medium-12 large-6 cell'+ (hollerback.paid.length == 0 ? ' no-paid' : '') +'">';
	 				if(hollerback.paid.length > 0){
						serp += '	<h3>'+ serp_paid_headers +'</h3><span data-tooltip tabindex="1" title="'+ top_paid_results +'"><i class="far fa-info-circle"></i></span>';

						for(x in hollerback.paid){
							serp += '<div class="addsection">' +
		 							'	<span class="score ' + hollerback.paid[x].color + '">' + hollerback.paid[x].score + '</span>' +
		 							'	<a>' + hollerback.paid[x].title + '</a>' +
		 							'	<span class="nails">' + hollerback.paid[x].breadcrumb + '</span>' +
		 							'</div>';
		 				}
					}
					else{
						for (var x = 5; x < hollerback.organic.length; x++) {
							serp += '<div class="addsection">' +
		 							'	<span class="score ' + hollerback.organic[x].color + '">' + hollerback.organic[x].score + '</span>' +
		 							'	<a>' + hollerback.organic[x].title + '</a>' +
		 							'	<span class="nails">' + hollerback.organic[x].breadcrumb + '</span>' +
		 							'</div>';
						}
					}

					serp +=	'</div>';

					jQuery('.serp-results').html(serp);
				}
			}
		});
	}

	if(jQuery('.ctr-tool.step-three').length > 0){
		jQuery(".ctr-tool.step-three").submit(function(e){
			e.preventDefault();
			jQuery(".results .overlay").css("display", "block");
			modifyCallout();
		});

		const searchBtn = document.querySelector('#search-change');
		const fetchData = () => console.count('Data fetching...');
		const debounce = (fn, delayTime) => {
			let timer;
			return function() {
				const [context, args] = [this, arguments];
				clearTimeout(timer);
				timer = setTimeout(() => {
					fn.apply(context, args);
				}, delayTime);
			}
		};
		searchBtn.addEventListener('keyup', debounce(modifyCallout, 500));
	}

	jQuery('.frst-timeline a').each(function(){
		jQuery(this).removeAttr('target');
	});

	if(jQuery('#iphone-time').length > 0){
		startTime();
	}

	jQuery('.accordion.left li, .accordion.right li').on('click', 'a', function(){
		var other_side = jQuery(this).closest('.accordion').hasClass('left') ? 'right' : 'left';
		jQuery('.accordion').foundation('up', jQuery('.accordion.'+ other_side +' li.is-active .accordion-content'));
	});

	jQuery('.owl-carousel').each(function(){
		var large_items = jQuery(this).data('large-items');
		var medium_items = jQuery(this).data('medium-items');
		var small_items = jQuery(this).data('small-items');
		var total_items = jQuery(this).data('total-items');
		jQuery(this).owlCarousel({
			loop:true,
			mouseDrag:(total_items == 1 ? false : true), 
			touchDrag:(total_items == 1 ? false : true),
			responsive : {
			    0 : {
			        items : small_items
			    },
			    640 : {
			        items : medium_items
			    },
			    1024 : {
			        items : large_items
			    }
			}
		});
	});

	jQuery('#menu-main-menu > li.menu-item-has-children > a').click(function(e){
		e.preventDefault();
		if(jQuery(this).parent().hasClass('open')){
			jQuery(this).parent().removeClass('open');
			jQuery(this).parent().addClass('closed');
		}
		else if(jQuery(this).parent().hasClass('closed')){
			jQuery(this).parent().removeClass('closed');
			jQuery(this).parent().addClass('open');
		}
		else{
			jQuery(this).parent().addClass('open');
		}
	});

	jQuery('.hamburger a').click(function(){
		jQuery('#main-nav').toggle();
	});

	jQuery('#blog-grid').on('click', '.load-more', function(e){
		e.preventDefault();

		var load_more_button = jQuery(this);
		if(!load_more_button.hasClass('loading')){
			var post_type      = load_more_button.data('post-type');
			var load_more_text = load_more_button.text();
			var offset         = load_more_button.data('offset');
			var category       = load_more_button.data('category');
			var search         = load_more_button.data('search');
			var month          = load_more_button.data('month');
			var year           = load_more_button.data('year');
			
			load_more_button.addClass('loading');
			load_more_button.text("Loading...");
			jQuery.post(
			    '../../../wp-admin/admin-ajax.html', 
			    {
			        'action': 'load_posts',
			        'offset': offset,
			        'post_type': post_type,
					'category': category,
					'search': search,
					'month': month,
					'year': year
			    }, 
			    function(hollerback){
			        console.log(hollerback.count);
			        jQuery('#blog-grid .posts').append(hollerback.html);

			        if(hollerback.count < 9){
			        	load_more_button.remove();
			        }
			        else{
						load_more_button.data('offset', (offset + 9));
			        	load_more_button.text(load_more_text);
						load_more_button.removeClass('loading');
					}
			    },
			    'json'
			);
		}

		return false;
	});

	jQuery('#blog-filter select').change(function(){
		jQuery("#blog-tools form").trigger('submit');
	});

	jQuery('a.scrollto').click(function(e){
		e.preventDefault();
		jQuery('html, body').animate({
		    scrollTop: jQuery("#" + jQuery(this).data('target')).offset().top
		}, 1000);
		return false;
	});

	if(jQuery('body').outerWidth() < 1024){
		jQuery('.accordion').foundation('_destroy');
		jQuery('.accordion-title').click(function(){return false;});
	}
});