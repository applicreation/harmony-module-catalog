const fs = require('fs');
const express = require('express');
const YAML = require('yaml');
const {graphql} = require("@octokit/graphql");

const app = express();
const port = 80;

app.set('view engine', 'pug');

app.get('/module/catalog', async (req, res) => {
    const config = getConfig();
    const graphqlWithAuth = graphql.defaults({
        headers: {
            authorization: `token ${config.github.token}`,
        },
    });

    const {search} = await graphqlWithAuth(`
{
  search(query: "org:${config.github.org} sort:name-asc", type: REPOSITORY, first: 10) {
     repositoryCount
    nodes {
      ... on Repository {
        name
        nameWithOwner
        url
        description
        visibility
        forkCount
        stargazerCount
        issues {
          totalCount
        }
        pullRequests {
          totalCount
        }
        languages(first: 10) {
          nodes {
            name
          }
        }
        repositoryTopics(first: 10) {
          nodes {
            topic {
              name
            }
          }
        }
      }
    }
  }
}
`);

    res.render('index', {count: search.repositoryCount, repos: search.nodes});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

function getConfig() {
    const regex = /\${{[A-Z0-9_]+}}/g;

    let file = fs.readFileSync('/root/.harmony/config/main.yaml', 'utf8');
    for (const match of file.match(regex)) {
        file = file.replace(match, process.env[match.slice(3, -2)] || null)
    }

    return YAML.parse(file);
}
