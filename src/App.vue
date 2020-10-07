<template>
  <div id="app">
    <div v-if="signedIn">
      <div v-if="mfaPreference === 'NOMFA'">
        <amplify-set-mfa v-bind:mfaConfig="mfaConfig"></amplify-set-mfa>
      </div>
      <div v-else-if="mfaPreference === 'SOFTWARE_TOKEN_MFA'">
        <amplify-sign-out></amplify-sign-out>
        <div>Hello, {{ user.username }}</div>
      </div>
    </div>
    <div v-else>
      <amplify-authenticator></amplify-authenticator>
    </div>
  </div>
</template>
<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Auth } from "@aws-amplify/auth";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "app",
  data() {
    return {
      signedIn: false,
      user: undefined,
      mfaConfig: {
        mfaTypes: ["TOTP"]
      },
      mfaPreference: null
    };
  },
  methods: {},
  async beforeCreate() {
    // Auth.currentAuthenticatedUser()でユーザ情報を取得する。
    // 取得できなければ認証ステータスをfalseに設定する
    try {
      this.user = await Auth.currentAuthenticatedUser();
      this.signedIn = true;
      Auth.getPreferredMFA(this.user, {
        bypassCache: false
      }).then(data => {
        this.mfaPreference = data;
      });
    } catch (err) {
      this.signedIn = false;
    }
    // 認証ステータスが変わった時に呼び出されるイベントを登録
    AmplifyEventBus.$on("authState", async info => {
      if (info === "signedIn") {
        let cognitUser = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        this.user = cognitUser;
        Auth.getPreferredMFA(this.user, {
          bypassCache: false
        }).then(data => {
          this.mfaPreference = data;
        });
      } else {
        this.signedIn = false;
        this.user = undefined;
      }
    });
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
