(function() {
    angular.module('SpotifyParty')
        .service('UserService', UserService);

    function UserService($http) {
        this.createUser = createUser;
        this.updateUser = updateUser;
        this.findUserByUsername = findUserByUsername;
        this.followUser = followUser;

        function createUser(user) {
            return $http.post('/api/user', user);
        }

        function updateUser(user) {
            return $http.put('/api/user', user);
        }

        function followUser(userId) {
            return $http.put('/api/user/follow', userId);
        }

        function findUserByUsername(username) {
            return $http.get('/api/user?username=' + username)
                .then(function(response) {
                    return(response.data);
                }).catch(() => {
                    return null;
                });
        }

    }

})();