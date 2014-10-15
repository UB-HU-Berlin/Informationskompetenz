/**
*	Zuständig für die gesamte Konstruktion und Verwaltung
* 	der Hauptnavigation ( der Waben ) 
*/ 
function Main_Menu ( initial_menu_item ) {
	/**
	*	Speichert das aktuelle Hauptmenü-Item
	*/
	this.currentItem = function () {
		if( initial_menu_item ) {
			return initial_menu_item;
		} else {
			return 0;
		}
	}();

	
	// Macht Logo zum Link auf die Startseite
	$("#logo img").click(function () {
		if(window.sessionStorage.getItem("accesspoint") != "false") {
			window.location = "index.html?accesspoint=" + window.sessionStorage.getItem("accesspoint");
		} else {
			window.location = "index.html";
		}
	});

	this.constructMenu();
}

Main_Menu.prototype.icon_directory = new Array();

for(var i = 0; i < 6; i++) {
	Main_Menu.prototype.icon_directory[i] = new Array();
}


Main_Menu.prototype.icon_directory[0]["src"] = "icons_wabe/iconwabe_thema.png";
Main_Menu.prototype.icon_directory[0]["id"] = 0;

Main_Menu.prototype.icon_directory[1]["src"] = "icons_wabe/iconwabe_medien.png";
Main_Menu.prototype.icon_directory[1]["id"] = 1;

Main_Menu.prototype.icon_directory[2]["src"] = "icons_wabe/iconwabe_wo.png";
Main_Menu.prototype.icon_directory[2]["id"] = 2;

Main_Menu.prototype.icon_directory[3]["src"] = "icons_wabe/iconwabe_wie.png";
Main_Menu.prototype.icon_directory[3]["id"] = 3;

Main_Menu.prototype.icon_directory[4]["src"] = "icons_wabe/iconwabe_was.png";
Main_Menu.prototype.icon_directory[4]["id"] = 4;

Main_Menu.prototype.icon_directory[5]["src"] = "icons_wabe/iconwabe_hausarbeit.png";
Main_Menu.prototype.icon_directory[5]["id"] = 5;

/**
* 	Konstruiert das Hauptmenü
*/
Main_Menu.prototype.constructMenu = function () {
	var self = this;
	
	var wabe_active = {}
	wabe_active.pos = $(".wabeactive:eq(0)").offset();
	wabe_active.size = { 
		"width" 	:	$(".wabeactive:eq(0)").find("img:eq(0)").width(),
		"height" 	: 	$(".wabeactive:eq(0)").find("img:eq(0)").height()
	}
	
	
	// Exakte Position der oberen Spitze der Wabe
	wabe_active.tip = { 
		"x" : wabe_active.pos.left ,
		"y"	: wabe_active.pos.top
	}
	
	var size = 80;
	var bumper = 30;
	
	/** 
	* 	X, Y, Richtung, Anzahl, Größe, ID der Reihe
	* 	Alle Reihen von Oben nach Unten
	*/
	Wabe.printLn( 	wabe_active.tip.x + (wabe_active.size.width * 0.5) - (size * 0.5) + size + 8,
					wabe_active.tip.y + - (3 * size) - 15  
					, 
					"left", 
					5, 
					size,
					1 );
						
	Wabe.printLn( 	wabe_active.tip.x + (wabe_active.size.width * 0.5) - size - ( bumper * 0.1) - 1 + size + 8,
		 		 	wabe_active.tip.y + - (2 * size) - 20, 
					"left", 
					4, 
					size,
					2 );	
	
	Wabe.printLn( 	wabe_active.tip.x + (wabe_active.size.width * 0.5) - (size * 0.5) + size + 8,
					wabe_active.tip.y - size - bumper + 5, 
					"left", 
					5, 
					size,
					3
				);	
	
	Wabe.printLn( 	wabe_active.tip.x + (wabe_active.size.width * 0.5) - size - ( bumper * 0.1) - 1 - size - 8, 
					wabe_active.tip.y - 30 , 
					"left", 
					3, 
					size,
					4 
				);	

	
	/**
	*	Waben die neben dem Logo sitzen
	*/
	var left = new Wabe(  $("#logo").position().left - 90,	$("#logo").position().top + 18, 80, "adsd", 23  );
		left.appendTo("#navisite");
	
	var bottomleft = new Wabe ( $("#logo").position().left - 38,	$("#logo").position().top + 95, 65, "adsd", 24 ); 
		bottomleft.appendTo("#navisite");
	
	$( window ).on("resize",function () {
		$(left).css({
			"left": 	$("#logo").position().left - 90,
			"top":		$("#logo").position().top + 18
		});
		$(bottomleft).css({
			"left":	 	$("#logo").position().left - 38,
			"top":		$("#logo").position().top + 95,
		});
	});
	
	/**
	*	Anpassen der Waben IDs für bessere Bedienbarkeit
	*	Und setzen der Klasse .menu-wabe für die relevanten Waben
	*/
	$("#menu-wabe-active")
		.attr("id","menu_wabe0")
		.addClass("menu-wabe")

	$("#wabe_4_0")
		.attr("id","menu_wabe1")
		.addClass("menu-wabe")
		.css({
			"opacity":1
		});
	$("#wabe_3_3")
		.attr("id","menu_wabe2")
		.addClass("menu-wabe")
		.css({
			"opacity":1
		});		
	$("#wabe_2_2")
		.attr("id","menu_wabe3")
		.addClass("menu-wabe")
		.css({
			"opacity":1
		});	
	$("#wabe_2_1")
		.attr("id","menu_wabe4")
		.addClass("menu-wabe")
		.css({
			"opacity":1
		});	
	$("#wabe_3_1")
		.attr("id","menu_wabe5")
		.addClass("menu-wabe")
		.css({
			"opacity":1
		});

	/**
	*	Eventlistener auf den Waben zum ändern des Menüpunktes
	*/
	$(".menu-wabe").click( function (evt) {
		// Resetten des Untermenü Punkts
		window.sessionStorage.removeItem("currentListItem");
		// Ändern des Hauptmenü Punkts
		self.setItem( evt, self );	
	});
	
	this.updateMenu();
}		


/**
*	Setzt die korrekten Hauptmenü-Icons ein
*/
Main_Menu.prototype.updateMenu = function ( new_menu_item ) {
	var hit_wabe = new_menu_item ? new_menu_item.posID : window.sessionStorage.getItem("currentMenuItem");
	var hit_img = new_menu_item ? new_menu_item.img.src : this.icon_directory[window.sessionStorage.getItem("currentMenuItem")].src ;
	
	
	hit_img_src = hit_img.slice(hit_img.lastIndexOf("/") +1, hit_img.length);
		
	Main_Menu.shuffle( hit_img_src, this.icon_directory );
	
	for(key in this.icon_directory){
		$("#menu_wabe"+key)
			.attr("src",this.icon_directory[key].src)
			.attr("class","")
			.addClass("menu-wabe")
			.addClass("wabe"+this.icon_directory[key].id)
	}
	
	this.updateBreadcrumbs();
	this.updateTitle(hit_wabe);
	this.constructNavi(hit_wabe);
	this.updateLogo();
}

/**
*	Ändert die Kapitelüberschrift & die Überschrift der Navigation
*/
Main_Menu.prototype.updateTitle = function ( target ) {
	$(".chaptertitle h1, .navititle").html(directory[target].title);
}

/**
*	Setzt das korrekte Logo ein
*/ 
Main_Menu.prototype.updateLogo = function () {
	if(window.sessionStorage.getItem("accesspoint") != "false") $("#logo img").attr("src",Logolist.path + Logolist[window.sessionStorage.getItem("accesspoint")].content);
}

/**
*	Konstruiert die Navigation auf Basis der directory.json
*/
Main_Menu.prototype.constructNavi = function ( target ) {
	$(".navichapter").html("");
	var self = this;
	
	for(key in directory[target].subNav) {
		$(".navichapter").append("<li class='list-item' value='"+key+"'><a href=''>"+directory[target].subNav[key].title+"</a></li>");
		
		$(".list-item").click(function ( evt ) {
			evt.stopImmediatePropagation();
			evt.stopPropagation();
			evt.preventDefault();
			
			var index = $(".list-item").index( this );
			
			$(".list-item").removeClass("active");
			$(this).addClass("active");
			
			window.sessionStorage.setItem("currentListItem", index);
			
			$(".list-item span").attr("style","");
			$(".list-item.active span").css({
				"height":"2px",
				"background-color": "rgba("+directory[window.sessionStorage.getItem("currentMenuItem")].color+",1)",
				"width":"16.7em",
				"display":"block",
				"position":"absolute",
				"left":"0"
			});			
			
			self.updateBreadcrumbs();
			Content.loadContent( index );
		});
	}
	$(".list-item").append("<span></span>");

	$(".list-item:eq("+window.sessionStorage.getItem("currentListItem")+")").addClass("active");

	$(".list-item.active span").css({
		"height":"2px",
		"background-color": "rgba("+directory[window.sessionStorage.getItem("currentMenuItem")].color+",1)",
		"width":"16.7em",
		"display":"block",
		"position":"absolute",
		"left":"0"
	});
	Content.loadContent();		
}

/**
*	Rekursive Funktion um die Reihenfolge der Icons zu bestimmen
*/
Main_Menu.shuffle = function shuffleUp ( target, imgArray, internal_link ) {
	var _item;
	var internal_link = internal_link || false;

	if(imgArray[0].src == "icons_wabe/"+target){
		return imgArray; 
	} else {
		_item = imgArray.shift();
		imgArray.push(_item);
		shuffleUp( target, imgArray );
	}

}

Main_Menu.fixNaviTooltip = function (){
	var array_mit_waben = document.getElementsByClassName("menu-wabe");
	var savepoint;
	for(key in array_mit_waben) {
		try { 
			savepoint = parseInt( $(array_mit_waben[key]).attr("class").split(" ")[1].substr(4,5) );
			$(array_mit_waben[key]).attr("title", directory[savepoint].title );		
		} catch (err) {
		
		}
	}
}	

/**
*	Ändert das aktuelle Hauptmenü-Item
*/
Main_Menu.prototype.setItem = function ( evt, ctx ) {
	var posID = $(evt.currentTarget).attr("class").slice( $(evt.currentTarget).attr("class").length -1, $(evt.currentTarget).attr("class").length);
		
	var _item = function (evt) {
		var obj = {
			"posID": 	posID,
			"img":		evt.currentTarget
		}
		return obj;
	}(evt)
	
	window.sessionStorage.setItem("currentMenuItem", _item.posID);
	ctx.updateMenu( _item ); 
}

Main_Menu.prototype.updateBreadcrumbs = function () {
	
	this.level_1 = "";
	this.level_2 = "";
	
	if(window.sessionStorage.getItem("currentListItem")) {
		try{
			this.level_2 =  directory[ window.sessionStorage.getItem("currentMenuItem") ].subNav[window.sessionStorage.getItem("currentListItem")].title || false;
		} catch (err) {
//			console.log(err);
		}
	}
	
	
	this.breadcrumbs = this.level_1 + this.level_2;
	
	$(".breadcrumb").html(this.breadcrumbs);
}

Main_Menu.addToHistory = function () {
	var obj = {
		"main":window.sessionStorage.getItem("currentListItem"),
		"subnav":window.sessionStorage.getItem("currentMenuItem")
	}
	this.history.push(obj);
}

Main_Menu.goBack = function () {
	// Removing the current one
	history.pop();
	
	// Getting the actually last relevant one
	var _item = history.pop();
	window.sessionStorage.setItem("currentListItem",_item.subnav);
	window.sessionStorage.setItem("currentMenuItem",_item.main);
}

Main_Menu.history = new Array();
