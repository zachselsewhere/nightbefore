# The Night Before - Foundry VTT System

A whimsical tabletop RPG system for Foundry VTT v12 where you play as toys coming to life on Christmas Eve.

![Foundry v12](https://img.shields.io/badge/Foundry-v12-informational)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)](LICENSE)

## Overview

**The Night Before** is a rules-light d20 system where players take on the roles of beloved toys who come alive when no one is watching. Create your unique toy character with physical attributes, special abilities, and embark on magical adventures through the house and beyond.

### Key Features

- **🧸 Unique Character Building**: Create toys with Size, Material, Cuteness, Years Owned, and Extra Parts (Batteries, Joints, Wheels)
- **⚙️ Automatic Calculations**: All skill modifiers, Bop Avoidance (BA), Movement, and healing are calculated automatically based on your toy's build
- **🔋 Battery System**: Visual 3-charge battery tracking for battery-powered toys with automatic skill penalties when depleted
- **🎲 Seven Skills**: Sneak, Force, Maneuver, Tech Use, Assess, Charm, and Intimidate
- **⚔️ Combat System**: Bop attacks with d20 rolls and damage calculation
- **💕 Healing Mechanic**: Hug other toys to restore Breaking Points
- **✨ Custom Abilities**: Create unique abilities with various dice types and skill modifiers
- **📖 Built-in Player's Guide**: Auto-generated journal entry with all rules, tables, and gameplay instructions
- **🎨 Themed Interface**: Christmas-themed character sheets with custom fonts and styling

## Installation

### Method 1: Manifest URL (Recommended)

1. Open Foundry VTT
2. Go to the **Game Systems** tab
3. Click **Install System**
4. Paste this manifest URL:
   ```
   https://raw.githubusercontent.com/zachselsewhere/nightbefore/main/system.json
   ```
5. Click **Install**
6. Create a new world and select **The Night Before** as the game system

### Method 2: Manual Installation

1. Download the latest release from the [Releases](https://github.com/zachselsewhere/nightbefore/releases) page
2. Extract the zip file
3. Place the `nightbefore` folder in your Foundry VTT `Data/systems/` directory
   - **Windows**: `%localappdata%/FoundryVTT/Data/systems/`
   - **macOS**: `~/Library/Application Support/FoundryVTT/Data/systems/`
   - **Linux**: `~/.local/share/FoundryVTT/Data/systems/`
4. Restart Foundry VTT
5. Create a new world and select **The Night Before** as the game system

## Getting Started

### Creating Your First Toy Character

1. Create a new Actor and select **Toy** as the type
2. Go to the **Toy Build** tab
3. Configure your toy's physical characteristics:
   - **Size** (Smallest to Largest): Affects Sneak, Force, Intimidate, Movement, and BA
   - **Material** (Plush to Hard Plastic): Affects Sneak, Force, Maneuver, and Hug healing
   - **Cuteness** (Ugly to Adorable): Affects Charm and Intimidate
   - **Years Owned** (1-5+ years): Affects Assess and Tech Use
   - **Extra Parts**: Check Batteries, Joints, or Wheels for special bonuses
4. Roll for **Breaking Points** (your toy's health):
   - Use the BP Calculator table in the Player's Guide
   - Example: Medium Plush toy = 4 + 3d4 Breaking Points
5. Name your toy and you're ready to play!

All skill modifiers, movement, Bop Avoidance, and other stats are calculated automatically based on your selections.

### Player's Guide

When you create a world using The Night Before system, a **Player's Guide** journal entry is automatically created in your Journal Entries tab. This guide contains:

- Complete rules for building your toy
- All stat tables and modifiers
- Combat and healing rules
- Abilities and battery mechanics
- Turn-based gameplay instructions

## Core Mechanics

### Skills

Your toy has seven skills, each influenced by your build choices:

- **Sneak** - Moving quietly and avoiding detection
- **Force** - Physical strength and power
- **Maneuver** - Agility, dodging, and dexterity
- **Tech Use** - Understanding and using technology
- **Assess** - Perception and environmental awareness
- **Charm** - Social interaction and persuasion
- **Intimidate** - Threatening and scaring others

### Combat

**Bop Attack**: Roll 1d20, beat the target's Bop Avoidance (BA)
**Bop Damage**: Roll 1d6 + Force modifier
**BA Calculation**: 10 + Maneuver Modifier + Size Modifier

### Healing

**Hug**: Restore 1d6 + Hug Modifier Breaking Points to another toy
- Takes your action during turn-based play
- Hug modifier is based on your Material

### Battery Mechanics

If your toy has batteries:
- You have 3 battery charges when fully charged
- Click the battery display to use a charge
- Use the Recharge button to restore to full
- When battery reaches 0, you suffer **-1 to all skills**
- Battery-based abilities consume 1 charge per use

## Using the Character Sheet

### Stats Tab

- **BA (Bop Avoidance)**: Auto-calculated defense score
- **Breaking Points**: Current/Max health (input both values)
- **Battery**: Visual 3-cell display (click to discharge, click Recharge to refill)
- **Movement**: Auto-calculated movement distance in inches
- **Skills**: Click any skill name to roll 1d20 + modifier
- **Combat Buttons**: Click to roll Bop attack or Bop Damage
- **Healing Button**: Click to roll Hug healing

### Build Tab

- Configure all physical characteristics
- See live preview of all modifiers
- View build summary with calculated stats

### Abilities

Each toy has 2 ability slots:
- **Name**: Give your ability a unique name
- **Skill Modifier**: Choose which skill adds to the roll (or none)
- **Dice Type**: Choose d6, d8, d10, or Battery-only
- **Uses Battery**: Check if this ability requires a battery charge
- **Description**: Describe what the ability does
- Click **Use** to activate the ability and roll

## Chat Message Features

All rolls display in chat with custom styling:
- 🎲 **Skill Checks**: Green themed with skill name
- 🥊 **Bop Attacks**: Red themed combat message
- 💥 **Bop Damage**: Orange themed damage display
- 💕 **Hug Healing**: Pink themed with heartbeat animation
- ✨ **Abilities**: Gold themed with ability name and battery indicator

## System Requirements

- **Foundry VTT**: Version 12 or higher (tested on v12.331)
- **Browser**: Modern browser with JavaScript enabled
- **No modules required**: Fully functional out of the box

## Troubleshooting

**Character sheet not displaying properly**
- Clear your browser cache
- Make sure you're using Foundry v12 or higher
- Check browser console for errors

**Calculations not updating**
- Ensure all build options are selected
- Try changing a build option to trigger recalculation
- Check that the actor is a Toy type

**Player's Guide not appearing**
- Only the GM sees the auto-creation notification
- Check the Journal Entries tab
- The guide is only created once per world

## Credits

**System Design & Development**: Zach Tripp
**Concept**: Original tabletop RPG adapted for Foundry VTT

## Support & Feedback

Found a bug or have a feature request? Please open an issue on the [GitHub repository](https://github.com/zachselsewhere/nightbefore/issues).

## License

© 2025 Zach Tripp. All rights reserved.

This system is provided for use with Foundry Virtual Tabletop.

---

**Version**: 1.0.0
**Compatible with**: Foundry VTT v12+

*The toys are waiting. It's going to be a magical night!* 🎄
