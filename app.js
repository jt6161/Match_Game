$(document).ready(function() {

  let btns = $('#Start')
  btns.click(function(e) {
    $.get("http://thecatapi.com/api/images/get?format=xml&results_per_page=20", function(data) {
      let json = xmlToJson(data)
      let images = json.response.data.images.image
      let cards = []
      let errorCounter = 0
      for (let i = 0; i < 8; i++) {
        let img = $('<img>')
        img.addClass('back')
        img.attr('src', images[i].url["#text"])
        img.on('error', function() {
          errorCounter++
          let num = errorCounter % 2 === 0 ? errorCounter - 1 : errorCounter
          $(this).attr('src', './images/err' + num + '.jpeg')
        })
img.click(function () {$(this).rotate3Di('toggle', 1000);});


        let img2 = $('<img>')
        img2.addClass('back')
        img2.attr('src', images[i].url["#text"])
        img2.on('error', function() {
          errorCounter++
          let num = errorCounter % 2 === 0 ? errorCounter - 1 : errorCounter
          $(this).attr('src', './images/err' + num + '.jpeg')
        })
img2.click(function () {$(this).rotate3Di('toggle', 1000);});


        cards.push(img, img2)
      }
      //Randomize cards image array using function randomSort
      $('#results_per_page').append(cards.sort(randomSort))
      console.log(cards);
    })
  })


// Need to create divs and add front class for flip
  // let blocks = "";
  // let num_of_blocks = 16;
  // for (let i = 1; i <=num_of_blocks.length; i++) {
  //  blocks +='<li id="'+i+'"><div class="front"><a href="#"></a></div><div class="back" style="display:none;"><a href="#"></a></div></li>\n';
  // }
  // $('#results_per_page').html(blocks);
  // console.log(blocks);


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
