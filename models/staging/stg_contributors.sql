select 
    author.login, 
    to_timestamp(unnest(weeks).w)::date as d_date, 
    unnest(weeks).a as additions, 
    unnest(weeks).d as deletions, 
    unnest(weeks).c as commits 
from 
    read_json('src/data/raw/contributions*.json')
