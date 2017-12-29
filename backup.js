// Pick 2 tiles and then compare them
function selectedCards() {
  const selected = $('.back');
  const howMany = selected.length;
  if (howMany === 2) {

    if (selected.first().data('id') === selected.last().data('id')) {
      selected.addClass('complete')
    }
  } else {
    console.log("not match");
    $('.back').rotate3Di('unflip', 1000, {
      sideChange
    });
  }
}

// function sideChange(front) {
//   if (front) {
//     $(this).find('div.front.item').show();
//     $(this).find('div.item.back').hide();
//
//   } else {
//     $(this).find('div.front.item').hide();
//     $(this).find('div.item.back').show();
//   }
// }

// div1.data('id', i)
//
// const id = $('.back').data('id')
//
// <div data-id="1">
// <div data-id="1">
// <div data-id="2">
// <div data-id="2">
