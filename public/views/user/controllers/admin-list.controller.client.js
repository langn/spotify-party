(function() {
    angular.module('SpotifyParty')
        .controller('AdminListController', AdminListController);

    function AdminListController(UserService, $location) {
        const model = this;

        model.deleteUser = deleteUser;
        model.goToUser = goToUser;

        model.pageTitle = 'Admin User List';
        function init() {
            UserService.findAllUsers()
                .then((users) => {
                    model.users = users;
                });
        }
        init();

        function deleteUser(userId) {
            UserService.deleteUser(userId)
                .then(() => {
                    model.users = _.reject(model.users, {_id: userId});
                }).catch((error) => {
                    console.error('Error removing user ' + error);
            });
        }

        function goToUser(user) {
            $location.path('/admin/user/' + user._id);
        }
    }
})();