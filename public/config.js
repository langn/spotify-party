(function() {
    angular.module('SpotifyParty')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: 'views/home/templates/home.view.client.html',
            controller: 'HomeController',
            controllerAs: 'model'
        }).when("/login", {
            templateUrl: 'views/user/templates/login.view.client.html',
            controller: 'LoginController',
            controllerAs: 'model'
        }).when("/register", {
            templateUrl: 'views/user/templates/register.view.client.html',
            controller: 'RegisterController',
            controllerAs: 'model'
        }).when("/profile", {
            templateUrl: 'views/user/templates/profile.view.client.html',
            controller: 'ProfileController',
            controllerAs: 'model'
        }).when("/party/:partyId", {
            templateUrl: 'views/party/templates/party.view.client.html',
            controller: 'PartyController',
            controllerAs: 'model'
        }).when("/party/:partyId/add-song", {
            templateUrl: 'views/party/templates/party-new-song.view.client.html',
            controller: 'NewSongController',
            controllerAs: 'model'
        }).when("/party/:partyId/song/:trackId", {
            templateUrl: 'views/song/templates/song-detail.view.client.html',
            controller: 'SongDetailController',
            controllerAs: 'model'
        });
    }
})();