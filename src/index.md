---
theme: [wide, glacier]
toc: false
sql:
  activities: ./data/clean/daily_activities.parquet

---

# Insiths all sources - Activities

```js
import {DailyPlot} from "./components/dailyPlot.js";
```

```js
const contributions = FileAttachment("data/clean/fact_contribution.parquet").parquet();
const releases = FileAttachment("data/clean/dim_release.parquet").parquet();
const daily_activities = FileAttachment("data/clean/daily_activities.parquet").parquet();
const re = [... await releases]
```

```js
// These dates are declared globally to ensure consistency across plots.
const end = [... await contributions][0].d_date;
const start = d3.utcMonth.offset(end, -17);
const x = {domain: [start, end]};
```

```sql id=[{pr,fixes,duration,comments}]
SELECT 
  sum(pr_merged) pr, 
  count(1) filter(where fixes) fixes, 
  round(median(med_duration)) duration, 
  round(avg(comments_count)) as comments
FROM activities
```
<div class="grid grid-cols-4">
  <div class="card" href="https://github.com/dktunited/insight-all-sources/releases" style="color: inherit;">
    <h2>Latest release</h2>
    <span class="big">${releases.at(0).version}</span>
    <span class="muted">${((days) => days === 0 ? "today" : days === 1 ? "yesterday" : `${days} days ago`)(d3.utcDay.count(releases.at(0).d_date, end))}</span>
  </div>
  <div class="card" style="color: inherit;">
  <h2>FIX vs FEAT rate</h2>
    <span class="big">${fixes} / ${pr[0]} </span>
    <!-- <span>${Trend(d3.sum(stars, (d) => d.starred_at >= lastWeek))}</span> -->
    <span class="muted">over 1y</span>
  </div>
  <div class="card" style="color: inherit;">
    <h2>Mean time to Merge</h2>
    <span class="big">${duration} hours</span>
    <!-- ${Trend(downloads[7].value ? (downloads[0].value - downloads[7].value) / downloads[7].value : undefined, {format: {style: "percent"}})} -->
    <span class="muted">over 28d</span>
  </div>
  <div class="card" style="color: inherit;">
    <h2>Comments by PR</h2>
    <span class="big">${comments}</span>
  </div>
</div>

<div class="card">
  <h2>Weekly commit activity</h2>
  <h3>1quarter <b style="color: var(--theme-foreground);">—</b> and 4w <b style="color: var(--theme-foreground-focus);">—</b> moving average</h3>
  ${resize((width) =>
    DailyPlot([... daily_activities].map(
        (d) => ({date: d.d_date, value: d.commits_count})
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
    DailyPlot([... daily_activities].map(
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
Inputs.table(daily_activities, {
  format: {
    d_date: (x) => d3.utcFormat("%Y-%m-%d")(x)
  }
})
```

  <!-- ```sql
SELECT strftime(d_date, '%x') as date, loc as value, * FROM contributions
  ``` -->

</div>