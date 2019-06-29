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

    $(document).on('click', function (e) {
        if (!e) e = window.event;
        if ($('.page-menu').hasClass('is-active')) {
            if (!$(e.target).closest('.page-menu.is-active').length) {
              headerReset();
            }
        }
    });

    // menu image replacement

    $('.page-nav__list-link').on('click', headerReset);

    //modal open
    $('.modal__open-link').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            href = $this.attr('href');

        $('body').find('.modal__wrap' + href).addClass('is-active');
        $('body, html').addClass('no-scroll-initial');
    });

    //homepage instagram slider
    $('.homepage-follow__slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            }
        ]
    });

    function homepageLoadAnimation(){
        var tl = new TimelineMax({
            repeat: 0,
            ease: Back.easeOut.config(1.7)
        }),
            imgDefault = $('.hero__default'),
            imgActive = $('.hero__active'),
            contentDefault = $('.hero__inner-content--default'),
            contentActive = $('.hero__inner-content--active');

        tl.staggerTo(imgDefault, 1, {opacity: 0, zIndex: '-1'}, 1, "hero-img")
            .staggerTo(imgActive, 0, {zIndex: '1'}, 1, "hero-img")
            .staggerFromTo(contentDefault, 0.5, {opacity: 1, zIndex: '1'}, {opacity: 0, zIndex: '-1'}, 0.4, '-=0.4')
            .to(contentActive, 1, {delay: 0.3, opacity: 1, zIndex: '1', scaleX: 1})
    }

    //homepage load

    $(document).on('click', '.section__hero-default', function () {
        $('.section__hero').removeClass('section__hero-default');
        homepageLoadAnimation();
        $('body, html').removeClass('no-scroll');
    });

    //homepage modal

    $('.homepage-mail__form').on('submit', function (e) {
        e.preventDefault();

        $('body, html').addClass('no-scroll-initial');
        $('.modal-success').addClass('is-active');
        $('.homepage-mail__form input').val('');
    });

    $('.modal__close-btn').on('click', function (e) {
        $('body, html').removeClass('no-scroll-initial');
        $(this).parents('.modal__wrap').removeClass('is-active');
    });

    //homepage scroll btn

    $('.homepage-scroll__btn').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            href = $this.attr('href');

        controller.scrollTo(href);
    });


    $(window).resize(function () {
        headerReset();
    });

    $(window).on('scroll', function (e) {

    });

    $(window).on('orientationchange', function () {
        headerReset();
    });

});
