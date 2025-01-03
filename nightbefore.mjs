import { ToyActor } from "./module/documents.mjs";
import ToyCharacterSheet from "./module/sheets/character-sheet.mjs"; // Import the custom sheet class

Hooks.once("init", async function () {
  console.log("nightbefore | Initializing The Night Before System");

  // Register the ToyActor class
  CONFIG.Actor.documentClass = ToyActor;

  // Unregister the core actor sheet
  Actors.unregisterSheet("core", ActorSheet);

  // Register the custom sheet class
  Actors.registerSheet("nightbefore", ToyCharacterSheet, { types: ["character"], makeDefault: true });

  console.log("nightbefore | System Initialized");
});

// Hook to update Actor when data changes
Hooks.on("updateActor", (actor, updateData, options, userId) => {
  if (actor.type === "character" && game.userId === userId) {
    console.log("Updating actor data...");
    actor.prepareData(); // Ensure the actor data recalculates
    actor.sheet.render(false); // Re-render the sheet to display updated values
  }
});
