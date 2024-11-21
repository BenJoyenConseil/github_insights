with daily as (
    select
        d_isodate::date as d_date,
        list(pr_id) pr_ids,
        sum(pr_duration) as total_duration,
        count(distinct pr_id) filter(where merged)::int pr_merged,
        sum(additions) additions,
        sum(deletions) deletions,
        sum(additions) + sum(deletions) plusminus_lines,
        sum(changed_files_count) changes,
        sum(total_commits_count) commits_count,
        sum(total_comments_count) comments_count,
        bool_or(has_more_than_10_commits)  commit_list_incomplete,
        count(1) filter (where has_fix)  fixes

    from {{ ref('fact_pr') }}
    where merged
    group by d_isodate
    order by d_isodate desc
)

select
    dim_calendar.d_date,
    pr_ids,
    total_duration,
    coalesce(pr_merged, 0) pr_merged,
    coalesce(additions, 0) additions,
    coalesce(deletions, 0) deletions,
    coalesce(plusminus_lines, 0) plusminus_lines,
    sum(plusminus_lines) over (order by dim_calendar.d_date asc) loc,
    coalesce(changes, 0) changes,
    coalesce(commits_count, 0) commits_count,
    coalesce(comments_count, 0) comments_count,
    coalesce(commit_list_incomplete, 0)  commit_list_incomplete,
    coalesce(fixes, 0) fixes
from {{ ref("dim_calendar") }}
left join daily
    on dim_calendar.d_date = daily.d_date
order by dim_calendar.d_date desc