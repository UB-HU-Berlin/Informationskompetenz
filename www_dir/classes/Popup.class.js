// JavaScript Document

/**
*	Diese Klasse erzeugt die Pop-Up Fenster
*/
var Popup = function (e){

	/**
	*	Wird aufgerufen, wenn das Pop-Up gelöscht werden soll
	*/
	this.destroy = function(){
		$( "#pop-up" ).remove();
		$( "#pop-up-overlay").remove();
	}
	
	/**
	*	Wird mit dem Aufruf der Klasse ausgeführt und konstruiert 
	*	das eigentliche PopUp-Fenster.
	*/
	this.init=function(e){
		e.preventDefault();
		
		$( "#pop-up" ).remove();
		$( "#pop-up-overlay" ).remove();
		
		$( "body" ).append("<div id='pop-up-overlay'></div>");	
		$( "#pop-up-overlay" ).click(function(e){
			$( "#pop-up-overlay" ).remove();
		});
		$( "#pop-up-overlay" ).append("<div id='pop-up'></div>")
		
		/**
		*	Eine kleine Transition der Deckkraft wenn das Pop-Up geöffnet wird
		*/
		$("#pop-up").animate({
			"opacity":1,
		},1000);		
		
		/**
		*	Dieses Event verhindert Bubbling des On-Click-Close Events des pop-up-overlays
		*/ 
		$( "#pop-up" ).click(function(e){
			e.stopPropagation();
		});

		/**
		*	Hier wird der Inhalt der Pop-Up Fenster aus der Datei "PopupContainer.html" gezogen
		*/
		var target = $(e.currentTarget).attr("class");
		target = target.split(" ");
		var content = $(".popup."+target[1]).html();
		$( "#pop-up" )
			.html(content)
			.append("<span class='fa fa-times' id='close-btn'></span>");
		
		$("#close-btn")
			.css({
				"position":"absolute",
				"right":"0",
				"top":"0",
				"cursor":"pointer",
				"font-size":"1.25em"
			})
			.click( function () { 
				$( "#pop-up" ).remove();
				$( "#pop-up-overlay").remove();
			} );
		
		/**
		*	Kleiner Gestaltungs-Fix 
		*/
		$( ".Kachellernziel .lernziel-box" ).css({
			"background":"none",
			"border":"none"
		});
		
		Popup.center();

		Content.setLinkEvents();

		// Fallback, falls verspätetes hereinladen der Bilder eine korrekte Zentrierung des Popups verhindert
		var fallback_interval = setInterval(function () { Popup.center() }, 10);
		
		setTimeout(function() {
			clearInterval(fallback_interval);
		},1000);
		
		return this;
	}(e)
}

/**
*	Positionierung des Pop-up Fensters
*/
Popup.center = function (){
//	console.log("bump");
	var overlay = {
		"width" : $("#pop-up-overlay").width(),
		"height" : $("#pop-up-overlay").width()
	}
	
	var popup = {
		"width" : $("#pop-up").width(),
		"height" :$("#pop-up").height()
	}
	
	var pos = {
		"left": overlay.width * .5 -  popup.width * .55,
		"top": window.innerHeight * .5 -  popup.height * .5
	}
	
	$("#pop-up").css({
		"top": Math.floor(pos.top),
		"left": Math.floor(pos.left)
	});
}
