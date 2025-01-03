export default class ToyCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["nightbefore", "sheet", "character"],
      template: "systems/nightbefore/templates/sheets/character-sheet.html",
      width: 600,
      height: 500, // Adjusted for added fields
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Dropdown and checkbox listeners
    html.find("select, input").change(event => this._onInputChange(event));
  }

  async _onInputChange(event) {
    const input = event.currentTarget;
    const field = input.name;
    const value = input.type === "checkbox" ? input.checked : input.value;

    await this.actor.update({ [field]: value });

    // Recalculate derived stats
    this._calculateDerivedStats();
  }

  _calculateDerivedStats() {
    const actorData = this.actor.system;

    // Base modifiers
    let sneak = 0;
    let force = 0;
    let intimidate = 0;
    let movement = 20; // Default movement
    let bopAvoidance = 10; // Base Bop Avoidance
    let hugModifier = 0;
    let assess = 0;
    let techUse = 0;

    // Apply Size modifiers
    switch (actorData.size) {
      case "smallest":
        sneak += 2;
        force -= 2;
        intimidate -= 2;
        movement = 10;
        bopAvoidance += 2;
        break;
      case "small":
        sneak += 1;
        force -= 1;
        intimidate -= 1;
        movement = 15;
        bopAvoidance += 1;
        break;
      case "medium":
        movement = 20;
        break;
      case "large":
        sneak -= 1;
        force += 1;
        intimidate += 1;
        movement = 25;
        bopAvoidance -= 1;
        break;
      case "largest":
        sneak -= 2;
        force += 2;
        intimidate += 2;
        movement = 30;
        bopAvoidance -= 2;
        break;
    }

    // Apply Material modifiers
    switch (actorData.material) {
      case "plush":
        sneak += 2;
        force -= 2;
        hugModifier += 4;
        break;
      case "soft":
        sneak += 1;
        force -= 1;
        hugModifier += 2;
        break;
      case "combo":
        hugModifier += 1;
        break;
      case "flexplas":
        sneak -= 1;
        force += 1;
        break;
      case "hardplas":
        sneak -= 2;
        force += 2;
        hugModifier -= 1;
        break;
    }

    // Apply Cuteness modifiers
    switch (actorData.cuteness) {
      case "ugly":
        intimidate += 2;
        break;
      case "notcute":
        intimidate += 1;
        break;
      case "cute":
        intimidate -= 1;
        break;
      case "adorbs":
        intimidate -= 2;
        break;
    }

    // Apply Years Owned modifiers
    switch (actorData.yearsOwned) {
      case "one":
        techUse += 2;
        break;
      case "two":
        assess += 1;
        techUse += 1;
        break;
      case "three":
        assess += 2;
        break;
      case "four":
        assess += 3;
        techUse -= 1;
        break;
      case "five":
        assess += 4;
        techUse -= 2;
        break;
    }

    // Apply Extra Parts modifiers
    if (actorData.extraParts?.battery) {
      techUse += 3;
    }
    if (actorData.extraParts?.joints) {
      movement += 10;
    }
    if (actorData.extraParts?.wheels) {
      movement += 10;
    }

    // Update derived stats
    this.actor.update({
      "system.sneak": sneak,
      "system.force": force,
      "system.intimidate": intimidate,
      "system.movement": movement,
      "system.bopAvoidance": bopAvoidance,
      "system.hugModifier": hugModifier,
      "system.assess": assess,
      "system.techUse": techUse,
    });
  }
}
