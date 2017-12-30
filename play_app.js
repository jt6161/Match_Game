  // Pick 2 tiles and then compare them
  function selectCard() {
    const selected = $('.back');
    const howMany = selected.length;

    if (howMany === 2) {
      if (selected[0].style.background === selected[1].style.background) {

        $(".back").stop().rotate3Di(
          '0',
          800, {
            complete: myComplete
          }
        );
        $('.back').addClass('complete')
        $('.back').removeClass('front')
        $('.back').removeClass('back')
        $(".audioDemo").trigger('play');
      } else {

        function myComplete() {
          //score
        }
        function mySideChange() {
          $('.back').css('background-image', 'url(./images/tile_teal_cat.png)')
          // //starts playing
          $(".audioDemo2").trigger('play');
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
    // Game complete
    console.log($('.complete'))

    function gameFin() {
      let allpaired = $('.complete');
      let total = allpaired.length
      if(total === 16) {
        $(".audioDemo3").trigger('play');
      }
    }


  }
