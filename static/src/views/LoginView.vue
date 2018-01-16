<template>
  <div class="md-layout md-alignment-center-center">
    <form novalidate class="md-layout-item md-size-50 md-gutter" @submit.prevent="validateLogin">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-row md-layout-wrap md-gutter">
            <div class="md-flex md-flex-small-100">
              <md-field>
                <label for="username">Username</label>
                <md-input name="username" id="username" autocomplete="username" required v-model="form.username" :disabled="sending" />
              </md-field>
            </div>

            <div class="md-flex md-flex-small-100">
              <md-field>
                <label for="password">Password</label>
                <md-input type="password" name="password" autocomplete="password" id="password" required v-model="form.password" :disabled="sending" />
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>

       <md-dialog-alert :md-active.sync="formValidationError"
        md-title="Login failed!"
        md-content="Username and password are required." />

        <md-dialog-alert :md-active.sync="formLoginError"
        md-title="Login failed!"
        md-content="Invalid username or password" />

    </form>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({
    form: {
      username: null,
      password: null
    },
    formValidationError: false,
    loginError: "",
    formLoginError: false,
    sending: false
  }),
  methods: {
    clearForm() {
      this.form.username = null;
      this.form.password = null;
    },
    validateLogin() {
      if (!this.form.username || !this.form.password) {
        this.formValidationError = true;
        return;
      }

      this.login();
    },
    login() {
      this.sending = true;

      this.$http
        .get("/app/public/auth/login", {
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
        .then(
          response => {
            if (response.body.loggedIn) {
              Vue.$auth.login();
              this.$router.push({ name: "home" });
            }
          },
          response => {
            this.form.password = null;
            this.formLoginError = true;
          }
        )
        .finally(() => {
          this.sending = false;
        });
    }
  }
};
</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
