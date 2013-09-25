document.addEventListener('DOMComponentsLoaded', function(){

    var pickImage = document.getElementById("pick-image");
    var gaussianBlur = document.getElementById("gaussianBlur");
    var horizontalBlur = document.getElementById("horizontalBlur");
    var img = document.querySelector("#image-presenter");

    pickImage.addEventListener("click", function(e){
        var pick = new MozActivity({
            name: "pick",
            data: {
                type: ["image/png", "image/jpg", "image/jpeg"]
            }
        });

        pick.onsuccess = function () {            
            img.src = window.URL.createObjectURL(this.result.blob);            
        };

        pick.onerror = function () {
            alert("Can't view the image!");
        };
    });

    gaussianBlur.addEventListener("click", function(e){
    	var draw = SVG('canvas').size('100%', '100%')
        var image = draw.image(img.src).size(300, 300)
        image.filter(function(add) {
            add.gaussianBlur('30')
        })
    });

    horizontalBlur.addEventListener("click", function(e){        
        var draw = SVG('canvas').size('100%', '100%')
        var image = draw.image(img.src).size(300, 300)
        image.filter(function(add) {
            add.gaussianBlur('30 0')
        })
    });

});