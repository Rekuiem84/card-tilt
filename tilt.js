function tiltForward(card, event) {
	tilt(card, event, 1);
}

function tiltBackward(card, event) {
	tilt(card, event, -1);
}

function tilt(card, event, cornerIsClose) {
	const width = card.offsetWidth;
	const height = card.offsetHeight;

	const distanceFromCenterX = event.offsetX - width / 2;
	const distanceFromCenterY = event.offsetY - height / 2;

	const percentX = Math.floor((distanceFromCenterX / width) * 2 * 100);
	const percentY = Math.floor((distanceFromCenterY / height) * 2 * 100);

	const maxTiltDegree = 8;

	const tiltY = ((percentX * maxTiltDegree) / 100) * (cornerIsClose * -1);
	const tiltX = ((percentY * maxTiltDegree) / 100) * cornerIsClose;

	card.style.setProperty("--x-tilt", `${tiltX}deg`);
	card.style.setProperty("--y-tilt", `${tiltY}deg`);
}

const tiltElementsCont = document.querySelectorAll(".card-perspective");

tiltElementsCont.forEach((card) => {
	const tiltElement = card.querySelector(".tilt");
	const tiltDirection = tiltElement.getAttribute("data-tilt") || "backward";

	if (tiltDirection === "forward") {
		card.addEventListener("mousemove", (event) => tiltForward(card, event));
	} else if (tiltDirection === "backward") {
		card.addEventListener("mousemove", (event) => tiltBackward(card, event));
	}
});
