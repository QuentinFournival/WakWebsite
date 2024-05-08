<template>
    <div>
        <ArticleDetails />
    </div>
</template>

<script setup lang="ts">
import ArticleDetails from "../components/articleDetailsPanel.vue";
import { useArticlesStore } from "../stores/articlesStore";

const { articles } = useArticlesStore();
</script>
