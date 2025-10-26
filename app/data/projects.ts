import type { ProjectMeta } from "./project-types";
import { uiLibraryProject } from "./projects/ui-library";
import { emsProject } from "./projects/ems";
import { meetingManagerProject } from "./projects/meeting-manager";
import { huhu38orgProject } from "./projects/huhu38org";
import { yuanProject } from "./projects/yuan";
import { firestarProject } from "./projects/firestar";

/**
 * 專案元資料配置
 * 此檔案定義專案列表的基本資料，用於首頁展示
 * 詳細內容存放在 content/projects/{slug}.md
 */

// Re-export ProjectMeta type
export type { ProjectMeta };

/**
 * 專案列表（按照出現順序排列）
 * 每個專案都應該有對應的 Markdown 檔案：content/projects/{slug}.md
 */
export const projects: ProjectMeta[] = [
    uiLibraryProject,
    emsProject,
    meetingManagerProject,
    huhu38orgProject,
    yuanProject,
    firestarProject
];

/**
 * 取得所有已發布的專案
 * 排序依照陣列位置
 */
export const getPublishedProjects = () => {
    // return projects
    // .filter((p) => p.published !== false)
    // .sort((a, b) => (b.order || 0) - (a.order || 0));
    return projects.filter((p) => p.published !== false);
};

/**
 * 取得精選專案
 */
export const getFeaturedProjects = () => {
    return getPublishedProjects().filter((p) => p.featured);
};

/**
 * 根據 slug 取得專案元資料
 */
export const getProjectBySlug = (slug: string) => {
    return projects.find((p) => p.slug === slug);
};

/**
 * 根據分類取得專案
 */
export const getProjectsByCategory = (category: "前端製作" | "API串接" | "後端製作") => {
    return getPublishedProjects().filter((p) => p.category.includes(category));
};

/**
 * 根據標籤取得專案
 */
export const getProjectsByTag = (tag: string) => {
    return getPublishedProjects().filter((p) => p.tags.includes(tag));
};
