<template>
  <div class="login">
    <form class="wrapper">
      <h1 class="text-6xl">Log in</h1>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input type="email" placeholder="exemple@email.com" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input type="password" class="input input-bordered" />
      </div>

      <div class="mt-6">
        <button class="btn btn-primary btn-block">Sign in</button>
        <div class="divider">OR</div>
        <router-link to="/register" class="btn btn-ghost btn-block">Register</router-link>
      </div>
    </form>
  </div>
</template>

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