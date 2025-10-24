<script setup lang="ts">
import type { ProjectMeta } from "~/data/projects";

// 定義 Props
interface Props {
    project: ProjectMeta;
}

defineProps<Props>();

// // 取得分類標籤
// const getCategoryLabel = (category: ProjectMeta["category"]) => {
//     const labels: Record<string, string> = {
//         web: "網站開發",
//         mobile: "行動應用",
//         design: "設計作品",
//         other: "其他"
//     };
//     return labels[category] || category;
// };
</script>
<template>
    <NuxtLink :to="`/projects/${project.slug}`" class="app_card">
        <div class="app_card-inner">
            <div class="app_card-image">
                <NuxtImg :src="`${useConfig().imgPath}projects/${project.cover}`" :alt="project.title" format="webp" loading="lazy" />
            </div>
            <div class="app_card-content">
                <div class="app_card-content-hd">
                    <p class="app_card-content-subtitle font-note txt-secondary-light">
                        <span class="txt" v-for="category in project.category" :key="category">
                            {{ category }}
                        </span>
                    </p>
                    <h3 class="app_card-content-title font-h3">{{ project.title }}</h3>
                    <p v-if="project.description" class="app_card-content-description font-body">
                        {{ project.description }}
                    </p>
                </div>
                <div class="app_card-content-ft">
                    <ul class="app_card-content-skills font-note">
                        <li v-for="tag in project.tags" :key="tag" class="app_card-content-skill">
                            {{ tag }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
@use "../assets/scss/components/app_card.scss" as *;
</style>
