<template>
  <div class="login">
    <form class="wrapper" @submit.prevent="submit()">
      <h1 class="text-6xl">Log in</h1>

      <div class="errors" v-if="errors">
        <div class="alert alert-error" v-show="errors.server">
          <div>😖 Internal server error. Try again</div>
        </div>
        <div class="alert alert-error" v-show="errors.credentials">
          <div>❌ Invalid credentials. Try again</div>
        </div>
      </div>

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
import { useAuthStore } from '@/stores/authStore';
import { AxiosError } from 'axios';

interface LoginForm {
  email: string;
  password: string;
}

type LoginFormError = Partial<Record<keyof LoginForm, string>>
interface LoginSubmitError {
  server?: string | true;
  credentials?: string | true; 
}
type LoginFormErrors = LoginFormError & LoginSubmitError;

export default defineComponent({
  name: 'LoginView',
  setup() {
    const authStore = useAuthStore();

    const form = ref<LoginForm>({
      email: '',
      password: '',
    });
    const errors = ref<LoginFormErrors>({});
    const loading = ref(false);

    const validate = () => {
      errors.value = {}
    }

    const submit = async () => {
      validate()

      if (Object.keys(errors.value).length) return;

      try {
        loading.value = true;
        await authStore.login(form.value);
      } catch (e) {
        const error = e as AxiosError;

        if (error.code === "ERR_BAD_RESPONSE") errors.value.server = true;
        if (error.code === 'ERR_BAD_REQUEST') errors.value.credentials = true;
      } finally {
        loading.value = false;
      }
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

.errors {
  @apply mb-6;
}
</style>