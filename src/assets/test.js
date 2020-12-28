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
}, 4000);
$(document).ready(function(){
new Chart(document.getElementById("chart1"),{"type":"line","data":{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"Usage Analysis","data":[1065,1059,1080,1081,1056,1055,1040],"fill":false,"borderColor":"rgb(99, 203, 137)","lineTension":0.1}]},"options":{}});
});
