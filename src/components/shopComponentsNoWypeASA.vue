<template>
    <a-layout style="min-height: 100vh">
        <a-layout>
            <a-layout-header class="header">
                <div class="logocontainer">
                    <img class="logo" :src="wakLogo" alt="" />
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
                    <a-menu-item key="2">
                        <a href="/shop">Shop</a>
                    </a-menu-item>
                    <a-menu-item @click="router.push('/selectServer')" key="3"
                        >Leaderboard</a-menu-item
                    >
                </a-menu>
            </a-layout-header>
            <a-layout-content class="content-card" style="margin: 24px 16px 0">
                <h1>WAK ASA NO WIPE</h1>

                <video class="bgVideo" preload="true" autoplay loop muted>
                    <source src="../assets/bg.mp4" type="video/mp4" />
                    <source src="../assets/bg.mp4" type="video/ogv" />
                    <source src="../assets/bg.mp4" type="video/webm" />
                </video>

                <a-card
                    v-for="item in items"
                    :key="item.id"
                    class="card"
                    hoverable
                    :title="item.name"
                    data-tilt
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
                        style="color: #045762"
                        :title="item.name"
                        placement="right"
                        size="large"
                        @close="closeDrawer"
                    >
                        <div v-html="item.description"></div>
                    </a-drawer>
                    <div class="addCart">
                        <a-button
                            type="primary"
                            class="btn"
                            @click="showDrawer(item.id)"
                            >Détails</a-button
                        >

                        <a-button
                            type="primary"
                            class="btn"
                            @click="addToCart(item)"
                            >CHECKOUT</a-button
                        >
                    </div>
                </a-card>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useCartStore } from "../stores/cartStore";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import { loadStripe } from "@stripe/stripe-js";
import router from "../router/index";
import masterCraft30Days from "../assets/vipmastercrafts.png";
import journeyman30Days from "../assets/vipjourneymans.png";
import battlepass from "../assets/battlepass.png";
import ascendant30Days from "../assets/vipascendants.png";
import box5k from "../assets/pointsbox5k.png";
import box10k from "../assets/pointsbox10k.png";
import box18k from "../assets/pointsbox18k.png";
import box35k from "../assets/pointsbox35k.png";
import box50k from "../assets/pointsbox50k.png";
import box100k from "../assets/pointsbox100k.png";

import { useMouseInElement } from "@vueuse/core";
import VanillaTilt from "vanilla-tilt";

const element = ref(null);

onMounted(() => {
    VanillaTilt.init(element.value, { max: 20, speed: 400 });
});
import wakLogo from "../assets/wakLogoWhite.png";
const target = ref(null);
const stripePromise = loadStripe(
    "pk_live_51PVGXYGgFReHIOcrv4QtRLu7YLuvQaxOn48QJDSPsO1k9SEDRHtBseV3Zd8JRPEN2h1CzcqFALr0Ojfkn33ri0Xr00sBti3HPb"
);
const openDrawerId = ref(null);
const cartStore = useCartStore();
const { elementX, elementY, isOutside, elementHeight, elementWidth } =
    useMouseInElement(target);
const cartTransform = computed(() => {
    const MAX_ROTATION = 6;
    const rX = (
        MAX_ROTATION / 2 -
        (elementY.value / elementHeight.value) * MAX_ROTATION -
        MAX_ROTATION / 2
    ).toFixed(2);
    const rY = (
        MAX_ROTATION / 2 -
        (elementX.value / elementWidth.value) * MAX_ROTATION -
        MAX_ROTATION / 2
    ).toFixed(2);

    return isOutside.value
        ? ""
        : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
});
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
        name: "BATTLEPASS (NO WIPE ASA)",
        image: battlepass,
        description: `<div class="mt-5">
                        <h4> <strong style="color:rgb(244, 43, 43); font-size: 2rem"> DESCRIPTION </strong></h4><br><br><span style="color:rgb(244, 43, 43);">BATTLEPASS</span><br><br> 
                        <p>
                        <strong><span style="color:rgb(244, 43, 43)">FREENIUM BONUS</span></strong> <br> <br>
                        5900 PTS <br><br>  argentavis saddle <br><br> ressources loot box x4 <br><br> 500 elements <br><br> 200 black pearl <br><br> 200 c4<br><br> journeyman box x 1<br><br>  mastercraft Lootbox x 2 <br><br> random dinos box x 1<br><br>
                        <strong><span style="color:rgb(244, 43, 43)">PRENIUM BONUS</span></strong> <br> <br>

16000 PTS<br><br> Ptera saddle <br><br> argentavis saddle <br><br> ressources loot box x5 <br><br> flak lootbox x 1 <br><br>  1200 elements<br><br>  500 black pearl<br><br> journeyman box x 1<br><br> mastercraft Lootbox x 2<br><br>  random dinos box x 2<br><br> ascendant box x 1<br><br>
                       </div>`,
        price: 9.99,
        unit_amount: 999,
        quantity: 1,
        permission: "Points(BattlePass)",
        category: "NO WIPE (ASA)",
    },
    {
        id: 2,
        name: "VIP Ascendant (NO WIPE ASA)",
        image: ascendant30Days,
        description: `<div class="mt-5">
                        <h4> <strong style="color:rgb(26,188,156); font-size: 2rem"> DESCRIPTION </strong></h4><br><br><p>- 100 000 Points</p><p>- New role on Discord <strong><span style="color:rgb(26,188,156);">Ascendant VIP</span></strong><br><br> 
                        <p>
                        <p><strong>4 Ascendant Lootbox (unlock after 48h) </strong></p> <br>
                        <p><strong>infinite /sdc</strong> </p> <br>
                        <p><strong>120 points per 15mins (30 default)</strong></p> <br>
                        <p><strong>discount in ingame shop: 15% </strong></p> <br> <br>

                        <strong><span>COMMAND IN GAME</span></strong> <br> <br>

<strong><span style="color:rgb(26,188,156);">Neuter AOE: /neuteroae</strong><br> 
CD : Ascendant : 15min - Range : 2000<br><br> 

<strong><span style="color:rgb(26,188,156);">grow AOE: /growaoe</strong><br> 
CD : Ascendant : 1day - 30%<br><br> 


<strong><span style="color:rgb(26,188,156);">Imprint AOE: /imprintoae</strong> <br> 
CD : Ascendant : 1h - 30%<br><br> 

<strong><span style="color:rgb(26,188,156);">Claim Babies: /claimbabies</strong><br> 
CD : Ascendant : 15min - Range : 2000<br><br> 


<strong><span style="color:rgb(26,188,156);">CryoBabies: /cryobabie</strong><br> 
CD : Ascendant : 15min - Range : 2000 <br><br>

<strong><span style="color:rgb(26,188,156);">Reset Breading: /reset</strong> <br> 
CD : Ascendant : 2J - Range : 2000<br><br> 


<strong><span style="color:rgb(26,188,156);">WakeAOE: /wake</strong><br> 
CD : Ascendant : 2min - Range : 2000<br><br> 
 </p>
                    </div>`,
        price: 99.99,
        unit_amount: 9999,
        quantity: 1,
        permission: "Points(VIPAscendant)",
        category: "NO WIPE (ASA)",
    },
    {
        id: 3,
        name: "VIP Mastercraft (NO WIPE ASA)",
        image: masterCraft30Days,
        description: `<div class="mt-5">
                        <h4> <strong style="color:rgb(250,197,28); font-size: 2rem"> DESCRIPTION </strong></h4><br><br><p>- 50 000 Points</p><p>- New role on Discord <strong><span style="color:rgb(250,197,28);">Mastercraft VIP</span></strong><br><br> 
                        <p>
                                                <p><strong>4 Mastercraft Lootbox (unlock after 48h) </strong></p> <br>
                        <p><strong>infinite /sdc</strong> </p> <br>
                        <p><strong>90 points per 15mins (30 default)</strong></p> <br>
                        <p><strong>discount in ingame shop: 10% </strong></p> <br> <br>
                        <strong><span>COMMAND IN GAME</span></strong> <br> <br>

<strong><span style="color:rgb(250,197,28);">Neuter AOE: /neuteroae</strong><br> 
CD : Mastercraft : 15min - Range : 2000<br><br> 

<strong><span style="color:rgb(250,197,28);">grow AOE: /growaoe</strong><br> 
CD : Mastercraft : 1day - 20%<br><br> 


<strong><span style="color:rgb(250,197,28);">Imprint AOE: /imprintoae</strong> <br> 
CD : Mastercraft : 1h - 20%<br><br> 

<strong><span style="color:rgb(250,197,28);">Claim Babies: /claimbabies</strong><br> 
CD : Mastercraft : 15min - Range : 1700<br><br> 


<strong><span style="color:rgb(250,197,28);">CryoBabies: /cryobabie</strong><br> 
CD : Mastercraft : 15min - Range : 1700 <br><br>

<strong><span style="color:rgb(250,197,28);">Reset Breading: /reset</strong> <br> 
CD : Mastercraft : 3J - Range : 2000<br><br> 


<strong><span style="color:rgb(250,197,28);">WakeAOE: /wake</strong><br> 
CD : Mastercraft : 2min - Range : 1700<br><br> 
 </p>
                    </div>`,
        price: 39.99,
        unit_amount: 3999,
        quantity: 1,
        permission: "Points(VIPMastercraft)",
        category: "NO WIPE (ASA)",
    },
    {
        id: 4,
        name: "VIP Journeyman (NO WIPE ASA)",
        image: journeyman30Days,
        description: `
        <div class="mt-5">
                        <h4> <strong style="color:rgb(85,57,130); font-size: 2rem"> DESCRIPTION </strong></h4><br><br><p>- 20 000 Points</p><p>- New role on Discord <strong><span style="color:rgb(85,57,130);">Journeyman VIP</span></strong><br><br> 
                        <p>
                        <p><strong>4 Journeyman Lootbox (unlock after 48h) </strong></p> <br>
                        <p><strong>infinite /sdc</strong> </p> <br>
                        <p><strong>60 points per 15mins (30 default)</strong></p> <br>
                        <p><strong>discount in ingame shop: 5% </strong></p> <br> <br>
                        <strong><span>COMMAND IN GAME</span></strong> <br> <br>
                        <strong><span>COMMAND IN GAME</span></strong> <br> <br>

<strong><span style="color:rgb(85,57,130);">Neuter AOE: /neuteroae</strong><br> 
CD : Journeyman : 15min - Range : 2000<br><br> 

<strong><span style="color:rgb(85,57,130);">grow AOE: /growaoe</strong><br> 
CD : Journeyman : 1day - 15%<br><br> 


<strong><span style="color:rgb(85,57,130);">Imprint AOE: /imprintoae</strong> <br> 
CD : Journeyman : 1h - 15%<br><br> 

<strong><span style="color:rgb(85,57,130);">Claim Babies: /claimbabies</strong><br> 
CD : Journeyman : 15min - Range : 1200<br><br> 


<strong><span style="color:rgb(85,57,130);">CryoBabies: /cryobabie</strong><br> 
CD : Journeyman : 15min - Range : 1200 <br><br>

<strong><span style="color:rgb(85,57,130);">Reset Breading: /reset</strong> <br> 
CD : Journeyman : 4J - Range : 2000<br><br> 


<strong><span style="color:rgb(85,57,130);">WakeAOE: /wake</strong><br> 
CD : Journeyman : 2min - Range : 1200<br><br> 
 </p>
                    </div>`,
        price: 19.99,
        unit_amount: 1999,
        quantity: 1,
        permission: "Points(VIPJourneyman)",
        category: "NO WIPE (ASA)",
    },

    {
        id: 5,
        name: "5000 Points (NO WIPE ASA)",
        image: box5k,
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>5 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 4.99,
        unit_amount: 499,
        quantity: 1,
        permission: "Points(5000)",

        category: "NO WIPE (ASA)",
    },
    {
        id: 6,
        name: "10000 Points (NO WIPE ASA)",
        image: box10k,
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>10 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 9.99,
        unit_amount: 999,
        quantity: 1,
        permission: "Points(10000)",

        category: "NO WIPE (ASA)",
    },
    {
        id: 7,
        name: "18000 Points (NO WIPE ASA)",
        image: box18k,
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>18 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 16.99,
        unit_amount: 1699,
        permission: "Points(18000)",

        quantity: 1,
        category: "NO WIPE (ASA)",
    },
    {
        id: 8,
        name: "35000 Points (NO WIPE ASA)",
        image: box35k,
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>35 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 29.99,
        unit_amount: 2999,
        quantity: 1,
        permission: "Points(35000)",

        category: "NO WIPE (ASA)",
    },
    {
        id: 9,
        name: "50000 Points (NO WIPE ASA)",
        image: box50k,
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>50 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 39.99,
        unit_amount: 3999,
        permission: "Points(50000)",
        quantity: 1,
        category: "NO WIPE (ASA)",
    },
    {
        id: 10,
        name: "100000 Points (NO WIPE ASA)",
        image: box100k,
        description:
            '<div class="mt-5"><h4>Description</h4><p><span style="color:rgb(250,197,28);"><strong>100 000 points for use in the shop !</strong></span><br><br><strong><u><strong><u>- <span style="color:rgb(243,121,52);">Contributor</span> role for life on discord</u></strong></u></strong></p><p><br></p></div>',
        price: 74.99,
        unit_amount: 7499,
        permission: "Points(100000)",
        quantity: 1,
        category: "NO WIPE (ASA)",
    },
]);

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
    redirectToCheckout(cartStore.cartItems);
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
onMounted(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        VanillaTilt.init(card, { max: 25, speed: 400 });
    });
});
</script>

<style lang="scss" scoped>
@import "../assets/variables/variables.scss";
.logocontainer {
    height: 50px;
    padding-left: 0rem;
    margin-bottom: 30px;
    margin-top: 10px;
}
.logo {
    height: 50px;
    margin-bottom: 30px;
    margin-top: 10px;
}
.btn {
    background: #0b965d !important;
}
.removeBtn {
    color: rgb(244, 43, 43);
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
    overflow: hidden;
    position: relative;
    margin: 0 !important;
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
    margin: 0 auto;
    width: 70%;
}
.card {
    z-index: 2;
    margin: 10px;
    width: 22%;
    transform: v-bind(cartTransform);
    transition: transform 0.25s ease-out;
    background-image: url(../assets/bgcard.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    color: white;
}

:where(.css-16pw25h).ant-menu-light {
    background: transparent;
}
h1 {
    width: 100%;
    color: white;
    z-index: 10;
    font-size: 5rem;
    text-align: center;
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
.bgVideo {
    position: absolute;
    z-index: 1;
    transform: scale(3);
}
.bgDeux {
    top: 310px;
}
.header {
    z-index: 2;
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
