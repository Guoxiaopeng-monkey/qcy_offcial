$('.submit-btn').click(() => {
    $('.custom-modal-section').addClass('open');
    $('body').addClass('no-scroll');
});

$('.custom-modal-section .overlay, .custom-modal-section .custom-close').click(() => {
    $('.custom-modal-section').removeClass('open');
    $('body').removeClass('no-scroll');
});

$('.custom-input-box').each(function () {
    var $container = $(this);
    var $input = $container.find('.custom-input');
    var $options = $container.find('.select-tag-option p');
    var $followUpContainer = $('.custom-input-box.follow-up');
    var $followUpInput = $followUpContainer.find('.custom-input');
    var $followUpOptions = $followUpContainer.find('.select-tag-option');

    // Define the options based on the selected service
    var optionsMapping = {
        'Product': [
            'Product quantity',
            'Product features',
            "The Product didn't meet your expectation"
        ],
        'Service': [
            'Solution Provided',
            'Procedure Efficiency',
            'Service Policy'
        ],
        'Employee': [
            'Service Attitude',
            'Professionalism',
            'Promise not Fulfilled',
            'Response Time'
        ],
        'About repair service': [
            'Repair period',
            'Repair cost',
            'Payment issue',
            'Diagnose result',
            'Multiple repairs',
            'Invoice issue',
            'Logistic issue'
        ],
        'Sales': [
            "Purchase issue",
            "Return or replacement issue",
            "Logistic issue",
            "Sales employee"
        ],
        'Others': [
            "Feedback",
            "Praise",
            "Complaint",
            "Others",
            "I will write it down in the textbox below"
        ]
    };

    // Handle click on product option
    $options.click(function (event) {
        var selectedText = $(this).text();

        // Set the value and placeholder in the services-follow input
        $input.val(selectedText).attr('placeholder', selectedText);

        // Clear the visible text on focus, but retain the value
        $input.focus(function () {
            $(this).val(''); // Clear the input text when focused
        }).blur(function () {
            // If no new text is entered, restore the selected value
            if (!$(this).val()) {
                $(this).val(selectedText);
            }
        });

        // Update the follow-up options based on the selected service
        if (optionsMapping[selectedText]) {
            $followUpOptions.empty(); // Clear previous options
            optionsMapping[selectedText].forEach(function (option) {
                $followUpOptions.append('<p class="mx-0">' + option + '</p>');
            });
        } else {
            $followUpOptions.empty(); // Clear if no mapping exists
        }
    });

    // Handle click on follow-up options
    $followUpOptions.on('click', 'p', function () {
        var followUpSelectedText = $(this).text();

        // Set the value and placeholder in the follow-up input
        $followUpInput.val(followUpSelectedText).attr('placeholder', followUpSelectedText);

        // Clear the visible text on focus, but retain the value
        $followUpInput.focus(function () {
            $(this).val(''); // Clear the input text when focused
        }).blur(function () {
            // If no new text is entered, restore the selected value
            if (!$(this).val()) {
                $(this).val(followUpSelectedText);
            }
        });
    });

    // Filter options based on input value for services-follow
    $input.on('input', function () {
        var searchText = $(this).val().toLowerCase();

        // Show or hide options based on search text
        $options.each(function () {
            var optionText = $(this).text().toLowerCase();
            if (optionText.includes(searchText)) {
                $(this).show(); // Show matching option
            } else {
                $(this).hide(); // Hide non-matching option
            }
        });
    });

    // Filter options based on input value for follow-up
    $followUpInput.on('input', function () {
        var searchText = $(this).val().toLowerCase();

        // Show or hide options based on search text
        $followUpOptions.children('p').each(function () {
            var optionText = $(this).text().toLowerCase();
            if (optionText.includes(searchText)) {
                $(this).show(); // Show matching option
            } else {
                $(this).hide(); // Hide non-matching option
            }
        });
    });
});

$(document).ready(function () {
    // Check if the URL contains 'contact_posted=true#contact_form'
    if (window.location.href.indexOf('contact_posted=true#contact_form') !== -1) {
        $('.custom-modal-section').addClass('open');
        $('.custom-modal-container').addClass('form-success');
        $('body').addClass('no-scroll');
    }
});