<script setup lang="ts">
const config = useConfig();
const scrolled = ref(false);

import { useWindowScroll } from "@vueuse/core";

const { y } = useWindowScroll();

const handleScroll = () => {
    scrolled.value = y.value >= 200;
};

const isMobileMenuOpen = ref(false);
onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
    <header class="app_header" :class="{ 'app_header-scrolled': scrolled }">
        <div class="container">
            <div class="app_header-logo">
                <NuxtLink to="/" class="link">
                    <img :src="`${config.imgPath}logo.svg`" />Au
                </NuxtLink>
            </div>
            <div class="app_header-nav">
                <NuxtLink :to="`${config.basePath}`" class="app_header-nav-item">Home</NuxtLink>
                <NuxtLink :to="`${config.basePath}#about`" class="app_header-nav-item">
                    About Me
                </NuxtLink>
                <NuxtLink :to="`${config.basePath}projects/`" class="app_header-nav-item">
                    Projects
                </NuxtLink>
            </div>
            <button
                class="mobile-menu-toggle"
                :class="{ active: isMobileMenuOpen }"
                aria-label="開啟選單"
                @click="isMobileMenuOpen = !isMobileMenuOpen">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
            <div
                class="mobile-menu-overlay"
                :class="{ active: isMobileMenuOpen }"
                @click="isMobileMenuOpen = false"></div>
            <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
                <nav class="mobile-nav">
                    <ul class="mobile-nav-list">
                        <li class="mobile-nav-item">
                            <NuxtLink
                                :to="`${config.basePath}`"
                                class="app_header-nav-item"
                                @click="isMobileMenuOpen = false">
                                Home
                            </NuxtLink>
                        </li>
                        <li class="mobile-nav-item">
                            <NuxtLink
                                :to="`${config.basePath}#about`"
                                class="app_header-nav-item"
                                @click="isMobileMenuOpen = false">
                                About Me
                            </NuxtLink>
                        </li>
                        <li class="mobile-nav-item">
                            <NuxtLink
                                :to="`${config.basePath}projects/`"
                                class="app_header-nav-item"
                                @click="isMobileMenuOpen = false">
                                Projects
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
@use "../assets/scss/components/app_header.scss" as *;
</style>
