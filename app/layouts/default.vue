<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { useTemplateRef } from "vue";

const el = useTemplateRef<HTMLDivElement>("el");
const reactiveValue = shallowRef(false);

const { measure } = useScroll(el);

watch(reactiveValue, () => {
    measure();
    console.log(measure);
});
</script>
<template>
    <div id="bodyWrapper" class="body_wrapper"  ref="el">
        <div class="body_wrapper-bg"></div>
        <AppHeader />
        <slot />
    </div>
</template>
