---
sql:
  activities: ./data/clean/daily_activities.parquet

---

# Insight all sources - Activities

```js
import {DailyPlot} from "./components/dailyPlot.js";
import {sparkbar} from "./components/sparkbar.js";
import {link_pr} from "./components/linkable.js";
```

```js
const gh_info = await FileAttachment("data/repo_info.json").json();
const releases = FileAttachment("data/clean/dim_release.parquet").parquet();
const daily_activities = FileAttachment("data/clean/daily_activities.parquet").parquet();
const pull_requests = FileAttachment("data/clean/fact_pr.parquet").parquet();
const re = [... await releases]
```

```js
const end = d3.isoParse(daily_activities.at(0).d_date);
const start = d3.isoParse(daily_activities.at(-1).d_date);
const x = {domain: [start, end],  type: "time", label: "Date", axis: "bottom"};
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
      ), 
      {
        width,
        marginRight: 40,
        x: x,
        y: {insetTop: 30, label: "commits"},
        annotations: re.filter(
              (d) => (!d.has_fix)
            ).map(
              (d) => ({date: d.d_date, text: d.version, href: `https://github.com/${gh_info.gh_organization}/${gh_info.gh_repo}/releases/${d.version}`})
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
      y: {insetTop: 20, label: "lines of code",type: "sqrt"},
      annotations: re.filter(
            (d) => (!d.has_fix)
          ).map(
            (d) => ({date: d.d_date, text: d.version.substring(0, 10), href: `https://github.com/${gh_info.gh_organization}/${gh_info.gh_repo}/releases/${d.version}`})
          )
    })
  )}
</div>

<div>

```js
const search = view(Inputs.search(daily_activities, {placeholder: "Search PR"}));
```

```js
const selection = view(
  Inputs.table(search, {
    format: {
      d_date: (x) => d3.utcFormat("%Y-%m-%d")(x),
      plusminus_lines: sparkbar(d3.max(daily_activities, d => d.plusminus_lines)),
      med_duration: (x) => x + " h",
      pr_ids: link_pr(`https://github.com/${gh_info.gh_organization}/${gh_info.gh_repo}/pull/`),
    }
  }
));
```
```js

display(selection)
```
  <!-- ```sql
SELECT strftime(d_date, '%x') as date, loc as value, * FROM contributions
  ``` -->

</div>