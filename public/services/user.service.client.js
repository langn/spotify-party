(function() {
    angular.module('SpotifyParty')
        .service('UserService', UserService);

    function UserService($http) {
        this.createUser = createUser;

        function createUser(user) {
            return $http.post('/api/user', user);
        }
    }

})();