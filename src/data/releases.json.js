import { Octokit } from "octokit";
import dotenv from 'dotenv'; 
dotenv.config();
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

const data = await octokit.paginate("GET /repos/{owner}/{repo}/releases", {
  owner: "dktunited",
  repo: "insight-all-sources",
  per_page: 100,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

console.log(JSON.stringify(data))