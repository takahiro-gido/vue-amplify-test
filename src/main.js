import Vue from "vue";
import App from "./App.vue";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
Amplify.configure({
  Auth: {
    identityPoolId: "ap-northeast-1:f8ede2ee-1d31-465c-a253-82e47c9a9f39",
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_kybq3xDDy",
    userPoolWebClientId: "1n81qmdnhgqb4kohcjgh2muv22"
  },
  API: {
    aws_appsync_graphqlEndpoint:
      "https://euf3bubejfapvlsjhmpqt6tdrq.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-northeast-1",
    aws_appsync_authenticationType: "AWS_IAM"
  }
});
Vue.use(AmplifyPlugin, AmplifyModules);
// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  render: h => h(App)
}).$mount("#app");
