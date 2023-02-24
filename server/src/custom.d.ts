/* eslint-disable @typescript-eslint/no-empty-interface */
// eslint-disable-next-line import/no-extraneous-dependencies
import {users} from "@prisma/client";

declare global {
    namespace Express {
        interface User extends users {}
    }
}
