(function() {
    angular.module('SpotifyParty')
        .controller('LoginController', LoginController);

    function LoginController(AuthService, $location) {
        var model = this;

        model.login = login;

        model.pageTitle = 'Login';
        function init() {
            model.invalidLogin = false;
        }
        init();

        function login(user) {
            AuthService.login(user.username, user.password)
                .then((response) => {
                    $location.path('/profile')
                }).catch((error) => {
                    model.invalidLogin = true;
            });
        }
    }
})();