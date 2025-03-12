export const asyncHandler = (localFunction) => {
    return (req, res, next) => {
        Promise.resolve(localFunction(req, res, next)).catch(err => next(err))
    }
}