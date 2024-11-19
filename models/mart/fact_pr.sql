select 
    pr_id,
    -- dates
    created_at,
    merged_at,
    closed_at,
    date_diff('hour', created_at, merged_at) as pr_duration,
    case when(closed_at is not NULL) then strftime(closed_at, '%x') else strftime(created_at, '%x') end as d_date,

    title,
    state,
    body,
    
     -- flags
    merged,
    closed,
    is_draft,
    case when(regexp_matches(body, 'fix', 'i')) then TRUE else FALSE end has_fix,
    commits.pageInfo.hasNextPage as has_more_than_10_commits,

    -- measures
    deletions,
    additions,
    changed_files_count,
    total_comments_count,
    array_length(commits.edges) total_commits_count
from
    {{ ref('stg_pr') }}