$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            $(".errormessage").removeClass('show');
            event.preventDefault(); // prevent default submit behaviour
            var form = event.target;
            disableAllButtons(form);

            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var message = $("input#message").val();

            $('#contact-button-text').addClass('d-none')
            $('#contact-button-spin').removeClass('d-none')

            var data = {
                "name": name,
                "phone": phone,
                "message": message === "" ? null : message
            }
            
            data = JSON.stringify(data)
            calc = JSON.stringify(calcData)
            
            $.post('/form', {data: data, calc: calc}, function(response) {
                if(response === "ok") {
                    $(".form-elements").hide();
                    $(".contact_title").text("Спасибо!");
                    $('.thankyou').addClass('show');
                } else {
                    $(".errormessage").addClass("show");
                    $('#contact-button-text').removeClass('d-none')
                    $('#contact-button-spin').addClass('d-none')
                    enableAllButtons(event.target);
                }
            });
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