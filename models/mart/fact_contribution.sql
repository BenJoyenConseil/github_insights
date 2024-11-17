with weekly_contrib as (
    select 
        year(d_date) d_year, 
        month(d_date) d_month, 
        yearweek(d_date) d_week, 
        strftime(d_date, '%x') d_date, 
        sum(additions) as total_add, 
        sum(deletions) as total_del, 
        sum(commits) as total_commits,
        sum(case when(commits > 0) then 1 else 0 end) as contributors,
        sum(additions) - sum(deletions) plusminus_lines
    from {{ ref('stg_contributors') }} 
    group by 
        d_year, 
        d_month,  
        d_week, 
        d_date 
),
total_lines_of_code as (
    select
        weekly_contrib.d_date,
        sum(weekly_contrib.plusminus_lines) over (order by d_date asc) as loc, 
    from weekly_contrib
),
weekly_releases as (
    select
        list(version) as versions,
        first(version) as latest_version,
        yearweek(d_date) d_week
    from {{ ref('dim_release') }}
    group by d_week
)

select
    *
from weekly_contrib
join total_lines_of_code
    on weekly_contrib.d_date = total_lines_of_code.d_date
join weekly_releases
    on weekly_releases.d_week = weekly_contrib.d_week
order by weekly_contrib.d_date desc