# Github Insights

Get insights for your Github repositories

## How?

1. Clone this repository
2. Run `npm install` or `yarn install`
3. Copy `.env.example` to `.env` and add your Github Auth Token in the new `.env` file:
    ```sh
    TOKEN=qwettryrturyuyljhjshdg12312313
    ```
4. Run `npm start` or `yarn start` by provding at least one of the required arguments:
    - `--org`: a Github organisation name
    - `--user`: a Github user name
    - `--repository`: a Github repository in the following format `:owner/:repository` (`scrptex/github-insights`)
5. Wait for the script to fetch and transform the data from Github.
6. Check the `insights.json` file in the root of the project.

## About

This tool uses the 3rd version of the [Github REST API](https://developer.github.com/v3/).

`github-insights` collects the following data for your user's or organisation's repositories:

-   paths
-   views
-   forks
-   clones
-   commits
-   referrers
-   contributors

## LICENSE

MIT
