import * as Plot from "npm:@observablehq/plot";

export function DailyPlot(data, {round = true, annotations, ...options} = {}) {
  return Plot.plot({
    ...options,
    round,
    x:{nice: true, type: "time", label: "Date"},
    marks: [
      Plot.axisY({anchor: "right", label: null}),
      Plot.areaY(data, {x: "d_date", y: "plusminus_lines", curve: "step", fillOpacity: 0.3}),
      Plot.ruleY([0]),
      Plot.lineY(
        data,
        Plot.windowY(
          {k: 7, anchor: "start", strict: false},
          {x: "d_date", y: "plusminus_lines", stroke: "var(--theme-foreground-focus)"}
        )
      ),
      Plot.lineY(data, Plot.windowY({k: 22, anchor: "start", strict: false}, {x: "d_date", y: "plusminus_lines"})),
      annotations && [
        Plot.ruleX(annotations, {x: "date", strokeOpacity: 0.1}),
        Plot.text(annotations, {
          x: "date",
          text: "text",
          href: "href",
          target: "_blank",
          rotate: -90,
          dx: -3,
          frameAnchor: "top-right",
          lineAnchor: "bottom",
          fontVariant: "tabular-nums",
          fill: "currentColor",
          stroke: "var(--theme-background)"
        })
      ],
      Plot.tip(data, Plot.pointerX({x: "d_date", y: "plusminus_lines"}))
    ]
  });
}