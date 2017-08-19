(function() {
    angular.module('SpotifyParty')
        .controller('PartyController', PartyController);

    function PartyController(PartyService, SongService, $routeParams, $location) {
        const model = this;

        model.goToUsers = goToUsers;
        model.goToSongSearch = goToSongSearch;
        model.upvoteSong = upvoteSong;
        model.downvoteSong = downvoteSong;
        model.goToDetails = goToDetails;

        const partyId = $routeParams['partyId'];

        function init() {
            PartyService.getPartyById(partyId)
                .then((party) => {
                    model.party = party;
                    model.pageTitle = model.party.host.username + '\'s Party';
                }).catch((error) => {
                    console.error(error);
            });
            model.multipleVotes = false;
        }
        init();

        function goToUsers() {

        }

        function goToSongSearch() {
            $location.path('/party/' + partyId + '/add-song');
        }

        function upvoteSong(song) {
            SongService.voteSong(partyId, song.trackId, 'UP')
                .then(() => {
                    song.votes += 1;
                }).catch((error) => {
                    if (error.status === 401) {
                        $location.path('/login');
                    } else if (error.status === 403) {
                        model.multipleVotes = true;
                    }
            });
        }

        function downvoteSong(song) {
            SongService.voteSong(partyId, song.trackId, 'DOWN')
                .then(() => {
                    song.votes -= 1;
                }).catch((error) => {
                if (error.status === 401) {
                    $location.path('/login');
                } else if (error.status === 403) {
                    model.multipleVotes = true;
                }
            });
        }

        function goToDetails(song) {
            $location.path('/party/' + partyId + '/song/' + song.trackId);
        }

    }

})();