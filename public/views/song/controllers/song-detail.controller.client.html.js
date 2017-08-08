(function() {
    angular.module('SpotifyParty')
        .controller('SongDetailController', SongDetailController);

    function SongDetailController(SongService, $routeParams, $location) {
        var model = this;

        model.goToSongList = goToSongList;

        var trackId = $routeParams['trackId'];
        var partyId = $routeParams['partyId'];
        function init() {
            SongService.getSongById(trackId)
                .then(function(songDetails){
                    model.song = songDetails;
                });
        }
        init();

        function goToSongList() {
            $location.path('/party/' + partyId + '/add-song');
        }

    }
})();