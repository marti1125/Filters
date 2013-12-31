document.addEventListener('DOMComponentsLoaded', function(){

  var pickImage = document.getElementById("pick-image");
  var gaussianBlur = document.getElementById("gaussianBlur");
  var horizontalBlur = document.getElementById("horizontalBlur");
  var invertColor = document.getElementById("invertColor");
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

  invertColor.addEventListener("click", function(e){
      img.setAttribute("class", "i");
  });

});