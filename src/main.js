import Vue from "vue";
import App from "./App.vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
Amplify.configure({
  Auth: {
    identityPoolId: "ap-northeast-1:2b694935-7343-4589-8aea-8fbd0e0a1e72",
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_t6mWwDoB9",
    userPoolWebClientId: "gok04af8vf43qdp89pg6773lc"
  },
  API: {
    aws_appsync_graphqlEndpoint:
      "https://qxdordaoirg55hor6mntyo5jnu.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-northeast-1",
    aws_appsync_authenticationType: "AWS_IAM"
  }
});
Vue.use(AmplifyPlugin, AmplifyModules);
// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  render: h => h(App)
}).$mount("#app");
