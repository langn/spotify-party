(function() {
    angular.module('SpotifyParty')
        .controller('ProfileController', ProfileController);

    function ProfileController(UserService, $window) {
        const model = this;

        model.goBack = goBack;
        model.goToAddFriend = goToAddFriend;

        model.pageTitle = 'Profile';
        function init() {

        }
        init();

        function goBack() {
            $window.history.back();
        }

        function goToAddFriend() {
            //TODO
        }
    }

})();