$(document).ready(function() {
    
  $('.mega_menu_display.mega-menu-tab-list').each(function () {
    var $thisMenu = $(this);

    $thisMenu.find('.tab-span').on('click', function () {
      var tab = $(this).data('tab');

      // Toggle active tab
      $thisMenu.find('.tab-span').removeClass('active');
      $(this).addClass('active');


    // Hide all tab containers with fadeOut
    $thisMenu.find('.tab-container-list').hide(); 

    // Show the selected one with fadeIn
    $thisMenu.find('.tab-container-list[data-tab="' + tab + '"]').fadeIn(200);

    });
  });
    

$('.announcement-bar__link').each(function() {
    var $this = $(this); // Reference to the current element

    // Parse the date-time value
    var targetDate = new Date($this.attr('date-time')).getTime();

    // Update the countdown every 1 second
    var countdownInterval = setInterval(function() {
        // Get the current time
        var now = new Date().getTime();

        // Calculate the difference
        var timeDifference = targetDate - now;


        if (timeDifference <= 0) {
            clearInterval(countdownInterval);
            $this.addClass('hidden'); // Hide element if countdown is over
            return;
        }

        // Calculate days, hours, minutes, and seconds
        var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);


        // Add leading zeros if the value is less than 10
        days = days < 10 ? '0' + days : days;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Update the HTML with calculated values
        $this.find('.day-sec-bar').text(days);
        $this.find('.hour-sec-bar').text(hours);
        $this.find('.minute-sec-bar').text(minutes);
        $this.find('.second-sec-bar').text(seconds);
    }, 1000);
});
  
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('tab')) {
        const tabValue = urlParams.get('tab');
        setTimeout(() => {
            $(`.support-nav [data-nav="${tabValue}"]`).trigger('click');
        }, 100);
        if(tabValue == 'warranty-claim' ){
            setTimeout(() => {
                $(`.support-nav [data-nav="support-service"]`).trigger('click');
            }, 100);
            setTimeout(() => {
              $(`.form-modal[data-modal="warranty-claim"]`).fadeIn(); 
              $('html, body').css('overflow-y', 'hidden');
            }, 500);
        }
    }

    /* ----------------------------------------- */

    $('.more-help').next('.contact-us-information-section').css('padding', '0');

    /* ----------------------------------------- */

    if ($('.support-nav').length) {
        let headerH = $('sticky-header').outerHeight() - 1;
        $('.main-support-nav').css('top', `${headerH + $('.announcement-bar-section').outerHeight()}px`);

        $('.where-to-buy .map-wrapper').css('height', `calc(100% - ${headerH}px)`);
    }

    scrollSpy();

    $('.paginate.custom').each(function() {
        initializePagination($(this));
    });
    
    /* ---------------------------------------- */

    if ($('.support-detail').length) {
        let fullUrlPath = new URL(window.location.href).pathname;

        $('.support-detail .selected').each(function() {
            let linkPath = new URL($(this).attr('href'), window.location.origin).pathname;
        
            if (linkPath === fullUrlPath) {
                $(this).addClass('active');
        
                let name = $(this).html();
                let image = $(this).data('image');
        
                $('.breadcrumbs').append(`
                    <a href="javascript:void(0)">${name}</a>    
                `);
        
                $('.product-title').html(name);
                $('.product-image img').attr('src', image);
        
                let accordionItem = $(this).closest('.accordion-item');
        
                accordionItem.find('.accordion-button').removeClass('collapsed');
                accordionItem.find('.accordion-collapse').addClass('show');
        
                let index = accordionItem.index();
        
                $(`.sideline .line:eq(${index})`).addClass('active');
            }
        });
    }

    if ($('.toggles').length) {
        setTimeout(() => {
            $('.toggles').each(function() {
                let firstVisibleSpan = $(this).find('span:visible').first();
                firstVisibleSpan.addClass('active').siblings().removeClass('active');
    
                let toggle = firstVisibleSpan.data('toggle');
                $(`.nav-toggles .nav-toggle[data-toggle="${toggle}"]`).addClass('active');
            });
        }, 10);
    }

    if ($('.btn-toggles').length) {
        setTimeout(() => {
            $('.btn-toggles').each(function() {
                let firstVisibleSpan = $(this).find('.btn-toggle:visible').first();
                firstVisibleSpan.addClass('active').siblings().removeClass('active');
    
                let toggle = firstVisibleSpan.data('toggle');
                $(`.store-navs .store-nav[data-store="${toggle}"]`).addClass('active');
            });
        }, 10);
    }

    if ($('.support-video').length) {
        $('.support-detail .toggles span:eq(0)').css('display', 'inline-block');
    }
    if ($('.faq').length) {
        $('.support-detail .toggles span:eq(1)').css('display', 'inline-block');
    }
    if ($('.manuals').length) {
        $('.support-detail .toggles span:eq(2)').css('display', 'inline-block');
    }
  
    if ($('.countdown-discount-container').length) {
        $('.countdown-discount-container').filter(function () {
            var targetDateStr = $(this).data('date-time');
            return targetDateStr && !isNaN(new Date(targetDateStr).getTime());
        }).each(function () {
            var $container = $(this);
            var targetDateStr = $container.data('date-time');
            var targetDate = new Date(targetDateStr).getTime();
        
            var countdownInterval = setInterval(function () {
                var now = new Date().getTime();
                var timeDifference = targetDate - now;
        
                if (timeDifference <= 0) {
                    clearInterval(countdownInterval);
                    $container.remove();
                    return;
                }
        
                var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
                // Format with leading zeros
                days = days < 10 ? '0' + days : days;
                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;
        
                // Update the DOM
                $container.find('.days-span').text(days);
                $container.find('.hours-span').text(hours);
                $container.find('.minutes-span').text(minutes);
                $container.find('.seconds-span').text(seconds);
            }, 1000);
        });

        $('.btn-copy-code').on('click', function() {
            var discountCode = $(this).data('discount-code'); // get the code
        
            // Copy to clipboard
            navigator.clipboard.writeText(discountCode).then(function() {
              // Optional: show some feedback
              alert('Copied: ' + discountCode);
            }, function(err) {
              alert('Failed to copy text: ', err);
            });
        });
    }
});

$(window).resize(function() {
    if ($('.support-nav').length) {
        let headerH = $('sticky-header').outerHeight() - 1;
        $('.main-support-nav').css('top', `${headerH + $('.announcement-bar-section').outerHeight()}px`);
        
        $('.where-to-buy .map-wrapper').css('height', `calc(100% - ${headerH}px)`);
    }
});

$(window).scroll(function() {
    scrollSpy();
})

$('.search-group input').on('keyup', function() {
    let val = $(this).val();
    if (val !== '')
        $('.search-x').css('visibility', 'visible');
    else
        $('.search-x').css('visibility', 'hidden');
});

$('.search-x').on('click', function() {
    if ($(this).css('visibility') == 'visible') {
        $('.search-group input').val('');
        $(this).css('visibility', 'hidden');
    }
});

$('.search-group .search-btn').on('click', function() {
    runQuery();
});

$('.search-group input').on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        runQuery();
    }
});

$('.support-search .search-items span').on('click', function() {
    let val = $(this).text();
    $('.search-group input').val(val);
    $('.search-x').css('visibility', 'visible');
});

function runQuery() {
    let query = $('.search-group input').val().trim();

    if (query) {
        let found = false;

        $('main *:not(script):not(style)').not('.support-nav *').not('.support-search *').each(function() {
            let elementText = $(this).text().trim().toLowerCase();
            if (elementText.includes(query.toLowerCase()) && $(this).children().length === 0) {
                console.log('matchfound for text', elementText);
                $('.support-search .no-found').hide();

                let element = $(this)[0];

                let nav_toggle = $(element).closest('.nav-toggle');
                let page = $(element).closest('[data-page]');
                let btn_toggle = $(element).closest('[data-store]');
                let accor = $(element).closest('.accordion-item');

                if (nav_toggle.length) {
                    let toggle = $(nav_toggle).data('toggle');
                    $(`.toggles [data-toggle="${toggle}"]`).trigger('click');
                }

                if (page.length) {
                    if ($(page).closest('.row').find('.paginate').length) {
                        let pageNo = $(page).data('page');
                        $(page).closest('.row').find(`.paginate .page[data-i="${pageNo}"]`).trigger('click');
                    }
                }

                if (btn_toggle.length) {
                    let toggle = $(btn_toggle).data('store');
                    $(`.btn-toggles [data-toggle="${toggle}"]`).trigger('click');
                }

                if (accor.length) {
                    $('#accordion-product .accordion-button').addClass('collapsed');
                    $('#accordion-product .accordion-button').attr('aria-expanded', true);
                    $('#accordion-product .accordion-collapse').removeClass('show');

                    accor.find('.accordion-button').removeClass('collapsed');
                    accor.find('.accordion-button').attr('aria-expanded', false);
                    accor.find('.accordion-collapse').addClass('show');
                }

                if ($(element).is(':hidden')) {
                    let nextVisibleElement = $(this).nextAll(':visible').first();
                    if (nextVisibleElement.length === 0) {
                        nextVisibleElement = $(this).parents().nextAll(':visible').first();
                    }
                    if (nextVisibleElement.length) {
                        nextVisibleElement[0].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                    }
                } else {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                }

                found = true;
                return false;
            }
        });

        if (!found) {
            $('.support-search .no-found span').html(query);
            $('.support-search .no-found').show();
        }
    }
}

$('.toggles span').on('click', function() {
    let toggle = $(this).data('toggle');
    $(this).addClass('active').siblings().removeClass('active');

    $(`.nav-toggle[data-toggle="${toggle}"]`).addClass('active').siblings().removeClass('active');
});

$('.btn-toggles span').on('click', function() {
    let toggle = $(this).data('toggle');
    $(this).addClass('active').siblings().removeClass('active');

    $(`.store-nav[data-store="${toggle}"]`).addClass('active').siblings().removeClass('active');
});

$('select[name="online-country"]').on('change', function() {

    let country = $(this).val();
    let page = $('.stores-row .paginate .page.active').data('i');

    if (country != 'All') {
        $('.stores-row [data-page]').hide();
        $(`.stores-row [data-country="${country}"]`).show();
        
        $('.stores-row .paginate').hide();
    }
    else {
        $('.stores-row [data-page]').hide();
        $(`.stores-row [data-page="${page}"]`).show();
        
        $('.stores-row .paginate').css('display', 'flex');
    }
});

function scrollSpy() {
    if ($('.support-nav').length) {

        let nav_1 = $('[data-anchor="product-support"]');
        let nav_2 = $('[data-anchor="support-service"]');
        let nav_3 = $('[data-anchor="where-to-buy"]');
        let nav_4 = $('[data-anchor="after-sales-policy"]');
        let nav_5 = $('[data-anchor="faq"]');

        if (!nav_1.length)
            $('.support-nav [data-nav="product-support"]').remove();
        if (!nav_2.length)
            $('.support-nav [data-nav="support-service"]').remove();
        if (!nav_3.length)
            $('.support-nav [data-nav="where-to-buy"]').remove();
        if (!nav_4.length)
            $('.support-nav [data-nav="after-sales-policy"]').remove();
        if (!nav_5.length)
            $('.support-nav [data-nav="faq"]').remove();

        const sections = $('section');
        let currentSection = '';

        sections.each(function () {
            const sectionTop = $(this).offset().top - 200;
            const sectionHeight = $(this).height();
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = $(this).data('anchor');
            }
        });

        const links = $('.support-nav .nav-items span');
        links.removeClass('active');
        links.filter('[data-nav="' + currentSection + '"]').addClass('active');
    }
}

$('.support-nav .nav-items span').click(function() {
    const targetSection = $(this).data('nav');
    const targetOffset = $('section[data-anchor="' + targetSection + '"]').offset().top - 150;

    $('html, body').animate({
        scrollTop: targetOffset
    }, 0);
});

$('.support-detail [data-anchor]').click(function() {
    const targetSection = $(this).data('anchor');
    const targetOffset = $('section[data-anchor="' + targetSection + '"]').offset().top - 150;

    $('html, body').animate({
        scrollTop: targetOffset
    }, 0);

    $('.support-detail [data-anchor="support-video"]').addClass('active').siblings().removeClass('active');
});

/* pagination ---------------------------------------------- */

function updatePagination($pagination, currentPage, totalPages) {

    $pagination.empty();

    $pagination.append(`
        <a class="page ${currentPage === 1 ? 'disable' : ''}" href="javascript:void(0)" data-action="prev">
            <i class="fa-solid fa-chevron-left"></i>
        </a>
    `);

    let pageNumbers = '';

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers += `<a class="page ${i === currentPage ? 'active' : ''}" href="javascript:void(0)" data-i="${i}">${i}</a>`;
        }
    } else {
        const maxPagesToShow = 2;
        const startPage = Math.max(2, currentPage - maxPagesToShow);
        const endPage = Math.min(totalPages - 1, currentPage + maxPagesToShow);

        pageNumbers += `<a class="page ${currentPage === 1 ? 'active' : ''}" href="javascript:void(0)" data-i="1">1</a>`;

        if (startPage > 2) {
            pageNumbers += '<a class="page disable" href="javascript:void(0)">…</a>';
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers += `<a class="page ${i === currentPage ? 'active' : ''}" href="javascript:void(0)" data-i="${i}">${i}</a>`;
        }

        if (endPage < totalPages - 1) {
            pageNumbers += '<a class="page disable" href="javascript:void(0)">…</a>';
        }

        pageNumbers += `<a class="page ${currentPage === totalPages ? 'active' : ''}" href="javascript:void(0)" data-i="${totalPages}">${totalPages}</a>`;
    }

    $pagination.append(pageNumbers);

    $pagination.append(`
        <a class="page ${currentPage === totalPages ? 'disable' : ''}" href="javascript:void(0)" data-action="next">
            <i class="fa-solid fa-chevron-right"></i>
        </a>
    `);

    const $customRow = $pagination.parent();
    $customRow.find('[data-page]').hide();
    $customRow.find(`[data-page="${currentPage}"]`).show();
}

function initializePagination($pagination) {
    const totalPages = $pagination.data('total');
    let currentPage = 1;

    updatePagination($pagination, currentPage, totalPages);

    $pagination.on('click', '.page[data-i]', function() {
        const newPage = $(this).data('i');
        if (newPage && newPage !== currentPage) {

            $('html, body').animate({
                scrollTop: $pagination.closest('.row').offset().top - 400
            }, 0);

            currentPage = newPage;
            updatePagination($pagination, currentPage, totalPages);
        }
    });

    $pagination.on('click', '[data-action="prev"]', function() {
        if (currentPage > 1) {

            $('html, body').animate({
                scrollTop: $pagination.closest('.row').offset().top - 400
            }, 0);

            currentPage--;
            updatePagination($pagination, currentPage, totalPages);
        }
    });

    $pagination.on('click', '[data-action="next"]', function() {
        if (currentPage < totalPages) {

            $('html, body').animate({
                scrollTop: $pagination.closest('.row').offset().top - 400
            }, 0);

            currentPage++;
            updatePagination($pagination, currentPage, totalPages);
        }
    });
}

$('.service[data-modal], .help [data-modal]').on('click', function() {
    let modal = $(this).data('modal');
    $(`.form-modal[data-modal="${modal}"]`).fadeIn(); 
    $('html, body').css('overflow-y', 'hidden');
});

$('.form-close').on('click', function() {
    let modal = $(this).parent().parent().data('modal');
    $(`.form-modal[data-modal="${modal}"]`).fadeOut(); 
    $('html, body').css('overflow-y', 'auto');
});

$('.form-modal .overlay').on('click', function() {
    let modal = $(this).parent().data('modal');
    $(`.form-modal[data-modal="${modal}"]`).fadeOut(); 
    $('html, body').css('overflow-y', 'auto');
});

$('.support-video .video').on('click', function() {
    $('html, body').css('overflow-y', 'hidden');

    let src = $(this).find('video source').attr('src');

    $('.support-video .video-container').html(`
        <video autoplay playsinline controls>
            <source src="${src}" type="video/mp4">
            Your browser does not support the video tag.
        </video>    
    `);

    $('.support-video .video-watch').fadeIn();
});

$('.support-video .video-close, .support-video .overlay').on('click', function() {
    $('html, body').css('overflow-y', 'auto');

    $('.support-video .video-watch').fadeOut();
    $('.support-video .video-container').html('');
});

$('.direct-checkout').on('click', function() {
    setTimeout(function() {
        window.location.href = '/checkout';
    }, 300)
});