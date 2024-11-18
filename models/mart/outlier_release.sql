

with outlier_week as (
    select
        *
    from {{ ref('fact_contribution')}}
    where abs(total_add) + abs(total_del) > 500
),
releases as (
    select 
        last(d_date) d_date,
        d_week,
        last(version) "version"
    from {{ ref('dim_release') }} 
    where not has_fix
    group by d_week
)


select 
    releases.d_date,
    releases.version,
    plusminus_lines,
    loc
from releases
inner join outlier_week
    on releases.d_week = outlier_week.d_week