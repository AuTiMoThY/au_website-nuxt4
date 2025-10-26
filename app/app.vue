<script setup lang="ts">
/* eslint-disable */
const title = "AU's website";
const description = "AU's website - A collection of innovative web development projects";
const config = useConfig();
const siteUrl = "https://www.auozzy.com/";
const ogImage = `${siteUrl}images/og-image.jpg`;
const faviconPath = `${siteUrl}favicon/favicon.ico`;

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${title}` : title;
    },
    meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: siteUrl },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "AU's website" },
        { property: "og:locale", content: "zh_TW" },
        { property: "og:site_name", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: siteUrl },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
        { name: "twitter:image:alt", content: "AU's website" }
    ],
    htmlAttrs: {
        "data-version": config.version
    },
    link: [{ rel: "icon", href: faviconPath }]
});
</script>
<template>
    <NuxtLayout>
        <AppLoading />
        <NuxtPage/>
    </NuxtLayout>
</template>
