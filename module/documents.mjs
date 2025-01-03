export class ToyActor extends Actor {
  /** @override */
  prepareData() {
    super.prepareData();

    if (this.type === "character") {
      this._prepareCharacterData(this.system);
    }
  }

  _prepareCharacterData(data) {
    const sizeModifiers = {
      smallest: { movement: 10, bopAvoidance: 2 },
      small: { movement: 15, bopAvoidance: 1 },
      medium: { movement: 20, bopAvoidance: 0 },
      large: { movement: 25, bopAvoidance: -1 },
      largest: { movement: 30, bopAvoidance: -2 },
    };

    const materialModifiers = {
      plush: { hugMod: 4 },
      soft: { hugMod: 2 },
      combo: { hugMod: 1 },
      flexplas: { hugMod: 0 },
      hardplas: { hugMod: -1 },
    };

    const yearsOwnedModifiers = {
      one: { assess: 0, techUse: 2 },
      two: { assess: 1, techUse: 1 },
      three: { assess: 2, techUse: 0 },
      four: { assess: 3, techUse: -1 },
      five: { assess: 4, techUse: -2 },
    };

    // Base calculations
    data.movement = sizeModifiers[data.size]?.movement || 0;
    data.bopAvoidance = 10 + (sizeModifiers[data.size]?.bopAvoidance || 0);
    data.hugMod = materialModifiers[data.material]?.hugMod || 0;

    // Years Owned
    const yearsOwned = yearsOwnedModifiers[data.yearsOwned] || { assess: 0, techUse: 0 };
    data.assess = yearsOwned.assess;
    data.techUse = yearsOwned.techUse;

    // Extra Parts
    if (data.extraParts?.battery) {
      data.techUse += 3;
    }
    if (data.extraParts?.joints) {
      data.movement += 10;
    }
    if (data.extraParts?.wheels) {
      data.movement += 10;
    }
  }
}
