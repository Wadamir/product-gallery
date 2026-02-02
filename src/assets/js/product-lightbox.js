import PhotoSwipeLightbox from "https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe-lightbox.esm.min.js";

const lightbox = new PhotoSwipeLightbox({
	gallery: "#product-pswp",
	children: "a",
	pswpModule: () =>
		import(
			"https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.esm.min.js"
		),
});

lightbox.addFilter("itemData", (itemData) => {
	if (itemData.type === "video") {
		itemData.html = `
			<div class="pswp-video-wrapper">
				<video
					class="pswp-video"
					src="${itemData.src}"
                    muted
                    loop
					playsinline
					preload="metadata"
					poster="/assets/images/video-poster.jpg"
				></video>

				<button class="pswp-video-play" type="button" aria-label="Play video">
					<i class="bi bi-play-btn"></i>
				</button>
			</div>
		`;
	}
	return itemData;
});

lightbox.on("contentActivate", ({ content }) => {
	console.log("content activated");
	const wrapper = content.element?.querySelector(".pswp-video-wrapper");
	console.log("wrapper:", wrapper);
	if (!wrapper) return;

	const video = wrapper.querySelector(".pswp-video");
	console.log("video:", video);
	const playBtn = wrapper.querySelector(".pswp-video-play");
	console.log("playBtn:", playBtn);
	if (!video || !playBtn) return;

	/* Try to click play on video load */
	video.addEventListener("loadeddata", () => {
		console.log("video loadeddata");
		videoLoaded = true;
		video
			.play()
			.then(() => {
				playBtn.style.display = "none";
			})
			.catch(() => {
				// Autoplay failed, wait for user gesture
				console.log("autoplay failed, waiting for user gesture");
			});
	});

	/* Hide play button when video is playing */
	video.addEventListener("play", () => {
		console.log("video playing");
		playBtn.style.display = "none";
	});

	/* First play via explicit button (user gesture) */
	// playBtn.addEventListener(
	// 	"click",
	// 	(e) => {
	// 		console.log("play button clicked");
	// 		e.stopPropagation();
	// 		video.play().then(() => {
	// 			playBtn.style.display = "none";
	// 		});
	// 	},
	// 	{ once: true },
	// );

	/* Toggle play / pause by clicking on video */
	video.addEventListener("click", () => {
		console.log("video clicked");
		if (video.paused) {
			console.log("video paused, playing now");
			video.play().catch(() => {});
			// videoPausedByUser = false;
		} else {
			console.log("video playing, pausing now");
			video.pause();
			// videoPausedByUser = true;
		}
	});
});

lightbox.init();

const psGallery = document.getElementById("product-pswp");

document
	.querySelectorAll(".main-swiper .media-wrapper img")
	.forEach((img, i) => {
		img.addEventListener("click", (e) => {
			e.preventDefault();
			lightbox.loadAndOpen(i + 1); // +1 because video is first
			psGallery.classList.remove("d-none");
		});
	});

document
	.querySelector(".video-fullscreen-btn")
	.addEventListener("click", (e) => {
		e.stopPropagation();
		lightbox.loadAndOpen(0);
		psGallery.classList.remove("d-none");
	});
