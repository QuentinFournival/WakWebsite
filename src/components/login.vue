<template>
    <div class="bg">
        <div class="rec"></div>
        <div class="fenetre">
            <div class="gauche">
                <div class="image"><img :src="WakLogo" alt="" /></div>
                <div class="respon"></div>
            </div>
            <div class="contenaire-droit">
                <form>
                    <div class="input-field">
                        <input
                            required
                            name="username"
                            id="username"
                            type="text"
                            placeholder=" "
                            v-model="username"
                        />
                        <label for="Email"> Nom d'utilisateur </label>
                    </div>
                    <div class="input-field">
                        <input
                            required
                            name="Password"
                            id="pass"
                            type="password"
                            v-model="password"
                            placeholder=" "
                        />
                        <label for="pass"> Mot de passe </label>
                    </div>

                    <div class="container-button">
                        <a @click="handleLogin" type="submit" id="submit">
                            Connexion
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import WakLogo from "../assets/wakLogoWhite.png";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
    if (
        username.value === authStore.username &&
        password.value === authStore.password
    ) {
        await authStore.authentified(true);
        router.push("/leaderboardAdmin");
    } else {
        alert("Identifiants incorrects. Veuillez réessayer.");
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/variables/variables.scss";

//-----LESS:    width: ~"calc(50% - 20px)";
//-----CSS:    width: calc(50% - 20px);

header,
section,
footer,
aside,
nav,
main,
article,
figure {
    display: block;
}

div,
header,
nav,
article,
section,
aside,
footer,
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
ul,
li,
figure,
figcaption,
class,
img {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

html,
body {
    height: 100%;
    border: 0 solid transparent;
    font-size: 16px;
    margin: 0px !important;
    min-height: 100%;
    padding: 0;
    width: 100%;
    display: block;
    font-family: "Roboto", sans-serif;
}

img,
object,
embed,
canvas,
video,
audio,
picture,
svg {
    max-width: 100%;
    height: auto;
}

img {
    display: block;
}

a {
    text-decoration: none;
    color: black;
}

/* ------------------------------- RECURENTES -- */
//------ .clear pour LESS
.clear {
    display: block;
    zoom: 1;

    &:after {
        content: " ";
        display: block;
        font-size: 0;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}

.center {
    width: 960px;
    margin: 0 auto;
}

/* ------------------------------- END RECURENTES -- */

.bg {
    width: 100%;
    height: 100vh;
    background: black;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .rec {
        position: absolute;
        transform: rotate(30deg);
        left: 42%;
        height: 200vh;
        width: 150%;
        top: 200px;
        z-index: 20;
        background-color: $color-side;
    }

    .fenetre {
        width: 80%;
        height: 80%;
        z-index: 50 !important;
        box-shadow: 0px 0px 86px -9px rgba(255, 255, 255, 0.8);
        overflow: hidden;
        position: relative;
        display: flex;
        flex-wrap: wrap;

        .gauche {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .image {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                border-radius: 100%;
                width: 50%;
                height: 45%;
                img {
                    width: 80%;
                    height: 100%;
                    object-fit: contain;
                    transform: translate(-4%, 3%);
                }
            }
        }
        .contenaire-droit {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
            position: relative;

            form {
                width: 100%;
                height: 100%;
                z-index: 40;
                position: relative;

                .input-field {
                    position: relative;
                    top: 50%;
                    left: 70%;
                    transform: translate(-50%, -50%);
                    input {
                        z-index: 50;
                        width: 60%;
                        height: 30px;
                        background: transparent;
                        border: none;
                        border-bottom: solid 1px white;
                        margin-bottom: 30px;
                        outline: none;
                        color: white;
                        font-size: 18px;
                        font-weight: normal;
                    }
                    label {
                        color: white;
                        font-size: 15px;
                        text-transform: uppercase;
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: bold;
                        position: absolute;
                        letter-spacing: 2px;
                        left: 10px;
                        transition: all 0.2s ease-out;
                        color: white;
                    }
                }
                .container-button {
                    position: relative;
                    top: 52%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    a {
                        background: $btn-login;
                        padding: 5px 80px;
                        font-size: 20px;
                        color: $bg;
                        z-index: 80;
                        position: absolute;
                        outline: none;
                        border: none;
                        font-weight: 500;
                        right: 48%;
                        bottom: 0%;
                        transform: translate(50%, 50%);
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.container-button {
    display: flex;
    justify-content: flex-end;
    .buttn-supp {
        position: relative;
        background-color: $color-btn-popup-oui;
        appearance: none;
        border: none;
        color: white;
        top: 20px;
        right: 0px;
        font-weight: 300;
        margin: 10px;
        letter-spacing: 2px;
        padding: 5px 10px;
        font-size: 12px;
        text-transform: uppercase;
        outline: none;
        cursor: pointer;

        &:nth-child(2) {
            background-color: $color-btn-popup-non;
        }
    }
}
.mdp {
    position: absolute;
    bottom: 38%;
    right: 20%;
    cursor: pointer;
    color: white;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px $bg-login inset !important;
}
input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
}
app-error {
    font-size: 1em;
    margin-bottom: 1%;
    margin-right: 1%;
}
input:focus + label {
    transform: translate(-5%, -90%);
    font-size: 12px !important;
    color: #fdedea !important;
}

input:focus + label,
input:not(:placeholder-shown) + label {
    transform: translate(-5%, -90%);
    font-size: 12px !important;
    color: #fdedea !important;
}

/* ------------------------ MEDIA QUERIES 960px ---- */

@media screen and (max-width: 1650px) {
    .mdp {
        right: 14%;
    }
    .bg .fenetre .contenaire-droit form .input-field {
        left: 76%;
    }
    .bg .fenetre .contenaire-droit form .container-button button {
        right: 45%;
    }
}
@media screen and (max-width: 1420px) {
    .bg .rec {
        left: 40%;
        width: 170%;
    }
}
@media screen and (max-width: 1330px) {
    .bg .fenetre {
        height: 60%;
    }
    .bg .rec {
        left: 35%;
        width: 170%;
    }
    img {
        transform: scale(0.7);
    }
    .bg .fenetre .contenaire-droit form .container-button button {
        font-size: 16px;
        padding: 5px 70px;
    }

    .bg .fenetre .contenaire-droit form .input-field label {
        font-size: 13px;
    }
}
@media screen and (max-width: 1120px) {
    .bg .fenetre {
        height: 60%;
    }
}
@media screen and (max-width: 1080px) {
    .bg .rec {
        left: 30%;
    }
}

@media screen and (max-width: 950px) {
    .bg .fenetre {
        height: 45%;
    }
    .bg .rec {
        width: 200%;
    }
}

@media screen and (max-width: 900px) {
    .mdp {
        bottom: 17% !important;
        right: 19% !important;
    }
    .bg .rec {
        left: -580px;
        transform: rotate(12deg);
        top: 370px;
    }
    .bg .fenetre {
        height: 80%;
        width: 60%;
    }
    .bg .fenetre .contenaire-droit {
        width: 100%;
        height: 50%;
        margin-top: -140px;
    }
    .bg .fenetre .gauche {
        width: 100%;
        height: 50%;
    }
    .bg .fenetre .contenaire-droit form .input-field {
        left: 71%;
    }
    .bg .fenetre .contenaire-droit form .container-button {
        left: 46%;
        margin-top: 10px;
    }
    .bg .fenetre .contenaire-droit form .input-field label {
        font-size: 15px;
    }
    .bg .fenetre .contenaire-droit form .container-button button {
        font-size: 16px;
        padding: 5px 70px;
    }
}

@media screen and (max-width: 740px) {
    .bg .fenetre .contenaire-droit {
        margin-top: -160px;
    }
}
@media screen and (max-width: 560px) {
    .mdp {
        right: 11% !important;
    }
    .bg .rec {
        top: 370px;
    }
    .bg .fenetre .contenaire-droit form .input-field label {
        font-size: 12px;
    }
    .bg .fenetre .contenaire-droit form .input-field {
        left: 61%;
    }
    .bg .fenetre .contenaire-droit form .input-field input {
        width: 78%;
        font-size: 14px;
    }
    .bg .fenetre .contenaire-droit form .container-button button {
        font-size: 15px;
        padding: 5px 60px;
    }
    .bg .fenetre .contenaire-droit form .container-button {
        left: 46%;
        margin-top: 0px;
    }

    img {
        transform: scale(0.8);
    }
}
@media screen and (max-width: 500px) {
    .bg .rec {
        left: -340px;
        top: 400px;
    }
    .bg .fenetre .gauche img {
        display: none;
    }
    .bg .fenetre .gauche {
        width: 100%;
        position: relative;
    }
    .bg .fenetre .gauche .respon {
        height: 181px;
        width: 103px;
        background-image: url(../../assets/img/logo-respon.png);
        position: absolute;
        background-size: contain;
        background-repeat: no-repeat;
        transform: scale(1.2);
    }
}
@media screen and (max-width: 470px) {
    .bg .fenetre .contenaire-droit form .container-button button {
        font-size: 13px;
        padding: 5px 40px;
    }
}

@media screen and (max-height: 830px) {
    .mdp {
        bottom: 36%;
    }
}
@media screen and (max-height: 800px) {
    .bg .fenetre button {
        bottom: 30%;
    }
}

@media screen and (max-height: 730px) {
    .mdp {
        bottom: 34%;
    }
    .bg .rec {
        top: 330px;
        width: 180%;
    }
    .bg .fenetre .contenaire-droit form .container-button {
        top: 54%;
    }
}
@media screen and (max-height: 640px) {
    .mdp {
        bottom: 32%;
    }
}
@media (max-height: 860px) and (max-width: 1330px) {
    .mdp {
        bottom: 33%;
    }
}
@media (max-height: 800px) and (max-width: 1330px) {
    .mdp {
        bottom: 30%;
    }
}
@media (max-height: 800px) and (max-width: 950px) {
    .mdp {
        bottom: 26%;
    }
}
@media (max-height: 700px) and (max-width: 1330px) {
    .mdp {
        bottom: 28%;
    }
}

@media (max-height: 730px) and (max-width: 1340px) {
    .bg .rec {
        width: 200%;
    }
}
@media (max-height: 730px) and (max-width: 1080px) {
    .bg .rec {
        width: 250%;
    }
}
@media (max-height: 730px) and (max-width: 900px) {
    .bg .rec {
        width: 180%;
    }
}
@media (max-height: 730px) and (max-width: 660px) {
    .bg .rec {
        top: 290px;
        width: 200%;
    }
}

@media (max-height: 730px) and (max-width: 500px) {
    .bg .rec {
        top: 350px;
    }
}

@media (max-height: 600px) and (max-width: 1200px) {
    .bg .rec {
        top: 290px;
    }
    .bg .fenetre .contenaire-droit form .container-button button {
        font-size: 13px;
        padding: 5px 40px;
    }
}
@media (max-height: 600px) and (max-width: 1090px) {
    .bg .rec {
        top: 300px;
        left: 35%;
    }
}
@media (max-height: 670px) and (max-width: 900px) {
    .bg .rec {
        top: 320px;
        transform: rotate(0deg);
        left: 0%;
    }
}
@media (max-height: 620px) and (max-width: 500px) {
    .bg .rec {
        top: 300px;
        transform: rotate(0deg);
        left: 0%;
    }
}
</style>

<script lang="ts">
export default {
    name: "login",
};
</script>
