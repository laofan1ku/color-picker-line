/*
 * @Descripttion:
 * @version:
 * @Author: laofan
 * @Date: 2023-03-19 19:02:56
 * @LastEditors: 老范
 * @LastEditTime: 2024-02-27 14:22:43
 */
export default function useMouseEvents(
  mouseDownHandler: any,
  mouseMoveHandler: any,
  mouseUpHandler: any
) {
  return function mouseEventsHandler(event: Event) {
    let positions = mouseDownHandler(event);
    function onMouseMove(event: Event) {
      positions = mouseMoveHandler(event, positions) || positions;
    }

    window.addEventListener("mousemove", onMouseMove);

    window.addEventListener(
      "mouseup",
      (event) => {
        window.removeEventListener("mousemove", onMouseMove);

        mouseUpHandler && mouseUpHandler(event, positions);
      },
      { once: true }
    );
  };
}
