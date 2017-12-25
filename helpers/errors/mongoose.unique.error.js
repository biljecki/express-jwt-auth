module.exports.generateErrorResponse = function(errors) {
    return  {
        success: "false",        
        mongooseUniqueErrors: errors
    }
}