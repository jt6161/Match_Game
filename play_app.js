  // Pick 2 tiles and then compare them
  function selectedCards() {
    let numSel = 2
    let selCards = document.querySelectorAll('.back')
    console.log("selCards", selCards);
    if (selCards.length === 2) {
      if (selCards[0].style.background === selCards[1].style.background) {
        $('.back').off(addCardClick1)
        $('.back').off(addCardClick2)
        $('.back').removeClass('front')
        $('.back').removeClass('back')

      } else {

        function myComplete() {
          //score
        }

        function mySideChange() {
          $('.back').css('background-image', 'url(./images/tile_teal_cat.png)')
        }
        $(".back").rotate3Di(
          '180',
          1000, {
            sideChange: mySideChange,
            complete: myComplete

          }
        );

        window.setTimeout(function() {
          $('.back').addClass('front')
          $('.back').removeClass('back')
        }, 1001)


      }
    }
  }
