<template>
    <div class="height">
        <LeaderboardASA />
    </div>
</template>

<script setup lang="ts">
import LeaderboardASA from "../components/leaderboardASA2man.vue";
</script>

<style scoped>
.height {
    height: 100% !important;
}
:where(.css-16pw25h).ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
:where(.css-16pw25h).ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
    position: relative;

    display: flex;
    flex: auto;
    align-self: stretch;
    overflow: hidden;
    white-space: nowrap;
    transform: translate(0);
    top: -80px;
    left: 127px;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs .ant-tabs-tab {
    font-size: 1.5rem;
    font-family: "Anton SC", sans-serif !important;
    font-weight: 400;
    font-style: normal;
    text-transform: capitalize;
    z-index: 1000000;
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
}
</style>
