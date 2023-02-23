/* eslint-disable @typescript-eslint/no-empty-interface */
import {users} from "@prisma/client";

declare global {
    namespace Express {
        interface User extends users {}
    }
}
