/*
 * @Descripttion:
 * @version:
 * @Author: June
 * @Date: 2023-03-18 00:33:46
 * @LastEditors: fanzhijia fanzhijia@cqhorizon.com
 * @LastEditTime: 2024-02-21 15:13:10
 */
import setRGBA from './setRgba';

export default function hsvToRgb(hue: number, saturation: number, value: number, alpha: number) {
  value /= 100;
  const sat = saturation / 100;
  let C = sat * value;
  const H = hue / 60;
  let X = C * (1 - Math.abs((H % 2) - 1));
  let m = value - C;
  const precision = 255;
  C = ((C + m) * precision) | 0;
  X = ((X + m) * precision) | 0;
  m = (m * precision) | 0;

  if (H >= 1 && H < 2) {
    return setRGBA(X, C, m, alpha);
  }
  if (H >= 2 && H < 3) {
    return setRGBA(m, C, X, alpha);
  }
  if (H >= 3 && H < 4) {
    return setRGBA(m, X, C, alpha);
  }
  if (H >= 4 && H < 5) {
    return setRGBA(X, m, C, alpha);
  }
  if (H >= 5 && H <= 6) {
    return setRGBA(C, m, X, alpha);
  }

  return setRGBA(C, X, m, alpha);
}
