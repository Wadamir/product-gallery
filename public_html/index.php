<?php require __DIR__ . '/includes/header.php'; ?>
<div class="product-card">

    <div class="product-gallery-wrapper">
        <button class="gallery-close" type="button" aria-label="Close gallery">
            &times;
        </button>

        <div class="gesture-debug" hidden>
            <strong>Gestures</strong>
            <div>status: -</div>
            <div>event: -</div>
            <div>pointers: 0</div>
            <div>scale: 1</div>
            <div>last: -</div>
            <hr />
            <strong>Swiper</strong>
            <div>event: -</div>
            <div>touch: -</div>
            <div>slide: -</div>
            <div>allowTouchMove: -</div>
        </div>

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
                            <div class="media-wrapper video-wrapper" style="background-image: url('/assets/images/photo_door0.png')">
                                <button class="video-fullscreen-btn" type="button" aria-label="Open video fullscreen">
                                    <i class="bi bi-arrows-fullscreen"></i>
                                </button>
                                <div class="video-loader">
                                    <span class="spinner"></span>
                                </div>
                                <video
                                    class="product-video"
                                    src="/assets/video/karmina-video-01.mp4"
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
                                <a href="/assets/images/photo_door1.png">
                                    <img src="/assets/images/photo_door1.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/photo_door2.png">
                                    <img src="/assets/images/photo_door2.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/photo_door3.png">
                                    <img src="/assets/images/photo_door3.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/photo_door4.png">
                                    <img src="/assets/images/photo_door4.png" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="media-wrapper image-wrapper">
                                <a href="/assets/images/photo_door5.png">
                                    <img src="/assets/images/photo_door5.png" alt="">
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
                            <img src="/assets/images/photo_door0.png" alt="Video thumbnail">
                        </div>

                        <!-- IMAGE THUMBS -->
                        <div class="swiper-slide thumb"><img src="/assets/images/photo_door1.png"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/photo_door2.png"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/photo_door3.png"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/photo_door4.png"></div>
                        <div class="swiper-slide thumb"><img src="/assets/images/photo_door5.png"></div>
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