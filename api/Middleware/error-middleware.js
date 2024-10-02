const errorhandlerMiddleware = async (err,req,res,next) =>{


    const status = err.status || 500;
    const message = err.message || "Internal server error";
    const extraDetails = err.extraDetails || "something went wrong";


    return res.status(status).json({message
    ,extraDetails});
}

module.exports = errorhandlerMiddleware;