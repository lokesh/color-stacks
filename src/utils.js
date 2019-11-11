export function hueToColor(hue) {
	 // 0 = red, 120 = green, blue = 240,
      let label;
      if (this.c === 0) {
        label = "gray";
      } else if (this.h < 20) {
        label = "pink";
      } else if (this.h < 40) {
        label = "rose";
      } else if (this.h < 60) {
        label = "red";
      } else if (this.h < 80) {
        label = "orange";
      } else if (this.h < 100) {
        label = "brown";
      } else if (this.h < 120) {
        label = "olive";
      } else if (this.h < 140) {
        label = "forest";
      } else if (this.h < 160) {
        label = "green";
      } else if (this.h < 180) {
        label = "teal";
      } else if (this.h < 200) {
        label = "mint";
      } else if (this.h < 220) {
        label = "turqouise";
      } else if (this.h < 240) {
        label = "baby-blue";
      } else if (this.h < 260) {
        label = "powder-blue";
      } else if (this.h < 280) {
        label = "blue";
      } else if (this.h < 300) {
        label = "cobalt";
      } else if (this.h < 320) {
        label = "indigo";
      } else if (this.h < 340) {
        label = "purple";
      } else if (this.h < 360) {
        label = "plum";
      }
}