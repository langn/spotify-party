(function() {
    angular.module('SpotifyParty')
        .controller('FollowingController', FollowingController);

    function FollowingController(UserService) {
        const model = this;

        this.pageTitle = "Followed Users";
        function init() {
            UserService.getFollowedUsers()
                .then((following) => {
                    model.following = following;
                })
        }
        init();
    }
})();