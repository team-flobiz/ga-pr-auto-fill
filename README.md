# ga-pr-auto-fill
GitHub Action to auto fill PR fields

## Usage

```yml
# .github/workflows/main.yml
on:
  pull_request_target:
    types: [opened, reopened]

permissions:
  pull-requests: write

jobs:
  assign-author:
    name: Auto-assign author
    runs-on: ubuntu-latest
    steps:
      - uses: team-flobiz/ga-pr-auto-fill@v1.0.2
```
