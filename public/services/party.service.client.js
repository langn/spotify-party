(function() {
    angular.module('SpotifyParty')
        .service('PartyService', PartyService);

    function PartyService($http, CacheFactory) {
        this.createParty = createParty;
        this.getPartyById = getPartyById;
        this.fetchCachedId = fetchedCachedId;
        this.getPartiesForUser = getPartiesForUser;
        this.getPartiesWithSong = getPartiesWithSong;

        let partyCache;

        if (!CacheFactory.get('partyCache')) {
            partyCache = CacheFactory('partyCache');
        }

        function fetchedCachedId() {
            return partyCache.get('/party-id');
        }

        function createParty() {
            return $http.post('/api/party')
                .then(function(response) {
                    partyCache.put('/party-id', response.data._id);
                    console.log(partyCache.get('/party-id'));
                    return response.data;
                });
        }

        function getPartyById(partyId) {
            partyCache.put('/party-id', partyId);
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

        function getPartiesForUser() {
            return $http.get('/api/party')
                .then((response) => {
                    return response.data;
                }).catch((error) => {
                    console.error(error);
                });
        }

        function getPartiesWithSong(trackId) {
            return $http.get('/api/party/song/' + trackId)
                .then((response) => {
                    return response.data;
                }).catch((error) => {
                    console.error(error);
                });
        }

    }
})();