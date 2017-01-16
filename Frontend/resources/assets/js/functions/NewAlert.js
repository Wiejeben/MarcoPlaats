module.exports = function(Type, Message) {
    "use strict";

    eventHub.$emit('show-alert', {
        "Type": Type, 
        "Message": Message
    });
}

eventHub.$on('show-alert', function(data) {
    $(".messages").append("<div class='alert alert-" + data.Type + " fade in'><a href='#' class='close' data-dismiss='alert'>&times;</a> " + data.Message + "</div>");
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".alert").delay(3000).fadeOut("slow", function () { $(this).remove(); });
});