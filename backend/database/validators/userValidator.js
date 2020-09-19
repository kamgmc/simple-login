module.exports = function (body) {
    const nameRegExpression = /^([a-zA-ZñÑ]+)(\D+)$/;
    const emailRegExpression = /^\w+[._\w]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    return body.first_name && body.last_name && body.email && body.password
        && nameRegExpression.test(body.first_name)
        && nameRegExpression.test(body.last_name)
        && emailRegExpression.test(body.email)
        && body.password.length > 7;
}