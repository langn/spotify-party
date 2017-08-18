(function() {
    angular.module('SpotifyParty')
        .controller('PartyListController', PartyListController);

    function PartyListController(PartyService) {
        const model = this;

        function init() {
           PartyService.getPartiesForUser()
               .then((response) => {
                    model.parties = response;
               });
        }
        init();

    }
})();