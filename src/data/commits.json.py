import json
from sys import stdout
from github import Github
from environs import Env
from github import Auth

env = Env()
env.read_env()
token = env("GITHUB_TOKEN") 


auth = Auth.Token(token)
g = Github(auth=auth, per_page=100)

# Then play with your Github objects:
repo = g.get_repo("dktunited/insight-all-sources")
commits = repo.get_commits()
data = []
for c in commits:
   data.append(c.raw_data)
g.close()

stdout.write(json.dumps(data))