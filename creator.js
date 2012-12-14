// Home Page
$(document).delegate('#CMS','pageinit', function() {
	$('#new').click(function() {
		$('#popupPage').popup( "open" );
	});
	
	$('#popupPage').on('click', '#set_page', function() {
		$('title').text( $('#page_name').val() );
		$.mobile.changePage('#creator');
	});
});

// Creation Page
$(document).delegate('#creator','pageinit', function() {
	// Init
    	document.addEventListener("menubutton", onMenuKeyDown, false);
	$('#header').hide();
	$('#save').hide();
	
	$('.toolpattern').removeClass('ui-link');
	
	// Menu button
	function onMenuKeyDown() {
		$( "#popupPanel" ).popup( "open" );
		$('#save').toggle('slide down');
	};
	
	// Esc key button
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$( "#popupPanel" ).popup( "open" );
			$('#save').toggle('slide down');
		}
	});
	
	// Toolbar handler
	$('#popupPanel').on('click', '.toolpattern', function() {
		if ( $(this).attr('name') == 'header' ) {
			$('#header').toggle('slide down');
		}
		if ( $(this).attr('name') == 'input' ) {
			$('#simcontent').append('<input name="input" class="edit" type="text" placeholder="input">');
		}
		if ( $(this).attr('name') == 'button' ) {
			$('#simcontent').append('<a href="#" name="button" class="edit" data-role="button" data-icon="star" data-theme="c">Button</a>');
		}
		if ( $(this).attr('name') == 'list' ) {
			$('#simcontent').append('</br><ul name="ul" class="edit" data-role="listview"><li data-role="list-divider">List</li></ul></br>');
		}
		if ( $(this).attr('name') == 'content' ) {
			$('#simcontent').append('<p name="p" class="edit">Add content here..</p>');
		}
		
		// Redraw
		$('#simcontent').trigger('create');
	});
	
	// Header click
	$('#creator').on('click', '#header', function() {
		$('#popupHeader').popup( "open" );
	});
	$('#set_header').click(function() {
		$('#lb_header').text( $('#header_text').val() );
	});
	
	Selected_Item = 'none';
	$('#simcontent').on('click', '.edit', function() {
		Selected_Item = $(this);
		// Input click
		if( Selected_Item.attr('name') == 'input' ) {
			$('#input_place').val( Selected_Item.attr('placeholder') );
			$('#popupInput').popup( "open" );
		}
		
		// Button click
		if( Selected_Item.attr('name') == 'button' ) {
			$('#button_value').val( Selected_Item.children().children().first().text() );
			$('#popupButton').popup( "open" );
		}
			
		// List click
		if( Selected_Item.attr('name') == 'ul' ) {
			$('#list_title').val( Selected_Item.children().first().text() );
			$('#list_pre').empty().size();
			$(Selected_Item).children().clone().appendTo("#list_pre");
			$('#popupList').popup( "open" );
		}
		
		// Text click
		if( Selected_Item.attr('name') == 'p' ) {
			$('#content_text').val( Selected_Item.text() )
			$('#popupContent').popup( "open" );
		}
		
		// Update
		$('#simcontent').trigger('create');
	});
	
	Theme = 'none';
	SelIdx = 'none';
	// Customize Input
	$('#set_input').click(function() {
		Selected_Item.attr( 'placeholder', $('#input_place').val() );
		// Remove Theme
		if (Selected_Item.hasClass('ui-body-c') )
			Selected_Item.removeClass('ui-body-c');
		else
			Selected_Item.removeClass( Theme );
			
		// Add Theme
		Theme = 'ui-body-' + $('#input_theme option:selected').val();
		Selected_Item.addClass( Theme );
	});
	
	// Customize Button
	$('#set_button').click(function() {
		Selected_Item.children().children().first().text( $('#button_value').val() );
		console.log('delete: ' +Theme);
		// Remove Theme
		if (Selected_Item.hasClass('ui-btn-up-c') )
			Selected_Item.removeClass('ui-btn-up-c');
		else
			Selected_Item.removeClass( Theme );
			
		// Add Theme
		theme_val = $('#button_theme').val();
		Theme = 'ui-btn-up-' + $.trim(theme_val);
		console.log( theme_val );
		console.log( Theme );
		Selected_Item.attr( 'data-theme', $('#button_theme option:selected').val() );
		Selected_Item.addClass( Theme );
	});
	
	// Customize List
	$('#set_list').click(function() {				
		// Remove
		Selected_Item.empty();
		
		// Add Items
		$("#list_pre").children().clone().appendTo(Selected_Item);
		$(Selected_Item).listview('refresh');
	});
	
	$('#list_title').change(function() {
		$("#list_pre").children().first().text( $('#list_title').val() );
	});
	
	$('#list_theme').change(function() {		
		// Remove Theme
		if ($("#list_pre").children().first().hasClass('ui-bar-b') )
			$("#list_pre").children().first().removeClass('ui-bar-b');
		else
			$("#list_pre").children().first().removeClass( Theme );
		
		// Add Theme
		Theme = 'ui-bar-' + $('#list_theme option:selected').val();
		$("#list_pre").children().first().addClass( Theme );
	});
	
	$('#add_item').click(function() {
		$('#list_pre').append('<li>'+$('#list_item').val()+'</li>');
		$('#list_item').val('');
		$('#list_pre').listview('refresh');
	});
	
	$('#rem_item').click(function() {
		DelItem = $('#list_pre').children().last().text();
		$('#list_pre').children().last().remove();
	});

	// Customize Text
	$('#set_text').click(function() {
		Selected_Item.text( $('#content_text').val() );
	});
	
	// Save
	$('#save').click(function() {
		html_head = $('head').html();
		html_head = html_head.replace('<script src="js/creator.js" type="text/javascript"></script>', '');	// remove not used tags
		html_head = html_head.replace('<link rel="stylesheet" href="css/creator.css">', '');				// remove not used tags
		html_head = '<!DOCTYPE html><html><head>' + html_head + '</head><body>' + $('#screenshot').html() + '</body>' + '</html>';
		html_head = $.trim(html_head);
		$('#clipboard').val( html_head );
		$( "#popupPanel" ).popup( "close" );
		setTimeout( callCode, 1000);
	});
	
	function callCode() {
	   $( "#popupCode" ).css('width', $(window).width() * 0.95);
	   $( "#popupCode" ).popup( "open" );
    };
	
	// Fullscreen
	$( "#popupPanel" ).on({
		popupbeforeposition: function() {
			h  = $( window ).height();	// Window height
			wid = $( window ).width();
			w  = (h - 10) / 5;			// (Height - (5[anz. buttons] x 2p[border])) / 5[anz. buttons]
			hp = (w / 2) + (17 / 2);	// (Width / 2 + 17[font-size] / 2) -> Text appeares centered thx to padding
			pd = (w / 2) - (17 / 2);	// padding: (Width / 2 - 17[font-size] / 2) -> Center Text
			$('#popupPanel').css({'height': h, 'width': w});
			$('.toolpattern').css({'height': hp, 'width': w, 'padding-top': pd});
			$('#save').css({'top': (h / 2)-($('#save').height()), 'left':  (wid / 2) - ($('#save').width())});
			$('#save').show('slide down');
		}
	});
	$("#popupPanel").on({
		popupafterclose: function() {
			$('#save').hide('slide down');
		}
	});
});
