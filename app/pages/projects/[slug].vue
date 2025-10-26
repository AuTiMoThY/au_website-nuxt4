<script setup lang="ts">
import { getProjectBySlug } from "~/data/projects";
import type { ProjectMeta } from "~/data/projects";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// 取得路由參數
const route = useRoute();
const slug = computed(() => {
    return route.params.slug as string;
});
const config = useConfig();

console.log(slug.value);
console.log(route.path);

// 從 data/projects.ts 取得元資料
const projectMeta = computed(() => getProjectBySlug(slug.value) as ProjectMeta);

// 從 Nuxt Content 取得詳細內容
const { data: project, error } = await useAsyncData(route.path, async () => {
    try {
        return await queryCollection("content").path(route.path).first();
    } catch (err) {
        console.error("Error fetching project content:", err);
        return null;
    }
});

if (error.value || !project.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "找不到此專案",
        fatal: true
    });
}

// SEO 設定
useSeoMeta({
    title: projectMeta.value?.title,
    description: projectMeta.value?.description,
    ogTitle: projectMeta.value?.title,
    ogDescription: projectMeta.value?.description,
    ogImage: projectMeta.value?.cover
});

onMounted(() => {
    nextTick(() => {
        // 為內容區域中的所有圖片添加 fancybox 功能
        const contentArea = document.querySelector('.project_detail-content-inner') as HTMLElement;
        if (contentArea) {
            const images = contentArea.querySelectorAll('img');
            images.forEach(img => {
                const src = img.getAttribute('src');
                if (src && !img.closest('a')) {
                    const link = document.createElement('a');
                    link.href = src;
                    link.setAttribute('data-fancybox', 'gallery');
                    link.setAttribute('data-caption', img.getAttribute('alt') || '');
                    img.parentNode?.insertBefore(link, img);
                    link.appendChild(img);
                }
            });
            // 綁定 Fancybox
            Fancybox.bind("[data-fancybox]");
        }
    });
});
</script>
<template>
    <div id="pageWrapper" class="page_wrapper page-project_detail" ref="el">
        <div class="page_content">
            <div class="project_detail-hd">
                <div class="banner">
                    <NuxtImg
                        :src="`${useConfig().imgPath}projects/${projectMeta.banner}`"
                        :alt="projectMeta.title"
                        format="webp"
                        loading="lazy" />
                </div>
                <div class="content">
                    <div class="container">
                        <h1 class="project_detail-title font-h2 txt-gray-0">
                            {{ projectMeta.title }}
                        </h1>
                        <nav class="breadcrumb txt-gray-0">
                            <NuxtLink :to="`${config.basePath}`">首頁</NuxtLink>
                            <span class="separator">/</span>
                            <NuxtLink :to="`${config.basePath}projects/`">專案</NuxtLink>
                            <span class="separator">/</span>
                            <span class="current">{{ projectMeta?.title || project?.title }}</span>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section-project_detail section--spacing">
                <div class="container">
                    <div class="project_detail-wrap">
                        <div class="project_detail-aside">
                            <ul
                                v-if="projectMeta.links"
                                class="project_detail-aside-block project-links">
                                <li v-for="link in projectMeta.links" class="project-link">
                                    <NuxtLink
                                        :to="link.url"
                                        target="_blank"
                                        class="au_btn au_btn-secondary"
                                        rel="noopener noreferrer">
                                        <AuBtn :txt="link.label">
                                            <template #icon-prepend>
                                                <Icon :name="link.icon" />
                                            </template>
                                        </AuBtn>
                                    </NuxtLink>
                                </li>
                            </ul>
                            <div class="project_detail-aside-block">
                                <b class="font-h3">角色定位</b>
                                <p class="font-body">
                                    {{ projectMeta.category.join(", ") }}
                                </p>
                            </div>
                            <div class="project_detail-aside-block">
                                <b class="font-h3">使用技術</b>
                                <p class="font-body">
                                    {{ projectMeta.tags.join(", ") }}
                                </p>
                            </div>
                        </div>
                        <div class="project_detail-content">
                            <ContentRenderer
                                v-if="project"
                                :value="project as any"
                                class="project_detail-content-inner">
                                <template #empty>
                                    <p>專案內容載入中...</p>
                                </template>
                            </ContentRenderer>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "../../assets/scss/frontend/page-project_detail.scss" as *;
</style>
