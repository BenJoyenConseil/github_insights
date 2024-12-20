select
    d_date, 
    strftime(d_date, '%x') d_isodate, 
    yearweek(d_date) d_week, 
    version, 
    author, 
    case when(regexp_matches(body, 'fix', 'i')) then TRUE else FALSE end has_fix,
    body
from {{ ref('stg_releases')}}
order by d_isodate desc