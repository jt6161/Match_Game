$(document).ready(function() {


  // Pick 2 tiles and then compare them
  let numSel = 2
  let selCards = document.getElementsByClassName('item back')

  $('.game').click(function() {
    function selectedCards() {
      selCards
      if (["0"].style.background === [1].style.background) {
        $('.item back').hide()
      } else {
        $('.item back').rotate3Di('toggle', 1000);
      }
    }

    console.log(selCards);

  })

})
