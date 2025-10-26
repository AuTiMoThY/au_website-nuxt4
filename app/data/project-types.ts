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
    /** 專案橫幅 */
    banner: string;
    /** 技術標籤 */
    tags: string[];
    /** 專案類型 */
    category: ("前端製作" | "API串接" | "後端製作")[];
    /** 是否為精選專案 */
    featured?: boolean;
    /** 是否發布（false 則不顯示） */
    published?: boolean;
    /** 外部連結 */
    links?: {
        icon: string;
        label: string;
        url: string;
    }[];
    /** 排序權重（數字越大越前面） */
    order?: number;
}
