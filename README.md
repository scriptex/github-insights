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
    - `--org`: a Github organisation
    - `--user`: a Github user
5. Wait for the script to fetch and transform the data from Github.
6. Check the `insights.json` file in the root of the project.

## LICENSE

MIT
