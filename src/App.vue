<template>
  <div id="app">
    <amplify-authenticator
      v-if="authState !== 'signedIn'"
    ></amplify-authenticator>
    <div v-if="authState === 'signedIn' && user">
      <amplify-sign-out></amplify-sign-out>
      <div>Hello, {{ user.username }}</div>
    </div>
  </div>
</template>
<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "@aws-amplify/auth";
import { API, graphqlOperation } from "@aws-amplify/api";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "app",
  async beforeCreate() {
    try {
      this.user = await Auth.currentAuthenticatedUser();
      this.authState = "signedIn";
    } catch (err) {
      this.authState = undefined;
    }
    // 認証ステータスが変わった時に呼び出されるイベントを登録
    AmplifyEventBus.$on("authState", async info => {
      const query = `{
        Governments {
          id,
          name,
          createdAt,
          updatedAt
        }
      }`;
      if (info === "signedIn") {
        this.authState = "signedIn";
        this.user = await Auth.currentAuthenticatedUser();

        await Auth.currentCredentials().then(credentials =>
          console.log("Auth credentials:", credentials)
        );
        await API.graphql(graphqlOperation(query)).then(items =>
          console.log("Auth items:", items)
        );
      } else {
        this.authState = undefined;
        this.user = undefined;

        await Auth.currentCredentials().then(credentials =>
          console.log("UnAuth credentials:", credentials)
        );
        await API.graphql(graphqlOperation(query)).then(items =>
          console.log("UnAuth items:", items)
        );
      }
    });
  },
  data() {
    return {
      user: undefined,
      authState: undefined
    };
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
