<template>
  <div class="min-h-screen flex flex-col bg-primary-white">
    <div class="flex-grow flex items-center justify-center px-4 py-12">
      <div class="max-w-md w-full">
        <div
          class="rounded-2xl shadow-xl border border-secondary-red overflow-hidden"
        >
          <div class="bg-secondary-dark p-8 text-center">
            <img src="/images/Logo.png" alt="Logo" class="w-80 mx-auto mb-3" />
            <h1 class="text-2xl font-bold text-primary-gray mb-2">LOGIN</h1>
            <p class="text-primary-gray text-sm">
              Masukkan kredensial untuk masuk ke
              <span class="text-secondary-red">Dashboard</span>
            </p>
          </div>

          <div class="p-8">
            <form @submit.prevent="handleLogin" class="space-y-6">
              <div class="space-y-2">
                <label
                  for="no_induk"
                  class="block text-gray-700 text-sm font-semibold"
                >
                  Email
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Icon name="lucide:user" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    v-model="state.email"
                    class="w-full pl-10 pr-12 py-3 border text-primary-gray border-secondary-red/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan Email anda"
                    required
                  />
                </div>
              </div>

              <div class="space-y-2">
                <label
                  for="password"
                  class="block text-gray-700 text-sm font-semibold"
                >
                  Kata Sandi
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="state.password"
                    class="w-full pl-10 pr-12 py-3 border text-primary-gray border-secondary-red/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-red focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan Password"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon
                      :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                      class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    />
                  </button>
                </div>
                <p
                  v-if="error"
                  class="text-red-500 text-sm font-semibold text-center"
                >
                  {{ errorMessage }}
                </p>
              </div>

              <button
                :disabled="isLoading"
                class="w-full flex justify-center items-center gap-2 font-bold rounded-lg py-3 px-6 text-lg text-white bg-secondary-red hover:bg-secondary-red/50 hover:text-white transition-all hover:shadow-none hover:translate-y-[3px]"
                type="submit"
              >
                <template v-if="loading">
                  <Icon
                    name="lucide-loader-2"
                    class="animate-spin inline-block mr-2"
                  />
                  Memproses...
                </template>
                <template v-else>
                  <Icon name="lucide-log-in" />
                  <span>Masuk</span>
                </template>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { login, loading, error } = useAuth();

definePageMeta({
  layout: false,
});

const isLoading = ref(false);
const showPassword = ref(false);
const errorMessage = ref("");

const state = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await login(state.value);
  } catch (err) {
    errorMessage.value = "Terjadi kesalahan saat login.";
  }
};
</script>
