import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

export function DailyPlot(data, {round = true, annotations, ...options} = {}) {
  return Plot.plot({
    marginTop: 50,
    marginBottom: 50,
    ...options,
    round,
    marks: [
      Plot.axisY({anchor: "right", label: null}),
      Plot.areaY(data, {x: "date", y: "value", curve: "step-before", fillOpacity: 0.4, fill: "var(--theme-foreground)", z: null}),
      Plot.ruleY([0]),
      annotations && [
        Plot.ruleX(annotations, {
          x: "date", 
          y1: 0, 
          y2: d3.max(data, d => d.value) * 1.1, 
          strokeOpacity: 0.8,
          //strokeDasharray: [0.5, 2],
          strokeLinecap: "butt",
          strokeWidth: 0.5,
          stroke: "var(--theme-foreground-fainter)",
        }),
        Plot.text(annotations, {
          x: "date",
          text: "text",
          href: "href",
          target: "_blank",
          dx: -3,
          frameAnchor: "top-left",
          fontVariant: "tabular-nums",
          fill: "currentColor",
          stroke: "var(--theme-background)",
          rotate: 320,
          textOverflow: "clip-end",
          lineWidth: 6,
          fontSize: 12
        }),
        Plot.lineY(data, Plot.windowY({k: 54, anchor: "start", strict: true}, {x: "date", y: "value", strokeWidth: 2})),
        Plot.lineY(
          data,
          Plot.windowY(
            {k: 14, anchor: "start", strict: true},
            {x: "date", y: "value", stroke: "var(--theme-foreground-focus)", strokeWidth: 2}
          )
        )
      ],
      Plot.tip(data, Plot.pointerX({x: "date", y: "value"}))
    ]
  });
}