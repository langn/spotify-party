(function() {
    angular.module('SpotifyParty')
        .controller('AdminListController', AdminListController);

    function AdminListController(UserService) {
        const model = this;

        model.pageTitle = 'Admin User List';
        function init() {
            UserService.findAllUsers()
                .then((users) => {
                    model.users = users;
                });
        }
        init();
    }
})();