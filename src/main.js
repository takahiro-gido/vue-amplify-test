import Vue from "vue";
import App from "./App.vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
Amplify.configure({
  Auth: {
    identityPoolId: "ap-northeast-1:4bd11451-b5c0-438d-b8fe-19ba6d9813a9",
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_c80u1Vi6n",
    userPoolWebClientId: "52kpl8617tu0q9fn0ef552cvs9"
  },
  API: {
    aws_appsync_graphqlEndpoint:
      "https://yh32zm65mjgyvijfn2x5pnq65y.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-northeast-1",
    aws_appsync_authenticationType: "AWS_IAM"
  }
});
Vue.use(AmplifyPlugin, AmplifyModules);
// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  render: h => h(App)
}).$mount("#app");
