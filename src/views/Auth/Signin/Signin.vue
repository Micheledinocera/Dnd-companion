<template>
  <div class="signin" v-loading="loading">
    <el-input
      class="nome"
      type="nome"
      v-model="nome"
      @keyup.enter="$refs.emailInput.focus()"
    />
    <el-input
      class="email"
      type="email"
      ref="emailInput"
      v-model="email"
      @keyup.enter="$refs.passwordInput.focus()"
    />
    <el-input
      class="password"
      type="password"
      ref="passwordInput"
      v-model="password"
      @keyup.enter="signinAction"
    />
    <el-button @click="signinAction"> Signin </el-button>
  </div>
</template>

<script lang="ts">
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { RouterNames } from "@/router/RouterNames";
import { User } from "@/model/User";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let email = ref("");
    let password = ref("");
    let nome = ref("");
    let loading = ref(false);

    const signinAction = async () => {
      const auth = getAuth();
      loading.value = true;
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          await store.dispatch(
            "addUser",
            new User({
              uid: userCredential.user.uid,
              email: email.value,
              name: nome.value,
            })
          );
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
      signinAction,
      email,
      password,
      nome,
      loading,
    };
  },
};
</script>

<style lang="less" src="./Signin.less" scoped></style>
