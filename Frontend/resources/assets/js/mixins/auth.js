module.exports = {
    created() {

        if (localStorage.getItem("authorization") != null)
        {
            this.$http.get('http://localhost:8080/auth/user').then((response) => {
                    window.User = response;
                },
                (response) => {
                    alert('Kon geen verbinding maken met de Marcoplaats API.')
                })
        }
    }
}

