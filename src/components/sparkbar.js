import { html } from "npm:htl";

export function sparkbar(max) {
  return (x) => html`<div style="
      background: var(--theme-yellow);
      color: black;
      font: 10px/1.6 var(--sans-serif);
      width: ${100 * x / max}%;
      float: right;
      padding-right: 3px;
      box-sizing: border-box;
      overflow: visible;
      display: flex;
      justify-content: end;">${x.toLocaleString("en-US")}`
}
