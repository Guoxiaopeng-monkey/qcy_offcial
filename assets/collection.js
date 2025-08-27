$(document).ready(function () {

    getCompare();

    if ($('.paginate').find('.page:not(.disable)').length > 0)
        $('.paginate').css('display', 'flex');
    else
        $('.paginate').css('display', 'none');

    $(document).on('click', '.paginate a', function(e) {
        e.preventDefault();

        let newUrl = $(this).attr('href');
        
        filter(newUrl);

        $('html, body').animate({
            scrollTop: $('#main-collection').offset().top - 50
        }, 0);
    });

    $('.clear-filter a').on('click', function(e) {
        e.preventDefault();

        let newUrl = curUrl;

        $('.filter-form input[type="checkbox"]').prop('checked', false);
        $('.filter-form input').val('');

        $('.sort-by.desktop select').val($('.sort-by.desktop select option:first').val());
        $('.sort-by.mobile select').val($('.sort-by.mobile select option:first').val());

        $('input[type="radio"][name="radio-sort"]').first().trigger('click');
        
        filter(newUrl);
    });


    /* DESKTOP --------------------------------------------------- */

    $('.filter-form.desktop input').on('change', function() {
        $(".filter-form.desktop").trigger('submit');
        $('.sort-by.desktop select').val($('.sort-by.desktop select option:first').val());
    });

    $('.filter-form.desktop').submit(function (e) {
        e.preventDefault();

        let formData = $(this).serialize();
        let newUrl = curUrl+'?'+formData;
        
        filter(newUrl);
    });

    $('.sort-by.desktop select').on('change', function() {
        let currentUrl = window.location.href;
        let url = new URL(currentUrl);

        url.searchParams.set("sort_by", $(this).val());

        let newUrl = url.toString();
        
        filter(newUrl);
    });

    /* MOBILE --------------------------------------------------- */

    $('.filter-form.mobile input').on('change', function() {
        $(".filter-form.mobile").trigger('submit');
        $('.sort-by.mobile select').val($('.sort-by.mobile select option:first').val());
    });

    $('.filter-form.mobile').submit(function (e) {
        e.preventDefault();

        let formData = $(this).serialize();
        let newUrl = curUrl+'?'+formData;
        
        filter(newUrl);
    });

    $('.toggle-filter').on('click', function() {
        $('.mobile-filter-container').show();
        $('body').css('overflow-y', 'hidden');
    });

    $('.toggle-filter-close').on('click', function() {
        $('.mobile-filter-container').hide();
        $('body').css('overflow-y', 'visible');
    })
});

function filter(newUrl) {

    $.ajax({
        type: "GET",
        url: newUrl,
        success: function(data) {

            //product count
            $('.item-found span').html($(data).find('.item-found span').html());
          
            //desktop update product list
            if ($(data).find('.product-list').find('.products').length > 0) {
                $('.product-list').html($(data).find('.product-list').html());
            }
            else {
                $('.product-list').html('<h3 class="nothing-found">No product found.</h3>');
            }

            //show hide pagination
            if ($('.paginate').find('.page:not(.disable)').length > 0)
                $('.paginate').css('display', 'flex');
            else
                $('.paginate').css('display', 'none');

            getCompare();
            bindClickEvents();

        },
        error: function() {
            console.log("Error occurred while filtering products.");
        },
    });

    if (window.history && window.history.pushState) {
        window.history.pushState(null, null, newUrl);
    }
}

$(document).on('click', '.compare', function() {
    
    let data = {
        id: $(this).data('id'),
        image: $(this).data('image'),
        title: $(this).data('title'),
        price: formatMoney($(this).data('price')),
    };
    
    if (sessionStorage.getItem('compare')) {
        let storedCompareArrayString = sessionStorage.getItem('compare');
        let storedCompareArray = JSON.parse(storedCompareArrayString);
    
        let isDuplicate = storedCompareArray.some(function(item) {
            return item.id === data.id && item.image === data.image && item.title === data.title && item.price === data.price;
        });

        if (!isDuplicate) {
            if (storedCompareArray.length < 3) {
                storedCompareArray.push(data);
            
                let updatedCompareArrayString = JSON.stringify(storedCompareArray);
            
                sessionStorage.setItem('compare', updatedCompareArrayString);
            }
        }
        else {
            storedCompareArray = storedCompareArray.filter(function(item) {
                return !(item.id === data.id && item.image === data.image && item.title === data.title && item.price === data.price);
            });

            let updatedCompareArrayString = JSON.stringify(storedCompareArray);

            sessionStorage.setItem('compare', updatedCompareArrayString);
        }
    } 
    else {
        let newCompareArray = [data];
        let newCompareArrayString = JSON.stringify(newCompareArray);
    
        sessionStorage.setItem('compare', newCompareArrayString);
    }

    getCompare();
});

function getCompare() {
    if (sessionStorage.getItem('compare')) {

        let storedCompareArrayString = sessionStorage.getItem('compare');
        let storedCompareArray = JSON.parse(storedCompareArrayString);

        if (storedCompareArray.length == 0) {
            //hide bottom nav
            $('#compare-nav').css('opacity', 0);
            $('#compare-nav').hide();

            $('.compare').removeClass('disable');
            $('.compare').removeClass('active');

            $('.compare i').removeClass('fa-solid fa-square-check').addClass('fa-regular fa-square');
        }
        else {
            //show bottom nav
            $('#compare-nav').show();
            setTimeout(() => {
                $('#compare-nav').css('opacity', 1);
            }, 50);

            if (storedCompareArray.length == 3)
                $('.compare').addClass('disable');
            else
                $('.compare').removeClass('disable');

            $('.compare').removeClass('active');
            $('.compare i').removeClass('fa-solid fa-square-check').addClass('fa-regular fa-square');

            storedCompareArray.forEach(function(value) {
                let elements = document.querySelectorAll(`.compare[data-id="${value.id}"]`);

                elements.forEach(function(element) {
                    element.classList.add('active');
                });

                $(`.compare[data-id="${value.id}"] i`).each(function() {
                    $(this).removeClass('fa-regular fa-square').addClass('fa-solid fa-square-check');
                });
            });
        }

        showCompare();
    }
    else {
        //hide bottom nav
        $('#compare-nav').css('opacity', 0);
        $('#compare-nav').hide();

        $('.compare').removeClass('disable');
        $('.compare').removeClass('active');

        showCompare();
    }
}

$(document).on('click', '.compare-product .remove', function() {
    let storedCompareArrayString = sessionStorage.getItem('compare');
    let storedCompareArray = JSON.parse(storedCompareArrayString);

    let removeId = $(this).attr('class').replace('remove ', '');

    if (storedCompareArray.length === 1 && storedCompareArray[0].id == removeId) {
        storedCompareArray = [];
    } 
    else {
        storedCompareArray = storedCompareArray.filter(function(item) {
            return item.id != removeId;
        });
    }

    $(this).removeClass().addClass('remove');

    let updatedCompareArrayString = JSON.stringify(storedCompareArray);

    sessionStorage.setItem('compare', updatedCompareArrayString);

    getCompare();
});

function formatMoney(amount) {
    return "$" + (amount / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

$('input[type="radio"][name="radio-sort"]').change(function() {
    console.log('here');
    let selectedValue = $(this).val();
    $(`.sort-by.mobile select option`).removeAttr('selected');
    $(`.sort-by.mobile select option[value="${selectedValue}"]`).attr('selected', 'selected');

    let currentUrl = window.location.href;
    let url = new URL(currentUrl);

    url.searchParams.set("sort_by", selectedValue);

    let newUrl = url.toString();
    
    filter(newUrl);

    if ($(this).is(':checked')) {
        let spanHtml = $(this).next('span').html();
        $('#heading-sortBy button span').html(`Sort By: ${spanHtml}`);
    }
});