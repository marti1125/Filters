(function () {

    var pickImage = document.querySelector("#pick-image");
    var effectImage = document.querySelector("#effectSelected");
    var img = document.querySelector("#image-presenter");

    pickImage.onclick = function () {
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
    }

    effectImage.onclick = function () {
    	var draw = SVG('canvas').size('100%', '100%')    	
    }

})();