document.addEventListener("DOMContentLoaded", () => {
	let isFullscreen = false;
	let userPausedVideo = false;

	const closeBtn = document.querySelector(".gallery-close");

	if (closeBtn) {
		closeBtn.addEventListener("click", closeFullscreen);
	}

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
		thumbs: {
			swiper: thumbsSwiper,
		},
		navigation: {
			prevEl: ".main-prev",
			nextEl: ".main-next",
		},
		on: {
			init(swiper) {
				toggleMainArrows(swiper);
				initVideoControls(swiper);
				handleVideo(swiper);
			},
			slideChange(swiper) {
				handleVideo(swiper);
			},
		},
	});

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

		// iOs fix for Swiper not updating correctly
		requestAnimationFrame(() => {
			mainSwiper.update();
			mainSwiper.updateSlides();
			mainSwiper.updateSize();
		});

		// mainSwiper.update();
	}

	function closeFullscreen() {
		if (!isFullscreen) return;
		isFullscreen = false;

		document.body.classList.remove("no-scroll");
		document
			.querySelector(".product-gallery-wrapper")
			.classList.remove("is-fullscreen");

		mainSwiper.update();
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
