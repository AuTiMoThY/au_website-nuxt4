/**
 * 專案元資料配置
 * 此檔案定義專案列表的基本資料，用於首頁展示
 * 詳細內容存放在 content/projects/{slug}.md
 */

export interface ProjectMeta {
    /** 專案唯一識別碼（對應 content/projects/{slug}.md） */
    slug: string;
    /** 專案標題 */
    title: string;
    /** 簡短描述（用於首頁卡片） */
    description: string;
    /** 專案縮圖 */
    cover: string;
    /** 技術標籤 */
    tags: string[];
    /** 專案類型 */
    category: string[];
    /** 是否為精選專案 */
    featured?: boolean;
    /** 是否發布（false 則不顯示） */
    published?: boolean;
    /** 外部連結 */
    links?: {
        url?: string;
        github?: string;
    };
    /** 排序權重（數字越大越前面） */
    order?: number;
}

/**
 * 專案列表
 * 每個專案都應該有對應的 Markdown 檔案：content/projects/{slug}.md
 */
export const projects: ProjectMeta[] = [
    {
        slug: "huhu38org",
        title: "現代婦女基金會-活動頁",
        description: "",
        cover: "huhu38org/38org.jpg",
        tags: ["SCSS", "Nunjucks", "JavaScript", "GSAP"],
        category: ["前端製作"],
        featured: true,
        published: true,
        links: {
            url: "https://huhu.38.org.tw/",
            github: "https://github.com/AuTiMoThY/38org"
        },
        order: 1
    }
    // {
    //     slug: "portfolio-nuxt4",
    //     title: "Portfolio Website",
    //     description: "使用 Nuxt 4 打造的個人作品集網站，展示前端開發技能。",
    //     image: "/images/projects/portfolio/cover.jpg",
    //     tags: ["Nuxt 4", "TypeScript", "Nuxt Content"],
    //     category: ["前端開發"],
    //     date: "2025-10-22",
    //     featured: true,
    //     published: true,
    //     github: "https://github.com/yourusername/portfolio-nuxt4",
    //     order: 2
    // }
    // 新增更多專案...
];

/**
 * 取得所有已發布的專案
 */
export const getPublishedProjects = () => {
    return projects
        .filter((p) => p.published !== false)
        .sort((a, b) => (b.order || 0) - (a.order || 0));
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
export const getProjectsByCategory = (category: string) => {
    return getPublishedProjects().filter((p) => p.category.includes(category));
};

/**
 * 根據標籤取得專案
 */
export const getProjectsByTag = (tag: string) => {
    return getPublishedProjects().filter((p) => p.tags.includes(tag));
};
