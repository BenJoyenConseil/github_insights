select
    d_isodate::date as d_date,
    list(pr_id) pr_ids,
    median(pr_duration) as med_duration,
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