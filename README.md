# Pull Request Update Body Action

Prepend to or override a pull request's body.

## Inputs

### `ghToken`

_Required._ GitHub token.

### `body`

_Required._ Text to be added to the body.

### `override`

_Optional._ Should the body get overriden.

Default: `false`

## Example usage

```yaml
on:
  pull_request:
    types: [opened]
...

uses: Perdoo/pull-request-update-body-action@main
with:
  ghToken: ${{ secrets.GITHUB_TOKEN }}
  body: "Hello World!"
```
