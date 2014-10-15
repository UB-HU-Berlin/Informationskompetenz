/**
*	Klasse die das Abhaken von beendeten Unterkapiteln kontrolliert
*/
function Checknavi () {}

Checknavi.init = function () {
	
	this.obj = {
		"main":window.sessionStorage.getItem("currentListItem"),
		"subnav":window.sessionStorage.getItem("currentMenuItem")
	}
	
	this.setEvents();

	if( $(".content")[0].scrollHeight == $(".content").outerHeight() ){
		this.checkUp( this.obj );
	}
	
}

Checknavi.setEvents = function () {
	$(".content").on("scroll", this.scrollPosChanged);
}

/**
*	Wird jedesmal ausgeführt, wenn die Scrollbar bewegt wird.
*/
Checknavi.scrollPosChanged = function ( event ) {
	event.stopPropagation();
	event.stopImmediatePropagation();
		
	/**
	* 	Prüft, ob ans Ende der jeweiligen Seite gescrollt wurde.
    */
	if($(this)[0].scrollHeight - $(this).scrollTop() <= $(this).outerHeight() )
    {
        Checknavi.checkUp( Checknavi.obj );
    }
}

Checknavi.checkUp = function ( obj ) {
	var _item = obj.subnav+"#"+obj.main;

	var currentState = window.sessionStorage.getItem("checkedChapters") || "";
	if( currentState.indexOf(_item) == -1 ) {
		currentState += "_" + _item;
	}
	
	/**
	*	Fügt das Unterkapitel an den String "checkedChapters an. 
	*/
	window.sessionStorage.setItem("checkedChapters", currentState);

	/**
	*	Fügt die entsprechenden Haken für die abgeschlossenen Kapitel ein.
	*/
	var checked_array = currentState.split("_");
	for(key in checked_array) {
		if(checked_array[key][0] == window.sessionStorage.getItem("currentMenuItem")) {
			$(".list-item[value="+checked_array[key].split("#")[1]+"] b.check").remove();
			$(".list-item[value="+checked_array[key].split("#")[1]+"]").prepend("<b class='check fa fa-check'></b>");
			$(".list-item[value="+checked_array[key].split("#")[1]+"] b.check").css({
				"position":"absolute",
				"left":"15.4em",
				"margin-top":".3em"
			});
		}
	}
}