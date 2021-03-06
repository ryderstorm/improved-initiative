module ImprovedInitiative {
    export class LibrariesViewModel {
        LibraryTabs = [
            {
                Name: "Creatures",
                Component: "statblocklibrary",
                Library: this.Libraries.NPCs
            },
            {
                Name: "Players",
                Component: "statblocklibrary",
                Library: this.Libraries.PCs
            },
            {
                Name: "Encounters",
                Component: "encounterlibrary",
                Library: this.Libraries.Encounters
            },
            {
                Name: "Spells",
                Component: "spelllibrary",
                Library: this.Libraries.Spells
            }
        ];

        SelectedTab = ko.observable(this.LibraryTabs[0]);

        TabClassName = library => library === this.SelectedTab() ? 'selected' : '';

        constructor(
            public EncounterCommander: EncounterCommander,
            public Libraries: Libraries
        ) { 
            this.SelectedTab.subscribe(t => {
                if (t.Name === "Players") {
                    TutorialSpy("SelectPlayersTab");
                }
            })
        }

        
    }
}