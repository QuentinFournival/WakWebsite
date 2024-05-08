<template>
    <div class="container center">
        <input
            type="text"
            class="inputSearch"
            v-model="articlesStore.searchInput"
            placeholder="Rechercher par ID..."
        />

        <section class="container w-full">
            <div
                class="card"
                v-for="article in articlesStore.getArticlesFromSearch"
                :key="article.id"
                @click="articlesStore.goToArticleDetails(article.id)"
            >
                <img
                    :src="article.photo"
                    alt="article-picture"
                    class="card-img"
                />
                <div class="card-body">
                    <h3 class="card-title">{{ article.label }}</h3>
                    <p class="card-description">Numéro: {{ article.numero }}</p>
                </div>
            </div>
        </section>
    <Button type="primary">Primary Button</Button>
    </div>
</template>

<script setup lang="ts">
import { useArticlesStore } from "../stores/articlesStore";
import { Button } from 'ant-design-vue';

const articlesStore = useArticlesStore();
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}
.w-full {
    width: 100%;
}
.card {
    width: calc(33% - 1rem);
    margin: 0.5rem;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: white;
    transition: all 500ms;
    cursor: pointer;
    &:hover {
        transform: scale(1.03);
    }
}

.card-img {
    width: auto;
    height: 200px;
    object-fit: content;
    border-radius: 1rem;
    margin-bottom: 1rem;
}

.card-body {
    width: 100%;
    text-align: center;
}
.center {
    align-items: center;
    justify-content: center;
}
.card-title {
    font-size: 1.5rem;
    margin-bottom: 8px;
}

.card-description {
    font-size: 1rem;
    color: #666;
}

.inputSearch {
    width: 50%;
    border: rgb(27, 121, 176) solid 1px;
    border-radius: 1rem;
    padding: 1rem;
    margin: 2rem 0;
}
</style>

<script lang="ts">
export default {
    name: "ArticleList",
};
</script>
