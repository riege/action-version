const core = require('@actions/core');
const getVersion = require('./version');

try {
    const version = getVersion.get(process.env.GITHUB_REF, process.env.GITHUB_RUN_NUMBER, process.env.GITHUB_SHA);
    core.setOutput("version", version);
} catch (error) {
    core.setFailed(error.message);
}
