document.addEventListener("DOMContentLoaded", () => {
	const bird = document.querySelector(".cute-bird");
	const gameDisplay = document.querySelector(".game-container");
	const ground = document.querySelector(".ground-moving");

	let birdLeft = 220;
	let birdBottom = 100;
	let gravity = 3;
	let isGameOver = false;
	let gap = 480; // can use this to set hard level
	const birdHeight = 45;

	function startGame() {
		birdBottom -= gravity;
		bird.style.bottom = birdBottom + "px";
		bird.style.left = birdLeft + "px";
	}

	let gameTimerId = setInterval(startGame, 20);

	function control(e) {
		if (e.keyCode === 32) {
			jump();
		}
	}

	function jump() {
		if (birdBottom < 500) birdBottom += 50;
		bird.style.bottom = birdBottom + "px";
		console.log(birdBottom);
	}

	document.addEventListener("keyup", control);

	function generateObstacle() {
		let obstacleLeft = 500; // start from edge of screen
		let randomHeight = Math.random() * 60;
		let obstacleBottom = randomHeight;

		const obstacle = document.createElement("div");
		const topObstacle = document.createElement("div");

		if (!isGameOver) {
			obstacle.classList.add("obstacle");
			topObstacle.classList.add("topObstacle");
		}

		setObstacle(obstacle, obstacleBottom);
		setObstacle(topObstacle, obstacleBottom + gap);

		function setObstacle(currObstacle, bottom) {
			gameDisplay.appendChild(currObstacle);
			currObstacle.style.bottom = bottom + "px";
			currObstacle.style.left = obstacleLeft + "px";
		}
		function ifBirdLost() {
			console.log(birdBottom, birdHeight);
			return (
				(obstacleLeft > 200 &&
					obstacleLeft < 280 &&
					birdLeft === 220 &&
					(birdBottom < obstacleBottom + 153 ||
						birdBottom > obstacleBottom + gap - 180)) ||
				birdBottom <= 1 // sometimes fall too fast, so do less than
			);
		}
		function moveObstacle() {
			obstacleLeft -= 2;
			obstacle.style.left = obstacleLeft + "px";
			topObstacle.style.left = obstacleLeft + "px";

			if (obstacleLeft === -60) {
				clearInterval(timerId);
				gameDisplay.removeChild(obstacle);
				gameDisplay.removeChild(topObstacle);
			}
			if (ifBirdLost()) {
				gameOver();
				clearInterval(timerId);
			}
		}
		let timerId = setInterval(moveObstacle, 20);
		if (!isGameOver) setTimeout(generateObstacle, 3000);
	}

	generateObstacle();

	function gameOver() {
		clearInterval(gameTimerId);
		console.log("game over");
		isGameOver = true;
		document.removeEventListener("keyup", control);
		ground.classList.add("ground"); // stop the moving
		ground.classList.remove("ground-moving");
	}
});
