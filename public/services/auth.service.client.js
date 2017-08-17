(function() {
    angular.module('SpotifyParty')
        .service('AuthService', AuthService);

    function AuthService($http) {
        this.login = login;

        function login(username, password) {
            const user = {
                username: username,
                password: password
            };
            return $http.post('/api/login', user);
        }
    }
})();