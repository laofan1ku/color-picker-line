/*
 * @Author: 老范
 * @Date: 2023-05-10 15:02:19
 * @LastEditors: 老范
 * @LastEditTime: 2024-02-27 13:30:43
 * @Description: 请填写简介
 */

import { IColor, IGradient, IPoitItem } from "@/utils/helpers/color";
import { defineStore } from "pinia";
interface positionType {
  width: number;
  x: number;
}
interface colorPickerStateType {
  isGradient: boolean;
  type?: string;
  degree?: number;
  points: IPoitItem[];
  activePointIndex: number;
  style?: string;
  color?: IColor;
  gradient?: IGradient;
  isShowColordisc: boolean;
  position: positionType;
  currentColor: string;
}
const defaultState: colorPickerStateType = {
  currentColor: "rgba(64, 169, 108, 1)",
  position: {
    width: 400,
    x: 0,
  },
  isGradient: true,
  activePointIndex: 0,
  type: "liner",
  isShowColordisc: false,
  points: [
    {
      id: "81bcb3a0-00b9-4a26-bfc7-2b261722de02",
      left: 0,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },

    {
      id: "a5d144fb-9ab5-40b3-9beb-e79161c5f546",
      red: 0,
      green: 153,
      blue: 255,
      alpha: 1,
      left: 32,
    },
    {
      id: "b1bc25ad-7273-4bd8-ad22-d5d11cab0f55",
      red: 0,
      green: 153,
      blue: 255,
      alpha: 1,
      left: 68,
    },
    {
      id: "d6c7ccb8-b1c4-4470-8b73-ee0b56739421",
      left: 100,
      red: 255,
      green: 0,
      blue: 63,
      alpha: 1,
    },
  ],
};
export const colorPickerStore = defineStore("colorPicker", {
  state: () => {
    return defaultState;
  },
  getters: {},
  actions: {},
});
