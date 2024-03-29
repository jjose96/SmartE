setTimeout(function(){
  $(document).ready(function(){
    $(".sidebar-dropdown > a").click(function() {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

    $("#close-sidebar").click(function() {
      $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
      $(".page-wrapper").addClass("toggled");
    });
  (function($) {


    var fullHeight = function() {

      $('.js-fullheight').css('height', $(window).height());
      $(window).resize(function(){
        $('.js-fullheight').css('height', $(window).height());
      });

    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

  })(jQuery);


});
$(function(){
  var closeSelectTimeout;

  function hideMaterialList(parent){
      parent.css({
          'overflow': 'hidden'
      }).removeClass('isOpen');
      clearTimeout(closeSelectTimeout);
      closeSelectTimeout = setTimeout(function(){
          parent.parent().css({
              'z-index': 0
          });
      }, 200);
  }
  $(document.body).on('mousedown', '.materialBtn, .select li', function(event){
      if(parseFloat($(this).css('opacity')) > 0 && $(document).width() >= 1008){
          var maxWidthHeight = Math.max($(this).width(), $(this).height());
          if($(this).find("b.drop").length == 0 || $(this).find("b.drop").css('opacity') != 1) {
              // .drop opacity is 1 when it's hidden...css animations
              drop = $('<b class="drop" style="width:'+ maxWidthHeight +'px;height:'+ maxWidthHeight +'px;"></b>').prependTo(this);
          }
          else{
              $(this).find("b.drop").each(function(){
                  if($(this).css('opacity') == 1){
                      drop = $(this).removeClass("animate");
                      return;
                  }
              })
          }
          x = event.pageX - drop.width()/2 - $(this).offset().left;
          y = event.pageY - drop.height()/2 - $(this).offset().top;
          drop.css({
              top: y,
              left: x
          }).addClass("animate");
      }
  });
  $(document.body).on('dragstart', '.materialBtn, .select li', function(e){
      e.preventDefault();
  })

  var selectTimeout;
  $(document.body).on('click', '.select li', function() {
      var parent = $(this).parent();
      parent.children('li').removeAttr('data-selected');
      $(this).attr('data-selected', 'true');
      clearTimeout(selectTimeout);
      if(parent.hasClass('isOpen')){
          if(parent.parent().hasClass('required')){
              if(parent.children('[data-selected]').attr('data-value')){
                  parent.parents('.materialSelect').removeClass('error empty');
              }
              else{
                  parent.parents('.materialSelect').addClass('error empty');
              }
          }
          hideMaterialList($('.select'));
      }
      else{
          var pos = Math.max(($('li[data-selected]', parent).index() - 2) * 48, 0);
          parent.addClass('isOpen');
          parent.parent().css('z-index', '999');
          if($(document).width() >= 1008){
              var i = 1;
              selectTimeout = setInterval(function(){
                  i++;
                  parent.scrollTo(pos, 50);
                  if(i == 2){
                      parent.css('overflow', 'auto');
                  }
                  if(i >= 4){
                      clearTimeout(selectTimeout);
                  }
              }, 100);
          }
          else{
              parent.css('overflow', 'auto').scrollTo(pos, 0);
          }
      }
  });

  $('.materialInput input').on('change input verify', function(){
      if($(this).attr('required') == 'true'){
          if($(this).val().trim().length){
              $(this).parent().removeClass('error empty');
          }
          else{
              $(this).parent().addClass('error empty');
              $(this).val('');
          }
      }
      else{
          if($(this).val().trim().length){
              $(this).parent().removeClass('empty');
          }
          else{
              $(this).parent().addClass('empty');
          }
      }
  });

  $(document.body).on('click', function(e) {
      var clicked;
      if($(e.target).hasClass('materialSelect')){
          clicked = $(e.target).find('.select').first();
      }
      else if($(e.target).hasClass('select')){
          clicked = $(e.target);
      }
      else if($(e.target).parent().hasClass('select')){
          clicked = $(e.target).parent();
      }

      if($(e.target).hasClass('materialSelect') || $(e.target).hasClass('select') || $(e.target).parent().hasClass('select')){
          hideMaterialList($('.select').not(clicked));
      }
      else{
          if($('.select').hasClass('isOpen')){
              hideMaterialList($('.select'));
          }
      }
  });
  hideMaterialList($('.select'));
})
}, 4000);
