/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-06-27 13:16:45
 * @LastEditors: fanzhijia fanzhijia@cqhorizon.com
 * @LastEditTime: 2024-02-21 15:28:46
 */

export interface IPoitItem {
  id: string;
  red: number;
  green: number;
  blue: number;
  alpha: number;
  left: number;
}

export interface IColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  hue?: number;
  saturation?: number;
  value?: number;
  points?: IPoitItem[];
  type?: string;
  degree?: number;
}

export interface IGradient {
  type: string;
  degree: number;
  points: IPoitItem[];
}

export interface IColorState extends IColor {
  isGradient: boolean;
  type?: string;
  degree?: number;
  points?: IPoitItem[];
  activePointIndex?: number;
  style?: string;
  color?: IColor;
  gradient?: IGradient;
}

export interface IColorRes {
  style: string;
  color?: IColor;
  gradient?: IGradient;
}
