(function() {
    angular.module('SpotifyParty')
        .controller('HomeController', HomeController);

    function HomeController() {
        const model = this;

        model.goToParty = goToParty;
        model.createParty = createParty;

        function init() {}
        init();

        function goToParty() {

        }

        function createParty() {

        }
    }
})();