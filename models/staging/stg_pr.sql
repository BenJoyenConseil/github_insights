select 
    number,
    number as pr_id,
    -- dates
    createdAt as created_at,
    mergedAt as merged_at,
    closedAt as closed_at,

    title,
    state,
    bodyText as body,
    
     -- flags
    merged,
    closed,
    isDraft as is_draft,
    -- measures
    deletions,
    additions,
    changedFiles as changed_files_count,    
    totalCommentsCount as total_comments_count,
    -- nested collections
    commits,
from
    read_json('src/data/raw/pull_requests*.json')