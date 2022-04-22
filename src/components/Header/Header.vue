<template>
  <div class="header">
    <div class="title">{{ appInfo.nome }}</div>
    <div class="user" v-if="user.name != ''">
      {{ "Connesso come " + user.name }}
      <div class="sign-out" @click="signoutAction">SIGN OUT</div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ComputedRef } from "vue";
import { AppInfo } from "@/model/AppInfo";
import { User } from "@/model/User";
import { getAuth, signOut } from "firebase/auth";
import { ElNotification } from "element-plus";
import { RouterNames } from "@/router/RouterNames";

export default {
  name: "Header",
  setup() {
    const store = useStore();
    const router = useRouter();
    const appInfo: ComputedRef<AppInfo> = computed(
      () => store.getters.getAppInfo
    );

    const user: ComputedRef<User> = computed(() => store.getters.getUser);

    const signoutAction = () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          store.dispatch("setEmptyUser");
          router.push({ name: RouterNames.LOGIN });
        })
        .catch((error) => {
          ElNotification({
            title: "Error",
            message: error.message,
            type: "error",
          });
        });
    };

    return {
      appInfo,
      user,
      signoutAction,
    };
  },
};
</script>

<style scoped lang="less" src="./Header.less"></style>
