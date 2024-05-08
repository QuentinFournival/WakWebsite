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
                <a-menu-item key="1">Acceuil</a-menu-item>
                <a-menu-item key="2">Shop</a-menu-item>
                <a-menu-item key="3">Laderboard</a-menu-item>
                <a-menu-item
                    ><a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            Servers
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <a href="javascript:;"
                                        >2 man Wak Server (start 24 mai)</a
                                    >
                                </a-menu-item>
                                <a-menu-item>
                                    <a href="javascript:;"
                                        >4 man Wak Server (start 10 mai)</a
                                    >
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-menu-item>
            </a-menu>
            <div class="container">
                <a-button class="buttonStyle" shape="round" :size="size">
                    <template #icon>
                        <CopyOutlined />
                    </template>
                    45.65.114.217
                </a-button>
                <a-button class="buttonStyle button" shape="round" :size="size">
                    <template #icon>
                        <i class="fa fa-discord"></i>
                    </template>
                    Discord
                </a-button>
            </div>
        </a-layout-header>
        <a-layout-content
            class="content"
            :style="{ padding: '20px 50px', marginTop: '80px' }"
        >
            <a-table
                :columns="columns"
                :data-source="dataSource"
                @change="onChange"
            ></a-table>
        </a-layout-content>
    </a-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import WakLogo from "../assets/logo-X_bleu_discord.png";
import { CopyOutlined } from "@ant-design/icons-vue";

import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons-vue";
const selectedKeys1 = ref<string[]>(["2"]);
const selectedKeys2 = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);
const dataSource = ref([
    { rank: 1, tribeName: "Minas Morghul", tribeScore: 33686 },
    { rank: 2, tribeName: "Tribe of BLACKITO", tribeScore: 23547 },
    { rank: 3, tribeName: "Mimolette", tribeScore: 23350 },
    { rank: 4, tribeName: "MERCILESS", tribeScore: 11318 },
    { rank: 5, tribeName: "KAPRO RUNNER", tribeScore: 8753 },
    { rank: 6, tribeName: "HERE WE GO AGAIN", tribeScore: 7590 },
    { rank: 7, tribeName: "E.O.D", tribeScore: 4521 },
    { rank: 8, tribeName: "Tribe of SALMON", tribeScore: 3528 },
    { rank: 9, tribeName: "Tribu de HKA", tribeScore: 2766 },
    { rank: 10, tribeName: "LA GRANDE VADROUILLE", tribeScore: 1238 },
    { rank: 11, tribeName: "IZI PIZI", tribeScore: 1029 },
    { rank: 12, tribeName: "Beer Barrel", tribeScore: 1007 },
    { rank: 13, tribeName: "dont cry baby", tribeScore: 235 },
    { rank: 14, tribeName: "A D M I N", tribeScore: 114 },
    { rank: 15, tribeName: "GRX", tribeScore: 48 },
    { rank: 16, tribeName: "Tribu de B A N B I N O S", tribeScore: 41 },
    { rank: 17, tribeName: "only clap", tribeScore: 36 },
    { rank: 18, tribeName: "revenge", tribeScore: 16 },
    { rank: 19, tribeName: "Ortega", tribeScore: 10 },
    { rank: 20, tribeName: "Team Licorn", tribeScore: 3 },
]);

const columns = [
    {
        title: "Rank",
        dataIndex: "rank",
        sorter: (a, b) => a.rank - b.rank,
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
        title: "Tribe score",
        dataIndex: "tribeScore",
        sorter: {
            compare: (a, b) => a.tribeScore - b.tribeScore,
            multiple: 2,
        },
    },
];
function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
}
</script>
<style lang="scss" scoped>
@import "../assets/variables/variables.scss";

.logo {
    width: 60px;
    height: 60px;
    object-fit: content;
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
    background: $color-text !important;
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
    background: #fff;
}
.height {
    height: 100% !important;
}
.content {
    margin-top: 1rem;
    background: $bg;
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
    width: 10%;
    .buttonStyle {
        background: transparent !important;
    }
}
:where(.css-dev-only-do-not-override-16pw25h).ant-btn-default {
    background: transparent !important;
    color: white;
}
</style>
