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
  }
});
Vue.use(AmplifyPlugin, AmplifyModules);
// It's important that you instantiate the Vue instance after calling Vue.use!
new Vue({
  render: h => h(App)
}).$mount("#app");
