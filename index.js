const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    let body = core.getInput("body", { trimWhitespace: false });
    const override = core.getInput("override")
      ? core.getBooleanInput("override")
      : false;
    const ghToken = core.getInput("ghToken");
    const octokit = github.getOctokit(ghToken);
    const { number: prNumber, repository } = github.context.payload;

    core.setSecret("ghToken");

    if (!override) {
      const { data: pullRequest } = await octokit.rest.pulls.get({
        repo: repository.name,
        owner: repository.owner.login,
        pull_number: prNumber,
      });

      if (pullRequest.body) {
        body += `\n${pullRequest.body}`;
      }
    }

    await octokit.rest.pulls.update({
      repo: repository.name,
      owner: repository.owner.login,
      pull_number: prNumber,
      body: body,
    });
  } catch (error) {
    core.setFailed(error);
  }
}

run();
