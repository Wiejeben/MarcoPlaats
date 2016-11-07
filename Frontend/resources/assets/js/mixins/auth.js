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
    mounted() {
        // Redirect user to front-page if he is not logged in.
        if (!window.LoggedIn){
            window.location.href = '/';
        }

        eventHub.$once('user-undefined', function(){
            window.location.href = '/';
        });
    },
    methods: {
        newAlert(type, message) {
            $(".messages").append("<div class='alert alert-" + type + " fade in'><a href='#' class='close' data-dismiss='alert'>&times;</a> " + message + "</div>");
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $(".alert").delay(3000).fadeOut("slow", function () { $(this).remove(); });
        }
    }
}
