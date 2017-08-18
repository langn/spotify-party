(function() {
    angular.module('SpotifyParty')
        .controller('PartyListController', PartyListController);

    function PartyListController(PartyService, $location) {
        const model = this;

        model.goToParty = goToParty;

        model.pageTitle = 'My Parties';
        function init() {
           PartyService.getPartiesForUser()
               .then((response) => {
                    model.parties = response;
               });
        }
        init();

        function goToParty(party) {
            $location.path('/party/' + party._id);
        }
    }
})();