(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.css(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);

var ajaxConnectURL = "http://localhost/livechat/livechat/index.php";
var hasOpened;
var userLang = navigator.language || navigator.userLanguage;
var lastCheck = 0;
var path = "../livechat/";
var send = false;

$(document).ready(function() {
	$('body').append("<div id='oslivechat'><div class='top'><span>" + translate("loading") 
		+ "</span><div id='expand'>+</div><div class='clear'></div></div><div id='chatscreen' style='display:none;'><div id='resultbox'></div><div id='sendbar'><input type='text' value='' /><a href='#' id='sendbutton'>"  + translate("send") + "</a></div></div></div>");
	openSession();
	$('#oslivechat .top span').html( translate("live support") + " - <i>" + translate("post your question") + "</i>"  );
	$('#oslivechat .top').click(function (){
		expander( this );
	});
	$('#chatscreen input').focusout(function (){
		if( $(this).find('input').val() == "" )
		{
			$(this).find('input').val( translate("type your message") );
		}
	});
	$('#chatscreen input').focusin(function (){
		if( $(this).find('input').val() == translate("type your message") )
		{
			$(this).find('input').val( "" );
		}
	});
	$('#chatscreen input').keypress(function(e) {
		if(e.which == 13) {
			sendMsg();
		}
	});
	$('#sendbutton').click(function (){
		sendMsg();
		$('#chatscreen input').focus();
	});
	$( "#oslivechat" ).draggable( {axis: "x", containment: 'body'} );

	setTimeout("frontCheck( 0 )", 500);
	bgCheck();
});

translations = {

	"nl" : {
		"loading" 			: "Livechat laden...",
		"chatready" 		: "U kunt uw vraag nu stellen",
		"live support" 		: "Livehulp",
		"post your question": "stel uw vraag <u>direct</u>",
		"type your message"	: "Typ uw bericht...",
		"incomming"			: "Nieuw bericht van ",
		"you"				: "U zegt",
		"send"				: "Stuur",
		"please wait"		: "Een moment geduld a.u.b.",
		"waiting for staff" : "We zoeken een medewerker om uw vraag te beantwoorden",
		"request email support" : "Antwoord per email",
		"your name"			: "Uw naam",
		"your email"		: "Uw emailadres",
		"your question"		: "Uw vraag",
		"wait a little longer" : "Nog even wachten...",
		"no staff online"	: "Er is geen mederwerker gevonden om uw vraag te beantwoorden.",
		"cancel"			: "Annuleren",
		"no available"		: "Wij zijn momenteel niet aanwezig.",
		"may we email back" : "Mogen wij u terugmailen over uw vraag?",
		"yes"				: "Ja",
		"no"				: "Nee"
	},
	"en-US" : {
		"loading" 			: "Loading livesupport...",
		"chatready" 		: "You can now ask your question",
		"live support" 		: "Live support",
		"post your question": "get your answer <u>now</u>",
		"type your message"	: "Type your question...",
		"incomming"			: "New message from ",
		"you"				: "U say:",
		"send"				: "Send",
		"please wait"		: "Please wait",
		"waiting for staff" : "We are looking for a staff member to answer your question",
		"request email support" : "Answer with email",
		"your name"			: "Your name",
		"your email"		: "Your email address",
		"your question"		: "Your question",
		"wait a little longer" : "Please wait just a little longer",
		"no staff online"	: "There is no staff found to answer your question.",
		"cancel"			: "Cancel",
		"no available"		: "There are no staff members available to answer your question at this time.",
		"may we email back" : "May we send you an email with the answer?",
		"yes"				: "Yes",
		"no"				: "No"
	}
}

/* Functions */
function sendMsg()
{
	if( $('#chatscreen input').val().replace(/\s/g, "").length > 0 ){
		send = true;
		text = $('#chatscreen input').val();
		sendRequest( "sendMessage", {message: text}, function( msg ){
			var split = msg.split('-');
			if( split[0] == "1" && $('#tmpwait').length == 0 )
				waitingForStaff();
			else if( split[1] == "0" && $('#tmpwait').length > 0 )
				removeWaitingForStaff();
			
			$('#chatscreen #resultbox').append("<p><span>" + translate("you") + ":</span> " + msg.substring(2) + "</p>");
		} );
	}
	$('#chatscreen input').val("");
}

function translate( name )
{
	return translations[userLang][name];
}

function waitingForStaff()
{
	$('#sendbar').fadeOut();
	$('#chatscreen').append('<div id="tmpwait"><p><strong>' + translate("please wait") + '</strong><br />' + 
					translate("waiting for staff") + '<br /><br /><img src="' + path + 'client/img/load.gif" alt="load" /><div id="cancel">' + translate("cancel") + '</div></p></div>');
	setTimeout( "justALittleLonger()", 15000 );
	$('#cancel').click(function (){
		removeWaitingForStaff( translate("no staff online") );
		send = false;
	});
}

function justALittleLonger()
{
	$('#chatscreen #tmpwait p strong').html( translate("wait a little longer") );
	setTimeout( "emailYouBack()", 15000 );
}

function emailYouBack()
{
	$('#chatscreen #tmpwait').html( "<p><strong>" + translate("no available") + "</strong>" +
		"<br />" + translate("may we email back") + "</p>" +
		"<div class='inlinebuttons'><a class='inlinebutton' id='ja'>" + translate("yes") + "</a><a class='inlinebutton' id='nee'>" + translate("no") + "</a></div>" +
		"<div id='dialog' style='display:none;' title='" + translate("request email support") + "'>" +
		"<form><fieldset><label for='name'>" + translate('your name') + ":</label><input type='text' name='name' id='name' class='text ui-widget-content ui-corner-all' />" +
		"<label for='email'>" + translate("your email") + ":</label><input type='text' name='email' id='email' value='' class='text ui-widget-content ui-corner-all' />" +
		"<label for='question'>" + translate("your question") + ":</label><input type='tex' name='question' id='question' value='' class='text ui-widget-content ui-corner-all' />" +
		"</fieldset></form></div>" );
	$('#ja').click(function (){
		$( "#dialog" ).dialog( {minWidth: 500, buttons: [ 
			{ text: translate("send"), click: function() { $( this ).dialog( "close" ); } },
			{ text: translate("cancel"), click: function() { $( this ).dialog( "close" ); } }
			 ]} );
	});
	$('#nee').click(function (){
		removeWaitingForStaff( translate("no staff online") );
		send = false;
	});
}

function removeWaitingForStaff( text )
{
	$('#tmpwait').remove();
	$('#chatscreen #resultbox').append("<p style='text-align:center;'><span>" + text + "</span></p>");	
	$('#sendbar').fadeIn();
}

function bgCheck()
{
	if( !$('#oslivechat').hasClass('open')  )
	{	// Still open => no background-checking needed
		sendRequest('bgChecker', {}, function( msg ){
			var split = msg.split('-');
			msg = msg.substring(2);
			if( msg !== "false" )
			{
				expander( $('#oslivechat .top') );
				$('#oslivechat .top').css( 'background', 'none' );
				$('#oslivechat .top').animate({'backgroundColor' : '#ff5686', 'color' : "#fff"}, 700);
				$('#oslivechat .top span').html( translate("incomming") + msg );
			}
		});
	}

	if( hasOpened == true )
	{
		setTimeout("bgCheck()", 4000);
	}
	else
	{
		setTimeout("bgCheck()", 8000);
	}
}

function frontCheck( sinceDate )
{
	if( $('#oslivechat').hasClass('open') )
	{
		sendRequest( "getNewMessages", { since: sinceDate }, function ( msg ){
			var split = msg.split('-');
			msg = msg.substring(2);
			if( split[0] == "1" && $('#tmpwait').length == 0 && send == true )
				waitingForStaff();
			if( split[0] == '0' && $('#tmpwait').length > 0 )
				sendRequest( "getStaffPartner", {}, function ( msg ){
					removeWaitingForStaff( msg );
				} );
			if( msg !== "false" )
				$('#resultbox').append("<p>" + msg + "</p>");
			lastCheck = new Date().getTime();
			$("#resultbox").animate({ scrollTop: $('#resultbox')[0].scrollHeight}, 400);
			setTimeout("frontCheck(" + lastCheck + ")", 1000);
		} );
	}
	else
	{
		setTimeout("frontCheck(" + lastCheck + ")", 1000);
	}
	var wtf    = $('#resultbox')[0];
    var height = wtf.scrollHeight;
    wtf.scrollTop(height);
}

function openSession()
{
	sendRequest('startSession', {lang : userLang}, function( msg ){ 
		$('#resultbox').html(msg);
	});
}

function sendRequest( action, arguments, callback )
{
	$.ajax({
		type: "POST",
		url: ajaxConnectURL + "?action=" + action,
		data : arguments
	}).done( callback );
}

function expander( that )
{
	hasOpened = true;
	if( !$(that).parent().hasClass('open') ){
		$(that).parent().addClass('open');
		$('#chatscreen').slideDown(200);
		$('#chatscreen input').focus();
		$(that).find('span').html( translate("chatready") );
		$('#expand').html('-');
	}
	else
	{
		$(that).parent().removeClass('open');
		$('#chatscreen').hide();
		$(that).find('span').html( translate("live support") + " - <i>" + translate("post your question") + "</i>" );
		$('#expand').html('+');
	}
}