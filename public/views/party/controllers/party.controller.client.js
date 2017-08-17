(function() {
    angular.module('SpotifyParty')
        .controller('PartyController', PartyController);

    function PartyController(PartyService, $routeParams, $location) {
        const model = this;

        model.goToUsers = goToUsers;
        model.goToSongSearch = goToSongSearch;

        const partyId = $routeParams['partyId'];

        function init() {
            PartyService.getPartyById(partyId)
                .then((party) => {
                    model.party = party;
                    model.pageTitle = model.party.host.firstName + '\'s Party';
                }).catch((error) => {
                    console.error(error);
            });
        }
        init();

        function goToUsers() {

        }

        function goToSongSearch() {
            $location.path('/party/' + partyId + '/add-song');
        }

    }

})();