---
theme: dashboard
toc: false

sql:
  activities: ./data/clean/daily_activities.parquet
---

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

const selection = 
  Inputs.table(search, {
    format: {
      d_date: (x) => d3.utcFormat("%Y-%m-%d")(x),
      plusminus_lines: sparkbar(d3.max(daily_activities, d => d.plusminus_lines)),
      med_duration: (x) => x + " h",
      pr_ids: link_pr(`https://github.com/${gh_info.gh_organization}/${gh_info.gh_repo}/pull/`),
    }
  }
);
```

```js
const end = d3.isoParse(releases.at(0).d_date);
const start = d3.isoParse(releases.at(-1).d_date);
const lastMonth = d3.utcDay.offset(end, -28);
const lastWeek = d3.utcDay.offset(end, -7);
```

```sql id=[{pr,fixes,duration,comments,loc}]
SELECT 
  sum(pr_merged) pr, 
  count(1) filter(where fixes) fixes, 
  round(sum(total_duration) / sum(pr_merged)) duration, 
  round(avg(comments_count)) as comments,
  max(loc) as loc
FROM activities
```

# ${gh_info.gh_repo} - Activities

<div class="grid grid-cols-4">
  <div class="card" style="color: inherit;">
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
  <div class="card grid grid-cols-2" style="color: inherit;">
    <div>
      <span class="big">${loc}</span>
      <h2>Lines of code</h2>
    </div>
    <span>
      ${resize((width) =>
        Plot.plot({
          x: {axis:null},
          y: {axis:null},
          color: {scheme: dark ? "turbo" : "turbo"},
          width: 1000,
          marks: [
            Plot.barY(daily_activities, {x: "d_date", y: "loc", fill: "loc", }),
          ]
        })
      )}
    </span>
  </div>
</div>

<div class="card">
  <h2>Daily commit activity</h2>
  <h3>1quarter <b style="color: var(--theme-foreground);">—</b> and 4w <b style="color: var(--theme-foreground-focus);">—</b> moving average</h3>
  ${resize((width) =>
    DailyPlot([... daily_activities].map(
      (d) => ({date: d.d_date, value: d.commits_count})), 
      {
        width,
        marginRight: 40,
        x: {domain: [start, end],  type: "time", label: "Date", axis: "bottom"},
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
      x:{domain: [start, end],  type: "time", label: "Date", axis: "bottom"},
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
view(selection);

```
</div>