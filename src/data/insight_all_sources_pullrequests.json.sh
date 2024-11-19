#/usr/bin/env sh
source .env

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/dktunited/insight-all-sources/pulls?state=all&per_page=100&page=1" \
  > src/data/pr_1.json

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/dktunited/insight-all-sources/pulls?state=all&per_page=100&page=2" \
  > src/data/pr_2.json

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/dktunited/insight-all-sources/pulls?state=all&per_page=100&page=3" \
  > src/data/pr_3.json

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/dktunited/insight-all-sources/pulls?state=all&per_page=100&page=4" \
  > src/data/pr_4.json

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/dktunited/insight-all-sources/pulls?state=all&per_page=100&page=5" \
  > src/data/pr_5.json