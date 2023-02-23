import rateLimit, {MemoryStore} from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: {success: false, message: "Too many request created from this IP, please try again after an hour"},
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    store: new MemoryStore(),
});

export default rateLimiter;
