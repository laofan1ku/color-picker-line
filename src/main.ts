/*
 * @Author: fanzhijia fanzhijia@cqhorizon.com
 * @Date: 2024-02-27 09:42:27
 * @LastEditors: 老范
 * @LastEditTime: 2024-02-29 13:56:20
 * @FilePath: \color-picker-npmtest\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { store } from "@/pinia/index";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
import colorPickerLine from "../dist/color-picker-line.es.js";

const app = createApp(App);

app.use(colorPickerLine);

// 挂载element-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(store);
app.use(ElementPlus);

app.mount("#app");
