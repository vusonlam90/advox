define(['jquery', 'mage/translate','mage/storage', 'jquery/jquery-storageapi'], function ($) {
    $(document).ready(function(){
        var init = function(){
            addFavouriteBtn();
            triggerFavBtn();
        }

        // Add Favourite Button By Js, but thí may not best practice and UX UI because it load after document and product loaded
        // There maybe another solution is set parameter templates of list item in catalog page to new templates file and add Fav Btn to that specify custom teplates.
        var addFavouriteBtn = function(){
            var countItem = $('ol.product-items .product-item').length;
            var markBtn = "<div class='mark-favourite'></div>";

            for (var i = 0; i < countItem; i++) {
                $('ol.product-items .product-item').eq(i).find('.product-item-inner').append(markBtn);
                $('ol.product-items .product-item').eq(i).find('.mark-favourite').text($.mage.__('Mark as Favourite'));
            }

            setFavItems();
        }

        // Trigger Favourite Button
        var triggerFavBtn = function(){
            $(document).on('click','.mark-favourite',function(){

                if($(this).hasClass('active')) {
                    $(this).text($.mage.__('Mark as Favourite'));
                } else {
                    $(this).text($.mage.__('Already in Favourites'));
                }
                $(this).parents('.product-item').toggleClass('favourite');
                $(this).toggleClass('active')

                saveFavLocalStorage();
            });
        }

        // Push Array ProductID Favourites Items to Local Storage
        var saveFavLocalStorage = function(){
            var listItems = [];
            var countItem = $('ol.product-items .product-item').length;

            for (var i = 0; i < countItem; i++) {
                if($('ol.product-items .product-item').eq(i).hasClass('favourite')) {
                    var productID = $('ol.product-items .product-item').eq(i).find('.product-item-info').attr('id');
                    listItems.push(productID);
                }
            }

            localStorage.setItem("listItems", JSON.stringify(listItems));
        }

        // Get Data from Local Storage and set Favourites items base on ProductID
        var setFavItems = function(){
            var retrievedData = localStorage.getItem('listItems');
            if(retrievedData !== null) {
                var favList = JSON.parse(retrievedData);

                for (var i = 0; i < favList.length; i++) {
                    $('#'+favList[i]).parent().addClass('favourite');
                    $('#'+favList[i]).find('.mark-favourite').addClass('active').text($.mage.__('Already in Favourites'));
                }
            }
        }

        init();

    });
});
