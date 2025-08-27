$(document).ready(function() {
  
  if ($('.best-seller-section').length) {
    var best_seller = new Swiper('.collection-product-list-slider', {
        slidesPerView: 4,
        spaceBetween: 15,
        allowTouchMove: true,
        navigation: {
            nextEl: '.best-seller-button-next',
            prevEl: '.best-seller-button-prev',
        },
        pagination: {
            el: '.best-seller-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px (mobile)
            0: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            // when window width is >= 768px (tablet)
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            // when window width is >= 1024px (desktop)
            1024: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1524: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            // when window width is >= 1024px (desktop)
            1680: {
                slidesPerView: 4,
                spaceBetween: 15,
            }
        }
    });
  }  
});  