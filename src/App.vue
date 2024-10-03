<template>
    <div class="background">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/gh/jgthms/minireset.css@master/minireset.min.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "./src/assets/variables/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Anton+SC&display=swap");

:where(.css-dev-only-do-not-override-16pw25h).ant-menu-dark.ant-menu-inline
    .ant-menu-sub.ant-menu-inline,
:where(.css-dev-only-do-not-override-16pw25h).ant-menu-dark:not(
        .ant-menu-horizontal
    ),
.ant-menu-submenu-title:active,
:where(.css-dev-only-do-not-override-16pw25h).ant-menu-dark
    .ant-menu-item-selected {
    background: $color-side;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-card .ant-card-head-title {
    color: white !important;
}
:where(.css-16pw25h).ant-card .ant-card-head-title {
    color: white !important;
}
:where(.css-16pw25h).ant-menu-dark.ant-menu-inline
    .ant-menu-sub.ant-menu-inline,
:where(.css-16pw25h).ant-menu-dark:not(.ant-menu-horizontal),
.ant-menu-submenu-title:active,
:where(.css-16pw25h).ant-menu-dark .ant-menu-item-selected {
    background: $color-side;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-pagination
    .ant-pagination-item-active
    a {
    background: $color-text;
}

:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    .ant-table-pagination.ant-pagination {
    margin: 59px 0;
}
:where(.css-16pw25h).ant-table-wrapper .ant-table-pagination.ant-pagination {
    margin: 59px 0;
}

:where(.css-dev-only-do-not-override-16pw25h).ant-tabs-top
    > .ant-tabs-nav
    .ant-tabs-ink-bar,
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs-top
    > div
    > .ant-tabs-nav
    .ant-tabs-ink-bar {
    background: $color-text;
    height: 5px;
}
:where(.css-16pw25h).ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
:where(.css-16pw25h).ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar {
    background: $color-text;
    height: 5px;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-pagination {
    height: auto !important;
}
:where(.css-16pw25h).ant-pagination {
    height: auto !important;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs
    > .ant-tabs-nav
    .ant-tabs-nav-wrap,
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs
    > div
    > .ant-tabs-nav
    .ant-tabs-nav-wrap {
    position: relative;
    display: flex;
    flex: auto;
    align-self: stretch;
    font-family: "Anton SC", sans-serif;
    font-weight: 400;
    font-style: normal;
    overflow: hidden;
    white-space: nowrap;
    transform: translate(0);
}
:where(.css-16pw25h).ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
:where(.css-16pw25h).ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
    position: relative;
    display: flex;
    flex: auto;
    align-self: stretch;
    font-family: "Anton SC", sans-serif;
    font-weight: 400;
    font-style: normal;
    overflow: hidden;
    white-space: nowrap;
    transform: translate(0);
}
:where(.css-16pw25h).ant-pagination .ant-pagination-item-active a {
    background: $color-text;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-spin-nested-loading {
    height: 63vh;
}
:where(.css-16pw25h).ant-spin-nested-loading {
    height: 63vh;
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
    padding-bottom: 6.5px !important;
    padding-left: 2.5rem !important;
    font-size: 19px !important;
    width: 20% !important;
    color: black !important;
    display: flex;
    border: none;

    &:nth-child(1) {
        width: 10% !important;
        padding-left: 20px;
        color: white !important;
    }
    &:nth-child(2) {
        width: 70% !important;
    }
    &:nth-child(3) {
        width: 50% !important;
    }
    &:nth-child(4) {
        width: 5.5% !important;
        padding-left: 3rem !important;
    }
    &:nth-child(5) {
        width: 12.5% !important;
        padding-left: 6rem !important;
    }
    &:nth-child(6) {
        width: 14.5% !important;
        padding-left: 5rem !important;
    }
}
:where(.css-dev-only-do-not-override-16pw25h).ant-select-single:not(
        .ant-select-customize-input
    )
    .ant-select-selector {
    display: none !important;
}
:where(.css-16pw25h).ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector {
    display: none !important;
}
:where(.css-16pw25h).ant-table-wrapper .ant-table-thead > tr > th,
:where(.css-16pw25h).ant-table-wrapper .ant-table-tbody > tr > td,
:where(.css-16pw25h).ant-table-wrapper tfoot > tr > th,
:where(.css-16pw25h).ant-table-wrapper tfoot > tr > td {
    padding: 14.7px 16px !important;
    padding-bottom: 6.5px !important;
    padding-left: 2.5rem !important;
    font-size: 19px !important;
    width: 20% !important;
    color: black !important;
    display: flex;
    border: none;

    &:nth-child(1) {
        width: 10% !important;
        color: white !important;
        padding-left: 20px;
    }
    &:nth-child(2) {
        width: 70% !important;
    }
    &:nth-child(3) {
        width: 50% !important;
    }
    &:nth-child(4) {
        width: 5.5% !important;
        padding-left: 3rem !important;
    }
    &:nth-child(5) {
        width: 12.5% !important;
        padding-left: 6rem !important;
    }
    &:nth-child(6) {
        width: 14.5% !important;
        padding-left: 5rem !important;
    }
}
:where(.css-dev-only-do-not-override-16pw25h)[class^="ant-table"]
    [class^="ant-table"],
:where(.css-dev-only-do-not-override-16pw25h)[class*=" ant-table"]
    [class^="ant-table"],
:where(.css-dev-only-do-not-override-16pw25h)[class^="ant-table"]
    [class*=" ant-table"],
:where(.css-dev-only-do-not-override-16pw25h)[class*=" ant-table"]
    [class*=" ant-table"] {
    color: black !important;
}
:where(.css-16pw25h)[class^="ant-table"] [class^="ant-table"],
:where(.css-16pw25h)[class*=" ant-table"] [class^="ant-table"],
:where(.css-16pw25h)[class^="ant-table"] [class*=" ant-table"],
:where(.css-16pw25h)[class*=" ant-table"] [class*=" ant-table"] {
    color: black !important;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper table {
    margin-top: -35px;
}
:where(.css-16pw25h).ant-table-wrapper table {
    margin-top: -35px;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr
    > td {
    border-color: transparent !important;
    font-family: "Anton SC", sans-serif;
    font-weight: 400;
    font-style: normal;
}
:where(.css-16pw25h).ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr
    > td {
    border-color: transparent !important;
    font-family: "Anton SC", sans-serif;
    font-weight: 400;
    font-style: normal;
}
:where(.css-16pw25h).ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr
    > td {
    border-color: transparent !important;
}

:where(.css-16pw25h).ant-menu-dark.ant-menu-inline
    .ant-menu-sub.ant-menu-inline,
:where(.css-16pw25h).ant-menu-dark:not(.ant-menu-horizontal)
    .ant-menu-submenu-title:active
    :where(.css-16pw25h).ant-menu-dark
    .ant-menu-item-selected {
    background: $color-side;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs .ant-tabs-tab-btn {
    color: white !important;
}
:where(.css-16pw25h).ant-tabs .ant-tabs-tab-btn {
    color: white !important;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs-left
    > .ant-tabs-content-holder,
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs-left
    > div
    > .ant-tabs-content-holder {
    border-left: none !important;
}
:where(.css-16pw25h).ant-tabs-left > .ant-tabs-content-holder,
:where(.css-16pw25h).ant-tabs-left > div > .ant-tabs-content-holder {
    border-left: none !important;
}
:where(.css-16pw25h).ant-tabs-left > .ant-tabs-content-holder,
:where(.css-16pw25h).ant-tabs-left > div > .ant-tabs-content-holder {
    border-left: none !important;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-tabs .ant-tabs-tab-btn {
    color: white !important;
}
:where(.css-16pw25h).ant-tabs .ant-tabs-tab-btn {
    color: white !important;
}
:where(.css-16pw25h).ant-tabs-left > .ant-tabs-content-holder,
:where(.css-16pw25h).ant-tabs-left > div > .ant-tabs-content-holder {
    border-left: none !important;
}
:where(.css-16pw25h).ant-tabs-left > .ant-tabs-content-holder,
:where(.css-16pw25h).ant-tabs-left > div > .ant-tabs-content-holder {
    border-left: none;
}
:where(.css-16pw25h).ant-tabs .ant-tabs-tab-btn {
    color: white !important;
}
.background {
    background: white;
    height: 100vh;
    margin: 0 !important;
    padding: 0;
    overflow: auto;
}
:where(.css-16pw25h) a {
    color: white !important;
}
:where(.css-16pw25h).ant-pagination
    .ant-pagination-disabled
    .ant-pagination-item-link,
:where(.css-16pw25h).ant-pagination
    .ant-pagination-disabled:hover
    .ant-pagination-item-link {
    color: white !important;
}
* {
    font-family: "Roboto", sans-serif;
}
.ant-layout {
    height: 100% !important;
}
.ant-menu-title-content {
    display: flex;
    align-items: center;
    height: 100%;
}
:where(.css-16pw25h).ant-pagination
    .ant-pagination-prev
    .ant-pagination-item-link,
:where(.css-16pw25h).ant-pagination
    .ant-pagination-next
    .ant-pagination-item-link {
    color: white;
}
:where(.css-16pw25h).ant-pagination .ant-pagination-item-active {
    background: $color-text;
    border: none;
}
:where(.css-16pw25h).ant-table-wrapper .ant-table-thead > tr > th,
:where(.css-16pw25h).ant-table-wrapper .ant-table-thead > tr > td {
    background: $color-side !important;
    color: white !important;
}
:where(.css-16pw25h).ant-table-wrapper .ant-table-column-sorter {
    color: white;
}

tr {
    background: $color-side;
    color: white;
    display: flex;
    width: 100%;
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
        background: transparent;
    }
}
:where(.css-dev-only-do-not-override-16pw25h).ant-layout
    .ant-layout-sider-trigger {
    background: $color-side !important;
}
:where(.css-16pw25h).ant-layout .ant-layout-sider-trigger {
    background: $color-side !important;
}
:where(.css-16pw25h).ant-layout .ant-layout-sider-trigger {
    background: $color-side !important;
}
:where(.css-16pw25h).ant-table-wrapper
    .ant-table-tbody
    > tr.ant-table-row:hover
    > td,
:where(.css-16pw25h).ant-table-wrapper
    .ant-table-tbody
    > tr
    > td.ant-table-cell-row-hover {
    background: none;
}
:where(.css-16pw25h).ant-table-wrapper td.ant-table-column-sort {
    background: transparent;
}
:where(.css-16pw25h).ant-menu-dark.ant-menu-horizontal
    > .ant-menu-item-selected,
:where(.css-16pw25h).ant-menu-dark.ant-menu-horizontal
    > .ant-menu-submenu-selected {
    background: none;
}
:where(.css-16pw25h).ant-menu .ant-menu-item a {
    color: white !important;
}
:where(.css-16pw25h).ant-menu-dark {
    color: white;
}
:where(.css-16pw25h).ant-tabs {
    color: white;
}
:where(.css-16pw25h).ant-tabs
    .ant-tabs-tab.ant-tabs-tab-active
    .ant-tabs-tab-btn {
    color: white;
}
:where(.css-16pw25h).ant-tabs .ant-tabs-ink-bar {
    background: white;
}

:where(.css-dev-only-do-not-override-16pw25h)[class^="ant-table"]
    [class^="ant-table"],
:where(.css-dev-only-do-not-override-16pw25h)[class*=" ant-table"]
    [class^="ant-table"],
:where(.css-dev-only-do-not-override-16pw25h)[class^="ant-table"]
    [class*=" ant-table"],
:where(.css-dev-only-do-not-override-16pw25h)[class*=" ant-table"]
    [class*=" ant-table"] {
    background: transparent !important;
    height: 100%;
    color: transparent !important;
}
:where(.css-16pw25h)[class^="ant-table"] [class^="ant-table"],
:where(.css-16pw25h)[class*=" ant-table"] [class^="ant-table"],
:where(.css-16pw25h)[class^="ant-table"] [class*=" ant-table"],
:where(.css-16pw25h)[class*=" ant-table"] [class*=" ant-table"] {
    background: transparent !important;
    height: 100%;
    color: transparent !important;
}
:where(.css-16pw25h).ant-table-wrapper .ant-table-thead > tr > th,
:where(.css-16pw25h).ant-table-wrapper .ant-table-thead > tr > td {
    background: transparent !important;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-spin-nested-loading
    .ant-spin-container {
    height: 61vh;
}
:where(.css-16pw25h).ant-spin-nested-loading .ant-spin-container {
    height: 61vh;
}
:where(.css-16pw25h).ant-table-wrapper .ant-table-pagination.ant-pagination {
    overflow: inherit;
}
:where(.css-dev-only-do-not-override-16pw25h).ant-pagination
    .ant-pagination-item
    a {
    color: white !important;
}
:where(.css-16pw25h).ant-pagination .ant-pagination-item a {
    color: white !important;
}
@media screen and (max-width: 800px) {
    :where(.css-16pw25h).ant-tabs .ant-tabs-tab-btn {
        color: black !important;
    }
    :where(.css-dev-only-do-not-override-16pw25h).ant-tabs .ant-tabs-tab-btn {
        color: black !important;
    }
}
@media screen and (max-width: 500px) {
    :where(.css-dev-only-do-not-override-16pw25h).ant-drawer-right
        > .ant-drawer-content-wrapper {
        width: 100% !important;
    }
    :where(.css-16pw25h).ant-drawer-right > .ant-drawer-content-wrapper {
        width: 100% !important;
    }
    .bgVideo {
        transform: scale(50) !important;
    }
}
</style>
