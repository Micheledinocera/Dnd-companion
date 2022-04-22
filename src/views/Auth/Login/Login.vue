<template>
  <div class="login" v-loading="loading">
    <el-input
      class="email"
      type="email"
      v-model="email"
      @keyup.enter="$refs.passwordInput.focus()"
    />
    <el-input
      class="password"
      type="password"
      ref="passwordInput"
      v-model="password"
      @keyup.enter="loginAction"
    />
    <el-button @click="loginAction"> Login </el-button>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { RouterNames } from "@/router/RouterNames";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let email = ref("");
    let password = ref("");
    let loading = ref(false);

    const loginAction = async () => {
      const auth = getAuth();
      loading.value = true;
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          await store.dispatch("bindUser", userCredential.user.uid);
          router.push({ name: RouterNames.USER_PAGE });
        })
        .catch((error) => {
          ElNotification({
            title: "Error",
            message: error.message,
            type: "error",
          });
        })
        .finally(() => (loading.value = false));
    };

    return {
      loginAction,
      email,
      password,
      loading,
    };
  },
};
</script>

<style lang="less" src="./Login.less" scoped></style>
