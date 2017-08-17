(function() {
    angular.module('SpotifyParty')
        .service('AuthService', AuthService);

    function AuthService($http) {
        this.login = login;
        this.checkLogin = checkLogin;

        function login(username, password) {
            const user = {
                username: username,
                password: password
            };
            return $http.post('/api/login', user);
        }

        function checkLogin() {
            return $http.get('/api/checkLogin')
                .then((response) => {
                    return response.data;
                });
        }
    }
})();