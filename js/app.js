function randomUUID() {
  var s = [], itoh = '0123456789ABCDEF';
  for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
  s[14] = 4;
  s[19] = (s[19] & 0x3) | 0x8;
  for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
  s[8] = s[13] = s[18] = s[23] = '_';
  return s.join('');
}

document.addEventListener('DOMComponentsLoaded', function(){

  var pickImage = document.getElementById("pick-image");
  var filters = document.getElementById("filters");
  var matrixInvert = document.getElementById("matrixInvert");
  var save = document.getElementById("save");
  var img = document.querySelector("#image-presenter");
  var flipBox = document.getElementById("flipBox");

  var notificationOnSuccess = navigator.mozNotification.createNotification(
                "Success",
                "The image has saved successfully"
            );

  var notificationOnError = navigator.mozNotification.createNotification(
          "Error",
          "Can not save the image"
      );

  filters.addEventListener("click", function(e){
    if(img.getAttribute("src") != "img/nophoto.svg"){
      flipBox.toggle();
    }
  });

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
      };
  });

  save.addEventListener("click", function(e){
    if(img.getAttribute("src") != "img/nophoto.svg"){
      var randomImage = randomUUID();
      var canvas = document.getElementById("imageToSave");
      var width = canvas.width;
      var height = canvas.height;
      var context = canvas.getContext("2d");
      var imgToAdd = document.getElementById("image-presenter");
      context.drawImage(imgToAdd,0,0,width,height);
      canvas.toBlob(function (blob) {
        var pic = navigator.getDeviceStorage("pictures");
              
        saveAndSend(blob);

        function saveAndSend(blob) {
          var storage = navigator.getDeviceStorage("pictures");
          var request = storage.add(blob, "image-"+randomImage+".png");

          request.onsuccess = function () {
            notificationOnSuccess.show();
          }
              
          request.onerror = function () {
            notificationOnError.show();
          }
        }
    
      });
    }
  });

  // Filters
  matrixInvert.addEventListener("click", function(e){
    
    Caman('#image-presenter', function () {
      this.brightness(10);
      this.contrast(30);
      this.sepia(60);
      this.saturation(-30);
      this.render();      
      flipBox.toggle(); 
    });
    
  });

});