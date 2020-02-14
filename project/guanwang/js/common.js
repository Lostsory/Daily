window.addEventListener('touchmove', () => {
  
}, { passive: false })

const designedWidth = 750
const actualWidth = Math.min(450, document.body.clientWidth)
document.documentElement.style.fontSize = actualWidth * 100 / designedWidth + 'px'
const windowWidth = $(window).width()
$('.nav-con a').on({
  'click': function() {
    if ($(window).width() > 768) {
      $('.nav-btn').removeClass('active').addClass('hover')
    } else {
      $('.nav-btn-m').removeClass('active')
    }
    $('.nav-con').toggleClass('active')
    $('.nav-con ul').toggleClass('fadeIn')
  }
})
$('.nav-btn').on('click', (ev) => {
  $('.nav-btn').toggleClass('active').toggleClass('hover')
  $('.nav-con').toggleClass('active')
  $('.nav-con ul').toggleClass('fadeIn')
})
$('.nav-btn-m').on('click', function() {
  $(this).toggleClass('active')
  $('.nav-con').toggleClass('active')
  $('.nav-con ul').toggleClass('fadeIn')
})
$('.logo').click(function() {
  window.location.href = '/'
})

$('.back-btn').on('click', function() {
  window.history.go(-1)
})