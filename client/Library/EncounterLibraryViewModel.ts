module ImprovedInitiative {
    export class EncounterLibraryViewModel {
        constructor(
            private encounterCommander: EncounterCommander,
            private library: EncounterLibrary
        ) {
            this.LibraryFilter.subscribe(n => {
                if (n === "") {
                    this.clearCache();
                }
            });
            this.library.Encounters.subscribe(this.clearCache);
         }

        LibraryFilter = ko.observable("");

        private filterCache: KeyValueSet<Listing<SavedEncounter<SavedCombatant>>[]> = {};
        private clearCache = () => this.filterCache = {};

        FilteredEncounters = ko.pureComputed<Listing<SavedEncounter<SavedCombatant>> []>(() => {
            const filter = (ko.unwrap(this.LibraryFilter) || '').toLocaleLowerCase(),
                encounters = this.library.Encounters();

            if (this.filterCache[filter]) {
                return this.filterCache[filter];
            }

            const parentSubset = this.filterCache[filter.substr(0, filter.length - 1)] || encounters;

            const finalList = DedupeByRankAndFilterListings(parentSubset, filter);

            this.filterCache[filter] = finalList;
            
            return finalList;
        });

        ClickEntry = (listing: Listing<SavedEncounter<SavedCombatant>>) => this.encounterCommander.LoadEncounter(listing);
        ClickDelete = (listing: Listing<SavedEncounter<SavedCombatant>>) => this.encounterCommander.DeleteSavedEncounter(listing);
        ClickHide = () => this.encounterCommander.HideLibraries();
        ClickAdd = () => this.encounterCommander.SaveEncounter();
    }
}