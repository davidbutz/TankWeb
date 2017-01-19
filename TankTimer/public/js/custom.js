$(document).ready(function () {

    /* NAVIGATION VISIBLE ON SCROLL */
    $(document).ready(function () {
        mainNav();
    });

    $(window).scroll(function () {
        mainNav();
    });

    if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
        function mainNav2() {
            var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            if (top > 40)
                $('.sticky-navigation').stop().animate({"top": '0'});

            else
                $('.sticky-navigation').stop().animate({"top": '-60'});
        }
    }

    if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
        function mainNav2() {
            var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            if (top > 40)
                $('.sticky-navigation').stop().animate({"top": '0'});

            else
                $('.sticky-navigation').stop().animate({"top": '-120'});
        }
    }

    //smooth scroll
    $(function () {
        $('.scroll-to a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    //Auto Close Responsive Navbar on Click
    $(document).ready(function () {

        function close_toggle() {
            if ($(window).width() <= 768) {
                $('.navbar-collapse a').on('click', function () {
                    $('.navbar-collapse').collapse('hide');
                });
            }
            else {
                $('.navbar .navbar-default a').off('click');
            }
        }
        close_toggle();
        $(window).resize(close_toggle);

    });

    //Contact Us
    $('.contact-us').submit(function () {
        console.log("here");
        var $email = $(this).find('input[name="email"]');
        //$email.removeAttr('disabled');
        var $subject = $(this).find('input[name="subject"]');
        var $name = $(this).find('input[name="name"]');
        //$name.removeAttr('disabled');
        var $message = $(this).find('input[name="message"]');
        var $submit = $(this).find('button[name="submitcontact"]');
        var submitData = $(this).serialize();
        //$email.attr('disabled', 'disabled');
        //$submit.attr('disabled', 'disabled');
        $.ajax({
            // Subcribe process with AJAX
            type: 'POST',
            // url: 'http://boataware.us12.list-manage.com/subscribe/post?u=58d781b310cfa9b416d8023e4&amp;id=14bd6a3c33',
            url: '/api/contact',
            data: submitData,
            dataType: 'json',
            success: function (msg) {
                $submit.removeAttr('disabled');
                //$email.removeAttr('disabled').val(msg.msg).addClass('success');
                $submit.html('<span class="fa fa-check-square-o"></span> Message Sent!');
                if (msg.status) {
                    if (msg.status === 'success') {
                        $submit.removeAttr('disabled');
                        //$email.removeAttr('disabled').val(msg.msg).addClass('success');
                        $submit.html('<span class="fa fa-check-square-o"></span> Message Sent!');
                    } else {
                        $submit.removeAttr('disabled');
                        $email.removeAttr('disabled').val(msg.msg).addClass('error');
                        $submit.html('<span class="fa fa-check-square-o"></span> Message Sent!');
                    }
                }
                else {
                    $submit.removeAttr('disabled');
                    $submit.html('<span class="fa fa-check-square-o"></span> Message Sent!');
                }
            }
        });
        return false;
    });
    

    //Newsletter
    // Checking subcribe form when focus event
    $('.assan-newsletter input[type="text"], .assan-newsletter input[type="email"]').live('focus keypress', function () {
        var $email = $(this);
        if ($email.hasClass('error')) {
            $email.val('').removeClass('error');
        }
        if ($email.hasClass('success')) {
            $email.val('').removeClass('success');
        }
    });

    // Subscribe form when submit to database
    $('.assan-newsletter').submit(function () {
        console.log("I am hitting the .assan-newsletter ");
        var $email = $(this).find('input[name="email"]');
        var $submit = $(this).find('button[name="submit"]');
        var email_pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        if (email_pattern.test($email.val()) === false) {
            $email.val('Please enter a valid email address!').addClass('error');
        } else {
            var submitData = $(this).serialize();
            $email.attr('disabled', 'disabled');
            $submit.attr('disabled', 'disabled');
            $.ajax({// Subcribe process with AJAX
                type: 'POST',
                // url: 'http://boataware.us12.list-manage.com/subscribe/post?u=58d781b310cfa9b416d8023e4&amp;id=14bd6a3c33',
                url: '/api/subscribe',
                data: submitData,
                dataType: 'json',
                success: function (msg) {
                    if (msg.status) {
                        if (msg.status === 'success') {
                            $submit.removeAttr('disabled');
                            $email.removeAttr('disabled').val(msg.msg).addClass('success');
                            $submit.html('<span class="fa fa-check-square-o"></span> Subscribed!');
                        } else {
                            $submit.removeAttr('disabled');
                            $email.removeAttr('disabled').val(msg.msg).addClass('error');
                        }
                    }
                }
            });
        }

        return false;
    });



    //Flexslider
    $('.flexslider').flexslider({
        animation: "fade",
        touch: true,
        directionNav: false
    });

    //testimonials slider
    $("#owl-testimonials").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        pagination: false,
        transitionStyle: 'goDown',
        navigationText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"]

    });


    //screen shot slider
    $("#owl-screenshots").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        pagination:false,
        navigation:true,
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        navigationText: ["<i class='fa fa-angle-left'>", "<i class='fa fa-angle-right'>"]
    });
    
    //wow animations
    var wow = new WOW(
        {
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 100, // distance to the element when triggering the animation (default is 0)
            mobile: false        // trigger animations on mobile devices (true is default)
        }
    );
    wow.init();
});