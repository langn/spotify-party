(function() {
    angular.module('SpotifyParty')
        .service('SongService', SongService);

    function SongService($http) {
        this.searchSong = searchSong;

        function searchSong(searchString) {
            return $http.get('/api/song/search' + '?searchString=' + searchString)
                .then(function(response) {
                    return response.data;
                })
        }
    }
})();
