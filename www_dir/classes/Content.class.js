/**
*	Diese Klasse verwaltet das Hereinladen von Inhalten. 
*/
function Content () { }

Content.loadContent = function ( target, startseite ) {
	
	var citem = window.sessionStorage.getItem("currentMenuItem");
	var target = target || window.sessionStorage.getItem("currentListItem");
	
	var startseite = startseite || false;
	var path;

	/**
	*	Findet die richtige Datei, über directory.json.
	*/
	if(!startseite) {
	 	try{
			path = "directory/"+directory[citem].link + "/" + directory[citem].subNav[target].link+".html";
		} catch (err) {
			path = "directory/"+directory[citem].link +"/"+ directory[citem].link+ ".html";
		}
	} else {
	 	path = "directory/"+directory[citem].link + "/" +directory[citem].link+".html";
	}
	
	/**
	*	Lädt die entsprechende Datei und führt dann einige Anpassungen durch. (Nachdem die Datei geladen wurde)
	*/
	$(".import").html("").load(path, function() {
		Content.setLinkEvents();
		ImageCtrl.active();
		Glossar.init();
		Checknavi.init();
		Content.fixHeadline();
		Main_Menu.fixNaviTooltip();
		
		// Fix Link Auszeichnung
		$("a.external-link").append("<span class='fa fa-external-link-square'></span>");
	});
	
}

Content.fixHeadline = function () {
	
	var headline = document.getElementsByClassName("import")[0];
	headline = headline.getElementsByTagName("h2")[0];

	$(".subtitle h3")
		.html(headline)
		.append("<div class='subtitle-subline'></div>")
	$(".subtitle-subline").css({
		"position":"absolute",
		"height":"3px",
		"width": $( ".content" ).width() + 32 ,
		"background-color":"rgb("+directory[window.sessionStorage.getItem('currentMenuItem')].color+")",
		"margin-top":"-1em"
	});
	
	$( window ).on("resize", function () {
		$(".subtitle-subline").css({
			"width": $( ".content" ).width() + 32 
		});
	});
}

Content.setLinkEvents = function () {

	$(".external-link")
		.attr("target","_blank");
	$(".internal-link")
		.unbind()
		.click(Content.callLink);
		
	$(".popup-link span").remove()
	$(".popup-link")
		.remove("span")
		.prepend("<span class='fa fa-info-circle'>&nbsp;</span>")
		.unbind()
		.click(Popup);
}

/**
*	Öffnet einen internen Link als neues Fenster 
*/
Content.callLink = function ( evt, htarget ) {
	
	var size = {
		"width": screen.availWidth *.5,
		"height": screen.availHeight
	}
	
	var newWindow = window.open( "content.html", "Zweitfenster", "width="+size.width+",height="+size.height+",scrollbars=yes");
	newWindow.focus();	
	
	try { 
		evt.preventDefault; 
		evt.stopPropagation();
		evt.stopImmediatePropagation();
	} catch (err) {}
	
	var evt  = evt || false ;
	var htarget = htarget || false;
	
	$( "#pop-up-overlay").remove();

	var target;
	target = evt ? $( evt.currentTarget ).attr("href") : htarget;
	
	var level_1, level_2;
	if(target.indexOf("_") >0 ){
		target = target.split("_");
		level_1 = target[0];
		level_2 = target[1];
	} else {
		level_1 = target
		level_2 = false;
	}
	
	newWindow.sessionStorage.setItem("currentMenuItem", level_1);
	if(level_2) {
		newWindow.sessionStorage.setItem("currentListItem", level_2);
	}
	
	location.reload();
	
	return false;
}