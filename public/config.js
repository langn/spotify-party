(function() {
    angular.module('SpotifyParty')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: 'views/user/templates/login.view.client.html',
            controller: 'LoginController',
            controllerAs: 'model'
        }).when("/party/:partyId/add-song", {
            templateUrl: 'views/party/templates/party-new-song.view.client.html',
            controller: 'NewSongController',
            controllerAs: 'model'
        });
    }
})();