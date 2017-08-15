(function() {
    angular.module('SpotifyParty')
        .service('PartyService', PartyService);

    function PartyService($http) {
        this.searchSong = searchSong;
        this.checkIfPartyExists = checkIfPartyExists;
        this.addSongToParty = addSongToParty;

        function checkIfPartyExists(partyId) {

        }

        function addSongToParty(partyId, songId) {
            return $http.put("/api/party/" + partyId + "/add-song", song)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();