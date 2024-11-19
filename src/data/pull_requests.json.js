import dotenv from 'dotenv'; 
import { Octokit } from "@octokit/core";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";
import { request } from "@octokit/request";

dotenv.config();
const token = process.env.GITHUB_TOKEN

const MyOctokit = Octokit.plugin(paginateGraphQL);
const octokit = new MyOctokit({ auth: token });

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
      organization: "dktunited",
      repo: "insight-all-sources",
  },
);

console.log(JSON.stringify(repository.pullRequests.nodes))