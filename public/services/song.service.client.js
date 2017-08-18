(function() {
    angular.module('SpotifyParty')
        .service('SongService', SongService);

    function SongService($http) {
        this.searchSong = searchSong;
        this.getSongById = getSongById;
        this.addSongToParty = addSongToParty;
        this.voteSong = voteSong;

        function searchSong(searchString) {
            return $http.get('/api/song/search' + '?searchString=' + searchString)
                .then(function(response) {
                    return response.data;
                })
        }

        function getSongById(trackId) {
            return $http.get('/api/song/' + trackId)
                .then(function(response) {
                    return response.data;
                });
        }

        function addSongToParty(partyId, song) {
            return $http.put("/api/party/" + partyId + "/add-song", song)
                .then((response) => {
                    if (response.status !== 204) {
                        console.error('Issue adding song to party' + error);
                    }
                }).catch((error) => {
                    console.error(error);
                });
        }

        function voteSong(partyId, songId, direction) {
            return $http({
                method: 'PUT',
                url: '/api/party/' + partyId + '/song/' + songId + '/vote/' + direction
            });
        }
    }
})();
