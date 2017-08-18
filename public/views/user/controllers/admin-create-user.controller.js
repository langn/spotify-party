(function() {
    angular.module('SpotifyParty')
        .controller('AdminCreateUserController', AdminCreateUserController);

    function AdminCreateUserController(UserService, $location) {
        const model = this;

        model.createUser = createUser;

        model.pageTitle = 'Admin Create User';
        function init() {
            model.invalidState = false;
        }
        init();

        function createUser() {
            UserService.adminCreateUser(model.user)
                .then(() => {
                    $location.path('/admin');
                }).catch((error) => {
                    console.error('Error creating user ' + error);
                    if (error.status === 400) {
                        model.invalidState = true;
                        model.invalidStateMessage = 'One or more required fields was missing';
                    } else if (error.status === 409) {
                        model.invalidState = true;
                        model.invalidStateMessage = 'A user with that username already exists'
                    }
            })
        }
    }
})();
