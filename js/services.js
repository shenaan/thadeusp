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

    function serviceTextAnimation() {
        if (isMobile()) {
            $('.services-section__locked').removeClass('page-section__col-fixed')
        } else {
            $('.services-section__locked').each(function (i, el) {
                var $this = $(this),
                    text = $this.find('.page-section__col-text'),
                    height = $this.outerHeight();

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

    function servicesImgAnimation() {
        $('.services-section').each(function (i, el) {
            var $this = $(this),
                img = $this.find('.page-section__img-inner'),
                height = $this.outerHeight();

            var imgTl = new TweenMax.to(img, 0.7, {opacity: 1});

            var imgFadeScene = new ScrollMagic.Scene({
                triggerElement: $(el),
                offset: 0,
                triggerHook: 0.5,
                reverse: true,
                duration: height
            })
                .on('enter', function () {
                    console.log('enter')
                    new TweenMax.staggerFromTo(img, 0.7, {opacity: 0}, {opacity: 1}, 0.2);
                })
                .on('leave', function () {
                    console.log('leave')
                })
                // .setTween(imgTl)
                // .addIndicators('green')
                .addTo(controller);
        })
    }

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

// services load animation

    $(document).on('click', '.services__hero-default', function () {
        setTimeout(function () {
            servicesLoadAnimation();
            $('body, html').removeClass('no-scroll is-loading');
            $('body').addClass('has-loaded');
            $.fn.fullpage.setAllowScrolling(true);
            if (isMobile()) {
                $.fn.fullpage.setAutoScrolling(false);
            }
        }, 500)

    });

    function fixedSectionHandle() {
        var sectionFixed = $('.services-lifestyle'),
            sectionFixedTop = sectionFixed.offset().top,
            sectionFixedBottom = sectionFixedTop + sectionFixed.outerHeight(),
            w = $(window),
            scrollTop = w.scrollTop();
        if (sectionFixed.hasClass('services-section--fixed')) {
            if (scrollTop >= sectionFixedTop && scrollTop <= sectionFixedBottom) {
                controller.scrollTo(sectionFixedTop);
                $('body, html').addClass('no-scroll-initial');
                $.fn.fullpage.setAllowScrolling(false);
            }
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
    // servicesImgAnimation();
    fixedSectionHandle();

    $(window).scroll(function () {
        fixedSectionHandle();

    });

    $(window).resize(function () {
        fixedSectionHandle();
    });


});