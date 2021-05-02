var calcData = null

$(function () {
    $(
        "#calc input,#calc textarea,#calc button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            var form = event.target;

            disableAllButtons(form);

            var area =  parseInt($("#area").val());
            var type =  parseInt($("#type").val());
            var ceil =  parseInt($("#ceil").val());
            var pack =  parseInt($("#pack").val());
            var de =    parseInt($("#de").val());
            
            var meterPriceThousands = 0;
            switch(pack) {
                case 1:
                    meterPriceThousands = area >= 75 ? 20 : 25;
                    break;
                case 2:
                    meterPriceThousands = area >= 75 ? 25 : 30;
                    break;
                case 3:
                    meterPriceThousands = area >= 100 ? 40 : 45;
                    break;
            }

            if(type === 2) {
                meterPriceThousands += 2;
            }

            if(de === 2) {
                meterPriceThousands += 2;
            }

            if(ceil === 2) {
                meterPriceThousands += 2;
            }
            
            var totalPrice = (meterPriceThousands * 1000 * area).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");


            // PUT DATA TO MODAL

            $('#results-area').text(area+" м²");
            $('#results-type').text(type === 1 ? "Новый дом" : "Старый дом");
            $('#results-pack').text(() => {
                switch(pack) {
                    case 1:
                        return "Базовый";
                    case 2:
                        return "Базовый +";
                    default:
                        return "Премиум";
                }
            });
            $('#results-ceil').text(ceil === 1 ? "3 метра или ниже" : "Выше 3 метров");
            $('#results-de').text(de === 1 ? "Нет" : "Да");
            $('#results-sum').text(totalPrice+"₸");

            // Save data for request
            calcData = {
                0: area,
                1: type,
                2: ceil,
                3: pack,
                4: de,
                5: totalPrice
            }
        
            $('#calculate-button-text').addClass('d-none')
            $('#calculate-button-spin').removeClass('d-none')    

            setTimeout(() => { 
                $('#calcModal').modal('show');
                enableAllButtons(form);
                $('#calculate-button-text').removeClass('d-none')
                $('#calculate-button-spin').addClass('d-none')
            }, Math.random() * 500 + 500);
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});


function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

function enableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

function scrollToAnchor(aid){
    var aTag = $("#"+ aid);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}