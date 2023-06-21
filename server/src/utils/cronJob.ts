/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-extraneous-dependencies
import job from "node-schedule";
import prisma from "../db/prisma";
import logger from "./logger";

const task = () => {
    job.scheduleJob("* * * * *", async () => {
        const findUsers = await prisma.users.findMany({
            where: {role: "Escort", isVerified: true},
        });
        for (let i = 0; i < findUsers.length; i++) {
            const findUserSub = await prisma.subscribtions.findUnique({where: {user_id: findUsers[i].user_id}});
            if (findUserSub) {
                const time = findUserSub.subscription_Duration;
                if (time) {
                    if (new Date(time).getTime() > new Date().getTime()) {
                        logger.info("doing nothing");
                    } else {
                        await prisma.users.update({where: {user_id: findUserSub.user_id}, data: {isVerified: false}});
                        await prisma.subscribtions.delete({where: {user_id: findUserSub.user_id}});
                    }
                }
            } else {
                await prisma.users.update({where: {user_id: findUsers[i].user_id}, data: {isVerified: false}});
            }
        }
    });
};

export default task;
