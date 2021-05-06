exports.get = function (ref, run, sha) {
    sha = sha.substr(0, 8);

    if(ref.startsWith('refs/tags/')) {
        return ref.replace(/^refs\/tags\//, '');
    }

    if(ref.startsWith('refs/pull/')) {
        ref = ref.replace(/^refs\/pull\/(\d+)\/.*/, 'pr-$1');
    }
    else {
        ref = ref.replace(/^refs\/heads\//, '');
    }

    return `${ref}-${run}-${sha}`;
};
