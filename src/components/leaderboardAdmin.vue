<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider class="telephone" collapsible>
            <div class="logo"><img class="logo" :src="wakLogo" alt="" /></div>
            <a-tabs
                default-active-key="1"
                tab-position="left"
                @change="handleTabChange"
            >
                <a-tab-pane key="1" tab="4 man (ASE)"> </a-tab-pane>
                <a-tab-pane key="2" tab="2 man (ASE)"> </a-tab-pane>
                <a-tab-pane key="3" tab="3 man (ASA)"> </a-tab-pane>
                <a-tab-pane key="4" tab="2 man (ASA)"> </a-tab-pane>
            </a-tabs>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="header">
                <a-menu
                    v-model:selectedKeys="selectedKeys"
                    theme="dark"
                    mode="horizontal"
                    :style="{
                        lineHeight: '80px',
                        paddingLeft: '20px',
                        width: '70%',
                    }"
                >
                    <a-menu-item @click="router.push('/')" key="1"
                        >Acceuil</a-menu-item
                    >
                    <a-menu-item key="2">
                        <a href="/shop">Shop</a>
                    </a-menu-item>
                    <a-menu-item @click="router.push('/selectServer')" key="3"
                        >Leaderboard</a-menu-item
                    >
                </a-menu>
                <div class="container">
                    <a-button
                        class="buttonStyle button"
                        shape="round"
                        :size="size"
                    >
                        <a
                            href="https://discord.gg/J6sntKxzED"
                            shape="round"
                            :size="size"
                        >
                            Discord
                        </a>
                    </a-button>
                </div>
            </a-layout-header>
            <a-layout-content class="content-card" style="margin: 24px 16px 0">
                <div
                    class="leaderboard"
                    v-if="selectedCategory === '4 man (ASE)'"
                >
                    <h1>Leaderboard</h1>

                    <a-input
                        class="inputSearch"
                        v-model:value="searchPlayer"
                        placeholder="Recherche Joueur"
                    />
                    <a-table
                        class="datatable"
                        :columns="
                            myBoolean ? columnsPlayerAdmin : columnsPlayer
                        "
                        :data-source="searchPlayers"
                        @change="onChange"
                    ></a-table>
                </div>
                <div v-if="selectedCategory === '2 man (ASE)'">2 man ase</div>
                <div v-if="selectedCategory === '2 man (ASA)'">2 man asA</div>
                <div v-if="selectedCategory === '3 man (ASA)'">3 man asA</div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import router from "../router/index";
import axios from "axios";
import wakLogo from "../assets/wakLogoWhite.png";
const searchPlayer = ref("");

const selectedCategory = ref("4 man (ASE)");
const adminColumns = ref(false);
const search = ref("");

const leaderboards = ref([]);
const playerStats = ref([]);

const fetchLeaderboards = async () => {
    try {
        const response = await axios.get(
            "https://stellular-youtiao-51b76b.netlify.app/.netlify/functions/api/leaderboards"
        );
        const data = await response.data.sort(
            (a, b) => b.DamageScore - a.DamageScore
        );
        const tribe = data.map((tribe, index) => {
            return {
                rank: index + 1,
                ...tribe,
            };
        });
        leaderboards.value = tribe;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des leaderboards :",
            error
        );
    }
};

// Fonction pour récupérer les statistiques des joueurs depuis l'API
const fetchPlayerStats = async () => {
    try {
        const response = await axios.get(
            "https://stellular-youtiao-51b76b.netlify.app/.netlify/functions/api/playerStats"
        );
        const data = await response.data.sort(
            (a, b) => b.PlayerKills - a.PlayerKills
        );
        const players = data.map((player, index) => {
            const timePlayed = player.PlayTime / 60;
            const kda =
                player.DeathByPlayer > 0
                    ? player.PlayerKills / player.DeathByPlayer
                    : player.PlayerKills;
            return {
                rank: index + 1,
                PlayTime: timePlayed + "H",
                KDA: kda.toFixed(2),
                SteamID: player.SteamID,
                ...player,
            };
        });
        playerStats.value = players;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des statistiques des joueurs :",
            error
        );
    }
};
const searchTribu = computed(() =>
    leaderboards.value.filter((tribu) => {
        return tribu.TribeName.toLowerCase().includes(
            search.value.toLowerCase()
        );
    })
);
const searchPlayers = computed(() =>
    playerStats.value.filter((player) => {
        return player.PlayerName.toLowerCase().includes(
            searchPlayer.value.toLowerCase()
        );
    })
);
const copyClipboard = () => {
    navigator.clipboard.writeText(ipServer.value);

    // Alert the copied text
    alert("Copied the text: " + ipServer.value);
};
onBeforeMount(async () => {
    await fetchLeaderboards();
    await fetchPlayerStats();
});

const columnsTribut = [
    {
        title: "Rank",
        dataIndex: "rank",
        sorter: (a, b) => a.rank - b.rank,
    },
    {
        title: "Tribe name ",
        dataIndex: "TribeName",
        sorter: {
            compare: (a, b) => a.TribeName.length - b.TribeName.length,
            multiple: 2,
        },
    },
    {
        title: "Damage Score",
        dataIndex: "DamageScore",
        sorter: {
            compare: (a, b) => a.DamageScore - b.DamageScore,
            multiple: 2,
        },
    },
];

const columnsPlayer = [
    {
        title: "Rank",
        dataIndex: "rank",
        sorter: (a, b) => a.rank - b.rank,
    },
    {
        title: "Player Name ",
        dataIndex: "PlayerName",
        sorter: {
            compare: (a, b) => a.PlayerName.length - b.PlayerName.length,
            multiple: 2,
        },
    },
    {
        title: "Player Tribe",
        dataIndex: "TribeName",
        sorter: {
            compare: (a, b) => a.TribeName.length - b.TribeName.length,
            multiple: 2,
        },
    },
    {
        title: "Time played",
        dataIndex: "PlayTime",
        sorter: {
            compare: (a, b) => a.PlayTime - b.PlayTime,
            multiple: 2,
        },
    },
    {
        title: "Player Kill",
        dataIndex: "PlayerKills",
        sorter: {
            compare: (a, b) => a.PlayerKills - b.PlayerKills,
            multiple: 2,
        },
    },
    {
        title: "Player Death",
        dataIndex: "DeathByPlayer",
        sorter: {
            compare: (a, b) => a.DeathByPlayer - b.DeathByPlayer,
            multiple: 2,
        },
    },
    {
        title: "Player KDA",
        dataIndex: "KDA",
        sorter: {
            compare: (a, b) => a.KDA - b.KDA,
            multiple: 2,
        },
    },
];
const columnsPlayerAdmin = [
    {
        title: "Rank",
        dataIndex: "rank",
        sorter: (a, b) => a.rank - b.rank,
    },
    {
        title: "Player Name ",
        dataIndex: "PlayerName",
        sorter: {
            compare: (a, b) => a.PlayerName.length - b.PlayerName.length,
            multiple: 2,
        },
    },
    {
        title: "Player Steam Id ",
        dataIndex: "SteamID",
        sorter: {
            compare: (a, b) => a.SteamID - b.SteamID,
            multiple: 2,
        },
    },
    {
        title: "Player Tribe",
        dataIndex: "TribeName",
        sorter: {
            compare: (a, b) => a.TribeName.length - b.TribeName.length,
            multiple: 2,
        },
    },
    {
        title: "Time played",
        dataIndex: "PlayTime",
        sorter: {
            compare: (a, b) => a.PlayTime - b.PlayTime,
            multiple: 2,
        },
    },
    {
        title: "Player Kill",
        dataIndex: "PlayerKills",
        sorter: {
            compare: (a, b) => a.PlayerKills - b.PlayerKills,
            multiple: 2,
        },
    },
    {
        title: "Player Death",
        dataIndex: "DeathByPlayer",
        sorter: {
            compare: (a, b) => a.DeathByPlayer - b.DeathByPlayer,
            multiple: 2,
        },
    },
    {
        title: "Player KDA",
        dataIndex: "KDA",
        sorter: {
            compare: (a, b) => a.KDA - b.KDA,
            multiple: 2,
        },
    },
];
const isKeyPressed = ref(false);
const myBoolean = ref(false);

const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        isKeyPressed.value = true;
    }
};

const handleKeyUp = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        isKeyPressed.value = false;
        // Inverser la valeur du boolean lorsque Ctrl + O est pressé
        myBoolean.value = !myBoolean.value;
    }
};

// Ajouter des écouteurs d'événements au montage du composant
onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
});

// Supprimer les écouteurs d'événements lors du démontage du composant
onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
});
const handleTabChange = (key) => {
    switch (key) {
        case "1":
            selectedCategory.value = "4 man (ASE)";
            break;
        case "2":
            selectedCategory.value = "2 man (ASE)";
            break;
        case "3":
            selectedCategory.value = "3 man (ASA)";
            break;
        case "4":
            selectedCategory.value = "2 man (ASA)";
            break;
        default:
            selectedCategory.value = "4 man (ASE)";
    }
};
</script>

<style scoped lang="scss">
@import "../assets/variables/variables.scss";
.leaderboard {
    width: 98%;
}
.logo {
    height: 50px;
    padding-left: 2rem;
    margin-bottom: 30px;
    margin-top: 10px;
}
.removeBtn {
    color: red;
}
.container {
    width: 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
    position: relative;
}
.content-card {
    display: flex !important;
    flex-wrap: wrap !important;
    width: 100%;
}
.tabTel {
    width: 100%;
    display: none;
}
.itemCart {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px black;
    padding-bottom: 3px;
}
.img {
    width: 70%;

    margin: 0 auto;
}
.card {
    margin: 10px;
    width: 22%;
}
:where(.css-16pw25h).ant-menu-light {
    background: transparent;
}
.badge {
    position: absolute;
    right: -5rem;
    top: 50%;
    transform: translate(-50%, -50%);
}
:where(.css-16pw25h).ant-btn-primary {
    background-color: #0b965d !important;
}
:where(.css-16pw25h).ant-btn-primary {
    background-color: #0b965d !important;
}
.cartImage {
    width: 35px;
    margin-right: 1rem;
}
.datatable {
    width: 100%;
}
.header {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    height: 80px;
    background: $color-headings;
    .button {
        margin-left: 0.5rem;
        color: black !important;
    }
    ul {
        width: 80%;
        height: 100%;
        background: $color-headings;
        li {
            span {
                padding-top: 1rem;
            }
        }
    }
}

.addCart {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 1rem;
}

@media screen and (max-width: 800px) {
    :where(.css-16pw25h).ant-tabs
        .ant-tabs-tab.ant-tabs-tab-active
        .ant-tabs-tab-btn {
        color: black !important;
    }
    :where(.css-16pw25h).ant-tabs
        .ant-tabs-tab.ant-tabs-tab-active
        .ant-tabs-tab-btn {
        color: black !important;
    }
    .telephone {
        display: none;
    }
    .tabTel {
        display: block;
    }
    .card {
        width: 100%;
    }
}
</style>
