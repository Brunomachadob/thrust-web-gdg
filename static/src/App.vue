<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <div class="md-layout md-layout-item md-alignment-center-space-between">
        <div v-if="isLoggedIn()">
          <md-button @click="logout()">
            Logout
          </md-button>
        </div>
        <div v-else>
          <md-button @click="login()">
            Login
          </md-button>
        </div>
      </div>
    </md-app-toolbar>

    <md-app-content class="md-layout">
      <div>
        <img src="https://avatars0.githubusercontent.com/u/32037620" />
      </div>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$http.get("/app/public/auth/logout").then(response => {
        Vue.$auth.logout();
        this.$forceUpdate()
      });
    },
    login() {
      this.$router.push({ name: "login" });
    },
    isLoggedIn() {
      return Vue.$auth.loggedIn();
    }
  }
};
</script>

<style>
.md-app {
  min-height: 100vh;
}

.md-layout-column {
  flex-direction: column;
}
</style>
