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
                <a-tab-pane key="3" tab="4 man (ASA)"> </a-tab-pane>
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
                        <a-dropdown>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item
                                        v-for="(
                                            item, index
                                        ) in cartStore.cartItems"
                                        :key="index"
                                    >
                                        <div class="itemCart">
                                            <img
                                                class="cartImage"
                                                :src="item.image"
                                                alt=""
                                            />
                                            <span class="itemName"
                                                >{{ item.name }} -
                                                {{ item.price }} €</span
                                            >
                                            <a-button
                                                class="removeBtn"
                                                type="link"
                                                @click="removeFromCart(index)"
                                                >Remove</a-button
                                            >
                                        </div>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <a-button
                                            type="primary"
                                            @click="
                                                redirectToCheckout(
                                                    cartStore.cartItems
                                                )
                                            "
                                            >Checkout</a-button
                                        >
                                    </a-menu-item>
                                </a-menu>
                            </template>
                            <a-badge
                                class="badge"
                                :count="cartStore.cartItems.length"
                            >
                                <ShoppingCartOutlined
                                    :style="{
                                        fontSize: '32px',
                                        color: 'white',
                                    }"
                                    class="cartIcon"
                                />
                            </a-badge>
                        </a-dropdown>
                    </a-button>
                </div>
            </a-layout-header>
            <a-layout-content class="content-card" style="margin: 24px 16px 0">
                <a-tabs
                    class="tabTel"
                    default-active-key="1"
                    tab-position="top"
                    @change="handleTabChange"
                >
                    <a-tab-pane key="1" tab="4 man (ASE)"> </a-tab-pane>
                    <a-tab-pane key="2" tab="2 man (ASE)"> </a-tab-pane>
                    <a-tab-pane key="3" tab="4 man (ASA)"> </a-tab-pane>
                    <a-tab-pane key="4" tab="2 man (ASA)"> </a-tab-pane>
                </a-tabs>
                <a-card
                    v-for="item in filteredItems"
                    :key="item.id"
                    class="card"
                    hoverable
                    :title="item.name"
                >
                    <template #cover>
                        <img class="img" alt="image" :src="item.image" />
                    </template>
                    <p><strong>Price:</strong> {{ item.price }}€</p>
                    <a-drawer
                        :open="isDrawerOpen(item.id)"
                        class="custom-class"
                        root-class-name="root-class-name"
                        :root-style="{ color: 'blue' }"
                        style="color: black"
                        :title="item.name"
                        placement="right"
                        size="large"
                        @close="closeDrawer"
                    >
                        <div v-html="item.description"></div>
                    </a-drawer>
                    <div class="addCart">
                        <a-button type="primary" @click="showDrawer(item.id)"
                            >Détails</a-button
                        >

                        <a-button type="primary" @click="addToCart(item)"
                            >ADD TO CART</a-button
                        >
                    </div>
                </a-card>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useCartStore } from "../stores/cartStore";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { loadStripe } from "@stripe/stripe-js";
import router from "../router/index";

import wakLogo from "../assets/wakLogoWhite.png";
const stripePromise = loadStripe(
    "pk_live_51PVGXYGgFReHIOcrv4QtRLu7YLuvQaxOn48QJDSPsO1k9SEDRHtBseV3Zd8JRPEN2h1CzcqFALr0Ojfkn33ri0Xr00sBti3HPb"
);
const openDrawerId = ref(null);
const cartStore = useCartStore();

const redirectToCheckout = async (item) => {
    const stripe = await loadStripe(
        "pk_live_51PVGXYGgFReHIOcrv4QtRLu7YLuvQaxOn48QJDSPsO1k9SEDRHtBseV3Zd8JRPEN2h1CzcqFALr0Ojfkn33ri0Xr00sBti3HPb"
    );
    const response = await fetch(
        "https://stellular-youtiao-51b76b.netlify.app/.netlify/functions/api/create-checkout-session",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ products: item }),
        }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
        console.error(result.error.message);
    }
};
const items = ref([
    {
        id: 1,
        name: "WAK PASS (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/2aeb270201571c66ecb7476c9f23472a61cf071f.png",
        description: `<p><br><img src="https://dunb17ur4ymx4.cloudfront.net/wysiwyg/1171530/9f64c267ecc2934001dd5e56dce7e840f9eb9f4d.jpg" style="width:auto; object-fit:contain" class="fr-fic fr-dib" width="666" height="374" alt="9f64c267ecc2934001dd5e56dce7e840f9eb9f4d.jpg"><br><br>Ascendant_Box details:<br>- 1 weapon with 30% BP max quality<br>- 1 saddle 30% BP max quality<br>- Element or Black Pearl<br>- 1 dino between (Reaper/Giga/Carcha/RockDrake)<br>- 1 flak30% BP high quality<br><br>Baby_Box details:<br>- 1 dino baby on all dino<br><br><br>Advanced_Box details:<br>- 1 weapon with 20% BP<br>- 1 flak with 30% BP<br>- 1 medium dino</p>`,
        price: 9.98,
        unit_amount: 998,
        quantity: 1,
        permission: "Points(Pass)",

        category: "4 man (ASE)",
    },
    {
        id: 2,
        name: "VIP Ascendant (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/5213357359e3c61e3e3afeaa78ad963432f02f80.png",
        description: `
        <p>
          The <span style="color: rgb(26, 188, 156)">VIP_Ascendant</span>
          will give you:
        </p>
        <p>
          - 120 000 points<br /><br />-10
          <span style="color: rgb(26, 188, 156)">Ascendant_Box</span>&nbsp; 4
          <span style="color: rgb(147, 101, 184)">Baby_Box</span>&nbsp; &nbsp;4
          <span style="color: rgb(250, 197, 28)">Advanced_Box&nbsp;</span
          ><br /><span style="color: rgb(184, 49, 47)">YOU WILL RECEIVE YOUR KIT LOOTBOX 24H AFTER &nbsp;SERVER START</span>
        </p>
        <p>
          - More interval in game (25 default ----&gt; 150) per 15 min<br /><br />-15%
          discount IN GAME SHOP on all
        </p>
        <p>- Exclusive Kits (details below)</p>
        <p>
          - New role on Discord
          <strong
            ><span style="color: rgb(26, 188, 156)">Ascendant VIP</span></strong
          ><br /><br /><strong
            ><span style="color: rgb(26, 188, 156)">-Unlimited Dino color
            command&nbsp;</span></strong
          ><br /><br />-Chest skin
        </p>
        <p>
          <span style="color: rgb(0, 168, 133)">Ascendant_Box details:</span
          ><br />- 1 weapon with 30% BP max quality<br />- 1 saddle 30% BP max
          quality<br />- Element or Black Pearl<br />- 1 dino between
          (Reaper/Giga/Carcha/RockDrake)<br />- 1 flak30% BP high quality<br /><br /><span style="color: rgb(147, 101, 184)">Baby_Box details:</span
          ><br />- 1 dino baby on all dino<br /><br /><br /><span
            style="color: rgb(250, 197, 28)">Advanced_Box details:</span
          ><br />- 1 weapon with 20% BP<br />- 1 flak with 30% BP<br />- 1
          medium dino<br /><br /><br />Kits:<br />Kits boss:<br />All artefact/tribute for
          boss<br /><br />Kits Uitilites<br />(blueprint parachute, arrow, bolas)<br /><br />Kits
          PvP<br />Flak/compo/brews in better quality
        </p>`,
        price: 99.98,
        unit_amount: 9998,
        permission: "Points(VIPAscendant)",
        quantity: 1,
        category: "4 man (ASE)",
    },
    {
        id: 3,
        name: "VIP Mastercraft (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6dbf999a4001c26601a1f78a4c75a37f28157a8d.png",
        description: `<div class="mt-5">
                        <p>The <span style="color:rgb(250,197,28);">VIP Mastercraft&nbsp;</span>will give you:</p><p>- 60 000 points</p><p>- More interval in game (25 default ----&gt; 90) per 15 min<br><br>-10% discount IN GAME SHOP on all</p><p>- Exclusive Kit (detail below)</p><p>- New role on Discord <span style="color:rgb(250,197,28);">Mastercraft VIP&nbsp;</span><br><br><span style="color:rgb(250,197,28);">- 4 ascendant loot box<br> 6 Advanced box<br> 2 Baby Box<br></span><span style="color:rgb(184,49,47);">YOU WILL RECEIVE YOUR KIT LOOTBOX 24H AFTER &nbsp;SERVER START</span><br><br>-Unlimited dino color<br><br>-Chest skin<br><br><span style="color:rgb(0,168,133);">Ascendant_Box details:</span><br>- 1 weapon with 30% BP max quality<br>- 1 saddle 30% BP max quality<br>- Element or Black Pearl<br>- 1 dino between (Reaper/Giga/Carcha/RockDrake)<br>- 1 flak30% BP high quality<br><br><span style="color:rgb(147,101,184);">Baby_Box details:</span><br>- 1 dino baby on all dino<br><br><br><span style="color:rgb(250,197,28);">Advanced_Box details:</span><br>- 1 weapon with 20% BP<br>- 1 flak with 30% BP<br>- 1 medium dino<br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br>Kits PvP<br>Flak/compo/brews in better quality</p>
                    </div>`,
        price: 39.98,
        unit_amount: 3998,
        quantity: 1,
        permission: "Points(VIPMastercraft)",
        category: "4 man (ASE)",
    },
    {
        id: 4,
        name: "VIP Journeyman (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/64581f38011f38e6c562022e7bd94fefcbd2f9d0.png",
        description: `<div class="mt-5">
                        <p>The <span style="color:rgb(85,57,130);">VIP_Journeyman&nbsp;</span>will give you:</p><p>- 25 000 points</p><p>- More interval in game (25 default ----&gt; 50) per 15 min<br><br>-5% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <span style="color:rgb(85,57,130);">VIPJourneyman</span><br><br><span style="color:rgb(85,57,130);">-1Ascendant Box<br>-2 Advanced Box<br>&nbsp;-1 Baby Box</span><br><span style="color:rgb(184,49,47);">YOU WILL RECEIVE YOUR KIT LOOTBOX 24H AFTER &nbsp;SERVER START</span><br><br>-Chest skin<br><br><span style="color:rgb(0,168,133);">Ascendant_Box details:</span><br>- 1 weapon with 30% BP max quality<br>- 1 saddle 30% BP max quality<br>- Element or Black Pearl<br>- 1 dino between (Reaper/Giga/Carcha/RockDrake)<br>- 1 flak30% BP high quality<br><br><span style="color:rgb(147,101,184);">Baby_Box details:</span><br>- 1 dino baby on all dino<br><br><br><span style="color:rgb(247,218,100);">Advanced_Box details:</span><br>- 1 weapon with 20% BP<br>- 1 flak with 30% BP<br>- 1 medium dino<br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br>Kits PvP<br>Flak/compo/brews in better quality</p>
                    </div>`,
        price: 19.99,
        unit_amount: 1999,
        quantity: 1,
        permission: "Points(VIPJourneyman)",
        category: "4 man (ASE)",
    },
    {
        id: 11,
        name: "Free Box 600 points (4 MAN ASE)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1260407765101187193/box_free.png?ex=668f35b4&is=668de434&hm=4428e7dba83d712e569b6ecad8cf662679f2b117b35d13894c76662b02f76d1e&",
        description: `<div class="mt-5">
<p>600 free points </p>                    </div>`,
        price: 0,
        unit_amount: 0,
        quantity: 1,
        permission: "Points(free)",
        category: "4 man (ASE)",
    },
    {
        id: 5,
        name: "5000 Points (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6272e0e0cd4dca7cf0311852cf8e3d797510dd35.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>5 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 3.84,
        unit_amount: 384,
        quantity: 1,
        permission: "Points(5000)",
        category: "4 man (ASE)",
    },
    {
        id: 6,
        name: "10000 Points (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6c18927e81b3b41c5973976c7c6feaf6a8c10616.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>10 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 5.98,
        unit_amount: 598,
        quantity: 1,
        permission: "Points(10000)",

        category: "4 man (ASE)",
    },
    {
        id: 7,
        name: "18000 Points (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/f06440cf4d764988c6f672fc831c79d76a71f218.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>18 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 9.98,
        unit_amount: 998,
        permission: "Points(18000)",

        quantity: 1,
        category: "4 man (ASE)",
    },
    {
        id: 8,
        name: "35000 Points (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8d4b4a2df220c44f64e374f30b98915987386086.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>35 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 17.98,
        unit_amount: 1798,
        quantity: 1,
        permission: "Points(35000)",

        category: "4 man (ASE)",
    },
    {
        id: 9,
        name: "50000 Points (4 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8ac499b2f6732085ad14674a7d309e7f95f08fe6.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>50 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 25.68,
        unit_amount: 2568,
        quantity: 1,
        permission: "Points(50000)",

        category: "4 man (ASE)",
    },
    {
        id: 10,
        name: "100000 Points (4 MAN ASE)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1255559168400818187/100000pointsbox.png?ex=667d9218&is=667c4098&hm=5b30b67ec9b5510a70c47fb2915b09236edde9893217cf1670ddded519f18840&",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>100 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 48.0,
        unit_amount: 4800,
        quantity: 1,
        permission: "Points(100000)",
        category: "4 man (ASE)",
    },
    {
        id: 1,
        name: "WAK PASS (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/2aeb270201571c66ecb7476c9f23472a61cf071f.png",
        description: `<p><br><img src="https://dunb17ur4ymx4.cloudfront.net/wysiwyg/1171530/9f64c267ecc2934001dd5e56dce7e840f9eb9f4d.jpg" style="width:auto; object-fit:contain" class="fr-fic fr-dib" width="666" height="374" alt="9f64c267ecc2934001dd5e56dce7e840f9eb9f4d.jpg"><br><br>Ascendant_Box details:<br>- 1 weapon with 30% BP max quality<br>- 1 saddle 30% BP max quality<br>- Element or Black Pearl<br>- 1 dino between (Reaper/Giga/Carcha/RockDrake)<br>- 1 flak30% BP high quality<br><br>Baby_Box details:<br>- 1 dino baby on all dino<br><br><br>Advanced_Box details:<br>- 1 weapon with 20% BP<br>- 1 flak with 30% BP<br>- 1 medium dino</p>`,
        price: 9.98,
        unit_amount: 998,
        quantity: 1,
        permission: "Points(Pass)",
        category: "2 man (ASE)",
    },
    {
        id: 2,
        name: "VIP Ascendant (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/5213357359e3c61e3e3afeaa78ad963432f02f80.png",
        description: `
        <p>
          The <span style="color: rgb(26, 188, 156)">VIP_Ascendant</span>
          will give you:
        </p>
        <p>
          - 120 000 points<br /><br />-10
          <span style="color: rgb(26, 188, 156)">Ascendant_Box</span>&nbsp; 4
          <span style="color: rgb(147, 101, 184)">Baby_Box</span>&nbsp; &nbsp;4
          <span style="color: rgb(250, 197, 28)">Advanced_Box&nbsp;</span
          ><br /><span style="color: rgb(184, 49, 47)">YOU WILL RECEIVE YOUR KIT LOOTBOX 24H AFTER &nbsp;SERVER START</span>
        </p>
        <p>
          - More interval in game (25 default ----&gt; 150) per 15 min<br /><br />-15%
          discount IN GAME SHOP on all
        </p>
        <p>- Exclusive Kits (details below)</p>
        <p>
          - New role on Discord
          <strong
            ><span style="color: rgb(26, 188, 156)">Ascendant VIP</span></strong
          ><br /><br /><strong
            ><span style="color: rgb(26, 188, 156)">-Unlimited Dino color
            command&nbsp;</span></strong
          ><br /><br />-Chest skin
        </p>
        <p>
          <span style="color: rgb(0, 168, 133)">Ascendant_Box details:</span
          ><br />- 1 weapon with 30% BP max quality<br />- 1 saddle 30% BP max
          quality<br />- Element or Black Pearl<br />- 1 dino between
          (Reaper/Giga/Carcha/RockDrake)<br />- 1 flak30% BP high quality<br /><br /><span style="color: rgb(147, 101, 184)">Baby_Box details:</span
          ><br />- 1 dino baby on all dino<br /><br /><br /><span
            style="color: rgb(250, 197, 28)">Advanced_Box details:</span
          ><br />- 1 weapon with 20% BP<br />- 1 flak with 30% BP<br />- 1
          medium dino<br /><br /><br />Kits:<br />Kits boss:<br />All artefact/tribute for
          boss<br /><br />Kits Uitilites<br />(blueprint parachute, arrow, bolas)<br /><br />Kits
          PvP<br />Flak/compo/brews in better quality
        </p>`,
        price: 99.98,
        unit_amount: 9998,
        permission: "Points(VIPAscendant)",
        quantity: 1,
        category: "2 man (ASE)",
    },
    {
        id: 3,
        name: "VIP Mastercraft (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6dbf999a4001c26601a1f78a4c75a37f28157a8d.png",
        description: `<div class="mt-5">
                        <p>The <span style="color:rgb(250,197,28);">VIP Mastercraft&nbsp;</span>will give you:</p><p>- 60 000 points</p><p>- More interval in game (25 default ----&gt; 90) per 15 min<br><br>-10% discount IN GAME SHOP on all</p><p>- Exclusive Kit (detail below)</p><p>- New role on Discord <span style="color:rgb(250,197,28);">Mastercraft VIP&nbsp;</span><br><br><span style="color:rgb(250,197,28);">- 4 ascendant loot box<br> 6 Advanced box<br> 2 Baby Box<br></span><span style="color:rgb(184,49,47);">YOU WILL RECEIVE YOUR KIT LOOTBOX 24H AFTER &nbsp;SERVER START</span><br><br>-Unlimited dino color<br><br>-Chest skin<br><br><span style="color:rgb(0,168,133);">Ascendant_Box details:</span><br>- 1 weapon with 30% BP max quality<br>- 1 saddle 30% BP max quality<br>- Element or Black Pearl<br>- 1 dino between (Reaper/Giga/Carcha/RockDrake)<br>- 1 flak30% BP high quality<br><br><span style="color:rgb(147,101,184);">Baby_Box details:</span><br>- 1 dino baby on all dino<br><br><br><span style="color:rgb(250,197,28);">Advanced_Box details:</span><br>- 1 weapon with 20% BP<br>- 1 flak with 30% BP<br>- 1 medium dino<br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br>Kits PvP<br>Flak/compo/brews in better quality</p>
                    </div>`,
        price: 39.98,
        unit_amount: 3998,
        permission: "Points(VIPMastercraft)",
        quantity: 1,
        category: "2 man (ASE)",
    },
    {
        id: 4,
        name: "VIP Journeyman (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/64581f38011f38e6c562022e7bd94fefcbd2f9d0.png",
        description: `<div class="mt-5">
                        <p>The <span style="color:rgb(85,57,130);">VIP_Journeyman&nbsp;</span>will give you:</p><p>- 25 000 points</p><p>- More interval in game (25 default ----&gt; 50) per 15 min<br><br>-5% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <span style="color:rgb(85,57,130);">VIPJourneyman</span><br><br><span style="color:rgb(85,57,130);">-1Ascendant Box<br>-2 Advanced Box<br>&nbsp;-1 Baby Box</span><br><span style="color:rgb(184,49,47);">YOU WILL RECEIVE YOUR KIT LOOTBOX 24H AFTER &nbsp;SERVER START</span><br><br>-Chest skin<br><br><span style="color:rgb(0,168,133);">Ascendant_Box details:</span><br>- 1 weapon with 30% BP max quality<br>- 1 saddle 30% BP max quality<br>- Element or Black Pearl<br>- 1 dino between (Reaper/Giga/Carcha/RockDrake)<br>- 1 flak30% BP high quality<br><br><span style="color:rgb(147,101,184);">Baby_Box details:</span><br>- 1 dino baby on all dino<br><br><br><span style="color:rgb(247,218,100);">Advanced_Box details:</span><br>- 1 weapon with 20% BP<br>- 1 flak with 30% BP<br>- 1 medium dino<br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br>Kits PvP<br>Flak/compo/brews in better quality</p>
                    </div>`,
        price: 19.99,
        unit_amount: 1999,
        quantity: 1,
        permission: "Points(VIPJourneyman)",
        category: "2 man (ASE)",
    },
    {
        id: 11,
        name: "Free Box 600 points (2 MAN ASE)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1260407765101187193/box_free.png?ex=668f35b4&is=668de434&hm=4428e7dba83d712e569b6ecad8cf662679f2b117b35d13894c76662b02f76d1e&",
        description: `<div class="mt-5">
<p>600 free points </p>                    </div>`,
        price: 0,
        unit_amount: 0,
        quantity: 1,
        permission: "Points(free)",
        category: "2 man (ASE)",
    },
    {
        id: 5,
        name: "5000 Points (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6272e0e0cd4dca7cf0311852cf8e3d797510dd35.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>5 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 3.84,
        unit_amount: 384,
        quantity: 1,
        permission: "Points(5000)",
        category: "2 man (ASE)",
    },
    {
        id: 6,
        name: "10000 Points (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6c18927e81b3b41c5973976c7c6feaf6a8c10616.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>10 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 5.98,
        unit_amount: 598,
        permission: "Points(10000)",

        quantity: 1,
        category: "2 man (ASE)",
    },
    {
        id: 7,
        name: "18000 Points (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/f06440cf4d764988c6f672fc831c79d76a71f218.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>18 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 9.98,
        unit_amount: 998,
        quantity: 1,
        permission: "Points(1800)",

        category: "2 man (ASE)",
    },
    {
        id: 8,
        name: "35000 Points (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8d4b4a2df220c44f64e374f30b98915987386086.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>35 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 17.98,
        unit_amount: 1798,
        permission: "Points(35000)",

        quantity: 1,
        category: "2 man (ASE)",
    },
    {
        id: 9,
        name: "50000 Points (2 MAN ASE)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8ac499b2f6732085ad14674a7d309e7f95f08fe6.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>50 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 25.68,
        unit_amount: 2568,
        permission: "Points(50000)",

        quantity: 1,
        category: "2 man (ASE)",
    },
    {
        id: 10,
        name: "100000 Points (2 MAN ASE)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1255559168400818187/100000pointsbox.png?ex=667d9218&is=667c4098&hm=5b30b67ec9b5510a70c47fb2915b09236edde9893217cf1670ddded519f18840&",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p><span style="color:rgb(250,197,28);"><strong>100 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p>
                    </div>`,
        price: 48.0,
        unit_amount: 4800,
        quantity: 1,
        permission: "Points(100000)",

        category: "2 man (ASE)",
    },

    {
        id: 2,
        name: "VIP Ascendant (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/5213357359e3c61e3e3afeaa78ad963432f02f80.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p>The <span style="color:rgb(26,188,156);">VIP_Ascendant</span> will give you:</p><p>- 120 000 points</p><p>- More interval in game (50 default ----&gt; 300) per 15 min<br><br>-20% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <strong><span style="color:rgb(26,188,156);">Ascendant VIP</span></strong><br><br><strong><span style="color:rgb(26,188,156);">-Unlimited Dino color command&nbsp;</span></strong><br><br>-Chest skin<br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br></p>
                    </div>`,
        price: 99.98,
        unit_amount: 9998,
        quantity: 1,
        permission: "Points(VIPAscendant)",
        category: "4 man (ASA)",
    },
    {
        id: 3,
        name: "VIP Mastercraft (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6dbf999a4001c26601a1f78a4c75a37f28157a8d.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p>The <span style="color:rgb(250,197,28);">VIP Mastercraft&nbsp;</span>will give you:</p><p>- 60 000 points</p><p>- More interval in game (25 default ----&gt; 90) per 15 min<br><br>-10% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <span style="color:rgb(250,197,28);">Mastercraft VIP&nbsp;</span><br><br>-Unlimited dino color<br><br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br></p>
                    </div>`,
        price: 39.98,
        unit_amount: 3998,
        quantity: 1,
        permission: "Points(VIPMastercraft)",
        category: "4 man (ASA)",
    },
    {
        id: 4,
        name: "VIP Journeyman (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/64581f38011f38e6c562022e7bd94fefcbd2f9d0.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p>The <span style="color:rgb(85,57,130);">VIP_Journeyman&nbsp;</span>will give you:</p><p>- 25 000 points</p><p>- More interval in game (25 default ----&gt; 50) per 15 min<br><br>-5% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <span style="color:rgb(85,57,130);">VIPJourneyman</span><br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br></p>
                    </div>`,
        price: 19.99,
        unit_amount: 1999,
        quantity: 1,
        permission: "Points(VIPJourneyman)",
        category: "4 man (ASA)",
    },
    {
        id: 11,
        name: "Free Box 600 points (4 MAN ASA)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1260407765101187193/box_free.png?ex=668f35b4&is=668de434&hm=4428e7dba83d712e569b6ecad8cf662679f2b117b35d13894c76662b02f76d1e&",
        description: `<div class="mt-5">
<p>600 free points </p>                    </div>`,
        price: 0,
        unit_amount: 0,
        quantity: 1,
        permission: "Points(free)",
        category: "4 man (ASA)",
    },
    {
        id: 5,
        name: "5000 Points (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6272e0e0cd4dca7cf0311852cf8e3d797510dd35.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>5 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 3.84,
        unit_amount: 384,
        quantity: 1,
        permission: "Points(5000)",

        category: "4 man (ASA)",
    },
    {
        id: 6,
        name: "10000 Points (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6c18927e81b3b41c5973976c7c6feaf6a8c10616.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>10 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 5.98,
        unit_amount: 598,
        quantity: 1,
        permission: "Points(10000)",

        category: "4 man (ASA)",
    },
    {
        id: 7,
        name: "18000 Points (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/f06440cf4d764988c6f672fc831c79d76a71f218.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>18 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 9.98,
        unit_amount: 998,
        permission: "Points(18000)",

        quantity: 1,
        category: "4 man (ASA)",
    },
    {
        id: 8,
        name: "35000 Points (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8d4b4a2df220c44f64e374f30b98915987386086.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>35 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 17.98,
        unit_amount: 1798,
        quantity: 1,
        permission: "Points(35000)",

        category: "4 man (ASA)",
    },
    {
        id: 9,
        name: "50000 Points (4 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8ac499b2f6732085ad14674a7d309e7f95f08fe6.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>50 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 25.68,
        unit_amount: 2568,
        permission: "Points(50000)",
        quantity: 1,
        category: "4 man (ASA)",
    },
    {
        id: 10,
        name: "100000 Points (4 MAN ASA)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1255559168400818187/100000pointsbox.png?ex=667d9218&is=667c4098&hm=5b30b67ec9b5510a70c47fb2915b09236edde9893217cf1670ddded519f18840&",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>100 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 48.0,
        unit_amount: 4800,
        permission: "Points(100000)",
        quantity: 1,
        category: "4 man (ASA)",
    },

    {
        id: 2,
        name: "VIP Ascendant (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/5213357359e3c61e3e3afeaa78ad963432f02f80.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p>The <span style="color:rgb(26,188,156);">VIP_Ascendant</span> will give you:</p><p>- 120 000 points</p><p>- More interval in game (50 default ----&gt; 300) per 15 min<br><br>-20% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <strong><span style="color:rgb(26,188,156);">Ascendant VIP</span></strong><br><br><strong><span style="color:rgb(26,188,156);">-Unlimited Dino color command&nbsp;</span></strong><br><br>-Chest skin<br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br></p>
                    </div>`,
        price: 99.98,
        unit_amount: 9998,
        quantity: 1,
        permission: "Points(VIPAscendant)",
        category: "2 man (ASA)",
    },
    {
        id: 3,
        name: "VIP Mastercraft (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6dbf999a4001c26601a1f78a4c75a37f28157a8d.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p>The <span style="color:rgb(250,197,28);">VIP Mastercraft&nbsp;</span>will give you:</p><p>- 60 000 points</p><p>- More interval in game (25 default ----&gt; 90) per 15 min<br><br>-10% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <span style="color:rgb(250,197,28);">Mastercraft VIP&nbsp;</span><br><br>-Unlimited dino color<br><br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br></p>
                    </div>`,
        price: 39.98,
        unit_amount: 3998,
        quantity: 1,
        permission: "Points(VIPMastercraft)",
        category: "2 man (ASA)",
    },
    {
        id: 4,
        name: "VIP Journeyman (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/64581f38011f38e6c562022e7bd94fefcbd2f9d0.png",
        description: `<div class="mt-5">
                        <h4>Description</h4>
                        <p>The <span style="color:rgb(85,57,130);">VIP_Journeyman&nbsp;</span>will give you:</p><p>- 25 000 points</p><p>- More interval in game (25 default ----&gt; 50) per 15 min<br><br>-5% discount IN GAME SHOP on all</p><p>- Exclusive Kit (details below)</p><p>- New role on Discord <span style="color:rgb(85,57,130);">VIPJourneyman</span><br><br>Kits:<br>Kits boss:<br>All artefact/tribute for boss<br><br>Kits Uitilites<br>(blueprint parachute, arrow, bolas)<br><br></p>
                    </div>`,
        price: 19.99,
        unit_amount: 1999,
        quantity: 1,
        permission: "Points(VIPJourneyman)",
        category: "2 man (ASA)",
    },
    {
        id: 11,
        name: "Free Box 600 points (2 MAN ASA)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1260407765101187193/box_free.png?ex=668f35b4&is=668de434&hm=4428e7dba83d712e569b6ecad8cf662679f2b117b35d13894c76662b02f76d1e&",
        description: `<div class="mt-5">
<p>600 free points </p>                    </div>`,
        price: 0,
        unit_amount: 0,
        quantity: 1,
        permission: "Points(free)",
        category: "2 man (ASA)",
    },
    {
        id: 5,
        name: "5000 Points (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6272e0e0cd4dca7cf0311852cf8e3d797510dd35.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>5 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 3.84,
        unit_amount: 384,
        quantity: 1,
        permission: "Points(5000)",

        category: "2 man (ASA)",
    },
    {
        id: 6,
        name: "10000 Points (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/6c18927e81b3b41c5973976c7c6feaf6a8c10616.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>10 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 5.98,
        unit_amount: 598,
        quantity: 1,
        permission: "Points(10000)",

        category: "2 man (ASA)",
    },
    {
        id: 7,
        name: "18000 Points (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/f06440cf4d764988c6f672fc831c79d76a71f218.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>18 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 9.98,
        unit_amount: 998,
        permission: "Points(18000)",

        quantity: 1,
        category: "2 man (ASA)",
    },
    {
        id: 8,
        name: "35000 Points (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8d4b4a2df220c44f64e374f30b98915987386086.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>35 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 17.98,
        unit_amount: 1798,
        quantity: 1,
        permission: "Points(35000)",

        category: "2 man (ASA)",
    },
    {
        id: 9,
        name: "50000 Points (2 MAN ASA)",
        image: "//dunb17ur4ymx4.cloudfront.net/packages/images/8ac499b2f6732085ad14674a7d309e7f95f08fe6.png",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>50 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 25.68,
        unit_amount: 2568,
        permission: "Points(50000)",
        quantity: 1,
        category: "2 man (ASA)",
    },
    {
        id: 10,
        name: "100000 Points (2 MAN ASA)",
        image: "https://cdn.discordapp.com/attachments/1144262372463214603/1255559168400818187/100000pointsbox.png?ex=667d9218&is=667c4098&hm=5b30b67ec9b5510a70c47fb2915b09236edde9893217cf1670ddded519f18840&",
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>100 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 48.0,
        unit_amount: 4800,
        permission: "Points(100000)",
        quantity: 1,
        category: "2 man (ASA)",
    },
]);

const selectedCategory = ref("4 man (ASE)");

const filteredItems = computed(() => {
    return items.value.filter(
        (item) => item.category === selectedCategory.value
    );
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
            selectedCategory.value = "4 man (ASA)";
            break;
        case "4":
            selectedCategory.value = "2 man (ASA)";
            break;
        default:
            selectedCategory.value = "4 man (ASE)";
    }
};

const addToCart = (item) => {
    cartStore.addToCart(item);
};

const removeFromCart = (index) => {
    cartStore.removeFromCart(index);
};
const closeDrawer = () => {
    openDrawerId.value = null;
};
const showDrawer = (id) => {
    openDrawerId.value = id;
};
const isDrawerOpen = (id) => {
    return openDrawerId.value === id;
};
const checkout = (item) => {
    window.location.href = item.link;
};
</script>

<style scoped>
@import "../assets/variables/variables.scss";

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
:where(.css-dev-only-do-not-override-16pw25h).ant-menu-light {
    background: transparent;
}
.badge {
    position: absolute;
    right: -5rem;
    top: 50%;
    transform: translate(-50%, -50%);
}
:where(.css-dev-only-do-not-override-16pw25h).ant-btn-primary {
    background-color: #0b965d !important;
}
:where(.css-16pw25h).ant-btn-primary {
    background-color: #0b965d !important;
}
.cartImage {
    width: 35px;
    margin-right: 1rem;
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
    :where(.css-dev-only-do-not-override-16pw25h).ant-tabs
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
