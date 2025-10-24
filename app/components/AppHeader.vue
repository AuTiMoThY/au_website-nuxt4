<template>
    <header class="app_header">
        <div class="container">
            <div class="app_header-logo">
                <NuxtLink to="/" class="link">
                    <img :src="`${useConfig().basePath}images/logo.svg`" />Au
                </NuxtLink>
            </div>
            <div class="app_header-nav">
                <NuxtLink to="/" class="app_header-nav-item">Home</NuxtLink>
                <NuxtLink to="#projects" class="app_header-nav-item">Projects</NuxtLink>
                <NuxtLink to="#about" class="app_header-nav-item">About Me</NuxtLink>
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
@use "../assets/scss/components/app_header.scss" as *;
</style>
