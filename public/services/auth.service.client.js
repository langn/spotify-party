(function() {
    angular.module('SpotifyParty')
        .service('AuthService', AuthService);

    function AuthService($http) {
        this.login = login;
        this.checkLogin = checkLogin;
        this.logout = logout;

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

        function logout() {
            return $http.post('/api/logout');
        }
    }
})();