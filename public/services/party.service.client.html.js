(function() {
    angular.module('SpotifyParty')
        .service('PartyService', PartyService);

    function PartyService($http) {
        this.searchSong = searchSong;
        this.addSongToParty = addSongToParty;

        function addSongToParty(partyId, songId) {
            return $http.put("/api/party/" + partyId + "/add-song", song)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();