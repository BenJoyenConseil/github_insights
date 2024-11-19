#/usr/bin/env sh
source .env

curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/dktunited/insight-all-sources/stats/contributors
  