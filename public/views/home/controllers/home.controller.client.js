(function() {
    angular.module('SpotifyParty')
        .controller('HomeController', HomeController);

    function HomeController(AuthService, PartyService, $location, user) {
        const model = this;

        model.goToParty = goToParty;
        model.createParty = createParty;
        model.logout = logout;

        model.user = user;
        model.pageTitle = 'Spotify Party';
        function init() {
            model.couldNotFindParty = false;
        }
        init();

        function goToParty(partyId) {
            PartyService.getPartyById(partyId)
                .then(function(party) {
                    if (party) {
                        $location.path('/party/' + partyId);
                    } else {
                        model.couldNotFindParty = true;
                    }
                }).catch((error) => {
                console.error(error);
            });
        }

        function createParty() {
            PartyService.createParty()
                .then((party) => {
                    $location.path('/party/' + party._id);
                }).catch((error) => {
                    console.error(error);
            })
        }

        function logout() {
            AuthService.logout()
                .then(() => {
                    $location.path('/login');
                });
        }
    }
})();