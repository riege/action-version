# action-version
A GitHub action to determine the version for build artifacts.

## Versioning Scheme

The general idea is to generate a unique version string from the job context that is unique for each run, easy to read and compare, and clearly identifies the revision that was used.

| Ref Type     | Version | Example |
| ------------ | ------- | ------- |
| Git tag      | \<tagname\> | v1.3.2
| Branch       | \<branchname\>-\<runnumber\>-\<sha\>  | main-9-f025368a |
| Pull request | pr\<prnumber\>-\<runnumber\>-\<sha\> | pr9-1-89d735ed |

Tags are assumed to already satisfy these goals and are taken as-is. For other cases, the first part (branch name or PR number) tells whether two version can be compared, the second part (build number) allows to quickly tell versions apart, and the commit hash uniquely identifies the revision of the source that was build.

## Outputs

- **version**: The version string
- **version-without-v**: The version string, with a leading "v" removed for tags that resemble a version number
- **major**: The major part of a semantic version
- **minor**: The minor part of a semantic version
- **patch**: The remainder (after major and minor) of a semantic version

## Example Output Values

| Ref | Run | SHA | version | version-without-v | major | minor | patch |
| --- | --- | --- | ------- | ----------------- | ----- | ----- | ----- |
| refs/tags/v1| 9| a52f| v1| 1| 1| | |
| refs/tags/1.2.3| 9| a52f| 1.2.3| 1.2.3| 1| 2| 3|
| refs/tags/v1.2.3| 9| a52f| v1.2.3| 1.2.3| 1| 2| 3|
| refs/tags/1.2.3.4| 9| a52f| 1.2.3.4| 1.2.3.4| 1| 2| 3.4|
| refs/heads/main| 9| a52f| main-9-a52f| main-9-a52f| main| 9| a52f|
| refs/heads/stable| 9| a52f| stable-9-a52f| stable-9-a52f| stable| 9| a52f|
| refs/pull/1/merge| 9| a52f| pr1-9-a52f| pr1-9-a52f| pr1| 9| a52f|

## Example Usage
```
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  release:
    branches: [ main ]
    types: [published]

jobs:
  action_outputs:
    runs-on: ubuntu-latest
    name: Echo action's outputs
    steps:
    - id: version
      uses: riege/action-version@v1
    - run: |
        echo Version: ${{ steps.version.outputs.version }}
        echo Image tag: "${{ secrets.ACR_LOGIN_SERVER }}/my-container:${{ steps.version.outputs.version-without-v }}"
```
