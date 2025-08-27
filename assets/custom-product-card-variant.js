function bindClickEvents() {
    $('.product-item').each(function(){
        var $container = $(this);

        $container.find('.variant-option-container .option-var').off('click').on('click', function(){
             
            var selectedVariantId = $(this).attr('data-variant-id');
          
            $container.find('.variant-option-container .option-var').removeClass('selected');
            $(this).addClass('selected');
          
            $container.find('.product-image').attr('src', $(this).attr('data-variant-image'));
          
            $container.find('.add_cart_form').attr('id', $(this).attr('data-variant-id'));
            $container.find('input[name="product-id"]').attr('value', $(this).attr('data-variant-id'));
            $container.find('.product-variant-id').attr('value', $(this).attr('data-variant-id'));

            $container.find('.learn-more-btn').attr('href', '/cart/' + selectedVariantId + ':1');

        });
    });
}
bindClickEvents();

