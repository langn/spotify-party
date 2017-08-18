(function() {
    angular.module('SpotifyParty')
        .controller('FollowUserController', FollowUserController);

    function FollowUserController(UserService, $location, user) {
        const model = this;

        model.searchUsername = searchUsername;
        model.followUser = followUser;

        model.pageTitle = 'Follow User';
        function init() {
            model.notFound = false;
        }
        init();

        function searchUsername(username) {
            model.notFound = false;
            UserService.findUserByUsername(username)
                .then(function(user) {
                    if (!user) {
                        model.notFound = true;
                    } else {
                        model.matchingUser = user;
                    }
            });
        }

        function followUser(userId) {
            UserService.followUser(userId)
                .then(() => {
                    $location.path('/following');
                });
        }
    }
})();