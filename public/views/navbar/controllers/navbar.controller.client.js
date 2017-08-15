(function() {
    angular.module('SpotifyParty')
        .controller('NavController', NavController)
        .directive('mainNav', mainNavDirective);

    function NavController($routeParams, $route) {
        var navModel = this;

        var trackId = $routeParams['trackId'];
        var partyId = $routeParams['partyId'];

        navModel.pageName = 'UNKNOWN PAGE';
        function init() {
            navModel.pageName = getPage();
            console.log('Page name: ' + navModel.pageName);
        }
        init();

        function getPage() {
            var page = 'UNKNOWN-PAGE';

            switch ($route.current.templateUrl) {
                case 'views/song/templates/song-detail.view.client.html':
                    page = 'SONG-DETAILS';
                    break;
                case 'views/home/templates/home.view.client.html' :
                    page = 'HOME';
                    break;
            }
            return page;
        }


    }

    function mainNavDirective() {
        return {
            templateUrl: '/views/navbar/templates/navbar.view.client.html',
            controller: 'NavController',
            controllerAs: 'navModel'
        }
    }
})();