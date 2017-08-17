(function() {
    angular.module('SpotifyParty')
        .controller('RegisterController', RegisterController);

    function RegisterController(UserService, $location) {
        const model = this;

        this.registerUser = registerUser;

        model.pageTitle = 'Register';
        function init() {
            model.invalidState = false;
            model.invalidStateMessage = "";
        }
        init();

        function registerUser(user) {
            if (checkFields(user)) {
                UserService.createUser(user)
                    .then((response) => {
                        $location.path('/login');
                    })
                    .catch((error) => {
                        if (error.status === 409) {
                            model.invalidState = true;
                            model.invalidStateMessage = 'That username is taken. Try a different username.'
                        } else {
                            console.log('Error creating user ' + error);
                        }
                    });
            }
        }

        //Returns true if the fields are valid. If not, it sets the error message
        function checkFields(user) {
            if (!user || !user.username || !user.firstName || !user.lastName || !user.password || !user.verifyPassword) {
                model.invalidState = true;
                model.invalidStateMessage = 'One or more required fields is empty';
                return false;
            } else {
                if (user.password !== user.verifyPassword) {
                    model.invalidState = true;
                    model.invalidStateMessage = 'The two passwords do not match. Try again.';
                    return false;
                }
            }
            return true;
        }


    }

})();