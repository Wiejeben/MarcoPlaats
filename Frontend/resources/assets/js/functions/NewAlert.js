module.exports = function(role, feedback) {
    methods: {
        newAlert(type, message) {
            $(".messages").append("<div class='alert alert-" + type + " fade in'><a href='#' class='close' data-dismiss='alert'>&times;</a> " + message + "</div>");
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $(".alert").delay(3000).fadeOut("slow", function () { $(this).remove(); });
        }
    }
}