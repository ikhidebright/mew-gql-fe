import { createApp, provide, h } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { ApolloClients } from "@vue/apollo-composable";
import { apolloClient } from "../src/graphql/apollo.provider";

loadFonts();

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});
app.use(vuetify);
app.mount("#app");
