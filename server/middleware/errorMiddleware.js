// Error for any end point that is not found
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error that occurs in any of our routes
export const errorHandler = (err, req, res, next) => {
    // In case the status code is 200 we will change it to 500 for bad request
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // In case the error is coming from MongoDB
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = "Resourse not found";
    }

    res.status(statusCode).json({
        message,
        // This err.stack shows us the complete trace about in which file the error occured
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};