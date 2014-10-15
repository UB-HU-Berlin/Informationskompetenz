/**
* Voraussetzung: jQuery
* Erstellt auf Click ein Popup eines Bildes
* Bild braucht die Klasse "zoomable"
* Nachdem Bilder geladen wurden, muss ImageCtrl.active ausgeführt werden
* (Vorzugsweise in Reaktion auf document.ready)
*/

function ImageCtrl () {
}

ImageCtrl.active = function (){
//	console.log("imgctrl active");
    $("img.zoomable")
        .css({
            "position": "relative",
            "max-width": "80%",
            "cursor":   "ne-resize",
        	"display": "block",
			"margin-top":"1em",
			"margin-bottom":"1em",
		})
        .click(function(evt){
            ImageCtrl.popup(evt.currentTarget);
        })
}

ImageCtrl.popup = function ( element ) {
    var img = new Image();
    img.src = element.src;
 
    /** 
    * Interval stellt sicher, dass die Funktion erst ausgeführt wird,
    * wenn das entsprechende Bild fertig geladen wurde   
    */
    var _load = setInterval(function(){
        if(img.complete){
            $("body").append('<div id="popupWrapper"></div>');
            
            $("#popupWrapper")
                .css({
                    "position":"fixed",
                    "width":"100%",
                    "height":"100%",
                    "top":0,
                    "left":0,
					"cursor":"pointer",
					"z-index":"4",
					"background-color":"rgba(255,255,255,.5)"
                })
                .click(function(evt){
                    $(evt.currentTarget).remove();
                })
                .append(img);
                
            $(img)
                .css({
                    "position":"fixed",
                    "max-width":"80%",
                    "max-height":"90%",
                    "-webkit-box-shadow": "0px 0px 200px 0px rgba(0, 0, 0, 0.5)", /* WebKit */
                    "-moz-box-shadow": "0px 0px 200px 0px rgba(0, 0, 0, 0.5)", /* Firefox */
                    "box-shadow": "0px 0px 200px 0px rgba(0, 0, 0, 0.5)", /* Standard */

			    })

			var overlay = {
				"width" : $("#popupWrapper").width(),
				"height" : $("#popupWrapper").width()
			}
			
			var popup = {
				"width": $(img).width(),
				"height": $(img).height()
			}
		
			
			var pos = {
				"left": overlay.width * .5 -  popup.width * .5,
				"top": window.innerHeight * .5 -  popup.height * .5
			}
			
			$(img).css({
				"top": pos.top,
				"left": pos.left
			});			                
            clearInterval(_load);
        }
    }, 10);
}

