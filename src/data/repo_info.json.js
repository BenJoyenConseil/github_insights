import dotenv from 'dotenv'; 

dotenv.config();

const gh_organization = process.env.GITHUB_ORG
const gh_repo = process.env.GITHUB_REPO

const data = {
    gh_organization: gh_organization,
    gh_repo: gh_repo
}
console.log(JSON.stringify(data))