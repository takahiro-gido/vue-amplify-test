import Vue from "vue";
import App from "./App.vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
Amplify.configure({
  Auth: {
    identityPoolId: "ap-northeast-1:9b5743e3-6443-4017-bf56-c55c2477951e",
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_h6sr4o6Dy",
    userPoolWebClientId: "4a971pg3o6pulnvelk2q285u5d"
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
