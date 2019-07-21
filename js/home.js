//homepage load animation
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
        .fromTo(contentActive, 0.5, {opacity: 0, zIndex: '1'}, {opacity: 1, zIndex: '1'})
}

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

    // $.fn.fullpage.setAllowScrolling(false);
    //
    // setTimeout(function () {
    //     $.fn.fullpage.setAllowScrolling(true);
    // }, 1700);

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

    heroScene = new ScrollMagic.Scene({
        triggerElement: $('.section__hero-default'),
        duration: '100%',
        reverse: false,
        offset: 0,
        triggerHook: 0
    })
        .on('enter', function () {
            setTimeout(homepageLoadAnimation, 800);
        })
        .addTo(controller);

    // setTimeout(function () {
    //     $('#modal__interest').addClass('is-active');
    // }, 10000);
    $(window).resize(function () {

    });
});


$(window).on('load', function () {
    setTimeout(function () {
        homepageLoadAnimation();
    }, 800);
});
