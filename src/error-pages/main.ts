import "./main.css";

const boxes = [...document.querySelector("#boxContainer")!.children].map((element: HTMLElement) => {
	const box = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		offsetX: 0,
		offsetY: 0,
		isFleeing: false,
		render() {
			element.classList.toggle("fleeing", this.isFleeing);
			element.style.translate = `${this.x + this.offsetX}px ${this.y + this.offsetY}px`
		},
		resize() {
			const rect = element.getBoundingClientRect();
			this.x = rect.x;
			this.y = rect.y;
			this.width = rect.width;
			this.height = rect.height;
			this.offsetX = -this.x;
			this.offsetY = -this.y;
		}
	}
	box.resize();
	box.render();
	return box;
});

onresize = ()=>{
	for (const box of boxes) {
		box.resize();
		box.render();
	}
}

let mouseX = 0;
let mouseY = 0;

addEventListener("pointermove", (event)=>{
	mouseX = event.clientX;
	mouseY = event.clientY;
});

function update(elapsedTime: number) {
	const fleeRadius = 200;
	const fleeMargin = 10;
	const fleeSpeed = 500;
	const fleeAngleRandom = .5;

	// move box away from mouse
	for (const box of boxes) {
		const boxX = box.x + box.width / 2;
		const boxY = box.y + box.height / 2;

		const distance = Math.sqrt((boxX - mouseX) ** 2 + (boxY - mouseY) ** 2);

		box.isFleeing = distance < fleeRadius - fleeMargin;

		if (distance < fleeRadius) {
			const angle = Math.atan2(mouseY - boxY, mouseX - boxX) + Math.PI + Math.random() * fleeAngleRandom;

			// flee speed should be inversely proportional to distance
			const speed = fleeSpeed * (1 - distance / fleeRadius);

			box.x += Math.cos(angle) * speed * elapsedTime;
			box.y += Math.sin(angle) * speed * elapsedTime;

			// prevent box from exiting screen
			const boxWidth = box.width;
			const boxHeight = box.height;
			const boxLeft = box.x;
			const boxTop = box.y;
			const boxRight = boxLeft + boxWidth;
			const boxBottom = boxTop + boxHeight;

			const windowWidth = innerWidth;
			const windowHeight = innerHeight;

			if (boxLeft < 0) box.x = 0;
			if (boxRight > windowWidth) box.x = windowWidth - boxWidth;
			if (boxTop < 0) box.y = 0;
			if (boxBottom > windowHeight) box.y = windowHeight - boxHeight;
		}
		
		box.render();
	}
}

let oldTime = 0;
function loop(time: number) {
	const elapsedTime = (time - oldTime) / 1000;
	oldTime = time;

	update(elapsedTime);

	requestAnimationFrame(loop);
}
requestAnimationFrame(loop);