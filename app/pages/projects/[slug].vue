<script setup lang="ts">
import { getProjectBySlug, getPublishedProjects, type ProjectMeta } from "~/data/projects";

// 取得路由參數
const route = useRoute();
const slug = computed(() => route.params.slug as string);

// 從 data/projects.ts 取得元資料
const projectMeta = computed(() => getProjectBySlug(slug.value) as ProjectMeta);

// 從 Nuxt Content 取得詳細內容
const { data: project, error } = await useAsyncData(route.path, () =>
    queryCollection("content").path(route.path).first()
);

if (error.value || !project.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "找不到此專案",
        fatal: true
    });
}
console.log(route.path);
</script>
<template>
    <div id="pageWrapper" class="page_wrapper page-project_detail" ref="el">
        <div class="page_content">
            <div class="project_detail-hd">
                <div class="cover">
                    <NuxtImg
                        :src="`${useConfig().imgPath}projects/${projectMeta.cover}`"
                        :alt="projectMeta.title"
                        format="webp"
                        loading="lazy" />
                </div>
                <div class="content">
                    <div class="container">
                        <h1 class="project_detail-title font-h2 txt-gray-0">{{ projectMeta.title }}</h1>
                    </div>
                </div>
            </div>
            <section class="section-project_detail section--spacing">
                <div class="container">
                    <div class="project_detail-wrap">
                        <div class="project_detail-aside">
                            <ul class="project_detail-aside-block project-links">
                                <li class="project-link" v-if="projectMeta.links?.url">
                                    <NuxtLink
                                        :to="projectMeta.links.url"
                                        target="_blank"
                                        class="au_btn au_btn-secondary"
                                        rel="noopener noreferrer">
                                        <AuBtn txt="查看網站">
                                            <template #icon-prepend>
                                                <Icon name="mdi:open-in-new" />
                                            </template>
                                        </AuBtn>
                                    </NuxtLink>
                                </li>
                                <li class="project-link" v-if="projectMeta.links?.github">
                                    <NuxtLink
                                        :to="projectMeta.links.github"
                                        target="_blank"
                                        class="au_btn au_btn-secondary"
                                        rel="noopener noreferrer">
                                        <AuBtn txt="GitHub">
                                            <template #icon-prepend>
                                                <Icon name="mdi:github" />
                                            </template>
                                        </AuBtn>
                                    </NuxtLink>
                                </li>
                            </ul>
                            <div class="project_detail-aside-block">
                                <b class="font-h3">我的角色</b>
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
                        <ContentRenderer :value="project as any" class="project_detail-content">
                            <template #empty>
                                <p>專案內容載入中...</p>
                            </template>
                        </ContentRenderer>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "../../assets/scss/frontend/page-project_detail.scss" as *;
</style>
