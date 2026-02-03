const DEBUG_GESTURES = true;

document.addEventListener("DOMContentLoaded", () => {
	/* Debug gesture events */
	const debugEl = document.querySelector(".gesture-debug");

	function debugShow() {
		if (DEBUG_GESTURES && debugEl) {
			debugEl.hidden = false;
		}
	}

	function debugHide() {
		if (debugEl) debugEl.hidden = true;
	}

	function debugUpdate(data = {}) {
		if (!DEBUG_GESTURES || !debugEl) return;

		if (data.status)
			debugEl.children[1].textContent = `status: ${data.status}`;

		if (data.event)
			debugEl.children[2].textContent = `event: ${data.event}`;

		if (data.pointers !== undefined)
			debugEl.children[3].textContent = `pointers: ${data.pointers}`;

		if (data.scale !== undefined)
			debugEl.children[4].textContent = `scale: ${data.scale.toFixed(2)}`;

		if (data.last) debugEl.children[5].textContent = `last: ${data.last}`;
	}

	function debugSwiperUpdate(data = {}) {
		if (!DEBUG_GESTURES || !debugEl) return;

		const base = 7; // индекс, где начинается Swiper-блок

		if (data.event) {
			console.log(
				"debugEl.children[base + 1]",
				debugEl.children[base + 1],
			);
			if (debugEl.children[base + 1])
				debugEl.children[base + 1].textContent = `event: ${data.event}`;
		}

		if (data.touch !== undefined) {
			console.log(
				"debugEl.children[base + 2]",
				debugEl.children[base + 2],
			);
			if (debugEl.children[base + 2])
				debugEl.children[base + 2].textContent = `touch: ${data.touch}`;
		}

		if (data.slide !== undefined) {
			console.log(
				"debugEl.children[base + 3]",
				debugEl.children[base + 3],
			);
			if (debugEl.children[base + 3])
				debugEl.children[base + 3].textContent = `slide: ${data.slide}`;
		}

		if (data.allowTouchMove !== undefined) {
			console.log(
				"debugEl.children[base + 4]",
				debugEl.children[base + 4],
			);
			if (debugEl.children[base + 4])
				debugEl.children[base + 4].textContent =
					`allowTouchMove: ${data.allowTouchMove}`;
		}
	}

	function enableDoubleTapClose(target) {
		target.addEventListener("click", () => {
			const now = Date.now();
			const diff = now - lastTap;

			if (diff < 300 && scale > 1) {
				debugUpdate({
					event: "double-tap",
					last: "close fullscreen",
				});

				resetZoom(target);
				closeFullscreen();
			} else {
				debugUpdate({
					event: "tap",
					last: `delta=${diff}ms`,
				});
			}

			lastTap = now;
		});
	}

	/* End debug gesture events */

	let isFullscreen = false;
	let userPausedVideo = false;

	const closeBtn = document.querySelector(".gallery-close");

	if (closeBtn) {
		closeBtn.addEventListener("click", closeFullscreen);
	}

	/* pinch to zoom support start */
	let scale = 1;
	let startScale = 1;
	let pointers = new Map();
	let isZoomed = false;

	let startDist = null;
	let lastTap = 0;

	let lastTapTime = 0;
	let didPinch = false;
	/* pinch to zoom support end */

	const thumbsSwiper = new Swiper(".thumbs-swiper", {
		slidesPerView: "auto",
		spaceBetween: 12,
		freeMode: true,
		watchSlidesProgress: true,
		mousewheel: true,
		navigation: {
			prevEl: ".thumbs-prev",
			nextEl: ".thumbs-next",
		},
		// breakpoints: {
		// 	1200: {
		// 		slidesPerView: 4,
		// 	},
		// },
	});

	const mainSwiper = new Swiper(".main-swiper", {
		slidesPerView: 1,
		initialSlide: 0,
		thumbs: { swiper: thumbsSwiper },
		navigation: {
			prevEl: ".main-prev",
			nextEl: ".main-next",
		},
		on: {
			init(swiper) {
				debugSwiperUpdate({
					event: "init",
					allowTouchMove: swiper.allowTouchMove,
				});
			},

			touchStart(swiper, event) {
				debugSwiperUpdate({
					event: "touchStart",
					touch: event?.type,
					allowTouchMove: swiper.allowTouchMove,
				});
			},

			touchMove(swiper, event) {
				debugSwiperUpdate({
					event: "touchMove",
					touch: event?.type,
				});
			},

			touchEnd(swiper) {
				debugSwiperUpdate({
					event: "touchEnd",
					allowTouchMove: swiper.allowTouchMove,
				});
			},

			sliderMove(swiper) {
				debugSwiperUpdate({
					event: "sliderMove",
				});
			},

			slideChange(swiper) {
				debugSwiperUpdate({
					event: "slideChange",
					slide: swiper.activeIndex,
				});
			},

			transitionStart(swiper) {
				debugSwiperUpdate({
					event: "transitionStart",
				});
			},

			transitionEnd(swiper) {
				debugSwiperUpdate({
					event: "transitionEnd",
				});
			},
		},
	});

	/* pinch to zoom support start */
	mainSwiper.on("slideChange", () => {
		const active = document.querySelector(
			".swiper-slide-active img, .swiper-slide-active video",
		);

		if (active) {
			enablePinchZoom(active);
			enableDoubleTapClose(active);
		}
	});
	/* pinch to zoom support end */

	function toggleMainArrows(swiper) {
		const root = swiper.el;
		if (!root) return;

		if (swiper.slides.length <= 1) {
			root.classList.add("no-arrows");
		} else {
			root.classList.remove("no-arrows");
		}
	}

	function initVideoControls(swiper) {
		const slide = swiper.slides[0];
		if (!slide || !slide.classList.contains("is-video")) return;

		const video = slide.querySelector("video");
		const wrapper = slide.querySelector(".video-wrapper");
		if (!video || !wrapper) return;

		video.addEventListener("click", (e) => {
			e.stopPropagation();

			if (video.paused) {
				console.log("play");
				video.play().catch(() => {});
				wrapper.classList.remove("is-paused");
				userPausedVideo = false;
			} else {
				console.log("pause");
				video.pause();
				wrapper.classList.add("is-paused");
				userPausedVideo = true;
			}
		});
	}

	function handleVideo(swiper) {
		console.log("handleVideo called");
		const slide = swiper.slides[0];
		if (!slide || !slide.classList.contains("is-video")) return;

		const video = slide.querySelector("video");
		const wrapper = slide.querySelector(".video-wrapper");
		if (!video || !wrapper) return;

		if (swiper.activeIndex === 0) {
			if (!userPausedVideo) {
				video
					.play()
					.then(() => {
						wrapper.classList.remove("is-paused");
						wrapper.classList.add("is-loaded");
					})
					.catch(() => {});
			}
		} else {
			video.pause();
		}
	}

	function openFullscreen() {
		if (isFullscreen) return;
		isFullscreen = true;

		document.body.classList.add("no-scroll");
		document
			.querySelector(".product-gallery-wrapper")
			.classList.add("is-fullscreen");

		/* debug gesture events */
		debugShow();
		debugUpdate({ status: "fullscreen opened" });
		/* end debug gesture events */

		// iOs fix for Swiper not updating correctly
		requestAnimationFrame(() => {
			mainSwiper.update();

			/* pinch to zoom support start */
			requestAnimationFrame(() => {
				const activeSlide = document.querySelector(
					".swiper-slide-active img, .swiper-slide-active video",
				);

				if (activeSlide) {
					enablePinchZoom(activeSlide);
					enableDoubleTapClose(activeSlide);
				}
			});
			/* pinch to zoom support end */

			mainSwiper.updateSlides();
			mainSwiper.updateSize();
		});
	}

	function closeFullscreen() {
		if (!isFullscreen) return;
		isFullscreen = false;

		document.body.classList.remove("no-scroll");
		document
			.querySelector(".product-gallery-wrapper")
			.classList.remove("is-fullscreen");

		/* debug gesture events */
		debugUpdate({ status: "fullscreen closed" });
		debugHide();
		/* end debug gesture events */

		mainSwiper.update();
	}

	/* pinch to zoom support start */
	function enablePinchZoom(target) {
		target.addEventListener("pointerdown", onPointerDown);
		target.addEventListener("pointermove", onPointerMove);
		target.addEventListener("pointerup", onPointerUp);
		target.addEventListener("pointercancel", onPointerUp);
	}

	function onPointerDown(e) {
		pointers.set(e.pointerId, e);

		const now = Date.now();

		// double tap detection
		if (
			pointers.size === 1 &&
			now - lastTapTime < 300 &&
			scale > 1 &&
			!didPinch
		) {
			debugUpdate({
				event: "double-tap",
				last: "reset zoom",
			});

			resetZoom(e.target);
			lastTapTime = 0;
			return;
		}

		lastTapTime = now;
		didPinch = false;

		debugUpdate({
			event: "pointerdown",
			pointers: pointers.size,
		});
	}

	function onPointerMove(e) {
		if (!pointers.has(e.pointerId)) return;

		pointers.set(e.pointerId, e);

		if (pointers.size === 2) {
			didPinch = true;

			const [p1, p2] = Array.from(pointers.values());
			const dist = getDistance(p1, p2);

			if (!startScale) startScale = scale;
			scale = Math.min(Math.max(startScale * (dist / startDist), 1), 4);

			applyScale(e.target);
		}

		debugUpdate({
			event: "pointermove",
			pointers: pointers.size,
			scale,
		});
	}

	function onPointerUp(e) {
		pointers.delete(e.pointerId);

		if (pointers.size < 2) {
			startDist = null;
			startScale = scale;
			isZoomed = scale > 1;
		}

		debugUpdate({
			event: "pointerup",
			pointers: pointers.size,
		});
	}

	function getDistance(p1, p2) {
		const dx = p1.clientX - p2.clientX;
		const dy = p1.clientY - p2.clientY;
		const dist = Math.hypot(dx, dy);
		if (!startDist) startDist = dist;
		return dist;
	}

	function applyScale(el) {
		el.style.transform = `scale(${scale})`;

		// block swiper swiping when zoomed in
		mainSwiper.allowTouchMove = scale === 1;
	}

	function enableDoubleTapClose(target) {
		target.addEventListener("click", (e) => {
			const now = Date.now();
			if (now - lastTap < 300 && scale > 1) {
				resetZoom(target);
				closeFullscreen();
			}
			lastTap = now;
		});
	}

	function resetZoom(target) {
		scale = 1;
		startScale = 1;
		startDist = null;
		isZoomed = false;
		didPinch = false;

		target.style.transform = "scale(1)";
		mainSwiper.allowTouchMove = true;
	}

	document
		.querySelector(".video-fullscreen-btn")
		?.addEventListener("click", (e) => {
			e.stopPropagation();
			openFullscreen();
		});

	document.querySelectorAll(".image-wrapper img").forEach((img) => {
		img.addEventListener("click", (e) => {
			e.preventDefault();
			openFullscreen();
		});
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeFullscreen();
		}
	});
});
