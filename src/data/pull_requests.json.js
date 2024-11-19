import dotenv from 'dotenv'; 
import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

dotenv.config();
const gh_token = process.env.GITHUB_TOKEN
const gh_organization = process.env.GITHUB_ORG
const gh_repo = process.env.GITHUB_REPO

const MyOctokit = Octokit.plugin(paginateGraphQL);
const octokit = new MyOctokit({ auth: gh_token });

const { repository } = await octokit.graphql.paginate(
  `query paginate($cursor: String, $organization: String!, $repo: String!) {
    repository(owner: $organization, name: $repo) {
      pullRequests(baseRefName: "main", first: 10, after: $cursor) {
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
  },
);

console.log(JSON.stringify(repository.pullRequests.nodes))