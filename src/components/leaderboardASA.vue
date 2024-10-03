<template>
    <a-layout>
        <a-layout-header
            class="header"
            :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
        >
            <div class="containerLogo">
                <div class="logo"><img :src="WakLogo" alt="" /></div>
            </div>
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
                <a-menu-item key="2"><a href="/shop">Shop</a></a-menu-item>
                <a-menu-item @click="router.push('/selectServer')" key="3"
                    >Leaderboard</a-menu-item
                >
                <a-menu-item
                    ><a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            Servers
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <a href="/"
                                        >2 man Wak Server (start 24 mai)</a
                                    >
                                </a-menu-item>
                                <a-menu-item>
                                    <a href="/"
                                        >4 man Wak Server (start 10 mai)</a
                                    >
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-menu-item>
            </a-menu>
            <div class="container">
                <a-button
                    class="buttonStyle"
                    shape="round"
                    @click="copyClipboard()"
                    :size="size"
                >
                    <template #icon>
                        <CopyOutlined />
                    </template>
                    83.147.29.33
                </a-button>

                <a-button class="buttonStyle button" shape="round" :size="size">
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
        <a-layout-content
            class="content"
            :style="{ padding: '20px 50px', marginTop: '80px' }"
        >
            <img class="backgroundLeader" :src="background" alt="" />
            <div class="imgContent">
                <a-tabs class="datatable" v-model:activeKey="activeKey">
                    <a-tab-pane key="1" tab="Tributs">
                        <img class="leaderBoard" :src="leaderBoard" alt="" />
                        <img
                            class="leaderBoard mobile"
                            :src="leaderboardMobile"
                            alt="" />

                        <a-input
                            class="inputSearch"
                            v-model:value="search"
                            placeholder="Recherche tribu" />
                        <a-table
                            class="datatable"
                            :columns="columnsTribut"
                            :data-source="tribeData"
                            @change="onChange"
                        ></a-table
                    ></a-tab-pane>
                    <a-tab-pane key="2" tab="Players" force-render>
                        <img class="leaderBoardPlayer" :src="stats" alt="" />

                        <a-input
                            class="inputSearchPlayer"
                            v-model:value="searchPlayer"
                            placeholder="Recherche Joueur" />
                        <a-table
                            class="datatable"
                            :columns="
                                myBoolean ? columnsPlayerAdmin : columnsPlayer
                            "
                            :data-source="searchPlayers"
                            @change="onChange"
                        ></a-table
                    ></a-tab-pane>
                </a-tabs>
            </div>
        </a-layout-content>
    </a-layout>
</template>
<script lang="ts" setup>
import {
    computed,
    onBeforeMount,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
} from "vue";
import WakLogo from "../assets/logo-X_bleu_discord.png";
import leaderboardMobile from "../assets/lbmobile.png";
import { CopyOutlined } from "@ant-design/icons-vue";
import router from "../router/index";
import axios from "axios";
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons-vue";
import leaderBoard from "../assets/leaderBoard.png";
import stats from "../assets/stats.png";
import background from "../assets/backgroundLeaderboard.svg";

const selectedKeys1 = ref<string[]>(["2"]);
const selectedKeys2 = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);
const searchPlayer = ref("");
const search = ref("");
const ipServer = ref("83.147.29.33");
const adminColumns = ref(false);
const playerStats = ref([]);
const tribeArray = ref([]);

const fetchPlayerStats = async () => {
    try {
        const response = await axios.get(
            "https://stellular-youtiao-51b76b.netlify.app/.netlify/functions/api/leaderboardASA"
        );
        const data = await response.data.sort(
            (a, b) => b.PlayerDamage - a.PlayerDamage
        );
        const players = data.map((player, index) => {
            const timePlayed = player.MinutesPlayed / 60;
            const kda =
                player.PlayerDeaths > 0
                    ? player.PlayerKills / player.PlayerDeaths
                    : player.PlayerKills;
            return {
                rank: index + 1,
                PlayTime: timePlayed.toFixed(2) + "H",
                KDA: kda.toFixed(2),
                SteamID: player.SteamID,
                ...player,
            };
        });
        playerStats.value = players;

        const tribeData = players.reduce((acc, player) => {
            if (player.TribeName === "") {
                return acc;
            }
            let tribe = acc.find((t) => t.tribeName === player.TribeName);

            if (!tribe) {
                tribe = {
                    id: 0, // Placeholder, will be set later
                    tribeName: player.TribeName,
                    tribePlayers: [],
                    tribeDamage: 0,
                };
                acc.push(tribe);
            }

            tribe.tribePlayers.push(` ${player.Name} `);
            tribe.tribeDamage += player.PlayerDamage;

            return acc;
        }, []);

        // Trier les tribus par score de dégâts en ordre décroissant
        tribeData.sort((a, b) => b.tribeDamage - a.tribeDamage);

        // Assigner les rangs après le tri
        tribeArray.value = tribeData.map((tribe, index) => {
            return {
                ...tribe,
                id: index + 1, // Assigner les rangs ici
            };
        });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des statistiques des joueurs :",
            error
        );
    }
};

const searchPlayers = computed(() =>
    playerStats.value.filter((player) => {
        return player.Name.toLowerCase().includes(
            searchPlayer.value.toLowerCase()
        );
    })
);
const tribeData = computed(() =>
    tribeArray.value.filter((tribe) => {
        return tribe.tribeName
            .toLowerCase()
            .includes(search.value.toLowerCase());
    })
);
const copyClipboard = () => {
    navigator.clipboard.writeText(ipServer.value);

    alert("Copied the text: " + ipServer.value);
};
onBeforeMount(async () => {
    await fetchPlayerStats();
});

const columnsTribut = [
    {
        title: "Rank",
        dataIndex: "id",
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: "Tribe name ",
        dataIndex: "tribeName",
        sorter: {
            compare: (a, b) => a.tribeName.length - b.tribeName.length,
            multiple: 2,
        },
    },
    {
        title: "Damage Score",
        dataIndex: "tribeDamage",
        sorter: {
            compare: (a, b) => a.tribeDamage - b.tribeDamage,
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
        dataIndex: "Name",
        sorter: {
            compare: (a, b) => a.Name.length - b.Name.length,
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
        dataIndex: "MinutesPlayed",
        sorter: {
            compare: (a, b) => a.MinutesPlayed - b.MinutesPlayed,
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
        dataIndex: "PlayerDeaths",
        sorter: {
            compare: (a, b) => a.DeathByPlayer - b.DeathByPlayer,
            multiple: 2,
        },
    },
    {
        title: "Player KDA",
        dataIndex: "K/D",
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
        dataIndex: "Name",
        sorter: {
            compare: (a, b) => a.PlayerName.length - b.PlayerName.length,
            multiple: 2,
        },
    },
    {
        title: "Player eos Id ",
        dataIndex: "eos_id",
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
        dataIndex: "MinutesPlayed",
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
        dataIndex: "PlayerDeaths",
        sorter: {
            compare: (a, b) => a.DeathByPlayer - b.DeathByPlayer,
            multiple: 2,
        },
    },
    {
        title: "Player KDA",
        dataIndex: "K/D",
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
</script>
<style lang="scss" scoped>
@import "../assets/variables/variables.scss";
.imgContent {
    position: relative;
    top: 50%;
    width: 1920px;
    height: 1080px;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}
.leaderBoard {
    width: 1520px;
    height: 880px;
    position: absolute;
    transform: translate(2%, 10%);
    top: -270px;
    z-index: -1;
}
.leaderBoardPlayer {
    width: 1520px;
    height: 845px;
    position: absolute;
    transform: translate(2%, 10%);
    top: -230px;
    z-index: -1;
}
.backgroundLeader {
    width: 100%;
    object-fit: cover;
    height: 100vh;
    left: 0;
    position: absolute;
    top: 0px;
}
.mobile {
    display: none;
}
.logo {
    width: 60px;
    height: 60px;
    object-fit: content;
}
.datatable {
    width: 82.5%;
    margin: 0 auto;
    height: 71vh;
}

h1 {
    width: 100%;
    text-align: center;
    color: white;
    font-size: 2.5rem;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-btn-default:not(
        :disabled
    ):hover {
    color: white;
    border-color: transparent;
}
:where(.css-16pw25h).ant-btn-default:not(:disabled):hover {
    color: white;
    border-color: transparent;
}
.inputSearch {
    width: 11.5%;
    position: absolute;
    right: 123px;
    top: -99px;
}
.inputSearchPlayer {
    width: 11.5%;
    position: absolute;
    right: 171px;
    top: -93px;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    .ant-table-thead
    > tr
    > th,
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    .ant-table-tbody
    > tr
    > td,
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper tfoot > tr > th,
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    tfoot
    > tr
    > td {
    padding: 14.7px 16px !important;
    font-size: 20px !important;
}
:where(.css-16pw25h).ant-table-wrapper .ant-table-thead > tr > th,
:where(.css-16pw25h).ant-table-wrapper .ant-table-tbody > tr > td,
:where(.css-16pw25h).ant-table-wrapper tfoot > tr > th,
:where(.css-16pw25h).ant-table-wrapper tfoot > tr > td {
    padding: 14.7px 16px !important;
    font-size: 20px !important;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    .ant-table-pagination.ant-pagination {
    margin-top: 59px;
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
.ant-menu-item-selected {
    background: $color-side !important;
}
.ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
}
.title {
    color: white;
    opacity: 0.7;
}
.site-layout-background {
    background: transparent;
}
.height {
    height: 100% !important;
}
.content {
    margin-top: 1rem;
    position: relative;
}
.button {
    color: black !important;
}

.container {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-content: center;
    justify-content: flex-end;
    width: 20%;
}
.containerLogo {
    padding-top: 10px;
    width: 4%;
    .buttonStyle {
        background: transparent !important;
        color: black !important;
    }
}
.tropheeOr {
    width: 20px;
    height: 20px;
    position: absolute;
}
tr {
    background: $color-side;
    color: white;
    font-size: 20px !important;
    padding: 14.7px 13px !important;
    color: black !important;
    height: auto !important;
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: flex-start !important;
    align-items: center !important;
    &:nth-child(1) {
        background: transparent !important;
    }
    &:nth-child(2) {
        background: transparent !important;
    }
    &:nth-child(3) {
        background: transparent !important;
    }
    &:nth-child(odd) {
        background: transparent !important;
    }
}
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
        .ant-table-row-expand-icon-cell
    ):not([colspan])::before,
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    .ant-table-thead
    > tr
    > td:not(:last-child):not(.ant-table-selection-column):not(
        .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none !important;
}
:where(.css-16pw25h).ant-table-wrapper
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
        .ant-table-row-expand-icon-cell
    ):not([colspan])::before,
:where(.css-16pw25h).ant-table-wrapper
    .ant-table-thead
    > tr
    > td:not(:last-child):not(.ant-table-selection-column):not(
        .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none !important;
}
:where(.css-16pw25h) a {
    color: white !important;
}
@media screen and (max-width: 500px) {
    .buttonStyle {
        display: none !important;
    }
    .containerLogo {
        margin-top: -2rem;
    }
    .header {
        padding-top: 3rem;
    }
    .leaderBoard {
        display: none;
    }
    .datatable {
        transform: scale(0.4);
    }
    .mobile {
        display: block;
        width: 380px !important;
        height: 700px !important;
        position: absolute;
        left: 38% !important;
        top: -45% !important;
        z-index: -1 !important;
    }
}
</style>

<script lang="ts">
export default {
    name: "LeaderboardTwoMan",
};
</script>
