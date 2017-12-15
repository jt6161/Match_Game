$(document).ready(function() {

  let cards = []

  let btns = $('#Start')
  btns.click(function(e) {
    $.get("http://thecatapi.com/api/images/get?format=xml&results_per_page=20", function(data) {
      let json = xmlToJson(data)
      let images = json.response.data.images.image
      let errorCounter = 0
      for (let i = 0; i < 8; i++) {
        let div1 = $("<div>");
        div1.addClass('front');
        div1.addClass('item');
        div1.click(function() {
          div1.rotate3Di('toggle', 1000);
          window.setTimeout(function() {
            div1.toggleClass("front")
            div1.toggleClass("back")
            if (div1.hasClass("back")) {
              div1.css("background", "url(" + images[i].url['#text'] + ") center center no-repeat")
              div1.css("background-size", "cover")
            }
          }, 150)
        });

        let div2 = $("<div>");
        div2.addClass('front');
        div2.addClass('item');
        div2.click(function() {
          div2.rotate3Di('toggle', 1000);
          window.setTimeout(function() {
            div2.toggleClass("front")
            div2.toggleClass("back")
            if (div2.hasClass("back")) {
              div2.css("background", "url(" + images[i].url['#text'] + ") center center no-repeat")
              div2.css("background-size", "cover")
            }
          }, 150)
        });
        cards.push(div1, div2);

      }
      //Randomize cards image array using function randomSort
      $('.game').append(cards.sort(randomSort))

    })
  })





  // let selCards = div.item.back
  // function selectedCards() {
  //
  // if (selCards img attr src === img attr src)
  // } remove selCards
  //



  //Function to randomize array
  function randomSort(a, b) {
    // Get a random number between 0 and 10
    var temp = parseInt(Math.random() * 10);
    // Get 1 or 0, whether temp is odd or even
    var isOddOrEven = temp % 2;
    // Get +1 or -1, whether temp greater or smaller than 5
    var isPosOrNeg = temp > 5 ? 1 : -1;
    // Return -1, 0, or +1
    return (isOddOrEven * isPosOrNeg);
  }

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
