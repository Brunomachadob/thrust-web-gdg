<template>
  <div class="md-layout">
      <md-card>
        <md-card-header>
          <div class="md-title">Public</div>
        </md-card-header>

        <md-card-content>
          Endpoints que não possuem autenticação nenhuma
        </md-card-content>

        <md-card-actions>
          <md-button @click="runGet" class="md-primary">GET</md-button>
          <md-button @click="runPost" class="md-primary">POST</md-button>
        </md-card-actions>
      </md-card>

      <md-card>
        <md-card-header>
          <div class="md-title">Secure</div>
        </md-card-header>

        <md-card-content>
          Endpoints que possuem autenticação
        </md-card-content>

        <md-card-actions>
          <md-button @click="runAuthenticatedGet" class="md-primary">GET</md-button>
          <md-button @click="runEtl" class="md-primary">ETL</md-button>
        </md-card-actions>
      </md-card>

      <md-card>
        <md-card-header>
          <div class="md-title">Secure - Admin</div>
        </md-card-header>

        <md-card-content>
          Endpoints que possuem autenticação
        </md-card-content>

        <md-card-actions>
          <md-button @click="runAdminGet" class="md-primary">GET</md-button>
        </md-card-actions>
      </md-card>

    <!-- <md-field>
      <label>Textarea</label>
      <md-textarea v-model="textarea"></md-textarea>
    </md-field> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    textarea: ""
  }),
  methods: {
    log(s) {
      console.log(s)
      //this.textarea += "\n" + s;
    },
    runGet() {
      let url = "/app/public/test/hello";
      this.log("Chamando GET na URL: " + url);

      this.$http.get(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runPost() {
      let url = "/app/public/test/helloPost";
      this.log("Chamando POST na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runEtl() {
      let url = "/app/secure/etl/run";
      this.log("Chamando POST na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runAuthenticatedGet() {
      let url = "/app/prod/getAll";
      this.log("Chamando GET na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    },
    runAdminGet() {
      let url =  "/app/secure/admin/getInfo";
      this.log("Chamando GET na URL: " + url);

      this.$http.post(url, { params: { id: 1 } }).then(
        response => {
          this.log(response.body);
        },
        response => {
          this.log(response.body);
        }
      );
    }
  }
};
</script>

<style>
.md-field .md-textarea {
  max-height: none;
}
</style>
