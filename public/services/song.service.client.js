(function() {
    angular.module('SpotifyParty')
        .service('SongService', SongService);

    function SongService($http) {
        this.searchSong = searchSong;
        this.getSongById = getSongById;

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

    }
})();
