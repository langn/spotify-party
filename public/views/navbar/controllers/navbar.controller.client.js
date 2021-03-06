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
                case 'views/user/templates/follow-user.view.client.html' :
                    page = 'FOLLOW-USER';
                    break;
                case 'views/user/templates/following.view.client.html' :
                    page = 'FOLLOWING';
                    break;
                case 'views/user/templates/admin-list.view.client.html' :
                    page = 'ADMIN-LIST';
                    break;
                case 'views/user/templates/admin-create-user.view.client.html' :
                    page = 'ADMIN-CREATE-USER';
                    break;
                case 'views/user/templates/user-details.view.client.html' :
                    page = 'USER-DETAILS';
                    break;
                case 'views/party/templates/party-list.view.client.html' :
                    page = "PARTY-LIST";
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