/*
 * @Author: June
 * @Description:
 * @Date: 2023-04-08 22:26:19
 * @LastEditors: fanzhijia fanzhijia@cqhorizon.com
 * @LastEditTime: 2024-02-21 15:15:54
 */
export default function updateGradientActivePercent(offsetX: number, width: number): number {
  const leftPercent = (offsetX * 100) / width;
  return leftPercent < 0 ? 0 : leftPercent > 100 ? 100 : leftPercent;
}
