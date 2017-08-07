(function() {
    angular.module('SpotifyParty')
        .controller('NewSongController', NewSongController);

    function NewSongController(SongService) {
        var model = this;

        this.searchSong = searchSong;

        function init() {

        }
        init();

        function searchSong(searchString) {
            SongService.searchSong(searchString)
                .then(function(songs) {
                    model.songs = songs;
                });
        }
    }
})();