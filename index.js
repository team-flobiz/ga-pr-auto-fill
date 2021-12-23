const core = require('@actions/core');
const github = require('@actions/github');

async function execute() {
    try {
        // Get token.
        const token = core.getInput("repo-access-token", { required: true });
    
        // Check if PR payload exists.
        if (context.payload.pull_request === undefined) {
            throw new Error("Can't get pull_request payload. Check you trigger pull_request event");
        }
    
        // Extract PR payload.
        const { assignees, number, user: { login: author, type } } = context.payload.pull_request;
    
        // Skip assignment if PR is already assigned to someone. Else set author=assignee.
        if (assignees.length > 0) {
            core.info(`Assigning author has been skipped since the pull request is already assigned to someone`);
        } else {
            const octokit = github.getOctokit(token);
            await octokit.rest.issues.addAssignees({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                issue_number: number,
                assignees: [author]
            });
            core.info(`@${author} has been assigned to the pull request: #${number}`);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

execute();