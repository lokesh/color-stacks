import bezier from "bezier-easing";

export const linear = bezier(0.5, 0.5, 0.5, 0.5);

export const easeInSine = bezier(0.47, 0, 0.745, 0.715);
export const easeOutSine = bezier(0.39, 0.575, 0.565, 1);
export const easeInOutSine = bezier(0.445, 0.05, 0.55, 0.95);
