(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.onload = function() {
        var preloader = document.getElementById("page-preloader");
        if (!preloader.classList.contains("preloader-hide")) preloader.classList.add("preloader-hide");
        setTimeout((function() {
            preloader.classList.add("preloader-hide--done");
        }), 500);
        const lightStyles = document.querySelectorAll("link[rel=stylesheet][media*=prefers-color-scheme][media*=light]");
        const darkStyles = document.querySelectorAll("link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]");
        const darkSchemeMedia = matchMedia("(prefers-color-scheme: dark)");
        const switcherRadios = document.querySelectorAll(".switcher__radio");
        function setupSwitcher() {
            const savedScheme = getSavedScheme();
            if (null !== savedScheme) {
                const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
                currentRadio.checked = true;
            }
            [ ...switcherRadios ].forEach((radio => {
                radio.addEventListener("change", (event => {
                    setScheme(event.target.value);
                }));
            }));
        }
        function setupScheme() {
            const savedScheme = getSavedScheme();
            const systemScheme = getSystemScheme();
            if (null === savedScheme) return;
            if (savedScheme !== systemScheme) setScheme(savedScheme);
        }
        function setScheme(scheme) {
            switchMedia(scheme);
            if ("auto" === scheme) clearScheme(); else saveScheme(scheme);
        }
        function switchMedia(scheme) {
            let lightMedia;
            let darkMedia;
            if ("auto" === scheme) {
                lightMedia = "(prefers-color-scheme: light)";
                darkMedia = "(prefers-color-scheme: dark)";
            } else {
                lightMedia = "light" === scheme ? "all" : "not all";
                darkMedia = "dark" === scheme ? "all" : "not all";
            }
            [ ...lightStyles ].forEach((link => {
                link.media = lightMedia;
            }));
            [ ...darkStyles ].forEach((link => {
                link.media = darkMedia;
            }));
        }
        function getSystemScheme() {
            const darkScheme = darkSchemeMedia.matches;
            return darkScheme ? "dark" : "light";
        }
        function getSavedScheme() {
            return localStorage.getItem("color-scheme");
        }
        function saveScheme(scheme) {
            localStorage.setItem("color-scheme", scheme);
        }
        function clearScheme() {
            localStorage.removeItem("color-scheme");
        }
        setupSwitcher();
        setupScheme();
        const parallax = document.querySelector(".parallax");
        if (parallax) {
            document.querySelector(".intro__parallax");
            const image = document.querySelector(".images-parallax__laptop, .images-parallax__contacts-image");
            const decorOne = document.querySelector(".images-parallax__decor-1");
            const decorTwo = document.querySelector(".images-parallax__decor-2");
            const linkOne = document.querySelector(".images-parallax__contacts-link-1");
            const linkTwo = document.querySelector(".images-parallax__contacts-link-2");
            const linkThree = document.querySelector(".images-parallax__contacts-link-3");
            const forImage = 15;
            const fordecorOne = 10;
            const fordecorTwo = 8;
            const forlinkOne = 4;
            const forlinkTwo = 5;
            const forlinkThree = 4;
            const speed = .05;
            let positionX = 0, positionY = 0;
            let coordXprocent = 0, coordYprocent = 0;
            function setMouseParallaxStyle() {
                const distX = coordXprocent - positionX;
                const distY = coordYprocent - positionY;
                positionX += distX * speed;
                positionY += distY * speed;
                image.style.cssText = `transform: translate(${positionX / forImage}%, ${positionY / forImage}%);`;
                decorOne.style.cssText = `transform: translate(${positionX / fordecorOne}%, ${positionY / fordecorOne}%);`;
                decorTwo.style.cssText = `transform: translate(${positionX / fordecorTwo}%, ${positionY / fordecorTwo}%);`;
                linkOne.style.cssText = `transform: translate(${positionX / forlinkOne}%, ${positionY / forlinkOne}%);`;
                linkTwo.style.cssText = `transform: translate(${positionX / forlinkTwo}%, ${positionY / forlinkTwo}%);`;
                linkThree.style.cssText = `transform: translate(${positionX / forlinkThree}%, ${positionY / forlinkThree}%);`;
                requestAnimationFrame(setMouseParallaxStyle);
            }
            setMouseParallaxStyle();
            parallax.addEventListener("mousemove", (function(e) {
                const parallaxWidth = parallax.offsetWidth;
                const parallaxHeight = parallax.offsetHeight;
                const coordX = e.pageX - parallaxWidth / 2;
                const coordY = e.pageY - parallaxHeight / 2;
                coordXprocent = coordX / parallaxWidth * 100;
                coordYprocent = coordY / parallaxHeight * 100;
            }));
        }
        function getWindowWidth() {
            return window.innerWidth || document.body.clientWidth;
        }
        if (getWindowWidth() >= 991.98) {
            let wrapper = document.querySelector(".wrapper");
            let pageSlider = new Swiper(".page", {
                wrapperClass: "page__wrapper",
                slideClass: "page__screen",
                direction: "vertical",
                slidesPerView: "auto",
                parallax: true,
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                    pageUpDown: true
                },
                mousewheel: {
                    sensitivity: 1
                },
                watchOverflow: true,
                speed: 800,
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                pagination: {
                    el: ".page__pagination",
                    type: "bullets",
                    clickable: true,
                    bulletClass: "page__bullet",
                    bulletActiveClass: "page__bullet_active"
                },
                scrollbar: {
                    el: ".page__scroll",
                    dragClass: "page__drag-scroll",
                    draggable: true
                },
                init: false,
                on: {
                    init: function() {
                        setScrollType();
                        wrapper.classList.add("_loaded");
                    },
                    resize: function() {
                        setScrollType();
                    }
                }
            });
            function setScrollType() {
                if (wrapper.classList.contains("_free")) {
                    wrapper.classList.remove("_free");
                    pageSlider.params.freeMode = false;
                }
                for (let index = 0; index < pageSlider.slides.length; index++) {
                    const pageSlide = pageSlider.slides[index];
                    const pageSlideContent = pageSlide.querySelector(".screen__content");
                    if (pageSlideContent) {
                        const pageSlideContentHeight = pageSlideContent.offsetHeight;
                        if (pageSlideContentHeight > window.innerHeight) {
                            wrapper.classList.add("_free");
                            pageSlider.params.freeMode = true;
                            break;
                        }
                    }
                }
            }
            pageSlider.init();
        }
        if (getWindowWidth() <= 991.98) {
            const headerElement = document.querySelector(".page-intro--scroll, .header");
            const callback = function(entries, observer) {
                if (entries[0].isIntersecting) headerElement.classList.remove("_scroll"); else headerElement.classList.add("_scroll");
            };
            const headerObserver = new IntersectionObserver(callback);
            headerObserver.observe(headerElement);
            let benefitsSlider = new Swiper(".benefits__body", {
                slidesPerView: 1,
                direction: "horizontal",
                spaceBetween: 20,
                speed: 800,
                loop: true,
                dynamicBullets: true,
                breakpoints: {
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    }
                },
                pagination: {
                    el: ".benefits__pagination",
                    type: "bullets",
                    clickable: true,
                    bulletClass: "benefits__bullet",
                    bulletActiveClass: "benefits__bullet_active"
                }
            });
            benefitsSlider.init();
        }
    };
    window["FLS"] = true;
    isWebp();
    menuInit();
})();