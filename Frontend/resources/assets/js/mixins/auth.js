module.exports = {
    data() {
        return {
            Roles: [
                { name: 'admin', selected: false },
                { name: 'user', selected: false }, 
                { name: 'blocked', selected: false }
            ],
        }
    },
    methods: {
        newAlert(type, message) {
            $(".messages").append("<div class='alert alert-" + type + " fade in'><a href='#' class='close' data-dismiss='alert'>&times;</a> " + message + "</div>");
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $(".alert").delay(3000).fadeOut("slow", function () { $(this).remove(); });
        }
    }
}
