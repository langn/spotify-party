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
                case 'views/home/templates/home.view.client.html' :
                    page = 'HOME';
                    break;
                case 'views/user/templates/login.view.client.html' :
                    page = 'LOGIN';
                    break;
                case 'views/user/templates/register.view.client.html' :
                    page = 'REGISTER';
                    break;
                case 'views/user/templates/profile.view.client.html' :
                    page = 'PROFILE';
                    break;
                case 'views/party/templates/party.view.client.html' :
                    page = "PARTY";
                    break;
                case 'views/party/templates/party-new-song.view.client.html' :
                    page = "NEW-SONG";
                    break;
                case 'views/song/templates/song-detail.view.client.html':
                    page = 'SONG-DETAILS';
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