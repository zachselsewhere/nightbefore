import { NightBeforeActor } from "./documents/actor.mjs";
import { NightBeforeActorSheet } from "./sheets/actor-sheet.mjs";

Hooks.once('init', async function() {
  console.log('The Night Before | Initializing system');

  // Register custom Actor document class
  CONFIG.Actor.documentClass = NightBeforeActor;

  // Register sheet application
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("nightbefore", NightBeforeActorSheet, {
    types: ["toy"],
    makeDefault: true,
    label: "NIGHTBEFORE.SheetLabels.Actor"
  });

  // Preload Handlebars templates (if needed in future)
  await loadTemplates([]);
});

Hooks.once('ready', async function() {
  console.log('The Night Before | System ready');

  // Auto-create Player's Guide if it doesn't exist (GM only)
  if (game.user.isGM) {
    const existingGuide = game.journal.find(j => j.name === "The Night Before - Player's Guide");

    if (!existingGuide) {
      console.log('The Night Before | Creating Player\'s Guide');

      try {
        await JournalEntry.create({
          name: "The Night Before - Player's Guide",
          pages: [
            {
              name: "Building Your Toy",
              type: "text",
              title: { show: true, level: 1 },
              text: {
                format: 1,
                content: "<h1>Building Your Toy</h1><p>In order to figure out what your toy can do, we first need to figure out how your toy is built!</p><h2>Size</h2><p>Your toy's size can help determine how likely they are to succeed at things like: sneaking around to avoid being seen, forcing open an entrance, or even avoiding a Bop.</p><table><thead><tr><th>Inches</th><th>Category</th><th>Sneak</th><th>Force</th><th>Intimidate</th><th>Movement</th><th>B.A.</th></tr></thead><tbody><tr><td>0-3\"</td><td>Smallest</td><td>+2</td><td>-2</td><td>-2</td><td>10\"</td><td>+2</td></tr><tr><td>3-6\"</td><td>Small</td><td>+1</td><td>-1</td><td>-1</td><td>15\"</td><td>+1</td></tr><tr><td>6-9\"</td><td>Medium</td><td>+0</td><td>+0</td><td>+0</td><td>20\"</td><td>+0</td></tr><tr><td>9-12\"</td><td>Large</td><td>-1</td><td>+1</td><td>+1</td><td>25\"</td><td>-1</td></tr><tr><td>&gt; 12\"</td><td>Largest</td><td>-2</td><td>+2</td><td>+2</td><td>30\"</td><td>-2</td></tr></tbody></table><h2>Material</h2><p>Your toy's material will determine things like your toy's Maneuver skill as well as how effective your Hugs are.</p><table><thead><tr><th>Material</th><th>Sneak</th><th>Force</th><th>Maneuver</th><th>Hug</th></tr></thead><tbody><tr><td>Plush</td><td>+2</td><td>-2</td><td>+2</td><td>+4</td></tr><tr><td>Soft</td><td>+1</td><td>-1</td><td>+1</td><td>+2</td></tr><tr><td>Combination</td><td>+0</td><td>+0</td><td>+0</td><td>+1</td></tr><tr><td>Flex Plastic</td><td>-1</td><td>+1</td><td>-1</td><td>0</td></tr><tr><td>Hard Plastic</td><td>-2</td><td>+2</td><td>-2</td><td>-1</td></tr></tbody></table><h2>Cuteness</h2><p>Your toy's Cuteness affects their interpersonal relationships and likeability. The cuter a toy, the more likely they are to successfully charm another character.</p><table><thead><tr><th>Cuteness</th><th>Charm</th><th>Intimidate</th></tr></thead><tbody><tr><td>Ugly</td><td>-4</td><td>+2</td></tr><tr><td>Not Cute</td><td>-2</td><td>+1</td></tr><tr><td>Meh</td><td>+0</td><td>+0</td></tr><tr><td>Cute</td><td>+2</td><td>-1</td></tr><tr><td>Adorable</td><td>+4</td><td>-2</td></tr></tbody></table><h2>Years Owned</h2><p>The amount of years your toy has been owned will affect their ability to assess things in their environment, and their use of technology.</p><table><thead><tr><th>Years</th><th>Assess</th><th>Tech Use</th></tr></thead><tbody><tr><td>1 Year</td><td>+0</td><td>+2</td></tr><tr><td>2 Years</td><td>+1</td><td>+1</td></tr><tr><td>3 Years</td><td>+2</td><td>+0</td></tr><tr><td>4 Years</td><td>+3</td><td>-1</td></tr><tr><td>5+ Years</td><td>+4</td><td>-2</td></tr></tbody></table><h2>Extra Parts</h2><p>Your toy may be equipped with some Extra Parts. For some specific Parts there are special rules and modifiers.</p><p><strong>Battery:</strong> +3 to your total Tech Use, and grants a unique battery-based ability.</p><p><strong>Joints:</strong> +3 to your Maneuver Modifier</p><p><strong>Wheels:</strong> +10 to your Movement</p>"
              }
            },
            {
              name: "Playing The Game",
              type: "text",
              title: { show: true, level: 1 },
              text: {
                format: 1,
                content: "<h1>Playing The Game</h1><p>Now that we know what your Toy is made of, let's talk about what it can do!</p><h2>The Basics</h2><p>This game has been built with a \"rules-light\" approach to the TTRPG experience. That being said, there are still plenty of elements to the gameplay that will feel familiar to those who have played a d20 system before. If your Toy (Character) wants to accomplish a certain task, they will likely need to perform a roll, which consists of rolling a d20, adding any modifiers, and hoping the total meets or beats a Difficulty Class (DC) set by the Game Master.</p><h2>The Skills</h2><p>Each Toy's particular \"Build\" will influence their aptitude to perform various Skills in the form of Modifiers. Whenever a character attempts to tip-toe past a slumbering foe, they will need to roll a d20 and add their \"Sneak\" modifier. Looking around to find a spare battery for a fellow Toy may require an \"Assess\" modifier to be added to a roll, and so-on and so-forth. The GM calls the shots on what Modifier your Toy will add to the roll.</p><h3>The Seven Skills</h3><ul><li><strong>Sneak</strong> - Moving quietly and avoiding detection</li><li><strong>Force</strong> - Physical strength and power</li><li><strong>Maneuver</strong> - Agility, dodging, and dexterity</li><li><strong>Tech Use</strong> - Understanding and using technology</li><li><strong>Assess</strong> - Perception and environmental awareness</li><li><strong>Charm</strong> - Social interaction and persuasion</li><li><strong>Intimidate</strong> - Threatening and scaring others</li></ul>"
              }
            },
            {
              name: "Breaking Points & Healing",
              type: "text",
              title: { show: true, level: 1 },
              text: {
                format: 1,
                content: "<h1>Breaking Points</h1><p>Your Toy's Breaking Points (BP) are a way to keep track of how well they are held together. At the start of each Game, a player will roll dice based on the BP Calculator table to determine their Toy's maximum amount of Breaking Points.</p><h2>BP Calculator</h2><table><thead><tr><th>Material / Size</th><th>Smallest (x1)</th><th>Small (x2)</th><th>Medium (x3)</th><th>Large (x4)</th><th>Largest (x5)</th></tr></thead><tbody><tr><td>Plush</td><td>4+(1d4)</td><td>4+(2d4)</td><td>4+(3d4)</td><td>4+(4d4)</td><td>4+(5d4)</td></tr><tr><td>Soft</td><td>6+(1d6)</td><td>6+(2d6)</td><td>6+(3d6)</td><td>6+(4d6)</td><td>6+(5d6)</td></tr><tr><td>Combination</td><td>8+(1d8)</td><td>8+(2d8)</td><td>8+(3d8)</td><td>8+(4d8)</td><td>8+(5d8)</td></tr><tr><td>Flex Plastic</td><td>10+(1d10)</td><td>10+(2d10)</td><td>10+(3d10)</td><td>10+(4d10)</td><td>10+(5d10)</td></tr><tr><td>Hard Plastic</td><td>12+(1d12)</td><td>12+(2d12)</td><td>12+(3d12)</td><td>12+(4d12)</td><td>12+(5d12)</td></tr></tbody></table><h1>Healing With HUGS!</h1><p>While Toys cannot die during The Night Before, they can be reduced to 0 Breaking Points if they sustain too many Bops, at which point the Toy is considered \"Broken\" and is unable to move or use any of their Skills or Abilities. The only way to regain Breaking Points is through the power of Hugs!</p><p>Every Toy has the ability to Hug any other Toy. Hugging restores <strong>1d6</strong> of a Toy's Breaking Points. You will also add a modifier to the roll based on your Material. During turn-based situations, Hugging takes the place of your Toy's action.</p><table><thead><tr><th>Material</th><th>Hug Modifier</th></tr></thead><tbody><tr><td>Plush</td><td>+4</td></tr><tr><td>Soft</td><td>+2</td></tr><tr><td>Combination</td><td>+1</td></tr><tr><td>Flex Plastic</td><td>+0</td></tr><tr><td>Hard Plastic</td><td>-1</td></tr></tbody></table>"
              }
            },
            {
              name: "Combat & Abilities",
              type: "text",
              title: { show: true, level: 1 },
              text: {
                format: 1,
                content: "<h1>BOP!</h1><p>Look, no one likes to get Bopped, especially not Toys. Sometimes: Bops happen. And a Toy's gotta do what a Toy's gotta do. So, to keep it simple, if your Toy needs to Bop: you roll a d20 and hope it meets or beats the Bop Avoidance of your Toy's opponent.</p><h2>Bop Damage</h2><p>If your Toy successfully lands a BOP, you'll need to roll Bop Damage to figure out how many Breaking Points the BOP-target loses. Your Toy's Bop Damage is decided by rolling <strong>1d6</strong> and adding the <strong>Force Modifier</strong>.</p><h2>Bop Avoidance (BA)</h2><p>In order to successfully elude a Bopping, you need to hope that your Toy's Bop Avoidance (BA) is higher than whatever is rolled by the would-be Bopper. Bop Avoidance is calculated based on your Size and Maneuverability.</p><table><thead><tr><th>Size Category</th><th>BA Formula</th></tr></thead><tbody><tr><td>Smallest</td><td>10 + (Maneuver Mod) + 2</td></tr><tr><td>Small</td><td>10 + (Maneuver Mod) + 1</td></tr><tr><td>Medium</td><td>10 + (Maneuver Mod) + 0</td></tr><tr><td>Large</td><td>10 + (Maneuver Mod) - 1</td></tr><tr><td>Largest</td><td>10 + (Maneuver Mod) - 2</td></tr></tbody></table><h1>Abilities</h1><p>Your Toy's Abilities are special actions that can be performed during the game. Most Abilities can be used automatically, and require the roll of a die (typically a d6, d8, or d10) to determine its effectiveness. For certain Abilities, you may need to add a Skill Modifier on-top of the initial roll. If your Ability is designed to cause Damage, you may need to successfully roll a BOP in order to use the Ability.</p><h2>Using Battery</h2><p>If your Toy has Batteries included in their Build, you will likely have a special Ability that uses a Charge. When fully-charged, you may use a Battery-Based Ability <strong>3 times</strong> before needing a recharge. But be careful! When your Battery is dead, you suffer <strong>-1 to all Skill Modifiers</strong>, as well as anything influenced by those Modifiers!</p>"
              }
            },
            {
              name: "Turn-Based Gameplay",
              type: "text",
              title: { show: true, level: 1 },
              text: {
                format: 1,
                content: "<h1>Turn-Based Gameplay</h1><p>If a situation develops in the game that requires things to be taken one step at a time (typically during combat or puzzle challenges) the GM may call for a Maneuver Roll to determine a turn order. Whoever rolls higher goes first.</p><h2>Each Turn consists of just two components:</h2><h3>Movement</h3><p>Your Toy's Movement is primarily based on their Size (the only exception being if your Toy has wheels). When it is your Turn, you are allowed to move your Toy up to the full amount of their Movement. If you wish to forgo an Action you may move your Toy up to double their typical amount.</p><h3>Action</h3><p>Your Toy's Action may consist of one of the following:</p><ul><li>Performing a Skill</li><li>Giving an ally a Hug</li><li>Giving an opponent a BOP</li><li>Using an Ability</li></ul><hr><h2>We Hope You Enjoy</h2><h1 style=\"text-align: center;\">The Night Before</h1>"
              }
            }
          ]
        });

        ui.notifications.info('Player\'s Guide has been added to your Journal Entries!');
      } catch (error) {
        console.error('The Night Before | Failed to create Player\'s Guide:', error);
      }
    }
  }
});
