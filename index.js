const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    let body = core.getInput('body');
    const override = core.getInput('override') == 'true';
    const ghToken = core.getInput('ghToken');
    const octokit = github.getOctokit(ghToken);
    const prNumber = github.context.payload.number;
    const repository = github.context.payload.repository;

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

    try {
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
