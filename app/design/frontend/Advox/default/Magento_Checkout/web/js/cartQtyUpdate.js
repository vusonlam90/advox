define([
    'jquery',
    'Magento_Checkout/js/action/get-totals',
    'Magento_Customer/js/customer-data'
], function ($, getTotalsAction, customerData) {

    // This will load ajax and update all important info in cart
    // There is a more easy way but may not best pracice and reload page when we just catch event on change and trigger click update button.
    $(document).ready(function(){
        $(document).on('change', 'input[name$="[qty]"]', function(){
            var form = $('form#form-validate');
            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                showLoader: true,
                success: function (res) {
                    var parsedResponse = $.parseHTML(res);
                    var result = $(parsedResponse).find("#form-validate");
                    var sections = ['cart'];

                    $("#form-validate").replaceWith(result);

                    /* Minicart reloading */
                    customerData.reload(sections, true);

                    /* Totals summary reloading */
                    var deferred = $.Deferred();
                    getTotalsAction([], deferred);
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    console.log(err.Message);
                }
            });
        });
    });
});
