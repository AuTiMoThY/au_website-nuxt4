// https://nuxt.com/docs/api/configuration/nuxt-config
// 根據環境動態設定 basePath
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`process.env.NUXT_PUBLIC_API_BASE: ${process.env.NUXT_PUBLIC_API_BASE}`);
const isLocalhost = process.env.NODE_ENV === "development";
const basePath = isLocalhost ? "/" : "/";
const version = "20251022";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    devServer: {
        port: 8090
    },

    // Nitro 配置（伺服器引擎）
    nitro: {
        prerender: {
            // 預渲染路由
            routes: ["/"],
            // 在靜態生成時忽略 IPX 錯誤
            ignore: ["/_ipx/**"]
        }
    },
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/google-fonts",
        "@nuxt/image",
        "@vesp/nuxt-fontawesome",
        "@vueuse/nuxt",
        "@nuxt/icon",
        "@nuxt/content"
    ],
    // Content 配置
    content: {
        highlight: {
            theme: {
                default: "github-light",
                dark: "github-dark"
            },
            preload: ["vue", "javascript", "typescript", "scss", "css", "html"]
        },
        markdown: {
            toc: {
                depth: 3,
                searchDepth: 3
            }
        }
    },
    googleFonts: {
        families: {
            "Noto+Sans+TC": true,
            Kodchasan: true
        },
        display: "swap",
        preconnect: true,
        preload: true
    },
    app: {
        baseURL: basePath,
        // 頁面過渡效果
        pageTransition: { name: "page", mode: "out-in" },
        layoutTransition: { name: "layout", mode: "out-in" }
    },
    // TypeScript 配置
    typescript: {
        strict: true,
        typeCheck: false, // 關閉構建時的類型檢查，避免第三方套件的類型錯誤
        tsConfig: {
            compilerOptions: {
                skipLibCheck: true,
                esModuleInterop: true
            },
            exclude: ["node_modules"]
        }
    },

    image: {
        // 圖片優化配置
        quality: 80,
        format: ["webp"],
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536
        },
        provider: "ipx"
    },
    css: [
        "bootstrap/dist/css/bootstrap-reboot.min.css",
        "bootstrap/dist/css/bootstrap-utilities.min.css",
        "bootstrap/dist/css/bootstrap-grid.min.css",
        "~/assets/scss/main.scss"
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/core" as *;'
                }
            }
        }
    },
    runtimeConfig: {
        public: {
            version,
            basePath,
            imgPath: `images/`,
            jsPath: `js/`
        }
    }
});
