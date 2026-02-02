<?php require __DIR__ . '/includes/header.php'; ?>
<div class="product-card">

    <div class="product-gallery-wrapper">
        <div class="product-gallery">
            <div class="product-main-image">
                <div class="sticker-wrapper"><span class="product-badge">New</span></div>

                <div class="swiper main-swiper">
                    <button class="main-arrow main-prev" type="button" aria-label="Previous">
                        <i class="bi bi-chevron-compact-left"></i>
                    </button>
                    <div class="swiper-wrapper">
                        <!-- VIDEO SLIDE -->
                        <div class="swiper-slide is-video">
                            <div class="media-wrapper video-wrapper">
                                <button class="video-fullscreen-btn" type="button" aria-label="Open video fullscreen">
                                    <i class="bi bi-arrows-fullscreen"></i>
                                </button>
                                <div class="video-loader">
                                    <svg width="48" height="48" viewBox="0 0 50 50">
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="4"
                                            stroke-linecap="round"
                                            stroke-dasharray="31.4 31.4">
                                            <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from="0 25 25"
                                                to="360 25 25"
                                                dur="1s"
                                                repeatCount="indefinite" />
                                        </circle>
                                    </svg>
                                </div>
                                <video
                                    class="product-video"
                                    src="/assets/video/product-video.mp4"
                                    muted
                                    playsinline
                                    autoplay
                                    loop
                                    preload="metadata">
                                </video>
                            </div>
                        </div>

                        <!-- IMAGE SLIDES -->
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/product-1.jpg" data-pswp-width="640" data-pswp-height="960">
                                    <img src="/assets/images/product-1.jpg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/product-2.jpg" data-pswp-width="640" data-pswp-height="960">
                                    <img src="/assets/images/product-2.jpg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/product-3.jpg" data-pswp-width="640" data-pswp-height="960">
                                    <img src="/assets/images/product-3.jpg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/product-4.jpg" data-pswp-width="640" data-pswp-height="960">
                                    <img src="/assets/images/product-4.jpg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/product-5.jpg" data-pswp-width="640" data-pswp-height="960">
                                    <img src="/assets/images/product-5.jpg" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                    <button class="main-arrow main-next" type="button" aria-label="Next">
                        <i class="bi bi-chevron-compact-right"></i>
                    </button>
                </div>
            </div>

            <div class="product-thumbnails-wrapper">
                <button class="thumbs-arrow thumbs-prev" type="button" aria-label="Previous">
                    <i class="bi bi-chevron-compact-left"></i>
                </button>
                <div class="product-thumbnails swiper thumbs-swiper">
                    <div class="swiper-wrapper">

                        <!-- VIDEO THUMB -->
                        <div class="swiper-slide thumb is-video-thumb">
                            <img src="/assets/images/video-placeholder.png" alt="Video thumbnail">
                            <span class="video-icon d-none hidden">▶</span>
                        </div>

                        <!-- IMAGE THUMBS -->
                        <div class="swiper-slide thumb"><img src="/assets/images/product-1.jpg"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/product-2.jpg"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/product-3.jpg"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/product-4.jpg"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/product-5.jpg"></div>
                    </div>
                </div>
                <button class="thumbs-arrow thumbs-next" type="button" aria-label="Next">
                    <i class="bi bi-chevron-compact-right"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="product-info">
        <h1 class="product-title">Волосы для наращивания натуральные, блонд, срезы, прямые, 50 см, тон 12</h1>

        <ul class="product-meta">
            <li><strong>Модель:</strong> Натуральный блонд</li>
            <li><strong>Вес:</strong> 110г</li>
            <li><strong>Производитель:</strong> HairPro</li>
            <li class="in-stock">В наличии</li>
        </ul>

        <p class="product-description">
            Эксклюзивные натуральные волосы для наращивания.
        </p>

        <div class="product-price">13 000 ₽</div>

        <div class="product-actions">
            <button class="btn-primary">Добавить в корзину</button>
            <button class="btn-outline">Купить в 1 клик</button>
        </div>
    </div>

</div>

<?php require __DIR__ . '/includes/footer.php'; ?>