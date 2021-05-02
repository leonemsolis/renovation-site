$(function () {
    $(
        "#calc input,#calc textarea,#calc button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            console.log("FAIL")
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            console.log("SUCCESS")
            event.preventDefault(); // prevent default submit behaviour
            var form = event.target;

            var area =  parseInt($("#area").val());
            var type =  parseInt($("#type").val());
            var ceil =  parseFloat($("#ceil").val());
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

            if(ceil > 3) {
                meterPriceThousands += 2;
            }

            var totalPrice = meterPriceThousands * 1000 * area;

            
            console.log("AREA = "+area + ", TYPE = "+type + ", PACK = "+pack + ", CEIL = "+ceil + ", DE = "+de);
            console.log(totalPrice);


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