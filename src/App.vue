<template>
  <div id="app">
    <amplify-authenticator
      v-if="authState !== 'signedIn'"
    ></amplify-authenticator>
    <div v-if="authState === 'signedIn' && user">
      <amplify-sign-out></amplify-sign-out>
      <div>Hello, {{ user.username }}</div>
    </div>
    <div>Governments Query Result:{{ governmentsQueryResult }}</div>
    <div>MyLists Query Result:{{ myListsQueryResult }}</div>
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
      if (info === "signedIn") {
        this.authState = "signedIn";
        this.user = await Auth.currentAuthenticatedUser();
      } else {
        this.authState = undefined;
        this.user = undefined;
      }
      await this.tryGraphQLQuery();
    });
  },
  async created() {
    await this.tryGraphQLQuery();
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      governmentsQueryResult: undefined,
      myListsQueryResult: undefined
    };
  },
  methods: {
    tryGraphQLQuery: async function() {
      const governmentsQuery = `{
        Governments {
          id,
          name,
          createdAt,
          updatedAt
        }
      }`;
      const myListsQuery = `{
        MyLists {
          id,
          name,
          createdAt,
          updatedAt
        }
      }`;
      // 行政機関一覧取得（未認証ユーザ、認証ユーザの両方に許可）
      await API.graphql(graphqlOperation(governmentsQuery))
        .then(items => (this.governmentsQueryResult = JSON.stringify(items)))
        .catch(error => (this.governmentsQueryResult = JSON.stringify(error)));
      // マイリスト一覧取得（未認証ユーザには不許可、認証ユーザにのみ許可）
      await API.graphql(graphqlOperation(myListsQuery))
        .then(items => (this.myListsQueryResult = JSON.stringify(items)))
        .catch(error => (this.myListsQueryResult = JSON.stringify(error)));
    }
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
