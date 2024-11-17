select
    d_date, 
    version, 
    author, 
    case when(regexp_matches(body, 'fix', 'i')) then TRUE else FALSE end has_fix,
    body
from {{ ref('stg_releases')}}