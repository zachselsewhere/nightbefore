export class NightBeforeActorSheet extends ActorSheet {

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["nightbefore", "sheet", "actor"],
      width: 750,
      height: 700,
      resizable: true,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }],
      dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
    });
  }

  get template() {
    return `systems/nightbefore/templates/actor/actor-toy-sheet.hbs`;
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

    // Battery management
    html.find('.battery-btn').click(this._onBatteryCharge.bind(this));
    html.find('.battery-display').click(this._onBatteryDischarge.bind(this));
    html.find('.battery-recharge-btn').click(this._onBatteryCharge.bind(this));

    // Breaking Points roll
    html.find('.bp-roll-btn').click(this._onBreakingPointsRoll.bind(this));

    // Modifier edit toggle
    html.find('.toggle-modifier-edit').click(this._onToggleModifierEdit.bind(this));
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

  async _onBatteryCharge(event) {
    event.preventDefault();
    const chargeLevel = parseInt(event.currentTarget.dataset.charge);
    await this.actor.chargeBattery(chargeLevel);
  }

  async _onBatteryDischarge(event) {
    event.preventDefault();
    await this.actor.dischargeBattery();
  }

  async _onBreakingPointsRoll(event) {
    event.preventDefault();
    await this.actor.rollBreakingPoints();
  }

  _onToggleModifierEdit(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const buildSummary = button.closest('.build-summary');
    const modifierDisplay = buildSummary.querySelector('.modifier-display');
    const modifierEditor = buildSummary.querySelector('.modifier-editor');
    const editLabel = button.querySelector('.edit-label');
    const doneLabel = button.querySelector('.done-label');

    // Toggle display
    if (modifierEditor.style.display === 'none') {
      modifierDisplay.style.display = 'none';
      modifierEditor.style.display = 'block';
      editLabel.style.display = 'none';
      doneLabel.style.display = 'inline';
    } else {
      modifierDisplay.style.display = 'grid';
      modifierEditor.style.display = 'none';
      editLabel.style.display = 'inline';
      doneLabel.style.display = 'none';
    }
  }
}
