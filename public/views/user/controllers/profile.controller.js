(function() {
    angular.module('SpotifyParty')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService, $window, user, $location) {
        const model = this;

        model.goBack = goBack;
        model.updateUser = updateUser;

        model.pageTitle = 'Profile';
        function init() {
            model.user = user;
        }
        init();

        function goBack() {
            $window.history.back();
        }

        function updateUser() {
            UserService.updateUser(model.user)
                .then(() => {
                    $location.path("/");
                });
        }
    }

})();