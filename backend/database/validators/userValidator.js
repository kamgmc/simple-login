module.exports = function (body) {
    const nameRegExpression = /^([a-zA-ZñÑ]+)(\D+)$/;
    const emailRegExpression = /^\w+[._\w]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    return body.firstName && body.lastName && body.email && body.password
        && nameRegExpression.test(body.firstName)
        && nameRegExpression.test(body.lastName)
        && emailRegExpression.test(body.email)
        && body.password.length > 7;
}