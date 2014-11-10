var status = {
    success : 200,
    notFound : 404,
    internalError : 500,
    unknown : 450,
    badRequest : 400,
    noPermission : 403
};

var getStatus = function(str) {
    if (status.hasOwnProperty(str)) {
        return status[str];
    }
    return status[unknown];
};

module.exports = getStatus;