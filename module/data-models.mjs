const { StringField, NumberField, BooleanField } = foundry.data.fields;

export class ToyCharacterDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      characterName: new StringField({ required: true, initial: "Unnamed Toy" }),
      size: new StringField({ required: true, choices: ["smallest", "small", "medium", "large", "largest"], initial: "medium" }),
      material: new StringField({ required: true, choices: ["plush", "soft", "combo", "flexplas", "hardplas"], initial: "combo" }),
      cuteness: new StringField({ required: true, choices: ["ugly", "notcute", "tkorlv", "cute", "adorbs"], initial: "tkorlv" }),
      yearsOwned: new StringField({ required: true, choices: ["one", "two", "three", "four", "five"], initial: "three" }),
      batteries: new BooleanField({ required: false, initial: false }),
      joints: new BooleanField({ required: false, initial: false }),
      wheels: new BooleanField({ required: false, initial: false }),
      movement: new NumberField({ integer: true, required: true, initial: 0 }),
      armorClass: new NumberField({ integer: true, required: true, initial: 10 }),
      sneakMod: new NumberField({ integer: true, required: false, initial: 0 }),
      forceMod: new NumberField({ integer: true, required: false, initial: 0 }),
      charmMod: new NumberField({ integer: true, required: false, initial: 0 }),
      intimidateMod: new NumberField({ integer: true, required: false, initial: 0 }),
      techMod: new NumberField({ integer: true, required: false, initial: 0 }),
      assessMod: new NumberField({ integer: true, required: false, initial: 0 }),
      maneuverMod: new NumberField({ integer: true, required: false, initial: 0 }),
    };
  }
}
