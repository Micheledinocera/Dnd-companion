<template>
  <div class="home">
    <h1>Home</h1>
  </div>
  <router-view />
</template>

<script lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";
import { User } from "@/model/User";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      const user = store.getters.getUser as User;
      store.dispatch("bindOwnedCampagne", user.uid);
      store.dispatch("bindPlayerCampagne", user.uid);
    });

    return {};
  },
};
</script>

<style lang="less" src="./Home.less" scoped></style>
