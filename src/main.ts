import * as Phaser from "phaser";
import Keys from "./interfaces/Keys";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Game",
};

export class GameScene extends Phaser.Scene {
	private paddle: Phaser.Physics.Arcade.Image;
	private ball: Phaser.Physics.Arcade.Image;
	private hitPaddle(ball, paddle): void {
		let diff = 0;

		if (ball.x < paddle.x) {
			//  Ball is on the left-hand side of the paddle
			diff = paddle.x - ball.x;
			ball.setVelocityX(-10 * diff);
		} else if (ball.x > paddle.x) {
			//  Ball is on the right-hand side of the paddle
			diff = ball.x - paddle.x;
			ball.setVelocityX(10 * diff);
		} else {
			//  Ball is perfectly in the middle
			//  Add a little random X to stop it bouncing straight up!
			ball.setVelocityX(2 + Math.random() * 8);
		}
	}

	private resetBall(): void {
		this.ball.setVelocity(0);
		this.ball.setPosition(this.paddle.x, 900 - 50);
		this.ball.setData("onPaddle", true);
	}
	constructor() {
		super(sceneConfig);
		Phaser.Scene.call(this, { key: "breakout" });

		this.paddle;
		this.ball;
	}

	public preload(): void {
		this.load.image("ball", "ball1.png");
		this.load.image("paddle", "paddle1.png");
	}

	public create(): void {
		this.ball = this.physics.add
			.image(900, 900 - 50, "ball")
			.setCollideWorldBounds(true)
			.setBounce(1);

		this.ball.setVelocity(0, 0);
		this.ball.setData("onPaddle", true);

		this.paddle = this.physics.add.image(900, 900, "paddle").setImmovable(true).setCollideWorldBounds(true);

		this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

		this.physics.world.setBoundsCollision(true, true, true, false);

		this.input.keyboard.on("keydown", (event: KeyboardEvent) => {
			if (event.key === " " && this.ball.getData("onPaddle")) {
				this.ball.setData("onPaddle", false);
				this.ball.setVelocity(-300);
			} else if (event.key === "r") {
				this.resetBall();
			}
		});
	}

	public update(): void {
		const cursorKeys: Keys = this.input.keyboard.addKeys({
			up: "UP",
			down: "DOWN",
			left: "LEFT",
			right: "RIGHT",
			w: "W",
			a: "A",
			s: "S",
			d: "D",
			space: "SPACE",
		});

		if (this.ball.getData("onPaddle")) {
			if (cursorKeys.right.isDown || cursorKeys.d.isDown) {
				this.ball.setVelocityX(500);
				this.paddle.setVelocityX(500);
			} else if (cursorKeys.left.isDown || cursorKeys.a.isDown) {
				this.ball.setVelocityX(-500);
				this.paddle.setVelocityX(-500);
			} else {
				this.ball.setVelocityX(0);
				this.paddle.setVelocityX(0);
			}
		} else {
			if (cursorKeys.right.isDown || cursorKeys.d.isDown) {
				this.paddle.setVelocityX(500);
			} else if (cursorKeys.left.isDown || cursorKeys.a.isDown) {
				this.paddle.setVelocityX(-500);
			} else {
				this.paddle.setVelocityX(0);
			}
		}

		if (this.ball.y > 1000) {
			this.resetBall();
		}
	}
}

const gameConfig: Phaser.Types.Core.GameConfig = {
	title: "Sample",
	scene: GameScene,
	type: Phaser.AUTO,
	scale: {
		width: window.innerWidth,
		height: window.innerHeight,
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
