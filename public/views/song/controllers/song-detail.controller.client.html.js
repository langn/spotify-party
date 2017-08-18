(function() {
    angular.module('SpotifyParty')
        .controller('SongDetailController', SongDetailController);

    function SongDetailController(SongService, PartyService, $window, $routeParams, $location) {
        const model = this;

        model.goToSongList = goToSongList;
        model.goToParty = goToParty;
        model.goBack = goBack;

        const trackId = $routeParams['trackId'];
        const partyId = $routeParams['partyId'];
        model.pageTitle = 'Song Details';
        function init() {
            SongService.getSongById(trackId)
                .then(function(songDetails){
                    const songLenthMin = songDetails.duration / 1000 / 60;
                    const songLenthSec = (songLenthMin - (Math.floor(songLenthMin))) * 60;
                    songDetails.duration = (Math.floor(songLenthMin)) + ':' + (Math.round(songLenthSec));
                    model.song = songDetails;
                });

            PartyService.getPartiesWithSong(trackId)
                .then((parties) => {
                   model.parties = parties;
                });
        }
        init();

        function goToSongList() {
            $location.path('/party/' + partyId + '/add-song');
        }

        function goBack() {
            $window.history.back();
        }

        function goToParty(party) {
            $location.path('/party/' + party._id);
        }

    }
})();