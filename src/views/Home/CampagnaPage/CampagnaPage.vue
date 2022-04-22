<template>
  <div class="campagna-page">
    <h1>Casa Page</h1>
    <div class="add-casa" v-if="selectedCampagna.id == ''">
    </div>
    <div class="nome">{{ selectedCampagna.name }}</div>
    <div class="schede-container">
      <div
          class="list-item"
          v-for="(scheda, index) in schedeCampagna"
          :key="scheda.nome + index"
          @click="() => selectScheda(scheda)"
        >
          {{ scheda.nome }}
        </div>
    </div>
    <div class="back" @click="back">BACK</div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, ComputedRef, onMounted/* , ref */ } from "vue";
import { Campagna /* ICampagna */ } from "@/model/Campagna";
import { useRouter } from "vue-router";
import { RouterNames } from "@/router/RouterNames";
import { Scheda } from '@/model/Scheda';
// import { User } from "@/model/User";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const selectedCampagna: ComputedRef<Campagna> = computed(
      () => store.getters.getSelectedCampagna
    );
    const schedeCampagna: ComputedRef<Scheda[]> = computed(
      () => store.getters.getSchedeCampagna
    );

    const back = async () => {
      await store.dispatch("setSelectedCampagna", new Campagna());
      router.push({ name: RouterNames.USER_PAGE });
    };

    const selectScheda = () => {
      debugger;
    };

    onMounted(async () => {
      await store.dispatch("bindSchedeCampagna", store.getters.getSelectedCampagna.id);
    });

    return {
      selectedCampagna,
      schedeCampagna,
      selectScheda,
      back,
    };
  },
};
</script>

<style lang="less" src="./CampagnaPage.less" scoped></style>
