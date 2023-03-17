<template>
  <div class="register">
  <div class="wrapper">
    <form @submit.prevent="handleSubmit()">
      <h1 class="text-6xl">Register</h1>

      <div class="errors" v-if="errors">
        <div class="alert alert-error" v-show="errors.server">
          <div>😖 Internal server error. Try again</div>
        </div>
        <div class="alert alert-error" v-show="errors.email">
          <div>❌ Email address already in use</div>
        </div>
        <div class="alert alert-error" v-show="errors.confirmPassword">
          <div>❌ Passwords don't match</div>
        </div>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input v-model="form.email" type="email" placeholder="exemple@email.com" class="input input-bordered" :disabled="isLoading" required />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input v-model="form.password" type="password" class="input input-bordered" minlength="8" maxlength="64" :disabled="isLoading" required />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Confirm password</span>
        </label>
        <input v-model="form.confirmPassword" type="password" class="input input-bordered" minlength="8" maxlength="64" :disabled="isLoading" required />
      </div>

      <div class="mt-6">
        <button class="btn btn-primary btn-block" :class="{ loading: isLoading }">Submit</button>
        <div class="divider">OR</div>
        <router-link to="/login" class="btn btn-ghost btn-block">Sign in</router-link>
      </div>
    </form>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { AxiosError } from 'axios';

interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

type RegistrationFormError = Partial<Record<keyof RegistrationForm, string>>;
type RegistrationSubmitError = {
  server?: boolean;
}
type RegistrationFormErrors = RegistrationFormError & RegistrationSubmitError;


export default defineComponent({
  name: 'RegisterView',
  setup() {
    const authStore = useAuthStore();

    const form = ref<RegistrationForm>({
      email: '',
      password: '',
      confirmPassword: '',
    });
    const errors = ref<RegistrationFormErrors>({})
    const isLoading = ref(false);

    const validate = () => {
      errors.value = {}

      if (form.value.password !== form.value.confirmPassword) {
        errors.value.confirmPassword = 'mismatch'
      }
    }

    const handleSubmit = async () => {
      validate()

      if (Object.keys(errors.value).length) return;

      try {
        isLoading.value = true;
        const data = {
          email: form.value.email,
          password: form.value.password,
        }
        await authStore.register(data)
      } catch (e) {
        const error = e as AxiosError

        console.log(error);
        if (error.code === "ERR_BAD_RESPONSE") errors.value.server = true;
        if (error.code === 'ERR_BAD_REQUEST') errors.value = error.response?.data as RegistrationFormErrors || {};
      } finally {
        isLoading.value = false;
      }
    };

    return {
      form,
      errors,
      isLoading,
      handleSubmit,
    };
  },
})
</script>

<style lang="postcss" scoped>
.register {
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