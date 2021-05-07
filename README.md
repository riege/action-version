# action-version
A GitHub action to determine the version for build artifacts.

## Outputs
version: The version string

| CI/CD Build      | Version |
| ----------- | ----------- |
| Git tag x.y.z on master branch (a prefixed "v" is okay, too)     | X.Y.Z, X.Y, X, vX.Y.Z ... |
| Untagged main commit   | main-\<runnumber\>-\<sha\>        |
| Pull request | pr-\<prnumber\>-\<runnumber\>-\<sha\>

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
        echo Image tag: "${{ secrets.ACR_LOGIN_SERVER }}/my-container:${{ steps.version.outputs.version }}"
```
