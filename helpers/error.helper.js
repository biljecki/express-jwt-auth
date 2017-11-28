module.exports.generateErrorResponse = function(errorCode, errorMsg) {
    return  {
        success: "false",
        errorCode: errorCode || null,
        errorMsg: errorMsg || null
        
    }
}