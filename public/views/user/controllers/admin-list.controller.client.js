(function() {
    angular.module('SpotifyParty')
        .controller('AdminListController', AdminListController);

    function AdminListController(UserService) {
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

        function deleteUser(user) {
            UserService.deleteUser(user)
                .then(() => {
                    model.users = _.reject(model.users, {_id: user._id});
                }).catch((error) => {
                    console.error('Error removing user ' + error);
            });
        }

        function goToUser(user) {

        }
    }
})();