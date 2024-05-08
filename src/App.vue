<template>
    <div class="background">
      <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>


<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/gh/jgthms/minireset.css@master/minireset.min.css");
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.background{
  background: white;
  height: 100vh;
  margin: 0;
  padding: 0
}
*{
  font-family: "Roboto", sans-serif;
}
</style>