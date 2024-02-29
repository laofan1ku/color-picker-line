<template>
  <div id="app">
    <div class="configColor" :style="pointsStyle" @click="handleAddPoint">
      <div ref="pointsContainerRef" class="wh-full relative">
        <ColorPoint
          v-for="(point, index) in colorPickerState.points"
          :key="point.id"
          :index="index"
          :point="point"
          :positions="colorPickerState.position"
          :width="colorPickerState?.position.width"
        ></ColorPoint>
      </div>
      <div class="percentageBox">
        <div
          v-for="point in colorPickerState.points"
          :key="point.id"
          class="percentage"
          :style="pointStyle(point.left)"
        >
          {{ point.left.toFixed(1) }}%
        </div>
      </div>
      <el-color-picker
        v-if="colorPickerState.isShowColordisc"
        popper-class="pickerClass"
        ref="elColorPickerRef"
        v-model="colorPickerState.currentColor"
        show-alpha
        @active-change="clickColor"
        @change="closeColor"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";
import ColorPoint from "@/components/ColorPoint.vue";
import {
  generateGradientStyle,
  hsvToRgb,
  updateGradientActivePercent,
} from "@/utils/helpers/index";
import { colorPickerStore } from "@/pinia/colorPicker";
import { cloneDeep, throttle } from "lodash-es";
import { IPoitItem } from "@/utils/helpers/color";

// ColorCard
const props = defineProps({
  ColorCard: {
    type: Object,
    required: true,
  },
  maxNumber: {
    type: Number,
    default: 5,
  },
  cardPositions: {
    type: Object,
    required: true,
  },
});
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
onMounted(() => {
  if (props.cardPositions) {
    getstyle(".pickerClass").setProperty(
      "left",
      `${props.cardPositions.left}`,
      "important"
    );
    getstyle(".pickerClass").setProperty(
      "top",
      `${props.cardPositions.top}`,
      "important"
    );
  }
});
const colorPickerState = colorPickerStore(window.pinia);
const pointsContainerBoxInfo = ref<DOMRect | null>(null);
const pointsContainerRef = ref<DOMRect | null>(null);
const elColorPickerRef = ref<DOMRect | null>(null);

const pointStyle = (left: number) => {
  return {
    left: `${left * ((colorPickerState.position.width - 30) / 100)}px`,
  };
};
const handleAddPoint = (event: { pageX: number }) => {
  if (colorPickerState.points.length >= props.maxNumber) return;
  const { x, width } = colorPickerState.position;
  const left = updateGradientActivePercent(event.pageX - x, width);
  // saturation, value 基本是固定的
  // const {hue, saturation, value} = colorPickerState;
  const hue = 0;
  const saturation = 55;
  const value = 47;
  const points = cloneDeep(colorPickerState.points);
  const rgba = hsvToRgb(hue, saturation, value, 1);
  const newPoint = {
    id: uuidv4(),
    ...rgba,
    left,
  } as IPoitItem;
  points?.push(newPoint);
  colorPickerState.activePointIndex =
    points!.findIndex((i: IPoitItem) => i.id === newPoint.id) || 0;
  colorPickerState.points = points;
  colorPickerState.isShowColordisc = true;
  const { red, green, blue, alpha } =
    colorPickerState.points[colorPickerState.activePointIndex];
  const color = `rgba(${red},${green},${blue},${alpha})`;
  colorPickerState.currentColor = color;
};
const clickColor = (val: string) => {
  const newcolor = val.slice(5, -1).split(",");
  colorPickerState.points[colorPickerState.activePointIndex].red = Number(
    newcolor[0]
  );
  colorPickerState.points[colorPickerState.activePointIndex].green = Number(
    newcolor[1]
  );
  colorPickerState.points[colorPickerState.activePointIndex].blue = Number(
    newcolor[2]
  );
  colorPickerState.points[colorPickerState.activePointIndex].alpha = Number(
    newcolor[3]
  );
};
const closeColor = () => {
  colorPickerState.isShowColordisc = false;
};
const pointsStyle = computed(() => {
  const style = generateGradientStyle(colorPickerState.points, "linear", 90);
  return { background: style };
});
watchEffect(() => {
  if (pointsContainerRef.value && !pointsContainerBoxInfo.value?.width) {
    colorPickerState.position =
      pointsContainerRef.value?.getBoundingClientRect() || null;
  }
});
</script>

<style lang="less">
.configColor {
  position: relative;
  width: 410px;
  height: 20px;
  margin-left: 100px;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 10px;
}
.colorBoard {
  position: absolute;
  top: 20px;
  left: 0px;
  display: none;
}
.percentageBox {
  position: absolute;
  width: 400px;
  height: 20px;
}
.pickerClass {
  position: absolute;
  display: block !important;
  left: 100px !important;
  top: 50px !important;
}
.el-color-picker__trigger {
  display: none;
}
.percentage {
  position: absolute;
  font-size: 12px;
}
.wh-full {
  width: 100%;
  height: 100%;
}

.relative {
  position: relative;
}
.picker-color-ui {
  width: 280px;

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
    top: 0;
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

      &.active {
        opacity: 1;
      }
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
}
</style>
