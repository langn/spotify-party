(function() {
    angular.module('SpotifyParty')
        .service('AuthService', AuthService);

    function AuthService($http) {
        this.login = login;
        this.checkLogin = checkLogin;
        this.logout = logout;
        this.checkIfAdmin = checkIfAdmin;

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

        function checkIfAdmin() {
            return $http.get('/api/checkAdmin')
                .then((response) => {
                    return response.data;
                }).catch((error) => {
                    if (error.status === 401) {
                        return false;
                    }
                });
        }

        function logout() {
            return $http.post('/api/logout');
        }
    }
})();