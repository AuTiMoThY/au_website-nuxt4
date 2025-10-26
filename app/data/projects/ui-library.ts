import type { ProjectMeta } from "../project-types";

export const uiLibraryProject: ProjectMeta = {
    slug: "ui-library",
    title: "企業內部UI元件庫",
    description: "",
    cover: "ui-library/ui-library.jpg",
    banner: "ui-library/ui-library-banner.jpg",
    tags: ["Nuxt 3", "Vue 3", "GSAP", "SCSS", "JavaScript"],
    category: ["前端製作"],
    featured: true,
    published: true,
    links: [
        {
            icon: "mdi:open-in-new",
            label: "查看網站",
            url: "https://demo.auozzy.com/ui-library/"
        }
    ],
    order: 10
};
