const errorHandeler = (err,req,res,next) => {
    console.log(err.stack);
    res.status(500).json({
        status: "error",
        message: "something went wrong",
        stack: err.stack,
    });
}

export default errorHandeler;

