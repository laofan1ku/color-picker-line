安装`npm install color-picker-line`
配置 main.ts:

```javascript
const store = creatPinia();
app.use(store);
window.pinia = store;
```

演示 gif：
![https://files.catbox.moe/7wg2yn.gif]()

具体用法：

`import {colorPickerLine} from 'color-picker-line';`

template：

`<colorPickerLine :max-number="6" :card-positions="cardPositions"/>`

params:
maxNumber: 最多有多少种颜色
cardPositions：色板定位属性
