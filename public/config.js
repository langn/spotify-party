(function() {
    angular.module('SpotifyParty')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: 'views/home/templates/home.view.client.html',
            controller: 'HomeController',
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