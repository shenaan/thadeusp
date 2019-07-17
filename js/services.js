$(document).ready(function () {
    var controller = new ScrollMagic.Controller();
    var imgSlider, imgSliderSettings;
    var heroServicesScene;

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

    imgSlider = $('.services-img__slider');
    imgSliderSettings = {
        dots: false,
        arrows: true,
        fade: false,
        mobileFirst: true,
        infinite: false,
        responsive: [
            {
                breakpoint: 992,
                settings: "unslick"
            }
        ]
    };

    imgSlider.slick(imgSliderSettings);

    function imgSliderInit() {
        if (!isMobile()) {
            if (imgSlider.hasClass('slick-initialized')) {
                imgSlider.slick('unslick');
            }
            return;
        }

        if (!imgSlider.hasClass('slick-initialized')) {
            return imgSlider.slick(imgSliderSettings);
        }
    }

    // function serviceTextAnimation() {
    //     if (isMobile()) {
    //         $('.services-section__locked').removeClass('page-section__col-fixed')
    //     } else {
    //         $('.services-section__locked').each(function (i, el) {
    //             var $this = $(this),
    //                 text = $this.find('.page-section__col-text'),
    //                 height = $this.outerHeight();
    //
    //             var servicesScene = new ScrollMagic.Scene({
    //                 triggerElement: this,
    //                 offset: 0,
    //                 triggerHook: 0.5,
    //                 reverse: true,
    //                 duration: height * 2
    //             })
    //                 .on('enter', function () {
    //                     new TweenMax.staggerFromTo(text, 0.7, {opacity: 0}, {opacity: 1}, 0.2);
    //                     text.addClass('page-section__col-fixed');
    //                 })
    //                 .on('leave', function () {
    //                     text.removeClass('page-section__col-fixed');
    //                 })
    //                 .addIndicators()
    //                 .addTo(controller);
    //         })
    //     }
    // }

    function serviceTextAnimation() {
        if (isMobile()) {
            $('.services-section__locked').removeClass('page-section__col-fixed')
        } else {
            $('.services-section__locked').each(function (i, el) {
                var $this = $(this),
                    text = $this.find('.page-section__col-text'),
                    height = $this.outerHeight(),
                    $thisTop = $this.offset().top,
                    $thisBottom = $this.offset().top + $this.outerHeight(),
                    w = $(window),
                    scrollTop = w.scrollTop();

                var servicesScene = new ScrollMagic.Scene({
                    triggerElement: this,
                    offset: 0,
                    triggerHook: 0.5,
                    reverse: true,
                    duration: height * 2
                })
                    .on('enter', function () {
                        new TweenMax.staggerFromTo(text, 0.7, {opacity: 0}, {opacity: 1}, 0.2);
                        text.addClass('page-section__col-fixed');
                    })
                    .on('leave', function () {
                        text.removeClass('page-section__col-fixed');
                    })
                    // .addIndicators()
                    .addTo(controller);
            })
        }
    }


// services hero animation

    function servicesLoadAnimation() {

        var tl = new TimelineMax({
                repeat: 0,
                // ease: Back.easeOut.config(1.7)
            }),
            heroDefault = $('.services__hero-default'),
            arrow = $('.services__hero-active .page-scroll__link'),
            link = $('.services__hero-active .page__link--green');

        tl.staggerTo(heroDefault, 1, {opacity: 0, zIndex: '-1'}, 1, "hero-img")
            .staggerFromTo(arrow, 0.5, {opacity: 0}, {opacity: 1}, 0.3, 'arrows')
            .staggerFromTo(link, 0.5, {opacity: 0}, {opacity: 1}, 0.3, 'arrows');
    }

    // setTimeout(servicesLoadAnimation, 800);

    heroServicesScene = new ScrollMagic.Scene({
        triggerElement: $('.services__hero-active'),
        duration: '100%',
        reverse: false,
        offset: 0,
        triggerHook: 0
    })
        .on('enter', function () {
            setTimeout(servicesLoadAnimation, 800);
            // homepageLoadAnimation()
        })
        .addTo(controller);

    // $(document).on('click', '.services__hero-default', function () {
    //     setTimeout(function () {
    //         servicesLoadAnimation();
    //         $('body, html').removeClass('no-scroll is-loading');
    //         $('body').addClass('has-loaded');
    //         $.fn.fullpage.setAllowScrolling(true);
    //         if (isMobile()) {
    //             $.fn.fullpage.setAutoScrolling(false);
    //         }
    //     }, 500)
    // });

    //lifestyle section animation

    function lifestyleScrollRemove(sectionFixed, sectionFixedTop) {
        if (sectionFixed.hasClass('services-section--fixed')) {
            controller.scrollTo(sectionFixedTop);
            $('body, html').addClass('no-scroll-initial');
            $.fn.fullpage.setAllowScrolling(false);
        }
    }

    function fixedSectionHandle() {
        var sectionFixed = $('.services-lifestyle'),
            sectionFixedTop = sectionFixed.offset().top,
            sectionFixedBottom = sectionFixedTop + sectionFixed.outerHeight(),
            w = $(window),
            scrollTop = w.scrollTop();
        if (scrollTop >= (sectionFixedTop - 10) && scrollTop < sectionFixedBottom) {
            console.log('enter lifestyle');
            lifestyleScrollRemove(sectionFixed, sectionFixedTop);
            $('.header').addClass('header--white');
        } else {
            console.log('leave lifestyle');
            $('.header').removeClass('header--white');
        }
    }

    $(document).on('click', '.services-section--fixed', function () {
        setTimeout(function () {
            var tlFixed = new TimelineMax({
                    repeat: 0,
                    ease: Back.easeOut.config(1.7)
                }),
                h1 = $('.services-lifestyle__content--default .h1'),
                h3 = $('.services-lifestyle__content--default h3'),
                contentActive = $('.services-lifestyle__content--active'),
                icon = $('.services-lifestyle__title-icon'),
                color = '#1d1e1c';

            tlFixed
                .staggerTo(h1, 1, {color: color}, 1, "content-title")
                .staggerTo(h3, 1, {color: color}, 1, "content-title")
                .staggerTo(icon, 1, {fill: color}, 1, "content-title")
                .staggerTo(contentActive, 1, {opacity: 1, scaleX: 1}, 0.3, 'arrows');

            $.fn.fullpage.setAllowScrolling(true);
            $('.services-lifestyle').removeClass('services-section--fixed');
            $('body, html').removeClass('no-scroll-initial');
        }, 500)
    });

    serviceTextAnimation();
    fixedSectionHandle();
    imgSliderInit();

    $(window).scroll(function () {
        fixedSectionHandle();
    });

    $(window).resize(function () {
        fixedSectionHandle();
        imgSliderInit();
    });

});