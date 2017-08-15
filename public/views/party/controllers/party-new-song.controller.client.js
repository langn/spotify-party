(function() {
    angular.module('SpotifyParty')
        .controller('NewSongController', NewSongController);

    function NewSongController(SongService, $location, $routeParams) {
        const model = this;

        model.searchSong = searchSong;
        model.goToParty = goToParty;
        model.goToDetails = goToDetails;

        const partyId = $routeParams['partyId'];
        model.pageTitle = 'Song Search';
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

        function goToParty() {
            $location.path('/party/' + partyId);
        }
    }
})();