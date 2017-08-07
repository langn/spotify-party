(function() {
    angular.module('SpotifyParty')
        .controller('LoginController', LoginController);

    function LoginController() {
        var model = this;

        function init() {
            model.hello = "Hello from controller"
        }
        init();
    }
})();