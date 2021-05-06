const core = require('@actions/core');
const version = require('./version');

try {
    const outputs = version.get(process.env.GITHUB_REF, process.env.GITHUB_RUN_NUMBER, process.env.GITHUB_SHA);
    core.setOutput("version", outputs.version);
    core.setOutput("version-without-v", outputs.versionWithoutV);
    core.setOutput("major", outputs.major);
    core.setOutput("minor", outputs.minor);
    core.setOutput("patch", outputs.patch);
} catch (error) {
    core.setFailed(error.message);
}
