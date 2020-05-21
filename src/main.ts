import * as Phaser from "phaser";
import { MainMenu } from "./scenes/MainMenu";
import { Arcanoid } from "./scenes/Arcanoid";

const gameConfig: Phaser.Types.Core.GameConfig = {
	title: "Sample",
	scene: [MainMenu, Arcanoid],
	type: Phaser.AUTO,
	scale: {
		width: 1024,
		height: 768,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	parent: "game",
	backgroundColor: "#003030",
};

export const game = new Phaser.Game(gameConfig);
