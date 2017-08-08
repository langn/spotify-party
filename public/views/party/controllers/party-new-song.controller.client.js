(function() {
    angular.module('SpotifyParty')
        .controller('NewSongController', NewSongController);

    function NewSongController(SongService, $location, $routeParams) {
        var model = this;

        model.searchSong = searchSong;
        model.goToDetails = goToDetails;

        var partyId = $routeParams['partyId'];
        function init() {

        }
        init();

        function searchSong(searchString) {
            SongService.searchSong(searchString)
                .then(function(songs) {
                    model.songs = songs;
                });
        }

        function goToDetails(trackId) {
            $location.path('/party/' + partyId + /song/ + trackId);
        }
    }
})();