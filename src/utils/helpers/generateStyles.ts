/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: fanzhijia fanzhijia@cqhorizon.com
 * @LastEditTime: 2024-02-21 15:14:21
 */
import type {IPoitItem} from '@/utils/helpers/color';
export function generateSolidStyle(red, green, blue, alpha): string {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function generateGradientStyle(points: IPoitItem[], type: string, degree: number): string {
  let style = '';
  const sortedPoints = points.slice();

  sortedPoints.sort((a, b) => a.left - b.left);
  if (type === 'linear') {
    style = `linear-gradient(${degree}deg,`;
  } else {
    style = 'radial-gradient(';
  }

  sortedPoints.forEach((point, index) => {
    style += `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha}) ${point.left}%`;

    if (index !== sortedPoints.length - 1) {
      style += ',';
    }
  });

  style += ')';

  return style;
}
