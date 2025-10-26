<script setup lang="ts">
import { gsap } from "gsap";
import { useMouse } from "@vueuse/core";

const { x, y } = useMouse();
const mouseDefault = reactive(useMouse());
// const textDefault = stringify(mouseDefault);
console.log(mouseDefault.x, mouseDefault.y);

const runAnimations = () => {
    console.log("Page loaded");

    const blobs = document.querySelectorAll(".color-blob");
    const particlesContainer = document.getElementById("particles");
    const particleCount = 30;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    blobs.forEach((blob, index) => {
        gsap.to(blob, {
            x: "random(-150, 150)",
            y: "random(-150, 150)",
            scale: "random(0.8, 1.2)",
            duration: "random(5, 15)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
        });

        gsap.to(blob, {
            opacity: "random(0.4, 0.8)",
            duration: "random(8, 12)",
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    });

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesContainer?.appendChild(particle);

        gsap.to(particle, {
            x: "random(-200, 200)",
            y: "random(-200, 200)",
            opacity: "random(0.2, 0.8)",
            duration: "random(20, 40)",
            repeat: -1,
            yoyo: true,
            ease: "none"
        });
    }

    tl.fromTo(
        "#hero-title",
        {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.3
        },
        "-=0.5"
    ).fromTo(
        "#hero-subtitle",
        {
            y: 80,
            opacity: 0,
            duration: 1
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.3
        }
    );

    // 標題字元動畫
    const title = document.querySelectorAll(".hero-title-text");
    title.forEach((text) => {
        const textContent = text.textContent;
        text.innerHTML = textContent
            .split("")
            .map(
                (char) =>
                    `<span style="display: inline-block">${char === " " ? "&nbsp;" : char}</span>`
            )
            .join("");
    });
    gsap.from(".hero-title-text span", {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.2
    });

    // 滑鼠移動視差效果
    watch(mouseDefault, (newVal) => {
        const x = (newVal.x / window.innerWidth - 0.5) * 20;
        const y = (newVal.y / window.innerHeight - 0.5) * 20;
        gsap.to(".color-blob-1", { x: x * 2, y: y * 2, duration: 2 });
        gsap.to(".color-blob-2", { x: -x * 1.5, y: -y * 1.5, duration: 2 });
        gsap.to(".color-blob-3", { x: x, y: y, duration: 2 });
        gsap.to(".color-blob-4", { x: -x * 2.5, y: y * 2.5, duration: 2 });
        gsap.to(".hero-content", { x: x * 0.5, y: y * 0.5, duration: 1.5 });
    });

    // document.addEventListener("mousemove", (e) => {
    //     const x = (e.clientX / window.innerWidth - 0.5) * 20;
    //     const y = (e.clientY / window.innerHeight - 0.5) * 20;


    // });
};

const checkBodyLoaded = () => {
    if (process.client) {
        const body = document.body;

        if (body.classList.contains("loaded")) {
            console.log("loaded");
            runAnimations();
            return true;
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    if (body.classList.contains("loaded")) {
                        runAnimations();
                        observer.disconnect();
                    }
                }
            });
        });

        observer.observe(body, {
            attributes: true,
            attributeFilter: ["class"]
        });

        return false;
    }
    return false;
};

onMounted(() => {
    if (process.client) {
        const isLoaded = checkBodyLoaded();

        if (!isLoaded) {
            console.log("Waiting for page to load...");
        }
    }
});
</script>
<template>
    <section class="section-home_hero">
        <div class="color-blob color-blob-1"></div>
        <div class="color-blob color-blob-2"></div>
        <div class="color-blob color-blob-3"></div>
        <div class="color-blob color-blob-4"></div>
        <div class="particles" id="particles"></div>

        <div class="container">
            <div class="hero-content">
                <p class="hero-hello">Hi, I am Au</p>
                <h1 id="hero-title" class="hero-title">
                    <span class="hero-title-text"> Front-end Developer / </span><br />
                    <span class="hero-title-text"> Full-stack Developer </span>
                </h1>
                <p id="hero-subtitle" class="hero-subtitle">
                    <span class="hero-subtitle-text">
                        <span class="hero-subtitle-number">10</span>
                        years of front-end development experience
                    </span>
                    <span class="hero-subtitle-text">
                        <span class="hero-subtitle-number">50+</span>
                        projects completed
                    </span>
                </p>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@use "../../assets/scss/components/section-home_hero.scss" as *;
</style>
