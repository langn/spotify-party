(function() {
    angular.module('SpotifyParty')
        .controller('LoginController', LoginController);

    function LoginController() {
        var model = this;

        model.pageTitle = 'Login';
        function init() {
        }
        init();
    }
})();