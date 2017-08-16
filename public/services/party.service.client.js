(function() {
    angular.module('SpotifyParty')
        .service('PartyService', PartyService);

    function PartyService($http) {
        this.createParty = createParty;
        this.getPartyById = getPartyById;

        function createParty(host) {
            return $http.post('/api/party', host)
                .then(function(response) {
                    return response.data;
                }).catch((error) => {
                    console.error(error);
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