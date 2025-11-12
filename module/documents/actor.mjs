export class NightBeforeActor extends Actor {

  prepareData() {
    super.prepareData();
  }

  prepareBaseData() {
    super.prepareBaseData();
  }

  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.nightbefore || {};

    // Only process toy actors
    if (actorData.type !== 'toy') return;

    this._calculateSkillModifiers(systemData);
    this._calculateBopAvoidance(systemData);
    this._calculateMovement(systemData);
    this._calculateHugModifier(systemData);
    this._applyBatteryPenalty(systemData);
  }

  _calculateSkillModifiers(systemData) {
    const build = systemData.build;
    const skills = systemData.skills;

    // Reset all skill values to 0
    Object.keys(skills).forEach(skill => {
      skills[skill].value = 0;
    });

    // Size modifiers
    const sizeModifiers = {
      'smallest': { sneak: 2, force: -2, intimidate: -2, movement: 10, ba: 2 },
      'small': { sneak: 1, force: -1, intimidate: -1, movement: 15, ba: 1 },
      'medium': { sneak: 0, force: 0, intimidate: 0, movement: 20, ba: 0 },
      'large': { sneak: -1, force: 1, intimidate: 1, movement: 25, ba: -1 },
      'largest': { sneak: -2, force: 2, intimidate: 2, movement: 30, ba: -2 }
    };

    if (build.size && sizeModifiers[build.size]) {
      const mods = sizeModifiers[build.size];
      skills.sneak.value += mods.sneak;
      skills.force.value += mods.force;
      skills.intimidate.value += mods.intimidate;
      systemData.combat.movement = mods.movement;
      systemData._sizeBAMod = mods.ba;
    }

    // Material modifiers
    const materialModifiers = {
      'plush': { sneak: 2, force: -2, maneuver: 2, hug: 4 },
      'soft': { sneak: 1, force: -1, maneuver: 1, hug: 2 },
      'combo': { sneak: 0, force: 0, maneuver: 0, hug: 1 },
      'flexplas': { sneak: -1, force: 1, maneuver: -1, hug: 0 },
      'hardplas': { sneak: -2, force: 2, maneuver: -2, hug: -1 }
    };

    if (build.material && materialModifiers[build.material]) {
      const mods = materialModifiers[build.material];
      skills.sneak.value += mods.sneak;
      skills.force.value += mods.force;
      skills.maneuver.value += mods.maneuver;
      systemData.healing.hugMod = mods.hug;
    }

    // Cuteness modifiers
    const cutenessModifiers = {
      'ugly': { charm: -4, intimidate: 2 },
      'notcute': { charm: -2, intimidate: 1 },
      'meh': { charm: 0, intimidate: 0 },
      'cute': { charm: 2, intimidate: -1 },
      'adorable': { charm: 4, intimidate: -2 }
    };

    if (build.cuteness && cutenessModifiers[build.cuteness]) {
      const mods = cutenessModifiers[build.cuteness];
      skills.charm.value += mods.charm;
      skills.intimidate.value += mods.intimidate;
    }

    // Years Owned modifiers
    const yearsModifiers = {
      'one': { assess: 0, techUse: 2 },
      'two': { assess: 1, techUse: 1 },
      'three': { assess: 2, techUse: 0 },
      'four': { assess: 3, techUse: -1 },
      'five': { assess: 4, techUse: -2 }
    };

    if (build.yearsOwned && yearsModifiers[build.yearsOwned]) {
      const mods = yearsModifiers[build.yearsOwned];
      skills.assess.value += mods.assess;
      skills.techUse.value += mods.techUse;
    }

    // Extra parts modifiers
    if (build.batteries) {
      skills.techUse.value += 3;
    }

    if (build.joints) {
      skills.maneuver.value += 3;
    }

    if (build.wheels) {
      systemData.combat.movement += 10;
    }
  }

  _calculateBopAvoidance(systemData) {
    const maneuverMod = systemData.skills.maneuver.value;
    const sizeBAMod = systemData._sizeBAMod || 0;
    systemData.wellbeing.ba.value = 10 + maneuverMod + sizeBAMod;
  }

  _calculateMovement(systemData) {
    // Movement is already set in _calculateSkillModifiers
    // This method exists for clarity and future expansion
  }

  _calculateHugModifier(systemData) {
    // Hug modifier is already set in _calculateSkillModifiers
    // This method exists for clarity and future expansion
  }

  _applyBatteryPenalty(systemData) {
    const battery = systemData.wellbeing.battery;
    const skills = systemData.skills;

    // Apply -1 penalty to all skills if battery is at 0
    if (systemData.build.batteries && battery.charge === 0) {
      Object.keys(skills).forEach(skill => {
        skills[skill].value -= 1;
      });
      // Recalculate BA with penalty
      this._calculateBopAvoidance(systemData);
    }
  }

  async rollSkill(skillName) {
    const skill = this.system.skills[skillName];
    if (!skill) return;

    const roll = await new Roll('1d20 + @mod', { mod: skill.value }).evaluate();

    const skillNameDisplay = skillName.charAt(0).toUpperCase() + skillName.slice(1);

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `<div class="nightbefore-roll skill-roll-msg">
        <div class="roll-header">🎲 ${skillNameDisplay} Check</div>
        <div class="roll-modifier">Modifier: ${skill.value >= 0 ? '+' : ''}${skill.value}</div>
      </div>`,
      rollMode: game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  async rollBop() {
    const roll = await new Roll('1d20').evaluate();

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `<div class="nightbefore-roll bop-roll-msg">
        <div class="roll-header">🥊 BOP ATTACK!</div>
        <div class="roll-subtext">Rolling to hit - Beat their BA!</div>
      </div>`,
      rollMode: game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  async rollBopDamage() {
    const forceMod = this.system.skills.force.value;
    const roll = await new Roll('1d6 + @mod', { mod: forceMod }).evaluate();

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `<div class="nightbefore-roll bop-damage-msg">
        <div class="roll-header">💥 BOP DAMAGE!</div>
        <div class="roll-modifier">Force Modifier: ${forceMod >= 0 ? '+' : ''}${forceMod}</div>
      </div>`,
      rollMode: game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  async rollHug() {
    const hugMod = this.system.healing.hugMod;
    const roll = await new Roll('1d6 + @mod', { mod: hugMod }).evaluate();

    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `<div class="nightbefore-roll hug-roll-msg">
        <div class="roll-header">💕 HUG HEALING!</div>
        <div class="roll-subtext">Restoring Breaking Points with love!</div>
        <div class="roll-modifier">Hug Modifier: ${hugMod >= 0 ? '+' : ''}${hugMod}</div>
      </div>`,
      rollMode: game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  async rollAbility(abilityKey) {
    const ability = this.system.abilities[abilityKey];
    if (!ability || !ability.name) return;

    // Check if using battery
    if (ability.usesBattery) {
      if (this.system.wellbeing.battery.charge <= 0) {
        ui.notifications.warn('Battery is empty!');
        return;
      }
      // Discharge battery
      await this.update({
        'system.wellbeing.battery.charge': Math.max(0, this.system.wellbeing.battery.charge - 1)
      });
    }

    // Get skill modifier if applicable
    let skillMod = 0;
    let skillName = '';
    if (ability.skillMod && ability.skillMod !== 'none') {
      skillMod = this.system.skills[ability.skillMod]?.value || 0;
      skillName = ability.skillMod.charAt(0).toUpperCase() + ability.skillMod.slice(1);
    }

    // Roll if it's not just battery usage
    if (ability.diceType !== 'battery') {
      const roll = await new Roll(`${ability.diceType} + @mod`, { mod: skillMod }).evaluate();

      const batteryUsed = ability.usesBattery ? '<div class="roll-battery">⚡ Used Battery Charge</div>' : '';
      const modifierText = skillName ? `<div class="roll-modifier">${skillName}: ${skillMod >= 0 ? '+' : ''}${skillMod}</div>` : '';

      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        flavor: `<div class="nightbefore-roll ability-roll-msg">
          <div class="roll-header">✨ ${ability.name}</div>
          <div class="roll-subtext">Special Ability Activated!</div>
          ${modifierText}
          ${batteryUsed}
        </div>`,
        rollMode: game.settings.get('core', 'rollMode')
      });

      return roll;
    } else {
      // Battery only ability
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `<div class="nightbefore-roll ability-roll-msg battery-only">
          <div class="roll-header">✨ ${ability.name}</div>
          <div class="roll-subtext">Special Ability Activated!</div>
          <div class="roll-battery">⚡ Used Battery Charge</div>
        </div>`
      });
    }
  }

  async chargeBattery(chargeLevel) {
    if (!this.system.build.batteries) return;

    await this.update({
      'system.wellbeing.battery.charge': chargeLevel
    });
  }

  async dischargeBattery() {
    if (!this.system.build.batteries) return;

    const currentCharge = this.system.wellbeing.battery.charge;
    if (currentCharge <= 0) {
      ui.notifications.warn('Battery is already dead!');
      return;
    }

    await this.update({
      'system.wellbeing.battery.charge': Math.max(0, currentCharge - 1)
    });

    if (currentCharge - 1 === 0) {
      ui.notifications.warn('Battery is now dead! You suffer -1 to all skills.');
    }
  }
}
