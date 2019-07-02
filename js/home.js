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

    $('#fullpage').fullpage({
        licenseKey: 'B80EC24D-66D9477B-B16E7559-B4301A50',
        scrollingSpeed: 900,
        scrollHorizontally: false,
        scrollOverflow: false,  //
        autoScrolling: false,
        fitToSection: true,
        fixedElements: '.header',
        css3: true,
        scrollBar: true,
        verticalCentered: false
    });

    function handleFullPage() {
        if (isMobile()) {
            $.fn.fullpage.setResponsive(true);
        } else {
            $.fn.fullpage.setResponsive(false);
        }
    }

    function handleFullPageScrolling(){
        if(!isMobile()){
            $.fn.fullpage.setAutoScrolling(true);
        }
    }
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
                // ease: Back.easeOut.config(1.7)
            }),
            imgDefault = $('.hero__default'),
            imgActive = $('.hero__active'),
            contentDefault = $('.hero__inner-content--default'),
            contentActive = $('.hero__inner-content--active');

        tl.staggerTo(imgDefault, 1, {opacity: 0, zIndex: '-1'}, 1, "hero-img")
            .staggerTo(imgActive, 1, {zIndex: '1', opacity: 1}, 1, "hero-img")
            .staggerFromTo(contentDefault, 0.5, {opacity: 1, zIndex: '1'}, {opacity: 0, zIndex: '-1'}, 0.4, '-=0.4')
            .to(contentActive, 1, {delay: 0.3, opacity: 1, zIndex: '1', scaleX: 1})
    }

    //homepage load

    $(document).on('click', '.section__hero-default', function () {
        $('.section__hero').removeClass('section__hero-default');
        setTimeout(function () {
            homepageLoadAnimation();
            $('body, html').removeClass('no-scroll');
            $('body').addClass('has-loaded');
            if(!isMobile()){
                $.fn.fullpage.setAutoScrolling(true);
            }
        },500)

    });

    //homepage modal

    $('.homepage-mail__form').on('submit', function (e) {
        e.preventDefault();

        $('body, html').addClass('no-scroll-initial');
        $('.modal-success').addClass('is-active');
        $('.homepage-mail__form').get(0).reset();
    });

    handleFullPage();

    $(window).resize(function () {
        handleFullPage();
    });
});