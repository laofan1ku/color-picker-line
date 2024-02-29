/*
 * @Author: 老范
 * @Date: 2024-02-27 15:12:41
 * @LastEditors: 老范
 * @LastEditTime: 2024-02-28 16:50:40
 * @Description: 请填写简介
 */
import colorPickerLine from "./App.vue"; // 引入封装好的组件
import testPropsDiv from "./view/test1.vue"; // 引入封装好的组件

export { colorPickerLine, testPropsDiv }; //实现按需引入*
const coms = [colorPickerLine, testPropsDiv]; // 将来如果有其它组件,都可以写到这个数组里

const components = [colorPickerLine, testPropsDiv];
const install = function (App, options) {
  components.forEach((component) => {
    App.component(component.name, component);
  });
};
export default { install }; // 批量的引入*
