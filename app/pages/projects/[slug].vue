<script setup lang="ts">
import { getProjectBySlug, getPublishedProjects, type ProjectMeta } from '~/data/projects'

// 取得路由參數
const route = useRoute()
const slug = computed(() => route.params.slug as string)

// 從 data/projects.ts 取得元資料
const projectMeta = computed(() => getProjectBySlug(slug.value))

console.log(route.path);
// 從 Nuxt Content 取得詳細內容
const { data: project, error } = await useAsyncData(route.path, () =>
    queryCollection('content').path(route.path).first()
)

// const { data: page } = await useAsyncData(route.path, () => {
//   return queryCollection('content').path(route.path).first()
// })

// 錯誤處理：如果專案不存在，導向 404
if (error.value || !project.value) {
    throw createError({
        statusCode: 404,
        statusMessage: '找不到此專案',
        fatal: true
    })
}

// 取得前後專案用於導航
const allProjects = getPublishedProjects()
const currentIndex = computed(() => allProjects.findIndex((p: ProjectMeta) => p.slug === slug.value))
const prevProject = computed(() => (currentIndex.value > 0 ? allProjects[currentIndex.value - 1] : null))
const nextProject = computed(() =>
    currentIndex.value < allProjects.length - 1 ? allProjects[currentIndex.value + 1] : null
)

// 格式化日期
const formatDate = (date: string | undefined) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// 取得分類標籤
const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
        web: '網站開發',
        mobile: '行動應用',
        design: '設計作品',
        other: '其他'
    }
    return labels[category] || category
}

// SEO 設定
useHead({
    title: (project.value?.title as string) || '專案詳情',
    meta: [
        {
            name: 'description',
            content: (project.value?.description as string) || projectMeta.value?.description
        },
        // Open Graph
        {
            property: 'og:title',
            content: project.value?.title as string
        },
        {
            property: 'og:description',
            content: project.value?.description as string
        },
        {
            property: 'og:image',
            content: project.value?.image as string
        },
        {
            property: 'og:type',
            content: 'article'
        },
        // Twitter Card
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: project.value?.title as string
        },
        {
            name: 'twitter:description',
            content: project.value?.description as string
        },
        {
            name: 'twitter:image',
            content: project.value?.image as string
        }
    ]
})
</script>

<template>
    <div class="project-detail">
        <!-- 專案標頭 -->
        <section class="project-header">
            <div class="container">
                <!-- 麵包屑導航 -->
                <nav class="breadcrumb">
                    <NuxtLink to="/">首頁</NuxtLink>
                    <span class="separator">/</span>
                    <NuxtLink to="/#projects">專案</NuxtLink>
                    <span class="separator">/</span>
                    <span class="current">{{ projectMeta?.title || project?.title }}</span>
                </nav>

                <!-- 專案標題 -->
                <h1 class="project-title">{{ project?.title }}</h1>

                <!-- 專案元資料 -->
                <div class="project-meta">
                    <time class="date">{{ formatDate(project?.date) }}</time>
                    <span v-if="projectMeta?.category" class="category">
                        {{ getCategoryLabel(projectMeta.category) }}
                    </span>
                </div>

                <!-- 專案標籤 -->
                <div v-if="project?.tags" class="project-tags">
                    <span v-for="tag in project.tags" :key="tag" class="tag">
                        {{ tag }}
                    </span>
                </div>

                <!-- 專案連結 -->
                <div v-if="projectMeta?.link || projectMeta?.github" class="project-links">
                    <a
                        v-if="projectMeta.link"
                        :href="projectMeta.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn-link"
                    >
                        <Icon name="mdi:open-in-new" />
                        查看網站
                    </a>
                    <a
                        v-if="projectMeta.github"
                        :href="projectMeta.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn-link btn-github"
                    >
                        <Icon name="mdi:github" />
                        GitHub
                    </a>
                </div>
            </div>
        </section>

        <!-- 專案主圖 -->
        <section v-if="project?.image" class="project-hero">
            <div class="container">
                <NuxtImg
                    :src="project.image"
                    :alt="project.title"
                    class="project-hero-image"
                    loading="eager"
                    format="webp"
                />
            </div>
        </section>

        <!-- 專案內容 -->
        <section class="project-content">
            <div class="container">
                <article class="prose">
                    <!-- 渲染 Markdown 內容 -->
                    <ContentRenderer :value="project">
                        <template #empty>
                            <p>專案內容載入中...</p>
                        </template>
                    </ContentRenderer>
                </article>

                <!-- 目錄（如果有） -->
                <aside v-if="project?.body?.toc?.links?.length" class="table-of-contents">
                    <h3>目錄</h3>
                    <ContentToc :links="project.body.toc.links" />
                </aside>
            </div>
        </section>

        <!-- 導航到其他專案 -->
        <section class="project-navigation">
            <div class="container">
                <div class="nav-links">
                    <NuxtLink v-if="prevProject" :to="`/projects/${prevProject.slug}`" class="nav-link prev">
                        <span class="label">上一個專案</span>
                        <span class="title">{{ prevProject.title }}</span>
                    </NuxtLink>
                    <NuxtLink v-if="nextProject" :to="`/projects/${nextProject.slug}`" class="nav-link next">
                        <span class="label">下一個專案</span>
                        <span class="title">{{ nextProject.title }}</span>
                    </NuxtLink>
                </div>
                <NuxtLink to="/#projects" class="back-to-list">
                    <Icon name="mdi:arrow-left" />
                    返回專案列表
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.project-detail {
    padding-top: 80px; // 調整根據 header 高度
}

// 專案標頭
.project-header {
    padding: 3rem 0 2rem;

    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        color: var(--color-text-secondary);

        a {
            color: inherit;
            text-decoration: none;
            transition: color 0.3s;

            &:hover {
                color: var(--color-primary);
            }
        }

        .current {
            color: var(--color-text-primary);
        }
    }

    .project-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.2;
    }

    .project-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        color: var(--color-text-secondary);

        .category {
            padding: 0.25rem 0.75rem;
            background: var(--color-bg-secondary);
            border-radius: 1rem;
            font-size: 0.875rem;
        }
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;

        .tag {
            padding: 0.5rem 1rem;
            background: var(--color-bg-tertiary);
            border-radius: 0.5rem;
            font-size: 0.875rem;
            color: var(--color-primary);
        }
    }

    .project-links {
        display: flex;
        gap: 1rem;

        .btn-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--color-primary);
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            &.btn-github {
                background: #333;
            }
        }
    }
}

// 專案主圖
.project-hero {
    margin-bottom: 4rem;

    .project-hero-image {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }
}

// 專案內容
.project-content {
    .container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;

        @media (min-width: 1024px) {
            grid-template-columns: 1fr 250px;
        }
    }

    .prose {
        max-width: 100%;

        // Markdown 樣式（可根據需求調整）
        :deep(h2) {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 2rem;
            font-weight: 700;
        }

        :deep(h3) {
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            font-size: 1.5rem;
            font-weight: 600;
        }

        :deep(p) {
            margin-bottom: 1.25rem;
            line-height: 1.8;
        }

        :deep(img) {
            width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 2rem 0;
        }

        :deep(pre) {
            padding: 1.5rem;
            background: var(--color-bg-secondary);
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
        }

        :deep(ul),
        :deep(ol) {
            margin: 1.5rem 0;
            padding-left: 2rem;

            li {
                margin-bottom: 0.5rem;
                line-height: 1.8;
            }
        }
    }

    .table-of-contents {
        position: sticky;
        top: 100px;
        height: fit-content;

        h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        @media (max-width: 1023px) {
            display: none;
        }
    }
}

// 專案導航
.project-navigation {
    padding: 4rem 0;
    border-top: 1px solid var(--color-border);
    margin-top: 4rem;

    .nav-links {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;

        .nav-link {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 1.5rem;
            background: var(--color-bg-secondary);
            border-radius: 0.75rem;
            text-decoration: none;
            transition: all 0.3s;

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            }

            .label {
                font-size: 0.875rem;
                color: var(--color-text-secondary);
            }

            .title {
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--color-text-primary);
            }

            &.next {
                text-align: right;
            }
        }
    }

    .back-to-list {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 600;
        transition: gap 0.3s;

        &:hover {
            gap: 0.75rem;
        }
    }
}
</style>

