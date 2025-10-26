import type { ProjectMeta } from "../project-types";

export const meetingManagerProject: ProjectMeta = {
    slug: "meeting-manager",
    title: "會議管理系統(DEMO)",
    description: "",
    cover: "meeting-manager/meeting-manager.jpg",
    banner: "meeting-manager/meeting-manager-banner.jpg",
    tags: ["Nuxt 3", "Pinia", "Vue 3", "SCSS", "JavaScript"],
    category: ["前端製作"],
    featured: false,
    published: true,
    links: [
        {
            icon: "mdi:open-in-new",
            label: "查看網站",
            url: "https://demo.auozzy.com/meeting-mgmt/"
        },
        {
            icon: "mdi:github",
            label: "GitHub",
            url: "https://github.com/AuTiMoThY/meeting-mgmt-nuxt3"
        }
    ],
    order: 10
};
