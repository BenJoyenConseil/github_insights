select
    d_date, 
    version, 
    author, 
    case when('fix' in body or 'Fix' in body) then TRUE else FALSE end has_fix
from {{ ref('stg_releases')}}