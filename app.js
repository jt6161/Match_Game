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
        div1.click(addCardClick1);

        let div2 = $("<div>");
        div2.addClass('front');
        div2.addClass('item');
        div2.click(addCardClick2);
        cards.push(div1, div2);

        function manageCardClass1() {
          div1.toggleClass("front")
          div1.toggleClass("back")
          if (div1.hasClass("back")) {
            div1.css("background", "url(" + images[i].url['#text'] + ") center center no-repeat")
            div1.css("background-size", "cover")
          }
        }

        function addCardClick1() {
          div1.rotate3Di('toggle', 1000);
          window.setTimeout(manageCardClass1, 150)
          window.setTimeout(selectedCards, 1100)
        }

        function manageCardClass2() {
          div2.toggleClass("front")
          div2.toggleClass("back")
          if (div2.hasClass("back")) {
            div2.css("background", "url(" + images[i].url['#text'] + ") center center no-repeat")
            div2.css("background-size", "cover")
          }
        }

        function addCardClick2() {
          div2.rotate3Di('toggle', 1000);
          window.setTimeout(manageCardClass2, 150)
          window.setTimeout(selectedCards, 1100)
        }
      }
      //Randomize cards image array using function randomSort
      $('.game').append(cards.sort(randomSort))

    })
  })
  //Function to randomize array
  function randomSort(a, b) {
    // Get a random number between 0 and 10
    let temp = parseInt(Math.random() * 10);
    // Get 1 or 0, whether temp is odd or even
    let isOddOrEven = temp % 2;
    // Get +1 or -1, whether temp greater or smaller than 5
    let isPosOrNeg = temp > 5 ? 1 : -1;
    // Return -1, 0, or +1
    return (isOddOrEven * isPosOrNeg);
  }

  function xmlToJson(xml) {
    // Create the return object
    let obj = {};
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          let attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        let item = xml.childNodes.item(i);
        let nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            let old = obj[nodeName];
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
