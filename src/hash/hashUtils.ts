const crypto = require('crypto');

function sha512Hash(input) {
    const hash = crypto.createHash('sha512');
    hash.update(input);
    return hash.digest('hex');
}

module.exports = {
    sha512Hash
};
