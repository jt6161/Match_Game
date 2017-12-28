  // Pick 2 tiles and then compare them
    function selectedCards() {
      let numSel = 2
      let selCards = document.getElementsByClassName('back')
      console.log(selCards);
      if (selCards[0].style.background === selCards[1].style.background) {
        console.log("match");
        $('.back').hide()
      } else {
        console.log("not match");
        $('.back').rotate3Di('toggle', 1000);
      }
    }
