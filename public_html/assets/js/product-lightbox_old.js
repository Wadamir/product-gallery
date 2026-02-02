import PhotoSwipe from "https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.esm.min.js";
// import PhotoSwipeUI from "https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe-ui-default.esm.min.js";

function buildGalleryItems() {
	const items = [];

	const sourceVideo = document.querySelector(".main-swiper .product-video");
	/* Video slide (index 0) */
	items.push({
		html: `
            <div class="pswp-video-wrapper">
                <video
                    class="pswp-video"
                    src="${sourceVideo?.currentSrc || sourceVideo?.src || ""}"
                    muted
                    controls
                    playsinline
                    preload="metadata"
                ></video>
            </div>
        `,
		width: 640,
		height: 960,
		w: 640,
		h: 960,
	});

	/* Image slides */
	document
		.querySelectorAll(".main-swiper .media-wrapper img")
		.forEach((img) => {
			items.push({
				src: img.src,
				w: img.getAttribute("data-pswp-width") || 640,
				h: img.getAttribute("data-pswp-height") || 960,
			});
		});

	return items;
}

function openFullscreenGallery(startIndex = 0) {
	const pswp = new PhotoSwipe({
		dataSource: buildGalleryItems(),
		index: startIndex,
		bgOpacity: 1,
		showHideAnimationType: "fade",
	});
	console.log(pswp);

	let activeVideo = null;

	function handleVideo() {
		if (!pswp.currSlide) return;

		const slide = pswp.currSlide;

		// Pause previous
		if (activeVideo) {
			activeVideo.pause();
			activeVideo.currentTime = 0;
			activeVideo = null;
		}

		// IMPORTANT: html content lives here
		const contentEl = slide.content && slide.content.element;
		console.log("Content Element:", contentEl);
		if (!contentEl) return;

		const video = contentEl.querySelector("video");
		console.log("Video Element:", video);
		if (!video) return;

		activeVideo = video;

		// Do NOT autoplay blindly
		if (video.readyState >= 2) {
			video.play().catch(() => {});
		} else {
			video.addEventListener(
				"loadeddata",
				() => {
					video.play().catch(() => {});
				},
				{ once: true },
			);
		}
	}

	// pswp.on("afterInit", () => {
	// 	console.log("PhotoSwipe initialized");
	// 	handleVideo();
	// });
	// pswp.on("change", () => {
	// 	console.log("PhotoSwipe slide changed");
	// 	handleVideo();
	// });

	pswp.on("contentActivate", () => {
		console.log("PhotoSwipe content activated");
		handleVideo();
	});
	pswp.on("contentDeactivate", () => {
		console.log("PhotoSwipe content deactivated");
		if (activeVideo) {
			activeVideo.pause();
			// activeVideo.currentTime = 0;
			// activeVideo = null;
		}
	});

	pswp.on("destroy", () => {
		console.log("PhotoSwipe destroyed");
		if (activeVideo) {
			activeVideo.pause();
			activeVideo.currentTime = 0;
			activeVideo = null;
		}
	});

	pswp.init();
}

document
	.querySelectorAll(".main-swiper .image-wrapper img")
	.forEach((img, i) => {
		img.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			openFullscreenGallery(i + 1); // +1 because video is index 0
		});
	});

document.querySelectorAll(".video-fullscreen-btn").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.stopPropagation();
		openFullscreenGallery(0); // video slide
	});
});
