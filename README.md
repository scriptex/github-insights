# Github Insights

> Get insights for your Github repositories

[Start using the live application now](https://github-repository-insights.now.sh/)

## Local usage

1. Clone this repository
2. Run `npm install` or `yarn`
3. Copy `.env.example` to `.env` and add your Github Auth Token in the new `.env` file:
    ```sh
    TOKEN=your_github_token
    ```
4. Run `npm fetch` or `yarn fetch` by provding at least one of the required arguments:
    - `--org`: a Github organisation name
    - `--user`: a Github user name
    - `--repository`: a Github repository in the following format `:owner/:repository` (`scriptex/github-insights`)
5. Wait for the script to fetch and transform the data from Github.
6. Check the `insights.json` file in the root of the project.

## Frontend

There is a frontend application included built with Parcel and React using Recharts.

**The application is still a work in progress.**

The deployment is taken care of by Vercel.

If you want to experience the full capabilities of this package locally then you need to create your own Vercel account, install the `now cli` and run `now dev` after you linked your clone/fork with Vercel.

More on this later.

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
