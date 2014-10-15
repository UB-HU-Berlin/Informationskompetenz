/**
*	Die Wabe
*/
function Wabe ( X,	Y, Scale_Factor, LNID, ID) {
	this.x = X || 0;
	this.y = Y || 0;
	this.scale_factor = Scale_Factor || 50;
	this.id = "wabe_"+LNID+"_"+ ID;
	this.opacity = Math.random();
	
	this.img = $( "<img id='"+this.id+"' width='"+this.scale_factor+"' src='Bilder/wabe_clear.png'/>" );

	/**
	*	Bestimmt die Größe der Wabe in Pixel 
	*/
	var self = this;
	
	if( this.scale_factor ) {
		var waiting_for_load = setInterval( function () { self.ready( self, waiting_for_load ) }, 10 );
	}

	$( this.img ).css({
		"position":"absolute",
		"top": this.y,
		"left": this.x,
		"display":"inline",
		"opacity":this.opacity
	});

	return this.img;
}

/**
*	Funktion die von anderen Klassen aufgerufen werden kann, 
* 	um eine Reihe Waben zu erzeugen
* 	in eine beliebige Richtung und einer beliebigen Anzahl
*/
Wabe.printLn = function ( X, Y, Direction, Count, Scale_Factor, LnID ) {
	var y = Y || 0;
	var x = X || 0;
	var direction = function () {
		if( Direction == "left" ) {
			return -1;
		} else if ( Direction == "right" ) {
			return 1;
		}
	}(Direction || "right")
	
	var count = Count || 1;
	var scale_factor = Scale_Factor || 50;
	var distance = scale_factor + scale_factor * .1;
	
	for(var i = 0; i < Count; i++) {
		var wabe = new Wabe(  (x + (( distance * i ) * direction) ), y, scale_factor, LnID, i );
		wabe.appendTo( "#navisite" );
	}

}

/**
*	Eine Sammlung aller Waben die dem DOM hinzugefügt wurden
*/
Wabe.collector = new Array();

/**
*	Dinge die ausgeführt werden, wenn das Bild der Wabe fertig geladen wurde
*/
Wabe.prototype.ready = function ( obj,interval ) {
	/**
	*	Feuert nur wenn das Bild fertig geladen wurde.
	* 	&& obj.img.width > 50 verhindert einen Bug, 
	* 	in dem der Browser zu früh ein Bild mit complete auszeichnet
	*/
	if(obj.img.complete) {
		obj.img.width = obj.scale_factor;
		clearInterval( interval );
	}
}

/**
*	Jede Wabe hat die Fähigkeit, zu einem beliebigen Ziel
* 	hinzugefügt zu werden.
*/
Wabe.prototype.appendTo = function ( target ) {
	$( target ).append( this.img );
	Wabe.collector.push( this.img );
}