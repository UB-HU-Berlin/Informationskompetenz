function StartpageConfig() {
	this.width = StartpageConfig.tileSize;
	this.height = StartpageConfig.tileSize;
}

StartpageConfig.tileSize = screen.width / 10;
StartpageConfig.getScale = function () { return StartpageConfig.tileSize * .88 };
StartpageConfig.getBumper = function () { return - screen.width / 140 };
StartpageConfig.waben = new Array();

StartpageConfig.prototype.printIt = function ( X,Y, functional,_class ) {
		
	var elem =  document.getElementById("wabe");
	var img = new Image();
	img.src = elem.src;
	
	var _class = _class || false;
	
	var img_string ='<div class="wabe '+$(".wabe").length+'"><div></div><object data="wabe.svg" width="'+this.width+'" height="'+this.height+'"/></object>';
	
	var functional = functional || false;
	
	$( "#content" ).append(img_string);
	
	if(_class){
		$( ".wabe:last" ).addClass(_class);
	}
		
	$( ".wabe:last" )	
		.css({
			"top": Y,
			"left": X,
			"position": "fixed",
			"opacity": functional ? 1 : Math.random()
		})
		.addClass("wabe");
}

StartpageConfig.prototype.printLn = function ( startX, startY, off ) {
	var items = Math.floor(window.innerWidth / this.width) + 2;
	var off = off || false;
	var mid =  window.innerWidth / 2 ; 

	if(!off){
		// print towards right
		for( var i = 0; i < items / 2; i++ ) {
			if(i==0){
				this.printIt( (  mid + StartpageConfig.getBumper() / 2  ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY, true, "right" ); 
			} else {
				this.printIt( ( mid + StartpageConfig.getBumper() *1.5 ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY ); 	
			}
		}
		// print towards left
		for( var i = 0; i > -items / 2; i-- ) {
			if(i==0){
				this.printIt( ( mid - this.width - StartpageConfig.getBumper() / 1.6 ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY, true, "left" ); 
			} else {
				this.printIt( ( mid - this.width + StartpageConfig.getBumper() *.1 ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY ); 
			}
		}
	} else {
		// center one 
		this.printIt( ( mid ) - (this.width * .5), startY, true, "center");
		// print towards right
		for( var i = 0; i < items / 2; i++ ) {
			if(i == 0) {
				this.printIt(  StartpageConfig.getBumper() / .9 + ( window.innerWidth * .5 + (this.width * .5)  ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY, true, "right" ); 
			} else {
				this.printIt( 2*StartpageConfig.getBumper()  + ( window.innerWidth * .5 + (this.width * .5)  ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY ); 
			}
		}
		
		// print towards left
		for( var i = 0; i > -items / 2; i-- ) {
			if(i == 0) {
				this.printIt( - 2 * this.width - StartpageConfig.getBumper() / .8 + ( (window.innerWidth * .5) + (this.width * .5)  ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY, true, "left" ); 			
			} else {
				this.printIt( - 2 * this.width * .985  + ( (window.innerWidth * .5) + (this.width * .5)  ) + ( this.width * i ) + (  StartpageConfig.getBumper() * i ), startY ); 			
			}
		}
	
	}

}
