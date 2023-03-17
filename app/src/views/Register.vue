<template>
  <div class="register">
  <div class="wrapper">
    <form @submit.prevent="handleSubmit()">
      <h1 class="text-6xl">Register</h1>

      <div class="errors" v-if="errors">
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

interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

type RegistrationFormErrors = Partial<Record<keyof RegistrationForm, string>>;

export default defineComponent({
  name: 'RegisterView',
  setup() {
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

    const handleSubmit = () => {
      validate()

      if (Object.keys(errors.value).length) return;

      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 3000);
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