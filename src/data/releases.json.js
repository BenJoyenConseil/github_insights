import { Octokit } from "octokit";
import dotenv from 'dotenv'; 

dotenv.config();

const gh_token = process.env.GITHUB_TOKEN
const gh_organization = process.env.GITHUB_ORG
const gh_repo = process.env.GITHUB_REPO

const octokit = new Octokit({
    auth: gh_token
})

const data = await octokit.paginate("GET /repos/{owner}/{repo}/releases", {
  owner: gh_organization,
  repo: gh_repo,
  per_page: 100,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

console.log(JSON.stringify(data))