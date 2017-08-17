(function() {
    angular.module('SpotifyParty')
        .service('PartyService', PartyService);

    function PartyService($http) {
        this.createParty = createParty;
        this.getPartyById = getPartyById;

        function createParty() {
            return $http.post('/api/party')
                .then(function(response) {
                    return response.data;
                });
        }

        function getPartyById(partyId) {
            return $http.get('/api/party/' + partyId)
                .then((response) => {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        return null;
                    }
                }).catch((error) => {
                    console.error(error);
                })
        }

    }
})();