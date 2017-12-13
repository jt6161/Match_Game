$(document).ready(function() {

  let btns = $('#Start')
  btns.click(function(e) {
    $.get("http://thecatapi.com/api/images/get?format=xml&results_per_page=20", function(data) {
      let json = xmlToJson(data)
      let images = json.response.data.images.image
      let cards = []
      for (let i = 1; i <= 8; i++) {
        let img = $('<img>')
        img.attr('src', images[i].url["#text"])
        img.on('error', function() {
          $(this).remove()
        })
        let img2 = $('<img>')
        img2.attr('src', images[i].url["#text"])
        img2.on('error', function() {
          $(this).remove()
        })
        cards.push(img, img2)
      }

      let tiles = new Array(),
      	flips = new Array('tb', 'bt', 'lr', 'rl' ),
      	iFlippedTile = null,
      	iTileBeingFlippedId = null,
      	tileImages = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16),
      	tileAllocation = null,
        iTimer = 0,
        iInterval = 100,
        iPeekTimme = 1000;

      function getRandomImageForTile() {

      	let iRandomImage = Math.floor((Math.random() * tileAllocation.length)),
      		iMaxImageUse = 2;

      	while(tileAllocation[iRandomImage] >= iMaxImageUse ) {

      		iRandomImage = iRandomImage + 1;

      		if(iRandomImage >= tileAllocation.length) {

      			iRandomImage = 0;
      		}
      	}
      	return iRandomImage;
        console.log(iRandomImage)
      }













// function randomNum(cards) {
//   return Math.floor(Math.random() * cards)
// }

// document.getElementById("results_per_page").innerHTML =
// Math.floor(Math.random() * 15);


        // randomcards.push(cards)
        // console.log(randomcards);
        $('.results').append(cards)


    })
  })





  function xmlToJson(xml) {
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };

})
