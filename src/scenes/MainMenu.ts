import * as Phaser from "phaser";
import { Arcanoid } from "./Arcanoid";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "MainMenu",
};

export class MainMenu extends Phaser.Scene {
	constructor() {
		super(sceneConfig);
	}

	// public preload(): void {}

	public create(): void {
		this.input.keyboard.on("keydown", () => {
			this.scene.start(Arcanoid.name);
		});
	}

	// public update(): void {}
}
