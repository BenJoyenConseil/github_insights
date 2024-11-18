---
theme: [wide, glacier]
toc: false
---

# Insiths all sources - Activities

```js
import {DailyPlot} from "./components/dailyPlot.js";
```

```js
const contributions = FileAttachment("data/clean/fact_contribution.parquet").parquet();
const releases = FileAttachment("data/clean/outlier_release.parquet").parquet();
const re = [... await releases]
```

```js
// These dates are declared globally to ensure consistency across plots.
const end = [... await contributions][0].d_date;
const start = d3.utcMonth.offset(end, -17);
const x = {domain: [start, end]};
```

<div class="card">
  <h2>Weekly commit activity</h2>
  <h3>1quarter <b style="color: var(--theme-foreground);">—</b> and 4w <b style="color: var(--theme-foreground-focus);">—</b> moving average</h3>
  ${resize((width) =>
    DailyPlot([... contributions].map(
        (d) => ({date: d.d_date, value: d.total_commits})
      ), {
      width,
      marginRight: 40,
      x,
      y: {insetTop: 40, label: "commits"},
      annotations: re.filter(
            (d) => (!d.has_fix)
          ).map(
            (d) => ({date: d.d_date, text: d.version, href: `https://github.com/dktunited/insight-all-sources/releases/${d.version}`})
          )
    })
  )}
</div>

<div class="card">
  <h2>Plus / Minus</h2>
  <h3>1quarter <b style="color: var(--theme-foreground);">—</b> and 4w <b style="color: var(--theme-foreground-focus);">—</b> moving average</h3>
  ${resize((width) =>
    DailyPlot([... contributions].map(
        (d) => ({date: d.d_date, value: d.plusminus_lines})
      ), {
      width,
      marginRight: 40,
      x,
      y: {insetTop: 40, label: "commits"},
      annotations: re.filter(
            (d) => (!d.has_fix)
          ).map(
            (d) => ({date: d.d_date, text: d.version, href: `https://github.com/dktunited/insight-all-sources/releases/${d.version}`})
          )
    })
  )}
</div>

<div>

```js
Inputs.table(releases)
```

  <!-- ```sql
SELECT strftime(d_date, '%x') as date, loc as value, * FROM contributions
  ``` -->

</div>