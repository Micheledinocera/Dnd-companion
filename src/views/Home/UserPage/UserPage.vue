<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div class="list-container owner" v-if="ownedCampagne?.length > 0">
      <div class="title">Le campagne in cui sei Master</div>
      <div class="list">
        <div
          class="list-item"
          v-for="(campagna, index) in ownedCampagne"
          :key="campagna.name + index"
          @click="() => selectCampagna(campagna)"
        >
          {{ campagna.name }}
        </div>
      </div>
    </div>
    <div class="add" @click="addCasa">Aggiungi una casa</div>

    <div class="list-container owner" v-if="playerCampagne?.length > 0">
      <div class="title">Le campagne in cui sei PLayer</div>
      <div class="list">
        <div
          class="list-item"
          v-for="(campagna, index) in playerCampagne"
          :key="campagna.name + index"
          @click="() => selectCampagna(campagna)"
        >
          {{ campagna.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ComputedRef } from "vue";
import { Campagna } from "@/model/Campagna";
// import { Transaction } from "@firebase/firestore";
import { useRouter } from "vue-router";
import { RouterNames } from "@/router/RouterNames";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const ownedCampagne: ComputedRef<Campagna[]> = computed(
      () => store.getters.getOwnedCampagne
    );
    const playerCampagne: ComputedRef<Campagna[]> = computed(
      () => store.getters.getPlayerCampagne
    );

    const selectCampagna = async (campagna: Campagna) => {
      await store.dispatch("setSelectedCampagna", campagna);
      router.push({ name: RouterNames.CAMPAGNA_PAGE });
    };

    const addCampagna = () => {
      router.push({ name: RouterNames.CAMPAGNA_PAGE });
    };

    return {
      ownedCampagne,
      playerCampagne,
      selectCampagna,
      addCampagna,
    };
  },
};
</script>

<style lang="less" src="./UserPage.less" scoped></style>
