/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict


function copyclip(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Скопированно: " + str);
}

$(document).ready(function(){
    function alignModal(){
        var modalDialog = $(this).find(".modal-dialog");
        /* Applying the top margin on modal dialog to align it vertically center */
        modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
    }
    // Align modal when it is displayed
    $(".modal").on("shown.bs.modal", alignModal);
    
    // Align modal when user resize the window
    $(window).on("resize", function(){
        $(".modal:visible").each(alignModal);
    });   
});

function mobile(mmq) {
    if(mmq.matches) {   // big screen
        $("#about").children(".container").children(".row").removeClass("text-lg-left");
        $("#about").children(".container").children(".row").addClass("text-center");
        $("#about").children(".container").children(".row").children(".col-md-4").children(".container").removeClass("w-50");

        // $("#about").children(".container").children(".row").children(".col-md-4").children(".fa-stack").removeClass("fa-2x");
        // $("#about").children(".container").children(".row").children(".col-md-4").children(".fa-stack").addClass("fa-4x");

        $("#about").children(".container").children(".row").children(".col-md-4").removeClass("d-flex");
        $("#about").children(".container").children(".row").children(".col-md-4").removeClass("flex-row");
    } else {            // small screen
        $("#about").children(".container").children(".row").addClass("text-lg-left");
        $("#about").children(".container").children(".row").removeClass("text-center");
        $("#about").children(".container").children(".row").children(".col-md-4").children(".container").addClass("w-50");

        // $("#about").children(".container").children(".row").children(".col-md-4").children(".fa-stack").addClass("fa-2x");
        // $("#about").children(".container").children(".row").children(".col-md-4").children(".fa-stack").removeClass("fa-4x");

        $("#about").children(".container").children(".row").children(".col-md-4").addClass("d-flex");
        $("#about").children(".container").children(".row").children(".col-md-4").addClass("flex-row");
    }
}

var mobileMediaQuery = window.matchMedia("(min-width: 576px)");
mobile(mobileMediaQuery);
// TODO: fix
mobileMediaQuery.addListener(mobile)
