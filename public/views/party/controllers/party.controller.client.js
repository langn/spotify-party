(function() {
    angular.module('SpotifyParty')
        .controller('PartyController', PartyController);

    function PartyController(PartyService, $routeParams) {
        const model = this;

        model.goToUsers = goToUsers;
        model.goToSongSearch = goToSongSearch;

        const partyId = $routeParams['partyId'];

        function init() {
            PartyService.getPartyById(partyId)
                .then((party) => {
                    model.party = party;
                }).catch((error) => {
                    console.error(error);
            });
        }
        init();

        function goToUsers() {

        }

        function goToSongSearch() {

        }

    }

})();