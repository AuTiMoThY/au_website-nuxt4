<script setup lang="ts">
const title = "AU's website";

useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - ${title}` : title;
    },
    meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "format-detection", content: "telephone=no" }
    ],
    htmlAttrs: {
        "data-version": useConfig().version
    },
    link: [{ rel: "icon", href: `${useConfig().basePath}favicon/favicon.ico` }]
});
</script>
<template>
    <NuxtLayout>
        <AppLoading />
        <NuxtPage />
    </NuxtLayout>
</template>
