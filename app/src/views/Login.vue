<template>
  <div class="login">
    <form class="wrapper" @submit.prevent="submit()">
      <h1 class="text-6xl">Log in</h1>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input v-model="form.email" type="email" placeholder="exemple@email.com" class="input input-bordered" :disabled="loading" required />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input v-model="form.password" type="password" class="input input-bordered" minlength="8" :disabled="loading" required/>
      </div>

      <div class="mt-6">
        <button class="btn btn-primary btn-block" :class="{ loading }">Sign in</button>
        <div class="divider">OR</div>
        <router-link to="/register" class="btn btn-ghost btn-block">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface LoginForm {
  email: string;
  password: string;
}

type LoginFormErrors = Partial<Record<keyof LoginForm, string>>;

export default defineComponent({
  name: 'LoginView',
  setup() {
    const form = ref<LoginForm>({
      email: '',
      password: '',
    });
    const errors = ref<LoginFormErrors>({});
    const loading = ref(false);

    const validate = () => {
      errors.value = {}
    }

    const submit = () => {
      validate()

      if (Object.keys(errors.value).length) return;

      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 3000);
    }

    return {
      form,
      errors,
      loading,
      submit,
    };
  }
})
</script>

<style lang="postcss" scoped>
.login {
  @apply
  p-8
  h-full w-full
  flex items-center justify-center
  relative;
}

.wrapper {
  @apply w-full max-w-xl;
}
</style>