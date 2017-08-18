(function() {
    angular.module('SpotifyParty')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: 'views/home/templates/home.view.client.html',
            controller: 'HomeController',
            controllerAs: 'model',
            resolve: {
                user: checkLogin
            }
        }).when("/login", {
            templateUrl: 'views/user/templates/login.view.client.html',
            controller: 'LoginController',
            controllerAs: 'model'
        }).when("/register", {
            templateUrl: 'views/user/templates/register.view.client.html',
            controller: 'RegisterController',
            controllerAs: 'model'
        }).when("/follow-user", {
            templateUrl: 'views/user/templates/follow-user.view.client.html',
            controller: 'FollowUserController',
            controllerAs: 'model',
            resolve: {
                user: accessPrivateResource
            }
        }).when("/following", {
            templateUrl: 'views/user/templates/following.view.client.html',
            controller: 'FollowingController',
            controllerAs: 'model',
            resolve: {
                user: accessPrivateResource
            }
        }).when("/admin", {
            templateUrl: 'views/user/templates/admin-list.view.client.html',
            controller: 'AdminListController',
            controllerAs: 'model',
            resolve: {
                admin: accessAdminResource,
                user: accessPrivateResource
            }
        }).when("/admin/createUser", {
            templateUrl: 'views/user/templates/admin-create-user.view.client.html',
            controller: 'AdminCreateUserController',
            controllerAs: 'model',
            resolve: {
                admin: accessAdminResource,
                user: accessPrivateResource
            }
        }).when("/admin/user/:userId", {
            templateUrl: 'views/user/templates/user-details.view.client.html',
            controller: 'UserDetailsController',
            controllerAs: 'model',
            resolve: {
                admin: accessAdminResource,
                user: accessPrivateResource
            }
        }).when("/profile", {
            templateUrl: 'views/user/templates/profile.view.client.html',
            controller: 'ProfileController',
            controllerAs: 'model',
            resolve: {
                user: accessPrivateResource
            }
        }).when("/party", {
            templateUrl: 'views/party/templates/party-list.view.client.html',
            controller: 'PartyListController',
            controllerAs: 'model',
            resolve: {
                user: accessPrivateResource
            }
        }).when("/party/:partyId", {
            templateUrl: 'views/party/templates/party.view.client.html',
            controller: 'PartyController',
            controllerAs: 'model'
        }).when("/party/:partyId/add-song", {
            templateUrl: 'views/party/templates/party-new-song.view.client.html',
            controller: 'NewSongController',
            controllerAs: 'model'
        }).when("/party/:partyId/song/:trackId", {
            templateUrl: 'views/song/templates/song-detail.view.client.html',
            controller: 'SongDetailController',
            controllerAs: 'model'
        });
    }

    function accessPrivateResource(AuthService, $q, $location) {
        const deferred = $q.defer();
        AuthService
            .checkLogin()
            .then((user) => {
                if (user === '0') {
                    deferred.reject();
                    $location.path('/login');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function accessAdminResource(AuthService, $q, $location) {
        const deferred = $q.defer();
        AuthService
            .checkIfAdmin()
            .then((result) => {
                if (result) {
                    deferred.resolve(result);
                } else {
                    deferred.reject();
                    $location.path('/login');
                }
            });
        return deferred.promise;
    }

    function checkLogin(AuthService, $q) {
        const deferred = $q.defer();
        AuthService
            .checkLogin()
            .then((user) => {
                if (user === '0') {
                    deferred.resolve(null);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();