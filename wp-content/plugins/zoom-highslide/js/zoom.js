jQuery(window).load(function () {  
		jQuery("div.entry img").each(function () {  
    		DrawImage(this, 668, 1000);  
    	});  
   	});  
jQuery(window).load(function () {  
		jQuery("div.categories-list img").each(function () {  
    		DrawImage(this, this.width, this.height);  
    	});  
   	}); 
function DrawImage(ImgD, FitWidth, FitHeight) {  
    var image = new Image();  
    image.src = ImgD.src;  
    if (image.width > 0 && image.height > 0) {  
        if (image.width / image.height >= FitWidth / FitHeight) {  
            if (image.width > FitWidth) {  
                ImgD.width = FitWidth;  
                ImgD.height = (image.height * FitWidth) / image.width;  
            } else {  
                ImgD.width = image.width;  
                ImgD.height = image.height;  
            }  
        } else {  
            if (image.height > FitHeight) {  
                ImgD.height = FitHeight;  
                ImgD.width = (image.width * FitHeight) / image.height;  
            } else {  
                ImgD.width = image.width;  
                ImgD.height = image.height;  
            }  
        }  
    }  
}  
