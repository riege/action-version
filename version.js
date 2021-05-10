exports.get = function (ref, run, sha) {
    if (ref.startsWith('refs/tags/')) {
        return fromTag(ref.replace(/^refs\/tags\//, ''));
    }
    return fromRefRunSha(ref, run, sha);
};

function fromTag(tag) {
    let versionWithoutV = tag.replace(/^v(\d)/, '$1');
    let fields = versionWithoutV.split('.');
    return {
        version: tag,
        versionWithoutV: versionWithoutV,
        major: fields[0] || '',
        minor: fields[1] || '',
        patch: fields.slice(2).join('.') || '',
    };
}

function fromRefRunSha(ref, run, sha) {
    sha = sha.substr(0, 8);
    if (ref.startsWith('refs/pull/')) {
        ref = ref.replace(/^refs\/pull\/(\d+)\/.*/, 'pr-$1');
    } else {
        ref = ref.replace(/^refs\/heads\//, '');
    }
    return {
        version: `${ref}-${run}-${sha}`,
        versionWithoutV: `${ref}-${run}-${sha}`,
        major: ref,
        minor: run,
        patch: sha,
    };
}
