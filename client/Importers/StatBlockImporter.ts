module ImprovedInitiative {
    export class StatBlockImporter extends Importer {
        getType() {
            return this.getString("size") + ' ' +
                this.getString("type") + ', ' +
                this.getString("alignment");
        }

        getAbilities() {
            return {
                Str: this.getInt("str"),
                Dex: this.getInt("dex"),
                Con: this.getInt("con"),
                Int: this.getInt("int"),
                Wis: this.getInt("wis"),
                Cha: this.getInt("cha")
            };
        }

        public GetStatBlock() {
            var statBlock = StatBlock.Default();

            statBlock.Name = this.getString("name");
            statBlock.Type = this.getType();
            statBlock.Abilities = this.getAbilities();

            statBlock.HP = this.getValueAndNotes("hp");
            statBlock.AC = this.getValueAndNotes("ac");
            statBlock.Challenge = this.getString("cr");

            statBlock.Speed = this.getCommaSeparatedStrings("speed");
            statBlock.ConditionImmunities = this.getCommaSeparatedStrings("conditionImmune");
            statBlock.DamageImmunities = this.getCommaSeparatedStrings("immune");
            statBlock.DamageResistances = this.getCommaSeparatedStrings("resist");
            statBlock.DamageVulnerabilities = this.getCommaSeparatedStrings("vulnerable");
            statBlock.Senses = this.getCommaSeparatedStrings("senses");
            statBlock.Languages = this.getCommaSeparatedStrings("languages");

            statBlock.Skills = this.getCommaSeparatedModifiers("skill");
            statBlock.Saves = this.getCommaSeparatedModifiers("save");

            statBlock.Traits = this.getPowers("trait");
            statBlock.Actions = this.getPowers("action");
            statBlock.Reactions = this.getPowers("reaction");
            statBlock.LegendaryActions = this.getPowers("legendary");

            return statBlock;
        }
    }
}