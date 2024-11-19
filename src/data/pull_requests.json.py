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
pulls = repo.get_pulls(state='all', base='main')
data = []
for pr in pulls:
   data.append(pr.raw_data)
g.close()

stdout.write(json.dumps(data))