/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import {Prisma, Reviews, users} from "@prisma/client";
import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import HTTP_STATUS_CODE from "../../constants/httpCodes";
import prisma from "../../db/prisma";
import logger from "../../utils/logger";
import config from "../../config";
import sendEmail from "../../common/sendEmail";
import emailLink from "../../common/emailLink";
import verifyEmail from "../../common/verifyEmail";
import streamUpload from "../../utils/streamifier";

export async function getAllEscort(req: Request, res: Response) {
    try {
        const allEscort = await prisma.users.findMany({
            where: {role: "Escort"},
            include: {Images: true, description: true, Reviews: true},
        });
        return res.status(200).json({message: "escort gotten", allEscort, success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function getAdmin(req: Request, res: Response) {
    const {username} = req.params;
    try {
        const findAdmin = await prisma.users.findUnique({where: {username}});
        if (!findAdmin) return res.status(400).json({message: "admin not found", success: false});
        return res.status(200).json({message: "admin gotten", success: true, user: findAdmin});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function getEscort(req: Request, res: Response) {
    const {username} = req.params;
    try {
        const findUser = await prisma.users.findUnique({where: {username}});
        if (!findUser) return res.status(400).json({message: "user not gotten", success: false});
        const user = await prisma.users.findUniqueOrThrow({
            where: {username},
            include: {Images: true, description: true, Reviews: true},
        });
        return res.status(200).json({message: "user gotten", success: true, user});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export const addUser = async (req: Request, res: Response) => {
    const {user_id} = req.user as users;
    const {phone, email, username, password, city, country, state, role} = req.body;
    try {
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findAdmin) return res.status(400).json({message: "user not found", success: false});
        if (!findAdmin.adminId)
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "only admin can add users", success: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        if (role === "Admin") {
            const aminCreate = await prisma.admin.create({data: {email, name: username, role: "Admin"}});
            await prisma.users.create({
                data: {password: hashedPassword, username, email, phone, adminId: aminCreate.id},
            });
            return res.status(200).json({message: "user created", success: true});
        }
        const user = await prisma.users.create({
            data: {password: hashedPassword, username, email, phone, emailVerified: true},
        });
        const item = await prisma.description.create({data: {userId: user.user_id, country, city, state}});
        await prisma.users.update({where: {user_id: user.user_id}, data: {descriptionId: item.escort_id}});
        return res.status(200).json({message: "user created", success: true});
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "error on login", error, success: false});
    }
};

export const verifyUser = async (req: Request, res: Response) => {
    const {email} = req.body;
    const {user_id} = req.user as users;
    try {
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findAdmin) return res.status(400).json({message: "user not found", success: false});
        if (!findAdmin.adminId)
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "only admin can add users", success: false});
        const findUser = await prisma.users.findUnique({where: {email}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        if (findUser.isVerified) {
            await prisma.users.update({where: {email}, data: {isVerified: false}});
            return res.status(200).json({message: "user verified", success: true});
        }
        await prisma.users.update({where: {email}, data: {isVerified: true}});
        return res.status(200).json({message: "user verified", success: true});
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "error on login", error, success: false});
    }
};

export const verifyByMail = async (req: Request, res: Response) => {
    const {email} = req.body;

    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const token = jwt.sign({id: findUser.user_id, email: findUser.email}, config.server.secret);
        try {
            await sendEmail(findUser.email, "Email Verification", verifyEmail(emailLink(token)));
        } catch (error) {
            logger.info(error);

            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
        }

        return res.status(200).json({message: "email sent", success: true});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};
export async function updateAdminProfileDetails(req: Request, res: Response) {
    const {
        city,
        currency,
        state,
        country,
        build,
        height,
        bustsize,
        orientation,
        anal,
        oralSex,
        condom,
        smoke,
        ethnicity,
        age,
        shorttime,
        overnight,
        gender,
        looks,
        bj,
        GFExperience,
        sixtynine,
        BDSM,
        weekend,
        outCallShortTime,
        outCallOverNight,
        outCallWeekend,
        bdsmGiving,
        analRimming,
        attendingParties,
        beachParties,
        beingFilmed,
        bodyWorship,
        cumInMoutn,
        cumOnBody,
        cumOnFace,
        FrenchKiss,
        domesticCarer,
        dominationGiving,
        dominationRecieving,
        doublePenetration,
        eroticMassage,
        faceSitting,
        femaleStripper,
        fetish,
        foodplay,
        gangBang,
        goldenShower,
        humiliation,
        handJob,
        insemination,
        lapDancing,
        maleStripper,
        massage,
        modelling,
        pegging,
        preparingMeal,
        pregnant,
        periodPlay,
        oralWithCondom,
        oralWithoutCondom,
        email,
        phone,
        displayName,
        bio,
    } = req.body;
    const {user_id} = req.user as unknown as users;
    const {username} = req.params;
    try {
        const findUser = await prisma.users.findUnique({where: {username}});
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});
        if (!findAdmin || !findAdmin.adminId) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});
        }
        await prisma.users.update({where: {username}, data: {username, email, phone}});
        if (!findUser.descriptionId) {
            const item = await prisma.description.create({
                data: {
                    BustSize: bustsize,
                    orientation,
                    currency,
                    oralSex,
                    city,
                    state,
                    country,
                    ethnicity,
                    smoke,
                    age,
                    shortTimeRate: shorttime,
                    overNightRate: overnight,
                    anal,
                    condom,
                    build,
                    height,
                    userId: findUser.user_id,
                    gender,
                    looks,
                    bj,
                    GFExperience,
                    sixtynine,
                    BDSM,
                    weekend,
                    outCallShortTime,
                    outCallOverNight,
                    outCallWeekend,
                    bdsmGiving,
                    analRimming,
                    attendingParties,
                    beachParties,
                    beingFilmed,
                    bodyWorship,
                    cumInMoutn,
                    cumOnBody,
                    cumOnFace,
                    FrenchKiss,
                    domesticCarer,
                    dominationGiving,
                    dominationRecieving,
                    doublePenetration,
                    eroticMassage,
                    faceSitting,
                    femaleStripper,
                    fetish,
                    foodplay,
                    gangBang,
                    goldenShower,
                    humiliation,
                    handJob,
                    insemination,
                    lapDancing,
                    maleStripper,
                    displayName,
                    massage,
                    modelling,
                    pegging,
                    preparingMeal,
                    pregnant,
                    periodPlay,
                    oralWithCondom,
                    oralWithoutCondom,
                    bio,
                },
            });
            await prisma.users.update({where: {username}, data: {descriptionId: item.escort_id}});

            return res.status(200).json({message: "details updated", success: true});
        }
        await prisma.users.update({where: {username}, data: {username, email, phone}});
        await prisma.description.update({
            where: {userId: findUser.user_id},
            data: {
                BustSize: bustsize,
                orientation,
                oralSex,
                currency,
                city,
                state,
                country,
                ethnicity,
                smoke,
                age,
                sixtynine,
                shortTimeRate: shorttime,
                overNightRate: overnight,
                anal,
                condom,
                build,
                height,
                displayName,
                gender,
                looks,
                bj,
                GFExperience,
                BDSM,
                weekend,
                outCallShortTime,
                outCallOverNight,
                outCallWeekend,
                bdsmGiving,
                analRimming,
                attendingParties,
                beachParties,
                beingFilmed,
                bodyWorship,
                cumInMoutn,
                cumOnBody,
                cumOnFace,
                FrenchKiss,
                domesticCarer,
                dominationGiving,
                dominationRecieving,
                doublePenetration,
                eroticMassage,
                faceSitting,
                femaleStripper,
                fetish,
                foodplay,
                gangBang,
                goldenShower,
                humiliation,
                handJob,
                insemination,
                lapDancing,
                maleStripper,
                massage,
                modelling,
                pegging,
                preparingMeal,
                pregnant,
                periodPlay,
                oralWithCondom,
                oralWithoutCondom,
                bio,
            },
        });

        return res.status(200).json({message: "details updated", success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e.message);
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: e.message,
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export const deleteUserImage = async (req: Request, res: Response) => {
    const {image, username} = req.body;
    // const {username} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {username}, include: {Images: true}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const getImages = await prisma.images.findMany({where: {userId: findUser.user_id, images: image}});
        if (getImages && getImages[0].images) {
            const striped = getImages[0].images.split("/")[7].split(".")[0];
            try {
                await cloudinary.uploader.destroy(striped);
            } catch (error) {
                logger.info(error);

                return res
                    .status(HTTP_STATUS_CODE.BAD_REQUEST)
                    .json({message: "an error occured", error, success: false});
            }
        }
        await prisma.images.delete({where: {imageId: getImages[0].imageId}});
        return res.status(200).json({message: "Image Deleted", success: true, findUser});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};
export async function deleteVideo(req: Request, res: Response) {
    const {user_id} = req.user as users;
    const {username} = req.params;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const striped = findUser.video?.split("/")[7].split(".")[0];
        if (striped) {
            try {
                await cloudinary.uploader.destroy(striped);
            } catch (error) {
                logger.info(error);

                return res
                    .status(HTTP_STATUS_CODE.BAD_REQUEST)
                    .json({message: "an error occured", error, success: false});
            }
        }
        await prisma.users.update({where: {username}, data: {video: ""}});
        return res.status(200).json({message: "video deleted", success: true});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
}

export const uploadVideo = async (req: Request, res: Response) => {
    const {username} = req.params;
    const {user_id} = req.user as users;
    try {
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findAdmin || !findAdmin.adminId) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not an admin", success: false});
        }
        const findUser = await prisma.users.findUnique({where: {username}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});

        if (!req.file) return res.status(400).json({message: "file needed", success: false});
        const data = await streamUpload(req.file.buffer);

        if (data.message)
            return res.status(data.http_code).json({message: "an error occured", err: data.message, success: false});
        await prisma.users.update({where: {user_id: findUser.user_id}, data: {video: data.secure_url}});
        return res.status(200).json({message: "video updated", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on uploading a user video", success: false});
    }
};

export async function uploadImages(req: Request, res: Response) {
    const {username} = req.params;
    const {user_id} = req.user as users;
    try {
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findAdmin || !findAdmin.adminId) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not an admin", success: false});
        }
        const findUser = await prisma.users.findUnique({where: {username}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const files = req.files as Express.Multer.File[];
        if (files.length > 4 && !findUser.isVerified)
            return res
                .status(HTTP_STATUS_CODE.BAD_REQUEST)
                .json({message: "you have to be verified to upload more than four images", success: false});

        // eslint-disable-next-line consistent-return
        files.forEach(async file => {
            const result = await streamUpload(file.buffer);
            if (result.message) return res.status(result.http_code).json({message: result.message, success: false});
            await prisma.images.create({data: {userId: findUser.user_id, images: result.secure_url}});
        });
        return res.status(200).json({message: "images updated", success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}
export async function uploadProfilePic(req: Request, res: Response) {
    const {username} = req.params;
    const {user_id} = req.user as users;
    try {
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findAdmin || !findAdmin.adminId) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not an admin", success: false});
        }
        const findUser = await prisma.users.findUnique({where: {username}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        logger.info(req.file);
        const files = req.file as Express.Multer.File;
        const result = await streamUpload(files.buffer);
        if (result.message) return res.status(result.http_code).json({message: result.message, success: false});
        await prisma.users.update({where: {user_id: findUser.user_id}, data: {profilePhoto: result.secure_url}});
        return res.status(200).json({message: "images updated", success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, a new user cannot be created with this email",
                    success: false,
                });
            }
            logger.info(e);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({error: e, success: false});
        }
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function getSubscriptions(req: Request, res: Response) {
    try {
        logger.info("is this mad");
        const subscriptions = await prisma.subscribtions.findMany({include: {users: true}});
        return res.status(200).json({subscriptions, message: "subscriptions gotten", success: true});
    } catch (error) {
        logger.info(error);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error, message: "an error occured on getting subscriptions", success: false});
    }
}

export async function getReviews(req: Request, res: Response) {
    try {
        const getAllReviews = await prisma.reviews.findMany({});
        return res.status(200).json({message: "reviews gotten", getAllReviews, success: true});
    } catch (error) {
        logger.info(error);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error, message: "an error occured on getting subscriptions", success: false});
    }
}

export async function deleteReview(req: Request, res: Response) {
    const {user_id} = req.user as users;
    const {reviewId} = req.params;
    try {
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findAdmin || !findAdmin.adminId) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not an admin", success: false});
        }
        const findReview = await prisma.reviews.findUnique({where: {reviewId: Number(reviewId)}});
        if (!findReview) return res.status(400).json({message: "review not found", success: false});
        await prisma.reviews.delete({where: {reviewId: Number(reviewId)}});
        return res.status(200).json({message: "review deleted", success: true});
    } catch (error) {
        logger.info(error);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error, message: "an error occured on getting subscriptions", success: false});
    }
}

export async function editReview(req: Request, res: Response) {
    const {reviewId} = req.params;
    const {user_id} = req.user as users;
    const {review} = req.body;
    try {
        const findAdmin = await prisma.users.findUnique({where: {user_id}});
        if (!findAdmin || !findAdmin.adminId) {
            return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not an admin", success: false});
        }
        const findReview: Reviews | null = await prisma.reviews.findUnique({where: {reviewId: Number(reviewId)}});
        if (!findReview) return res.status(400).json({message: "review not found", success: false});
        await prisma.reviews.update({where: {reviewId: Number(reviewId)}, data: {review}});
        return res.status(200).json({message: "review updated", success: true});
    } catch (error) {
        logger.info(error);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error, message: "an error occured on getting subscriptions", success: false});
    }
}
