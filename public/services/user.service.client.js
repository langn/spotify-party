(function() {
    angular.module('SpotifyParty')
        .service('UserService', UserService);

    function UserService($http) {
        this.createUser = createUser;
        this.adminCreateUser = adminCreateUser;
        this.updateUser = updateUser;
        this.findUserByUsername = findUserByUsername;
        this.findUserById = findUserById;
        this.followUser = followUser;
        this.getFollowedUsers = getFollowedUsers;
        this.findAllUsers = findAllUsers;
        this.deleteUser = deleteUser;
        this.updateUserById = updateUserById;


        function createUser(user) {
            return $http.post('/api/user', user);
        }

        function adminCreateUser(user) {
            return $http.post('/api/adminCreateUser', user);
        }

        function updateUser(user) {
            return $http.put('/api/user', user);
        }

        function updateUserById(userId, user) {
            return $http.put('/api/user/' + userId, user);
        }

        function followUser(userId) {
            return $http.put('/api/followUser/' + userId);
        }

        function getFollowedUsers() {
            return $http.get('/api/followingUsers')
                .then((response) => {
                    return response.data.following;
                });
        }

        function findUserByUsername(username) {
            return $http.get('/api/user?username=' + username)
                .then(function(response) {
                    return(response.data);
                }).catch(() => {
                    return null;
                });
        }

        function findAllUsers() {
            return $http.get('/api/getAllUsers')
                .then(function(response) {
                    return response.data;
                }).catch(() => {
                    return [];
                })
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/' + userId);
        }

        function findUserById(userId) {
            return $http.get('/api/user/' + userId)
                .then((response) => {
                    return response.data;
                }).catch(() => {
                    return null;
                });
        }
    }

})();