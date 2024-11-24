import dotenv from 'dotenv'; 
import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

dotenv.config();
const gh_token = process.env.GITHUB_TOKEN
const gh_organization = process.env.GITHUB_ORG
const gh_repo = process.env.GITHUB_REPO
const gh_branch = process.env.GITHUB_BRANCH || "main"

const MyOctokit = Octokit.plugin(paginateGraphQL);
const octokit = new MyOctokit({ auth: gh_token });

const { repository } = await octokit.graphql.paginate(
  `query paginate($cursor: String, $organization: String!, $repo: String!, $branch: String!) {
    repository(owner: $organization, name: $repo) {
      pullRequests(baseRefName: $branch, first: 10, after: $cursor) {
        nodes {
          createdAt
          mergedAt
          closedAt
          number
          title
          additions
          deletions
          changedFiles
          bodyText
          totalCommentsCount
          merged
          closed
          isDraft
          state
          commits(first: 10) {
            edges {
              node {
                commit {
                  abbreviatedOid
                  committedDate
                  author {
                    email
                    name
                  }
                  message
                  additions
                  deletions
                  changedFilesIfAvailable
                }
              }
            }   
            pageInfo {
              hasNextPage
              endCursor
            }   
          }    
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }`,{
      organization: gh_organization,
      repo: gh_repo,
      // I trim the branch value because, make (-include .env) forward env variable with \n, 
      // I spend times to understand why it does not work when doing make download, 
      // but is working when invoking the script directly
      branch: gh_branch.trim() 
  },
);

console.log(JSON.stringify(repository.pullRequests.nodes))