import bcrypt from "bcryptjs";
import config from "../config";
import logger from "../utils/logger";
import prisma from "./prisma";

const createSuperAdminOnStartup = async () => {
    try {
        const findSuperAdmin = await prisma.admin.findFirst({
            where: {email: config.server.SUPER_ADMIN_EMAIL, role: config.server.SUPER_ADMIN_ROLE},
        });
        if (findSuperAdmin) {
            logger.warn("super admin already exists");
            return;
        }
        const newAdmin = await prisma.admin.create({
            data: {
                email: config.server.SUPER_ADMIN_EMAIL,
                name: config.server.SUPER_ADMIN_NAME,
                role: config.server.SUPER_ADMIN_ROLE,
            },
        });
        const hashedPassword = await bcrypt.hash(config.server.SUPER_ADMIN_PASSWORD, 10);
        await prisma.users.create({
            data: {
                password: hashedPassword,
                username: newAdmin.name,
                email: newAdmin.email,
                isVerified: true,
                adminId: newAdmin.id,
            },
        });
        logger.info("super admin created on startup");
    } catch (error) {
        logger.info(error);
        process.exit(1);
    }
};

export default createSuperAdminOnStartup;
