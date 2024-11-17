select 
    published_at::date as d_date, 
    name as version, 
    author.login as author, 
    prerelease, 
    draft,
    body,
from   
    read_json('src/data/raw/releases*.json')