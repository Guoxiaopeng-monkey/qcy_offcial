    let authorization_token;

    let checkoutContainer = document.createElement('div');
    document.body.appendChild(checkoutContainer);
    
    // Function to initialize event listeners
    function initializeEventListeners() {
      
      if (localStorage.discountCode){
       applyDiscount(JSON.parse(localStorage.discountCode).code); 
       // console.log(JSON.parse(localStorage.discountCode).code,'here');
      }
      $(document).on('click', '.apply-discount-btn', function(e) {
          e.preventDefault();
          var $container = $(this).closest('.discount');
          var discountCode = $container.find('.discount-code-input').val();
          applyDiscount(discountCode);
      });
      
      $(document).on('click', '.clear-discount-btn', function(e) {
          e.preventDefault();
          clearDiscount();
      });

      
     // console.log('initialize')
    }
    initializeEventListeners();

    function clearDiscount() {
        
        $('.applied-discount-code-value').html("");
        $('.discount-code-error').html("");
        $('.applied-discount-code-wrapper').css("display", "none");
        clearLocalStorage();
        fetch('/checkout?discount=clear');
        // Function to fetch and log cart items
        function fetchCartItems() {
            $.ajax({
                type: 'GET',
                url: '/cart.js',
                dataType: 'json',
                success: function(response) {
                      
                  fetch(`${routes.cart_url}?section_id=cart-drawer`)
                      .then((response) => response.text())
                      .then((responseText) => {
                          const html = new DOMParser().parseFromString(responseText, 'text/html');
                          const selectors = ['cart-drawer-items'];
                          for (const selector of selectors) {
                              const targetElement = document.querySelector(selector);
                              const sourceElement = html.querySelector(selector);
                              if (targetElement && sourceElement) {
                                  targetElement.replaceWith(sourceElement);
                              }
                          }
                      })
                      .catch((e) => {
                          console.error(e);
                      });

                  fetch(`${routes.cart_url}?section_id=main-cart-items`)
                      .then((response) => response.text())
                      .then((responseText) => {
                        const html = new DOMParser().parseFromString(responseText, 'text/html');
                        const sourceQty = html.querySelector('#main-cart-items'); // Select the element with ID '#main-cart-items' from the response
                    
                        if (sourceQty) {
                          const targetElement = document.querySelector('#main-cart-items'); // Select the element with ID '#main-cart-items' in the current DOM
                          if (targetElement) {
                            targetElement.replaceWith(sourceQty); // Replace the target element with the fetched one
                          }
                        }
                      })
                      .catch((e) => {
                        console.error(e);
                      });


                  
                  $('.cart__total_price').text(formatMoney(response.original_total_price, moneyFormat));
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.error('Error fetching cart items:', textStatus, errorThrown);
                    console.error('Response:', XMLHttpRequest.responseText);
                }
            });
        }
        fetchCartItems();

    }

    function clearLocalStorage() {
        $('.cart__total_discount').text("");
        $('.cart__total_discount').css("display", "none");
        localStorage.removeItem("discountCode");
    }

    function applyDiscount(code) {
      
            $('.applied-discount-code-value').html("");
            $('.applied-discount-code-wrapper').css("display", "none");
            $('.apply-discount-btn').html("Applying <div class='loader'></div>");
            $('.apply-discount-btn').css("pointer-events", "none");
            fetch("/payments/config", {
                    "method": "GET"
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(data) {
                    const checkout_json_url = '/wallets/checkouts/';
                    authorization_token = btoa(data.paymentInstruments.accessToken)
                    fetch('/cart.js', {}).then(function(res) {
                            return res.json();
                        })
                        .then(function(data) {
                            let body = {
                                "checkout": {
                                    "country": Shopify.country,
                                    "discount_code": code,
                                    "line_items": data.items,
                                    'presentment_currency': Shopify.currency.active
                                }
                            }
                            fetch(checkout_json_url, {
                                    "headers": {
                                        "accept": "*/*",
                                        "cache-control": "no-cache",
                                        "authorization": "Basic " + authorization_token,
                                        "content-type": "application/json, text/javascript",
                                        "pragma": "no-cache",
                                        "sec-fetch-dest": "empty",
                                        "sec-fetch-mode": "cors",
                                        "sec-fetch-site": "same-origin"
                                    },
                                    "referrerPolicy": "strict-origin-when-cross-origin",
                                    "method": "POST",
                                    "mode": "cors",
                                    "credentials": "include",
                                    "body": JSON.stringify(body)
                                })
                                .then(function(response) {
                                    return response.json()
                                })
                                .then(function(data) {
                                    if (data.checkout && data.checkout.applied_discounts.length > 0) {
                                        let discountApplyUrl = "/discount/" + code + "?v=" + Date.now() + "&redirect=/checkout/";
                                        fetch(discountApplyUrl, {}).then(function(response) {
                                            return response.text();
                                        })
                                        $('.applied-discount-code-wrapper').css("display", "flex");
                                        $('.cart__total_discount').css("display", "flex");
                                        $('.discount-code-error').html("");
                                        $('.cart__total_price').text(formatMoney(data.checkout.total_price, moneyFormat));
                                        $('.applied-discount-code-value').text(data.checkout.discount_code);
                                        $('.cart__total_discount').text(formatMoney(data.checkout.total_discount_amount, moneyFormat))

                                        $.ajax({
                                            type: 'GET',
                                            url: '/cart.js',
                                            dataType: 'json',
                                            success: function(response) {
                                                  
                                              fetch(`${routes.cart_url}?section_id=cart-drawer`)
                                                  .then((response) => response.text())
                                                  .then((responseText) => {
                                                      const html = new DOMParser().parseFromString(responseText, 'text/html');
                                                      const selectors = ['cart-drawer-items'];
                                                      for (const selector of selectors) {
                                                          const targetElement = document.querySelector(selector);
                                                          const sourceElement = html.querySelector(selector);
                                                          if (targetElement && sourceElement) {
                                                              targetElement.replaceWith(sourceElement);
                                                          }
                                                      }
                                                  })
                                                  .catch((e) => {
                                                      console.error(e);
                                                  });
                                              
                                                fetch(`${routes.cart_url}?section_id=main-cart-items`)
                                                  .then((response) => response.text())
                                                  .then((responseText) => {
                                                    const html = new DOMParser().parseFromString(responseText, 'text/html');
                                                    const sourceQty = html.querySelector('#main-cart-items'); // Select the element with ID '#main-cart-items' from the response
                                                
                                                    if (sourceQty) {
                                                      const targetElement = document.querySelector('#main-cart-items'); // Select the element with ID '#main-cart-items' in the current DOM
                                                      if (targetElement) {
                                                        targetElement.replaceWith(sourceQty); // Replace the target element with the fetched one
                                                      }
                                                    }
                                                  })
                                                  .catch((e) => {
                                                    console.error(e);
                                                  });

                                              
                                            },
                                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                                console.error('Error fetching cart items:', textStatus, errorThrown);
                                                console.error('Response:', XMLHttpRequest.responseText);
                                            }
                                        });
                                      
                                        let localStorageValue = {
                                          'code': code.trim(),
                                          'totalCart': data.checkout.total_line_items_price
                                        };
                                        localStorage.setItem("discountCode", JSON.stringify(localStorageValue));
                                        
                                        $('.applied-discount-code-wrapper').css("display", "flex");
                                    } else {

                                      
                                        $('.applied-discount-code-value').html("");
                                        $('.discount-code-error').html("Please Enter Valid Coupon Code.");
                                      
                                        $('.applied-discount-code-wrapper').css("display", "none");
                                        clearLocalStorage();
                                    }
                                }).finally(function(params) {
                                    $('.apply-discount-btn').html("Apply");
                                    $('.apply-discount-btn').css("pointer-events", "all");
                                });
                        });
                });
    }

