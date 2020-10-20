import Vue from "vue";
import App from "./App.vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
Amplify.configure({
  Auth: {
    identityPoolId: "ap-northeast-1:3f35d2b1-ea5e-4c5e-80d0-9a895002f766",
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_NvGqDNaHr",
    userPoolWebClientId: "1vdlkfb95giejvqe2o6nimoffr"
  },
  API: {
    aws_appsync_graphqlEndpoint:
      "https://pkfisbd2qreu7bgrnun2aoqqj4.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-northeast-1",
    aws_appsync_authenticationType: "AWS_IAM"
  }
});
Vue.use(AmplifyPlugin, AmplifyModules);
// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  render: h => h(App)
}).$mount("#app");
