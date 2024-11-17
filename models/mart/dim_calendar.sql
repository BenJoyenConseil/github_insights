{{
    config(
        materialized = "view"
    )
}}

select 
    generate_series::date as d_date,
    date_part('week', d_date) as d_week,
    month(d_date) as d_month,
    year(d_date) as d_year,
    quarter(d_date) as d_quarter
from
    generate_series(
        DATE '2023-01-01', 
        current_date(), 
        INTERVAL '1' 
    DAY)
order by d_date desc