(function() {
    angular.module('SpotifyParty')
        .controller('UserDetailsController', UserDetailsController);

    function UserDetailsController(UserService, $routeParams, $location) {
        const model = this;

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        model.pageTitle = 'User Edit';
        const userId = $routeParams['userId'];
        function init() {
            UserService.findUserById(userId)
                .then((user) => {
                    model.user = user;
                    model.following = user.following;
                }).catch((error) => {
                    console.error('Error retrieving user details ' + error);
            });
        }
        init();

        function updateUser() {
            UserService.updateUserById(userId, model.user)
                .then(() => {
                    $location.path('/admin');
                }).catch((error) => {
                    console.error('Error updating user ' + error);
            });
        }

        function deleteUser() {
            UserService.deleteUser(userId)
                .then(() => {
                    $location.path('/admin');
                }).catch((error) => {
                    console.error('Error deleting user ' + error);
            });
        }
    }
})();