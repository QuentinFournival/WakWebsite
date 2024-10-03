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
                    <template #icon>
                        <i class="fa fa-discord"></i>
                    </template>
                    Discord
                </a-button>
            </div>
        </a-layout-header>
        <a-layout-content class="content" :style="{ marginTop: '80px' }">
            <div class="card" @click="router.push('/4manASA')">
                <div class=""></div>
                <img
                    class="img"
                    src="https://ark.wiki.gg/images/thumb/0/0a/ASA_Logo_transparent.png/630px-ASA_Logo_transparent.png"
                    alt="logo"
                />
                <h2>4 man ASA</h2>
            </div>
            <div class="card" @click="router.push('/noWipeAsa')">
                <div class=""></div>
                <img
                    class="img"
                    src="https://ark.wiki.gg/images/thumb/0/0a/ASA_Logo_transparent.png/630px-ASA_Logo_transparent.png"
                    alt="logo"
                />
                <h2>NO WIPE ASA</h2>
            </div>
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import WakLogo from "../assets/logo-X_bleu_discord.png";
import { CopyOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import router from "../router/index";

const ipServer = ref("83.147.29.33");

const copyClipboard = () => {
    navigator.clipboard.writeText(ipServer.value);

    // Alert the copied text
    alert("Copied the text: " + ipServer.value);
};
</script>

<style lang="scss" scoped>
@import "../assets/variables/variables.scss";

.content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: $bg;
    .card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        color: white;
        width: 20%;
        background: black;
        margin: 2rem;
        padding: 2rem;
        height: 30rem;
        cursor: pointer;
        border-radius: 20px;
        box-shadow: 0px 0px 86px -9px rgba(255, 255, 255, 0.8);
        position: relative;
        overflow: hidden;
        transition: all 0.5s;
        &:hover {
            transform: scale(1.04);
        }
        .bg {
            position: absolute;
            width: 200%;
            height: 200%;
            transform: rotate(54deg);
            background: #0b965d;
            z-index: 1;
            top: -2rem;
            left: 10rem;
        }
        .two {
            transform: rotate(-146deg);
            top: 15.5rem;
            left: -21rem;
        }
        h2 {
            width: 100%;
            font-size: 2rem;
            text-align: center;
            z-index: 3;
        }
        img {
            width: 80%;
            height: 60%;
            object-fit: content;
            z-index: 3;
        }
    }
}
.containerImg {
    display: flex;
    width: 100%;
    justify-content: center;
    .logo {
        width: 300px;
        height: 300px;
    }
}
h1 {
    color: white;
    font-size: 3rem;
    margin-top: -30rem;
}

.logo {
    width: 60px;
    height: 60px;
    object-fit: content;
    margin-top: 10px;
}
.datatable {
    width: 100%;
}
h1 {
    width: 100%;
    text-align: center;
    color: white;
    font-size: 2.5rem;
}
.img {
    object-fit: contain;
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
    background: #fff;
}
.height {
    height: 100% !important;
}

.container {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    align-content: center;
    justify-content: flex-end;
    width: 20%;
}

:where(.css-16pw25h).ant-btn-default {
    background: transparent !important;
    color: white;
}

:where(.css-16pw25h) a {
    color: black !important;
}
:where(.css-16pw25h).ant-btn-default:not(:disabled):hover {
    color: white;
    border-color: white;
}

@media screen and (max-width: 500px) {
    .content .card {
        width: 100%;
    }
    .buttonStyle {
        display: none !important;
    }
    .containerLogo {
        margin-top: -2rem;
    }
    .header {
        padding-top: 3rem;
    }
}
</style>

<script lang="ts">
export default {
    name: "Construction",
};
</script>
