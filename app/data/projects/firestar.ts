import type { ProjectMeta } from "../project-types";

export const firestarProject: ProjectMeta = {
    slug: "firestar",
    title: "服飾官網",
    description: "",
    cover: "firestar/firestar.jpg",
    banner: "firestar/firestar-banner.jpg",
    tags: ["PHP", "Smarty", "MySQL", "jQuery", "JavaScript"],
    category: ["前端製作", "後端製作"],
    featured: false,
    published: true,
    links: [
        {
            icon: "mdi:open-in-new",
            label: "前台",
            url: "https://www.firestar.com.tw/"
        },
        {
            icon: "mdi:open-in-new",
            label: "後台",
            url: "https://www.firestar.com.tw/admin/"
        }
    ],
    order: 1
};
