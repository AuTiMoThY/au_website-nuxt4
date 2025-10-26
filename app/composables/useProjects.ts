/**
 * Projects Composable
 * 提供專案相關的資料和方法
 */

import {
    getPublishedProjects,
    getFeaturedProjects,
    getProjectBySlug,
    type ProjectMeta
} from "~/data/projects";

export const useProjects = () => {
    /**
     * 取得所有已發布的專案
     */
    const getAllProjects = () => {
        return getPublishedProjects();
    };

    /**
     * 取得精選專案
     */
    const getFeatured = () => {
        return getFeaturedProjects();
    };

    /**
     * 根據 slug 取得專案元資料
     */
    const getBySlug = (slug: string) => {
        return getProjectBySlug(slug);
    };

    /**
     * 取得專案詳細內容（結合元資料和 Markdown 內容）
     * @param slug 專案 slug
     */
    const getProjectDetail = async (slug: string) => {
        try {
            // 取得元資料
            const meta = getProjectBySlug(slug);

            // 取得 Markdown 內容
            const content = await queryCollection("content").path(`/projects/${slug}`).first();

            return {
                meta,
                content
            };
        } catch (error) {
            console.error("Error fetching project detail:", error);
            return {
                meta: null,
                content: null
            };
        }
    };

    /**
     * 取得所有專案的詳細內容（用於 SSG）
     */
    const getAllProjectsWithContent = async () => {
        const projects = getPublishedProjects();
        const projectsWithContent = await Promise.all(
            projects.map(async (meta: ProjectMeta) => {
                try {
                    const content = await queryCollection("content")
                        .path(`/projects/${meta.slug}`)
                        .first();
                    return {
                        meta,
                        content
                    };
                } catch (error) {
                    console.error(`Error fetching content for project ${meta.slug}:`, error);
                    return {
                        meta,
                        content: null
                    };
                }
            })
        );
        return projectsWithContent;
    };

    /**
     * 根據分類篩選專案
     */
    const filterByCategory = (category: string[]) => {
        return getPublishedProjects().filter((p: ProjectMeta) =>
            p.category.some((c: string) => category.includes(c))
        );
    };

    /**
     * 根據標籤篩選專案
     */
    const filterByTag = (tag: string) => {
        return getPublishedProjects().filter((p: ProjectMeta) => p.tags.includes(tag));
    };

    /**
     * 取得所有使用的標籤
     */
    const getAllTags = () => {
        const projects = getPublishedProjects();
        const tagsSet = new Set<string>();

        projects.forEach((project: ProjectMeta) => {
            project.tags.forEach((tag: string) => tagsSet.add(tag));
        });

        return Array.from(tagsSet).sort();
    };

    /**
     * 取得所有分類
     */
    const getAllCategories = () => {
        // const projects = getPublishedProjects();
        // const categoriesSet = new Set<string>();

        // projects.forEach((project: ProjectMeta) => {
        //     project.category.forEach((category: string) => categoriesSet.add(category));
        //     // categoriesSet.add(project.category);
        // });

        // return Array.from(categoriesSet).sort().reverse();
        return ["前端製作", "API串接", "後端製作"];
    };

    /**
     * 搜尋專案（根據標題和描述）
     */
    const searchProjects = (query: string) => {
        const lowerQuery = query.toLowerCase();
        return getPublishedProjects().filter(
            (p: ProjectMeta) =>
                p.title.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery) ||
                p.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
        );
    };

    return {
        getAllProjects,
        getFeatured,
        getBySlug,
        getProjectDetail,
        getAllProjectsWithContent,
        filterByCategory,
        filterByTag,
        getAllTags,
        getAllCategories,
        searchProjects
    };
};
