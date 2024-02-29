<!--
 * @Author: laofan
 * @Description: 1
 * @Date: 2023-09-28 10:50:02
 * @LastEditors: 老范
 * @LastEditTime: 2024-02-29 14:17:06
-->
<template>
  <div
    :class="`picker-pointer${activeClassName}`"
    :style="pointStyle"
    @mousedown.stop="mouseClick"
    @dblclick.stop="removePoint"
    @click.stop="pointClick"
  >
    <span :class="`child-point${activeClassName}`" />
    <el-icon
      v-show="activeClassName && colorPickerState.isShowColordisc"
      class="arrowIcon"
      ><Bottom
    /></el-icon>
  </div>
</template>

<script name="AreaGradientPoint" lang="ts" setup>
import { computed } from "vue";
import { cloneDeep } from "lodash-es";
import { useMouseEvents } from "@/hooks/index";
import { updateGradientActivePercent } from "@/utils/helpers/index";
import { colorPickerStore } from "@/pinia/colorPicker";
import type { IPoitItem } from "@/utils/helpers/color";

const getstyle = (sname: string) => {
  for (let i = 0; i < document.styleSheets.length; i++) {
    let rules: any;
    if (document.styleSheets[i].cssRules) {
      rules = document.styleSheets[i].cssRules;
    } else {
      rules = document.styleSheets[i].rules;
    }
    for (let j = 0; j < rules.length; j++) {
      if (rules[j].selectorText === sname) {
        return rules[j].style;
      }
    }
  }
};
const colorPickerState = colorPickerStore(window.pinia);
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  point: {
    type: Object,
    required: true,
  },
  width: {
    type: Number,
    default: 0,
  },
  positions: {
    type: Object,
  },
});
const pointClick = () => {
  colorPickerState.activePointIndex = props.index;
  colorPickerState.isShowColordisc = true;
  const { red, green, blue, alpha, left } =
    colorPickerState.points[colorPickerState.activePointIndex];
  let color = `rgba(${red},${green},${blue},${alpha})`;
  colorPickerState.currentColor = color;
  getstyle(".pickerClass").setProperty(
    "left",
    `${left + colorPickerState.position.x}px`,
    "important"
  );
};
const activeClassName = computed(() =>
  colorPickerState.activePointIndex === props.index ? " active" : ""
);
const pointStyle = computed(() => {
  return { left: `${props.point.left * (props.width / 100) - 7}px` };
});

const mouseDownHandler = (event: { pageX: any; pageY: any }) => {
  const startX = event.pageX;
  const startY = event.pageY;
  const offsetX = startX - (props.positions!.x || 20);
  colorPickerState.activePointIndex = props.index;
  return {
    startX,
    startY,
    offsetX,
  };
};
const updateGradientLeft = (left: number) => {
  colorPickerState.points[props.index].left = left;
};
const changeObjectPositions = (
  event: { pageX: number },
  { startX, offsetX }: { startX: any; offsetX: any }
) => {
  const moveX = event.pageX - startX;
  offsetX += moveX;
  const left = updateGradientActivePercent(offsetX, props.width);
  return {
    positions: {
      offsetX,
      startX: event.pageX,
    },
    left,
  };
};
const mouseMoveHandler = (event: any, { startX, offsetX }: any) => {
  const { positions, left } = changeObjectPositions(event, {
    startX,
    offsetX,
  });
  updateGradientLeft(left);
  return positions;
};
const mouseUpHandler = (event: any, { startX, offsetX }: any) => {
  const { positions, left } = changeObjectPositions(event, {
    startX,
    offsetX,
  });
  updateGradientLeft(left);
  getstyle(".pickerClass").setProperty(
    "left",
    `${left + colorPickerState.position.x}px`,
    "important"
  );
  // getstyle('.pickerClass').setProperty('left').left = `${left}px`;
  return positions;
};
const mouseEvents = useMouseEvents(
  mouseDownHandler,
  mouseMoveHandler,
  mouseUpHandler
);
const mouseClick = (e: Event) => {
  if (props.point.left === 0 || props.point.left === 100) return;
  mouseEvents(e);
};

const removePoint = () => {
  if (props.point.left === 0 || props.point.left === 100) return;
  let points = cloneDeep(colorPickerState.points);
  if (points!.length <= 2) return; // 至少2个点
  const index = props.index;
  const newIdx = index === 0 ? 1 : index - 1;
  points = points?.filter((i: IPoitItem) => i.id !== props.point.id);
  colorPickerState.activePointIndex = newIdx;
  colorPickerState.points = points;
  colorPickerState.isShowColordisc = false;
  // updateColor({points}, 'points');
};
</script>
<style lang="less">
// .picker-color-ui {
//   width: 280px;

.picker-area {
  .picker-pointer {
    position: absolute;
    top: 1px;
    width: 12px;
    height: 12px;
    background: transparent;
    border: 1px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 30%);

    .child-point {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 3px;
      height: 3px;
      background: #fff;
      border-radius: 50%;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.33s;

      .active {
        opacity: 1;
      }
    }
  }
}

.color-preview-area {
  .hex {
    width: 65px;
  }

  .rgb {
    width: 40px;
  }
}

.picker-pointer {
  position: absolute;
  top: 3px;
  width: 12px;
  height: 12px;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 30%);
  cursor: pointer;
  // transform: translateX(-6px);

  .child-point {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 3px;
    background: #fff;
    border-radius: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.33s;
    cursor: pointer;
  }
  .arrowIcon {
    margin-top: 30px;
    color: #000;
  }
  .active {
    opacity: 1;
  }
}
.btns {
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px;

  .btn {
    padding: 2px 4px;
    margin-left: 8px;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
}
// }
</style>
