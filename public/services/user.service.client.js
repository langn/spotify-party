(function() {
    angular.module('SpotifyParty')
        .service('UserService', UserService);

    function UserService($http) {
        this.createUser = createUser;
        this.updateUser = updateUser;

        function createUser(user) {
            return $http.post('/api/user', user);
        }

        function updateUser(user) {
            return $http.put('/api/user', user);
        }

    }

})();