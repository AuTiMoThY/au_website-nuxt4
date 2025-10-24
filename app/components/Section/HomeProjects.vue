<script setup lang="ts">
import { getFeaturedProjects } from "~/data/projects";

// import Swiper core and required modules
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const modules = [Autoplay, Pagination];

// 顯示的專案列表
const displayedProjects = getFeaturedProjects();
</script>

<template>
    <section id="projects" class="section-home_projects section--spacing">
        <div class="container">
            <div class="section-home_projects-hd">
                <h2
                    class="section-home_projects-title section--title font-h2"
                    data-title="Projects">
                    Projects
                </h2>
            </div>
            <div class="section-home_projects-bd">
                <div class="section-home_projects-content">
                    <swiper
                        class="projects-swiper"
                        :slides-per-view="1"
                        :space-between="0"
                        :loop="true"
                        :pagination="{ clickable: true }"
                        :autoplay="{
                            delay: 5000,
                            disableOnInteraction: false
                        }"
                        :centered-slides="true"
                        :breakpoints="{
                            '768': {
                                slidesPerView: 2
                            },
                            '1024': {
                                slidesPerView: 3
                            }
                        }"
                        :modules="modules">
                        <swiper-slide
                            v-for="(project, index) in displayedProjects"
                            :key="project.slug"
                            class="projects-swiper-slide">
                            <AppCard :project="project" />
                        </swiper-slide>
                    </swiper>

                </div>

                <!-- 如果沒有專案 -->
                <div v-if="displayedProjects.length === 0" class="section-home_projects-empty">
                    <p>目前沒有專案可以顯示。</p>
                </div>
            </div>

            <div class="section-home_projects-ft">
                <NuxtLink to="/projects" class="link">
                    <AuBtn txt="更多專案" class="au_btn au_btn-more" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "../../assets/scss/components/section-home_projects.scss" as *;
</style>
