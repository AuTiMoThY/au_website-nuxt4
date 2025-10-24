<script setup lang="ts">
import type { ProjectMeta } from "~/data/projects";

// 使用 composable
const { getAllProjects, getAllCategories, filterByCategory } = useProjects();

// 取得專案資料
const allProjects = getAllProjects();
const categories = getAllCategories();

// 選擇的分類
const selectedCategory = ref<string | null>(null);

// 顯示的專案列表
const displayedProjects = computed(() => {
    if (selectedCategory.value) {
        return filterByCategory([selectedCategory.value]);
    }
    return allProjects;
});
</script>
<template>
    <section class="section-projects_filters section--spacing">
        <div class="container">
            <div class="section-projects_filters-hd">
                <h2
                    class="section-projects_filters-title section--title font-h2"
                    data-title="Projects">
                    Projects
                </h2>
            </div>
            <div class="section-projects_filters-bd">
                <ul class="filters-list">
                    <li class="filter-item">
                        <AuBtn
                            txt="全部"
                            :class="[
                                'au_btn',
                                'au_btn-round',
                                'au_btn-filter',
                                { active: selectedCategory === null }
                            ]"
                            @click="selectedCategory = null" />
                    </li>
                    <li v-for="category in categories" :key="category" class="filter-item">
                        <AuBtn
                            :txt="category"
                            :class="[
                                'au_btn',
                                'au_btn-round',
                                'au_btn-filter',
                                { active: selectedCategory === category }
                            ]"
                            @click="selectedCategory = category" />
                    </li>
                </ul>
                <ul class="projects-list">
                    <li v-for="project in displayedProjects" :key="project.slug" class="project-item">
                        <AppCard :project="project" />
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
@use "../../assets/scss/components/section-projects_filters.scss" as *;
</style>