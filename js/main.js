$(document).ready(function () {

    function isMobile() {
        if ($('.is-mobile').css('display') === 'block') {
            return true;
        } else {
            return false;
        }
    }

    $('.header__menu-link').on('click', function (e) {
        e.preventDefault();
        $('body, html').toggleClass('no-scroll-initial');
        $('.page-menu').toggleClass('is-active');
    });

    //reseting header classes on resize

    function headerReset() {
        $('.page-menu').removeClass('is-active');
        $('body, html').removeClass('no-scroll-initial');
    }

    // menu image replacement

    $('.page-nav__list-link').on('click', headerReset);



    $(window).resize(function () {
        headerReset();
    });

    $(window).on('scroll', function (e) {

    });

    $(window).on('orientationchange', function () {
        headerReset();
    });

});
