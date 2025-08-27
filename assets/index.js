$(window).on('load', function() {
    
  setTimeout(function() {
    if ($('.homepage-section').length) {
      
        var swiperOptions = {
          effect: 'creative',
          speed: 600,
          lazy: true,
          autoHeight: true,
          creativeEffect: {
            prev: {
              shadow: true,
              translate: ['-100%', 0, 0],
            },
            next: {
              translate: ['5%', 0, -1],
            },
          },
          pagination: {
            el: '.banner-swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        };
        
        // Add autoplay settings only if enabled
        if (index_enabled_autoplay) {
          swiperOptions.loop = true;
          swiperOptions.autoplay = {
            delay: index_autoplay_delay,
            disableOnInteraction: false,
          };
        }
        
        var swiper = new Swiper('.homepage-section .swiper-container', swiperOptions);
  
      const swiperPagination = document.querySelector('.homepage-section .banner-swiper-pagination');
      if (swiperPagination) {
          const spans = swiperPagination.querySelectorAll('span');
          if (spans.length === 1) {
              swiperPagination.style.display = 'none';
            $('.slider-arrows').attr('style', 'display: none !important;');
          }
      }

      
       // Loop through each banner item with the countdown class
      $('.banner-item.countdown').each(function() {
          var $this = $(this);
      
          // Get the target date from the specific banner item's data attribute
          var targetDate = new Date($this.data('date-time')).getTime();
      
          // Update the countdown every 1 second
          var countdownInterval = setInterval(function() {
              // Get the current time
              var now = new Date().getTime();
              
              // Calculate the difference
              var timeDifference = targetDate - now;
              
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
              
              // Display the result in the respective HTML elements within this banner item
              $this.find('.day-sec').text(days);
              $this.find('.hour-sec').text(hours);
              $this.find('.minute-sec').text(minutes);
              $this.find('.second-sec').text(seconds);
              
              // If the countdown is finished, clear the interval for this specific item
              if (timeDifference < 0) {
                  clearInterval(countdownInterval);
                  $this.find('.day-sec, .hour-sec, .minute-sec, .second-sec').text('00');
              }
          }, 1000);
      });
    }
  }, 1500);
  
});
$(document).ready(function() {
  
  if ($('.slider-product-section').length) {
    var product_slider = new Swiper('.product-slider-container', {
        slidesPerView: "auto",
        allowTouchMove: false,
        pagination: {
            el: '.product-slider-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px (mobile)
            320: {
                slidesPerView: 1,
                spaceBetween: 25,
            },
            // when window width is >= 768px (tablet)
            768: {
                slidesPerView: 1,
                spaceBetween: 25,
            },
            // when window width is >= 1024px (desktop)
            1024: {
                slidesPerView: "auto",
            },
            1524: {
                slidesPerView: "auto",
            },
            // when window width is >= 1024px (desktop)
            1680: {
                slidesPerView: "auto",
            }
        }
    });
  
    let currentFrame_mobile_app = 0;
    const totalFrames_mobile_app = 4;
    const totalSlides_mobile_app = product_slider.slides.length;
    
    $(window).scroll(() => {
        if ($(window).scrollTop() > $('.slider-product-section').offset().top) {
            currentFrame_mobile_app = Math.min(Math.max(
                Math.floor((($(window).scrollTop() - $('.slider-product-section').offset().top) / ($('.slider-product-section').outerHeight() - $(window).outerHeight())) * totalFrames_mobile_app), 0), totalFrames_mobile_app - 1);
            setInitialState_slider_products(currentFrame_mobile_app, totalSlides_mobile_app);
        }
    });
  
    setInitialState_slider_products(currentFrame_mobile_app, totalSlides_mobile_app);
    
    function setInitialState_slider_products(frame, slides) {
        product_slider.slideTo(Math.floor(frame / Math.ceil(totalFrames_mobile_app / slides)));
    }
  }
  
  if ($('.collection-list-section').length) {
    var featured_collection = new Swiper('.collectin-list-container', {
        slidesPerView: 4,
        allowTouchMove: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.collection-list-button-next',
            prevEl: '.collection-list-button-prev',
        },
        pagination: {
            el: '.collectin-list-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px (mobile)
            320: {
                slidesPerView: 1.2,
            },
            // when window width is >= 768px (tablet)
            768: {
                slidesPerView: 2,
            },
            // when window width is >= 1024px (desktop)
            1024: {
                slidesPerView: 3,
            },
            1524: {
                slidesPerView: 4,
            },
            // when window width is >= 1024px (desktop)
            1680: {
                slidesPerView: 4,
            }
        },
    });
  }  
  
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
  
  if ($('.featured-video-section').length) {
    var windowHeight = $(window).outerHeight();
    var $animation_1 = $('.featured-video-section');
    var currentFrame = 0; 
    var totalFrames = 18;
    
    $(window).scroll(function () {
        if ($(window).scrollTop() > $animation_1.offset().top) {
          
            let idx = parseInt((($(window).scrollTop() - $animation_1.offset().top) / (
                        $animation_1.outerHeight() - windowHeight)) * totalFrames);
            currentFrame = Math.min(Math.max(idx, 0), totalFrames - 1);
            if(idx >= 0){
                setInitialState_section_1(currentFrame);
            }
        }
    })
    
    setInitialState_section_1(currentFrame);
    function setInitialState_section_1(currentFrame) {
      if( currentFrame < 0 ){
        $('.featured-video span.bg_svg').css('scale','1');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','1');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 0){
        $('.featured-video span.bg_svg').css('scale','1');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','1');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 1){
        $('.featured-video span.bg_svg').css('scale','1');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','1');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 2){
        $('.featured-video span.bg_svg').css('scale','1');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','1');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 3){
        $('.featured-video span.bg_svg').css('scale','2');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','1');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 4){
        $('.featured-video span.bg_svg').css('scale','2');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 5){
        $('.featured-video span.bg_svg').css('scale','3');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 6){
        $('.featured-video span.bg_svg').css('scale','4');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 7){
        $('.featured-video span.bg_svg').css('scale','15');
        $('.featured-video span.bg_svg').css('opacity','1');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 8){
        $('.featured-video span.bg_svg').css('scale','20');
        $('.featured-video span.bg_svg').css('opacity','0.5');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 9){
        $('.featured-video span.bg_svg').css('scale','30');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 10){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 11){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 12){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 13){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(150px)');

      }else if( currentFrame == 14){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(0px)');

      }else if( currentFrame == 15){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(0px)');

      }else if( currentFrame == 16){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(0px)');

      }else if( currentFrame >= 17){
        $('.featured-video span.bg_svg').css('scale','45');
        $('.featured-video span.bg_svg').css('opacity','0');
        $('.featured-video .heading').css('opacity','0');
        $('.featured-video-content .page-width ').css('transform','translateY(0px)');

      }
    }
  }  

  
  if ($('.community-section').length) {
    $('.community-item video').hover(
      function() {
        // Play the video when the mouse enters
        this.play();
      }, 
      function() {
        // Pause the video when the mouse leaves
        this.pause();
        this.currentTime = 0; // Reset the video to the start
      }
    );
    var community_slider = new Swiper('.community-slider-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        allowTouchMove: true,
        navigation: {
            nextEl: '.community-button-next',
            prevEl: '.community-button-prev',
        },
        pagination: {
            el: '.community-slider-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px (mobile)
            320: {
                slidesPerView: 1.2,
            },
            // when window width is >= 768px (tablet)
            768: {
                slidesPerView: 2,
            },
            // when window width is >= 1024px (desktop)
            1024: {
                slidesPerView: 3,
            },
            // when window width is >= 1024px (desktop)
            1680: {
                slidesPerView: 4,
            }
        }
    });
  }  

 
  if ($('.user-stories-section').length) {

    $('.user-stories-section .user-stories-item.youtube').each(function () {
        let $item = $(this);
        let videoId = $item.data('yt');
        let hdThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        let fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        
        // Function to check if the image exists
        function checkImage(url, callback) {
            fetch(url, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        callback(url);  // Image exists
                    } else {
                        callback(fallbackThumbnail);  // Use fallback
                    }
                })
                .catch(() => {
                    callback(fallbackThumbnail);  // In case of any error
                });
        }
    
        // Check if the image already has the "has-custom-image" class
        let $img = $item.find('img');
        if ($img.hasClass('has-custom-image')) {
            // If not, check for HD thumbnail and set image
            checkImage(hdThumbnail, function (imageUrl) {
                $img.attr('src', imageUrl);
            });
        }
    });



    
    $('.user-stories-item').hover(
        function() {
            let video = $(this).find('video')[0]; // Get the first video element
            if (video) {
                video.play();
            }
        },
        function() {
            let video = $(this).find('video')[0]; // Get the first video element
            if (video) {
                video.pause();
            }
        }
    );


    var user_stores_container = new Swiper('.user-stories-container', {
        slidesPerView: "auto",
        spaceBetween: 20,
        allowTouchMove: true,
        navigation: {
            nextEl: '.stories-button-next',
            prevEl: '.stories-button-prev',
        },
        pagination: {
            el: '.user-stories-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
            },
            499: {
                slidesPerView: 1.2,
            },
            991: {
                slidesPerView: "auto",
            }
        }
    });

  
  
    $('.user-stories-container').each(function () {
        var $container = $(this);
    
        $container.find('.user-stories-item').click(function (event) {
            // Open the modal
            $('.user-stories-section .custom-modal-section').addClass('open');
            $('body').addClass('no-scroll');
    
            // Clear the modal content to ensure it's fresh each time
            $('.user-stories-section .custom-modal-section .custom-modal-container').empty();
    
            // Check if the item has a YouTube link
            var $item = $(this);
            var youtubeLink = $item.hasClass('youtube') ? $item.data('yt') : null;
    
            if (youtubeLink) {
                // If it has a YouTube link, load the iframe
                var iframeSrc = 'https://www.youtube.com/embed/' + youtubeLink + '?enablejsapi=1';
                var iframe = '<iframe width="100%" height="100%" src="' + iframeSrc + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                
                $('.user-stories-section .custom-modal-section .custom-modal-container').html(iframe);
            } else {
                // If it has a video, load the video source
                var $video = $item.find('video');
                var videoSource = $video.find('source').attr('src');
                var videoElement = '<video playsinline controls><source src="' + videoSource + '" type="video/mp4">Your browser does not support the video tag.</video>';
                
                $('.user-stories-section .custom-modal-section .custom-modal-container').html(videoElement);
            }
        });
    });


    
    // Close the modal on clicking the overlay or close button
    $('.user-stories-section .custom-modal-section .overlay, .custom-close').click(function () {
        $('.user-stories-section .custom-modal-section').removeClass('open');
        $('body').removeClass('no-scroll');
    
        var $modalContainer = $('.user-stories-section .custom-modal-section .custom-modal-container');
    
        // Pause HTML5 video if present
        var $modalVideo = $modalContainer.find('video');
        if ($modalVideo.length) {
            $modalVideo[0].pause();
        }
    
        // Stop YouTube iframe video if present
        var $iframe = $modalContainer.find('iframe');
        if ($iframe.length) {
            $iframe[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
        }
    });

    
  }

  if ($('.icons-section').length) {
    var icon_slider_section = new Swiper('.icon-slider-section', {
        slidesPerView: 3,
        allowTouchMove: true,
        loop: false,
        loopedSlides: 5,
        pagination: {
            el: '.best-seller-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px (mobile)
            320: {
                slidesPerView: 1.8,
                loop: true,
            },
            // when window width is >= 768px (tablet)
            768: {
                slidesPerView: 1.8,
                loop: true,
            },
            // when window width is >= 1024px (desktop)
            1024: {
                slidesPerView: 2,
                loop: true,
            },
            1524: {
                slidesPerView: 3,
                loop: false,
            },
            // when window width is >= 1024px (desktop)
            1680: {
                slidesPerView: 3,
                loop: false,
            }
        }
    });
   const createOdometer = (el, value) => {
        const odometer = new Odometer({
            el: el,
            value: 0,
        });
    
        let hasRun = false;
    
        const options = {
            threshold: [0, 0.9],
        };
    
        const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            if (!hasRun) {
                odometer.update(value);
                hasRun = true;
            }
            }
        });
        };
    
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    };
    
    // Find all odometer blocks
    const odometerBlocks = document.querySelectorAll('.odometer-block');
    
    // Initialize odometers for each block
    odometerBlocks.forEach((block) => {
        const odometerValue = block.getAttribute('data-value');
        const odometerElement = block.querySelector('.odometer-value');
        createOdometer(odometerElement, odometerValue);
    });
  }

  if ($('.featured-blog-section').length) {
    var featured_blog_list_slider = new Swiper('.featured-blog-list-slider', {
        slidesPerView: 1.7,
        spaceBetween: 20,
        allowTouchMove: true,
        navigation: {
            nextEl: '.featured-blog-button-next',
            prevEl: '.featured-blog-button-prev',
        },
        pagination: {
            el: '.featured-blog-swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px (mobile)
            320: {
                slidesPerView: 1.1,
                spaceBetween: 15,
            },
            // when window width is >= 768px (tablet)
            768: {
                slidesPerView: 1.3,
            },
            // when window width is >= 1024px (desktop)
            1024: {
                slidesPerView: 1.5,
            },
            1524: {
                slidesPerView: 1.7,
            },
            // when window width is >= 1024px (desktop)
            1680: {
                slidesPerView: 1.7,
            }
        }
        
    });
    
  }

  
  if ($('.review-content-slider').length) {
    
      var review_slider = new Swiper('.review-content-slider', {
          direction: "vertical",
          effect: "slide",
          loop: true,
          loopedSlides: 5,
          speed: 1000,
          observer: true,
          observeParents: true,
      });
      
      var review_icon_slider = new Swiper('.review-icons', {
          autoplay: {
              disableOnInteraction: false
          },
          autoplay: false,
          slidesPerView: 5,
          slideToClickedSlide: true,
          loop: true,
          loopedSlides: 5,
          centeredSlides: true,
          speed: 1000,
          observer: true,
          observeParents: true,
          freeMode: false,  
          on: {
            slideChange: function () {
              const index_currentSlide      = this.realIndex;
              const currentSlide            = this.slides[index_currentSlide]
              //
              review_slider.slideTo(index_currentSlide);
              console.log(index_currentSlide);
            },
          },
          breakpoints: {
              320: {
                  slidesPerView: 1.8
              },
              499: {
                  slidesPerView: 1.8
              },
              991: {
                  slidesPerView: 5
              }
          }
      });
  
      review_icon_slider.controller.control = review_slider;
  }
  
});