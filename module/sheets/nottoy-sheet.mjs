export class NightBeforeNotToySheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["nightbefore", "sheet", "actor", "nottoy"],
      width: 750,
      height: 700,
      resizable: true,
      submitOnChange: true,
      closeOnSubmit: false
    });
  }

  get template() {
    return `systems/nightbefore/templates/actor/actor-nottoy-sheet.hbs`;
  }

  getData() {
    const context = super.getData();
    const actorData = this.actor.toObject(false);
    context.system = actorData.system;
    context.flags = actorData.flags;

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Skill rolls
    html.find('.skill-roll').click(this._onSkillRoll.bind(this));

    // Initiative roll
    html.find('.initiative-roll').click(this._onInitiativeRoll.bind(this));

    // Combat rolls
    html.find('.bop-roll').click(this._onBopRoll.bind(this));
    html.find('.bop-damage-roll').click(this._onBopDamageRoll.bind(this));

    // Healing
    html.find('.hug-roll').click(this._onHugRoll.bind(this));

    // Abilities
    html.find('.ability-roll').click(this._onAbilityRoll.bind(this));
  }

  async _onSkillRoll(event) {
    event.preventDefault();
    const skillName = event.currentTarget.dataset.skill;
    await this.actor.rollSkill(skillName);
  }

  async _onInitiativeRoll(event) {
    event.preventDefault();
    await this.actor.rollInitiative();
  }

  async _onBopRoll(event) {
    event.preventDefault();
    await this.actor.rollBop();
  }

  async _onBopDamageRoll(event) {
    event.preventDefault();
    await this.actor.rollBopDamage();
  }

  async _onHugRoll(event) {
    event.preventDefault();
    await this.actor.rollHug();
  }

  async _onAbilityRoll(event) {
    event.preventDefault();
    const abilityKey = event.currentTarget.dataset.ability;
    await this.actor.rollAbility(abilityKey);
  }
}
