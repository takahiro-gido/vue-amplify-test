import Vue from "vue";
import App from "./App.vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
Amplify.configure({
  Auth: {
    identityPoolId: "ap-northeast-1:1c0c2a4c-cea8-40fe-abb7-af01e1755cbc",
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_YDVFXKzcL",
    userPoolWebClientId: "4knuc5i51sq9ercpn2n59ebe5t"
  },
  API: {
    aws_appsync_graphqlEndpoint:
      "https://hsmxyvbyfvaypkht5dphima6qe.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-northeast-1",
    aws_appsync_authenticationType: "AWS_IAM"
  }
});
Vue.use(AmplifyPlugin, AmplifyModules);
// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  render: h => h(App)
}).$mount("#app");
