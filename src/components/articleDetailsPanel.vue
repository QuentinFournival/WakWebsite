<template>
    <div class="back" @click="articleDetailStore.goBack()">←</div>
    <div class="article-detail">
        <div class="article-info">
            <div class="content-img">
                <img
                    :src="articleDetailStore.articleDetail.photo"
                    alt="Photo de l'article"
                    class="article-image"
                />
            </div>
            <h2 class="article-title">
                {{ articleDetailStore.articleDetail.label }}
            </h2>
            <p class="article-info-item">Numéro d'article</p>
            <p>
                {{ articleDetailStore.articleDetail.numero }}
            </p>
            <p class="article-info-item">Rayon</p>

            <p>
                {{ articleDetailStore.articleDetail.Rayon }}
            </p>
        </div>

        <div class="events-list">
            <h3 class="events-title">Événements Associés</h3>
            <table class="events-table">
                <thead>
                    <tr>
                        <th>Date de Début</th>
                        <th>Date de Fin</th>
                        <th>Type</th>
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(
                            event, idx
                        ) in articleDetailStore.getPeriodForSpecificArticle"
                        :key="event.id"
                    >
                        <td>
                            <input
                                type="date"
                                :min="new Date().toISOString().split('T')[0]"
                                v-model="event.start_date"
                                v-if="articleDetailStore.editingIndex === idx"
                            />
                            <span v-else>{{ event.start_date }}</span>
                        </td>
                        <td>
                            <input
                                type="date"
                                v-if="articleDetailStore.editingIndex === idx"
                                v-model="event.end_date"
                            />
                            <span v-else>{{ event.end_date }}</span>
                        </td>
                        <td>
                            <input
                                v-model="event.type"
                                v-if="articleDetailStore.editingIndex === idx"
                            />
                            <span v-else>{{ event.type }}</span>
                        </td>
                        <td>
                            <input
                                type="number"
                                v-model="event.score"
                                v-if="articleDetailStore.editingIndex === idx"
                            />
                            <span v-else>{{ event.score }}</span>
                        </td>
                        <td>
                            <button
                                @click="articleDetailStore.toggleEdit(idx)"
                                v-if="
                                    event.type === 'CUSTOM' &&
                                    articleDetailStore.editingIndex === -1
                                "
                                class="edit-button"
                            >
                                Modifier
                            </button>
                            <button
                                @click="articleDetailStore.editEvent(event)"
                                v-if="
                                    event.type === 'CUSTOM' &&
                                    articleDetailStore.editingIndex === idx
                                "
                                class="edit-button"
                            >
                                Valider
                            </button>
                            <button
                                @click="articleDetailStore.cancelEdit()"
                                v-if="
                                    event.type === 'CUSTOM' &&
                                    articleDetailStore.editingIndex === idx
                                "
                                class="supp-button"
                            >
                                Annuler
                            </button>
                            <button
                                v-if="
                                    event.type === 'CUSTOM' &&
                                    articleDetailStore.editingIndex === -1
                                "
                                class="supp-button"
                                @click="articleDetailStore.deletePeriod(idx)"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                    <tr v-if="articleDetailStore.openCreation">
                        <td>
                            <input
                                type="date"
                                :min="new Date().toISOString().split('T')[0]"
                                v-model="articleDetailStore.startDate"
                            />
                        </td>
                        <td>
                            <input
                                type="date"
                                v-model="articleDetailStore.lastDate"
                            />
                        </td>
                        <td>
                            <select v-model="articleDetailStore.type">
                                <option value="SEASON">SEASON</option>
                                <option value="OPERATION">OPERATION</option>
                                <option value="CUSTOM">CUSTOM</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type="number"
                                v-model="articleDetailStore.score"
                            />
                        </td>
                        <td>
                            <button
                                class="edit-button"
                                @click="
                                    articleDetailStore.addPeriod(
                                        articleDetailStore.articleDetail.id
                                    )
                                "
                            >
                                Ajouter
                            </button>
                        </td>
                    </tr>
                </tbody>
                <span
                    v-if="articleDetailStore.showAddBtn"
                    class="addCustomEvent"
                    @click="articleDetailStore.toggleCreationLine"
                />
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useArticleDetailStore } from "../stores/articleDetailStore";
import { onBeforeMount, ref } from "vue";
import router from "../router";

const articleDetailStore = useArticleDetailStore();

onBeforeMount(() => {
    articleDetailStore.loadArticleDetail(+router.currentRoute.value.params.id);
});
</script>

<style lang="scss" scoped>
.article-detail {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    height: 90vh;
    padding: 1.5rem;
}

.article-info {
    width: 20%;
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
        rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    p {
        text-align: center;
        width: 100%;
        padding: 0.5rem;
    }
}

.article-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
    padding: 1rem 0;
    text-align: center;
}

.article-info-item {
    font-weight: 700;
    text-align: center;
    text-decoration: underline;
    font-size: 1.2rem;
    margin-bottom: 5px;
    width: 100%;
}
.back {
    font-size: 2.5rem;
    padding-left: 2rem;
    padding-top: 1rem;
    cursor: pointer;
}
.content-img {
    display: flex;
    width: 100%;
    justify-content: center;
    .article-image {
        width: 100%;
        max-width: 200px;
        max-height: 200px;
        border-radius: 8px;
        object-fit: content;
    }
}

.events-list {
    flex: 1;
    width: 60%;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
        rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
}

.events-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.events-table {
    width: 100%;
    border-collapse: collapse;
    position: relative;
}
.addCustomEvent {
    display: block;
    width: 30px;
    height: 30px;
    left: 50%;
    border: solid 2px #0097a7;
    text-align: center;
    position: absolute;
    margin-top: 1rem;
    border-radius: 100%;
    bottom: -4rem;
    cursor: pointer;
    &:after {
        content: "+";
        display: block;
        font-size: 1.7rem;
        font-weight: 700;
        position: absolute;
        left: 50%;
        top: 50%;
        color: #0097a7;
        transform: translate(-50%, -50%);
    }
}
.events-table th,
.events-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.edit-button {
    background-color: #0097a7;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    margin-left: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.supp-button {
    background-color: #ac3e3e;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 0.5rem;
}
</style>

<script lang="ts">
export default {
    name: "ArticleDetails",
};
</script>
