$(document).ready(function () {
    var controller = new ScrollMagic.Controller();

    function isMobile() {
        if ($('.is-mobile').css('display') === 'block') {
            return true;
        } else {
            return false;
        }
    }

    controller.scrollTo(function (target) {
        TweenMax.to(window, 0.7, {
            scrollTo: {
                y: target,
                autoKill: true
            },
            ease: Power2.easeOut
        });
    });

    //fullpage and body scroll

    $('#fullpage').fullpage({
        licenseKey: 'B80EC24D-66D9477B-B16E7559-B4301A50',
        scrollingSpeed: 900,
        scrollHorizontally: false,
        scrollOverflow: false, //
        autoScrolling: true,
        fitToSection: true,
        fixedElements: '.header',
        css3: true,
        scrollBar: true,
        verticalCentered: false,
        lockAnchors: true
    });

    function handleFullPage() {
        if (isMobile()) {
            $.fn.fullpage.setResponsive(true);
        } else {
            $.fn.fullpage.setResponsive(false);
        }
    }

    function bodyScroll(){
        if($('body').hasClass('is-loading')){
            $.fn.fullpage.setAllowScrolling(false)
        }
    }

    //reseting header

    function headerReset() {
        $('.page-menu').removeClass('is-active');
        $('.hamburger').removeClass('is-active');
        $('body, html').removeClass('no-scroll-initial');
    }

    $('.header__menu-link').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('body, html').toggleClass('no-scroll-initial');
        $('.page-menu').toggleClass('is-active');
        $('.hamburger').toggleClass('is-active');

    });

    $('.page-menu__list-link').on('click', function () {
        headerReset();
    });

    $(document).on('click', function (e) {
        if (!e) e = window.event;
        if ($('.page-menu').hasClass('is-active')) {
            if (!$(e.target).closest('.page-menu.is-active').length) {
                headerReset();
            }
        }
    });

    $('.page-nav__list-link').on('click', headerReset);

    $('.header-stock__slider').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        arrows: false,
        autoplaySpeed: 0,
        speed: 3500,
        pauseOnHover: false,
        pauseOnFocus: false,
        cssEase: 'linear',
        swipe: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: false
    });

    function printTime() {
        /* timezone info: https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json */

        var now = moment().format("hh:mm"); // Your Current Time.

        var target = $('.header-stock__item-time');

        target.each(function (i, el) {
            var $this = $(this),
                tz = $(this).attr('data-timezone');

            $this.text(moment().tz(tz).format('HH:mm'));
        });
    }

    setInterval(printTime, 1000);

    //modal

    $('.modal__open-link').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            href = $this.attr('href');

        $('body').find('.modal__wrap' + href).addClass('is-active');
        $('body, html').addClass('no-scroll-initial');
        $.fn.fullpage.setAutoScrolling(false);
    });

    $('.modal__close-btn').on('click', function (e) {
        $('body, html').removeClass('no-scroll-initial');
        $('.modal__wrap').removeClass('is-active');
        $.fn.fullpage.setAutoScrolling(true);
    });

    //modal success msg

    $('.modal-interest').on('submit', function (e) {
        e.preventDefault();

        setTimeout(function () {
            $('.modal-success').addClass('is-active');
        },600);
        $(this).removeClass('is-active');
        $('.form-interest input').val('');
    });

    //scroll btn

    $('.page-scroll__btn').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            href = $this.attr('href');

        controller.scrollTo(href);
    });

    //mail form subscribe
    $('.page-mail__form').on('submit', function (e) {
        e.preventDefault();

        $('body, html').addClass('no-scroll-initial');
        $('.modal-success').addClass('is-active');
        $('.page-mail__form').get(0).reset();
    });

    //contact page

    $('.membership-form').on('submit', function (e) {
        e.preventDefault();

        $('body, html').addClass('no-scroll-initial');
        $('.modal-success').addClass('is-active');
        $('.membership-form').get(0).reset().blur();
    });


    printTime();
    handleFullPage();
    // bodyScroll();

    $(window).resize(function () {
        headerReset();
        handleFullPage();
    });

    $(window).on('scroll', function (e) {

    });

    $(window).on('orientationchange', function () {
        headerReset();
    });

});
