import type { ProjectMeta } from "../project-types";

export const yuanProject: ProjectMeta = {
    slug: "yuan",
    title: "問卷網(DEMO)",
    description: "",
    cover: "yuan/yuan.jpg",
    banner: "yuan/yuan-banner.jpg",
    tags: ["CodeIgniter 4", "Vue 3", "Gulp", "SCSS", "JavaScript", "MySQL"],
    category: ["前端製作", "API串接", "後端製作"],
    featured: false,
    published: true,
    links: [
        {
            icon: "mdi:open-in-new",
            label: "前台",
            url: "https://demo-yuan.auozzy.com/"
        },
        {
            icon: "mdi:open-in-new",
            label: "後台",
            url: "https://demo-yuan.auozzy.com/demoadmin/"
        },
        {
            icon: "mdi:github",
            label: "GitHub",
            url: "https://github.com/AuTiMoThY/yuan"
        }
    ],
    order: 2
};
