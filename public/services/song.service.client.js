(function() {
    angular.module('SpotifyParty')
        .service('SongService', SongService);

    function SongService($http, CacheFactory) {
        this.searchSong = searchSong;
        this.getSongById = getSongById;
        this.addSongToParty = addSongToParty;
        this.voteSong = voteSong;
        this.fetchSongsFromCache = fetchSongsFromCache;

        let songCache;

        if (!CacheFactory.get('songCache')) {
            songCache = CacheFactory('songCache');
        }

        function fetchSongsFromCache() {
            return songCache.get('/songs');
        }

        function searchSong(searchString) {
            songCache.remove('/songs');
            return $http.get('/api/song/search' + '?searchString=' + searchString)
                .then(function(response) {
                    songCache.put('/songs', response.data);
                    console.log(songCache.get('/songs'));
                    return response.data;
                });
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
