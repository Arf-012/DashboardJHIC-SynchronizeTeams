<template>
  <div class="flex min-h-screen bg-primary-white">
    <SidebarNavigation />

    <div class="flex-1 flex flex-col">
      <!-- Navbar + Logout -->
      <div class="flex items-center justify-between p-4">
        <NavbarNavigation />

        <!-- Tombol Logout -->
        <button
          @click="logout"
          class="px-4 py-2 bg-secondary-red text-white rounded-md hover:bg-secondary-red/50 transition"
        >
          Logout
        </button>
      </div>

      <main class="flex-1 p-6 text-primary-gray">
        <slot />
        <Footer />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { removeToken } = UseStorage();

function logout() {
  removeToken();
}
</script>
