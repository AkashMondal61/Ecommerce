class ErrorHandeler extends Error{
   
    constructor(message,statusCode){
        super(message);
        console.log("works");
        this.statusCode=statusCode;
    }
}
module.exports = ErrorHandeler; 