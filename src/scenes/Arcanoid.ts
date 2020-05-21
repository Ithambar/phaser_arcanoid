import * as Phaser from "phaser";
import Keys from "../interfaces/Keys";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
	active: false,
	visible: false,
	key: "Game",
};

export class Arcanoid extends Phaser.Scene {
	private paddle: Phaser.Physics.Arcade.Image;
	private ball: Phaser.Physics.Arcade.Image;
	// private bricks: Array<Phaser.Physics.Arcade.Image>;

	private canvasWidth: number;
	private canvasHeight: number;

	constructor() {
		super(sceneConfig);
		Phaser.Scene.call(this, { key: "breakout" });
	}

	public preload(): void {
		this.load.image("ball", "ball1.png");
		this.load.image("paddle", "paddle1.png");
		this.load.image("brick", "brick1.png");
	}

	public create(): void {
		this.canvasHeight = this.sys.game.canvas.height;
		this.canvasWidth = this.sys.game.canvas.width;

		this.paddle = this.physics.add
			.image(this.canvasWidth / 2, this.canvasHeight - 50, "paddle")
			.setImmovable(true)
			.setCollideWorldBounds(true);

		this.ball = this.physics.add
			.image(this.paddle.x, this.paddle.y - 30, "ball")
			.setCollideWorldBounds(true)
			.setBounce(1);

		for (let x = 0; x < 16; x++) {
			const brick = this.physics.add
				.image(this.canvasWidth / 32 + x * 64, this.canvasHeight / 2, "brick")
				.setImmovable();

			this.physics.add.collider(this.ball, brick, this.hitBrick, null, this);
		}

		this.ball.setVelocity(0, 0);
		this.ball.setData("onPaddle", true);

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
		const keys: Keys = this.input.keyboard.addKeys({
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
			if (keys.right.isDown || keys.d.isDown) {
				this.ball.setVelocityX(500);
				this.paddle.setVelocityX(500);
			} else if (keys.left.isDown || keys.a.isDown) {
				this.ball.setVelocityX(-500);
				this.paddle.setVelocityX(-500);
			} else {
				this.ball.setVelocityX(0);
				this.paddle.setVelocityX(0);
			}
		} else {
			if (keys.right.isDown || keys.d.isDown) {
				this.paddle.setVelocityX(500);
			} else if (keys.left.isDown || keys.a.isDown) {
				this.paddle.setVelocityX(-500);
			} else {
				this.paddle.setVelocityX(0);
			}
		}

		if (this.ball.y > this.canvasHeight) {
			this.resetBall();
		}
	}

	private hitPaddle(ball: Phaser.Physics.Arcade.Image, paddle: Phaser.Physics.Arcade.Image): void {
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
	private hitBrick(ball: Phaser.Physics.Arcade.Image, brick: Phaser.Physics.Arcade.Image): void {
		brick.destroy();
	}

	private resetBall(): void {
		this.ball.setVelocity(0);
		this.ball.setPosition(this.paddle.x, this.paddle.y - 30);
		this.ball.setData("onPaddle", true);
	}
}
