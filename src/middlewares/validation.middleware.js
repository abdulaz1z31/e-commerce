import { z } from "zod";
import { logger } from "../utils/index.utils.js";

export const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errorMessages = result.error.errors.map((error) => error.message);
            logger.warn(errorMessages)
            return res.status(400).json({
                error: "validationError",
                details: errorMessages
            });
        } else {
            next();
        }
    };
};



export const pagination = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    req.pagination = { limit, skip, page };
    next();
};