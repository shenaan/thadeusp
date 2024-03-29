$(document).ready(function () {
    var controller = new ScrollMagic.Controller();
    var heroScene;

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

    // setTimeout(homepageLoadAnimation, 800);

    heroScene = new ScrollMagic.Scene({
        triggerElement: $('.section__hero-default'),
        duration: '100%',
        reverse: false,
        offset: 0,
        triggerHook: 0
    })
        .on('enter', function () {
            setTimeout(homepageLoadAnimation, 400);
            // homepageLoadAnimation()
        })
        .addTo(controller);

    //homepage load animation

    // $(document).on('click', '.section__hero-default', function () {
    //     $('.section__hero').removeClass('section__hero-default');
    //     setTimeout(function () {
    //         homepageLoadAnimation();
    //         $('body, html').removeClass('no-scroll is-loading');
    //         $('body').addClass('has-loaded');
    //         $.fn.fullpage.setAllowScrolling(true);
    //         if(isMobile()){
    //             $.fn.fullpage.setAutoScrolling(false);
    //         }
    //     },500)
    //
    // });


    $(window).resize(function () {

    });
});

$(window).on('load', function () {
    // function homepageLoadAnimation(){
    //
    //     var tl = new TimelineMax({
    //             repeat: 0,
    //             // ease: Back.easeOut.config(1.7)
    //         }),
    //         imgDefault = $('.hero__default'),
    //         imgActive = $('.hero__active'),
    //         contentDefault = $('.hero__inner-content--default'),
    //         contentActive = $('.hero__inner-content--active');
    //
    //     tl.staggerTo(imgDefault, 1, {opacity: 0, zIndex: '-1'}, 1, "hero-img")
    //         .staggerTo(imgActive, 1, {zIndex: '1', opacity: 1}, 1, "hero-img")
    //         .staggerFromTo(contentDefault, 0.5, {opacity: 1, zIndex: '1'}, {opacity: 0, zIndex: '-1'}, 0.4, '-=0.4')
    //         .to(contentActive, 1, {delay: 0.3, opacity: 1, zIndex: '1', scaleX: 1})
    // }
    //
    // setTimeout(homepageLoadAnimation, 300);

});