/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import {description, Images, Prisma, Reviews, users} from "@prisma/client";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import HTTP_STATUS_CODE from "../../constants/httpCodes";
import prisma from "../../db/prisma";
import logger from "../../utils/logger";
import {IUser} from "./auth.interfaces";
import config from "../../config";
import streamUpload from "../../utils/streamifier";
import sendEmail from "../../common/sendEmail";
import generateOtp from "../../common/generateOtp";
import verifyEmailCode from "../../common/verifyEmailCode";

export const registerAsEscort = async (req: Request, res: Response) => {
    const {phone, email, username, password} = req.body;
    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        if (findUser)
            return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user already exists", success: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.users.create({
            data: {email, username, password: hashedPassword, phone},
            include: {description: true},
        });
        const token = jwt.sign({id: user.user_id}, config.server.secret);
        const otp = generateOtp();
        await prisma.users.update({where: {user_id: user.user_id}, data: {otp: otp.toString()}});
        try {
            await sendEmail(email, "Email Verification", verifyEmailCode(otp.toString()));
        } catch (error) {
            logger.info(error);

            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
        }

        return res.status(201).json({
            message: "user created",
            user,
            success: true,
            token,
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            logger.info(e);
            if (e.code === "P2002") {
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
};

export const verifyEmailToken = async (req: Request, res: Response) => {
    const {user_id} = req.user as users;
    const {otp} = req.body;
    try {
        const user = await prisma.users.findUnique({where: {user_id}, include: {Images: true, description: true}});
        if (!user) return res.status(400).json({message: "user not found", success: false});
        if (otp !== user.otp) {
            return res.status(400).json({success: false, message: "otp incorrect"});
        }
        await prisma.users.update({where: {user_id}, data: {emailVerified: true}});
        return res.status(200).json({message: "email verified", success: true, user});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};
export const verifyForgotPasswordCode = async (req: Request, res: Response) => {
    const {otp, email} = req.body;
    try {
        const user = await prisma.users.findUnique({where: {email}, include: {Images: true, description: true}});
        if (!user) return res.status(400).json({message: "user not found", success: false});
        if (otp !== user.otp) {
            return res.status(400).json({success: false, message: "otp incorrect"});
        }
        return res.status(200).json({message: "email verified", success: true, user});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};

export const resendCode = async (req: Request, res: Response) => {
    const {user_id, email} = req.user as users;
    try {
        const otp = generateOtp();
        await prisma.users.update({where: {user_id}, data: {otp: otp.toString()}});
        try {
            await sendEmail(email, "Email Verification", verifyEmailCode(otp.toString()));
        } catch (error) {
            logger.info(error);

            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
        }
        return res.status(200).json({message: "new otp sent", success: true});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};
export const sendCode = async (req: Request, res: Response) => {
    const {email} = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: {email},
            include: {Images: true, description: true, Reviews: true},
        });
        if (!user) return res.status(400).json({message: "no user with such email", success: true});
        const otp = generateOtp();
        await prisma.users.update({where: {email}, data: {otp: otp.toString()}});
        try {
            await sendEmail(email, "Email Verification", verifyEmailCode(otp.toString()));
        } catch (error) {
            logger.info(error);

            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
        }
        return res.status(200).json({message: "new otp sent", success: true, user});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};

export const phaseOne = async (req: Request, res: Response) => {
    const {displayName, phone, country, city, state, age, gender} = req.body;
    const {user_id} = req.user as users;
    try {
        const user = await prisma.users.findUnique({
            where: {user_id},
            include: {Images: true, description: true, Reviews: true},
        });
        if (!user) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user not found", success: false});
        // const findDesc = await prisma.description.findUnique({where: {userId: user_id}})
        if (!user.descriptionId || user.descriptionId === null) {
            const item: description = await prisma.description.create({
                data: {userId: user_id, city, country, state, displayName, age, gender},
            });
            await prisma.users.update({where: {user_id}, data: {phone, descriptionId: item.escort_id}});
            return res.status(200).json({message: "profile updated", success: true, user});
        }
        await prisma.description.update({
            where: {userId: user_id},
            data: {displayName, state, city, country, gender, age},
        });
        await prisma.users.update({where: {user_id}, data: {phone}});
        return res.status(200).json({message: "profile updated", success: true, user});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};

export const phaseTwo = async (req: Request, res: Response) => {
    const {bio, ethnicity, height, build, looks, orientation, smoke} = req.body;
    const {user_id} = req.user as users;
    try {
        const user = await prisma.users.findUnique({
            where: {user_id},
            include: {Images: true, description: true, Reviews: true},
        });
        if (!user) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user not found", success: false});
        await prisma.description.update({
            where: {userId: user_id},
            data: {bio, ethnicity, height, build, looks, orientation, smoke},
        });
        return res.status(200).json({message: "profile updated", success: true, user});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};

export const phaseThree = async (req: Request, res: Response) => {
    const {user_id} = req.user as users;
    const {
        sixtynine,
        anal,
        bdsm,
        bj,
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
        pegging,
        preparingMeal,
        pregnant,
        oralWithCondom,
    } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: {user_id},
            include: {Images: true, description: true, Reviews: true},
        });
        if (!user) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user not found", success: false});
        await prisma.description.update({
            where: {userId: user_id},
            data: {
                oralWithCondom,
                pregnant,
                preparingMeal,
                pegging,
                massage,
                maleStripper,
                lapDancing,
                sixtynine,
                fetish,
                handJob,
                humiliation,
                femaleStripper,
                insemination,
                gangBang,
                foodplay,
                goldenShower,
                faceSitting,
                cumOnBody,
                cumInMoutn,
                cumOnFace,
                domesticCarer,
                doublePenetration,
                eroticMassage,
                anal,
                bdsmGiving,
                BDSM: bdsm,
                bj,
                analRimming,
                attendingParties,
                beachParties,
                beingFilmed,
                bodyWorship,
                FrenchKiss,
                dominationGiving,
                dominationRecieving,
            },
        });
        return res.status(200).json({message: "profile updated", success: true, user});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};

export const phaseFour = async (req: Request, res: Response) => {
    const {user_id} = req.user as users;
    const {shortTimeRate, overNightRate, weekend, outCallShortTime, outCallOverNight, outCallWeekend, currency} =
        req.body;

    try {
        const user = await prisma.users.findUnique({
            where: {user_id},
            include: {Images: true, description: true, Reviews: true},
        });
        if (!user) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({message: "user not found", success: false});
        await prisma.description.update({
            where: {userId: user_id},
            data: {shortTimeRate, overNightRate, weekend, outCallOverNight, outCallShortTime, outCallWeekend, currency},
        });
        return res.status(200).json({message: "profile updated", success: true, user});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};

export const blacklistUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {adminId} = req.user as unknown as users;
    try {
        const findAdmin = await prisma.users.findFirst({where: {adminId}});
        if (!findAdmin) return res.status(400).json({message: "addmin does not exist", success: false});
        const findUser = await prisma.users.findUnique({where: {user_id: Number(id)}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        await prisma.users.update({where: {user_id: Number(id)}, data: {accountStatus: 123456789}});
        return res.status(200).json({message: "user banned", success: true});
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
};

export async function unblaclikstUser(req: Request, res: Response) {
    const {id} = req.params;
    const {adminId} = req.user as unknown as users;
    try {
        const findAdmin = await prisma.users.findFirst({where: {adminId}});
        if (!findAdmin) return res.status(400).json({message: "addmin does not exist", success: false});
        const findUser = await prisma.users.findUnique({where: {user_id: Number(id)}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        await prisma.users.update({where: {user_id: Number(id)}, data: {accountStatus: 1234567890}});
        return res.status(200).json({message: "user banned", success: true});
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

export const login = async (req: Request, res: Response) => {
    const {user_id, adminId} = req.user as unknown as IUser;
    try {
        if (adminId) {
            const user = await prisma.users.findUnique({where: {adminId}});
            if (!user) return res.status(400).json({message: "admin not found"});
            const token = jwt.sign({id: user.user_id}, config.server.secret);
            return res.status(200).json({message: "login successful", success: true, user, token});
        }
        const user = await prisma.users.findUnique({
            where: {user_id},
            include: {Images: true},
        });
        await prisma.users.update({where: {user_id}, data: {login_at: new Date()}});
        if (!user) return res.status(400).json({message: "user not found"});
        const token = jwt.sign({id: user_id}, config.server.secret);
        return res.status(200).json({message: "login successful", success: true, user, token});
    } catch (error) {
        logger.info(error);
        return res.status(400).json({message: "error on login", error, success: false});
    }
};

export async function upLoadImage(req: Request, res: Response) {
    const {user_id} = req.user as unknown as IUser;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        if (!req.file) return res.status(400).json({message: "file needed", success: false});
        const data = await streamUpload(req.file.buffer);
        if (data.message)
            return res.status(data.http_code).json({message: "an error occured", err: data.message, success: false});
        await prisma.users.update({where: {user_id}, data: {profilePhoto: data.secure_url}});
        return res.status(200).json({
            message: "photo updated",
            findUser,
            success: true,
        });
    } catch (error) {
        logger.info(error);
        return res.status(200).json({message: "an error occured on photo change", error, success: false});
    }
}

export const updateProfileImage = async (req: Request, res: Response) => {
    const {user_id} = req.user as unknown as IUser;

    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        if (!req.file) return res.status(400).json({message: "file needed", success: false});
        const striped = findUser.profilePhoto?.split("/")[7].split(".")[0];
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
        const data = await streamUpload(req.file.buffer);
        if (data.message)
            return res.status(data.http_code).json({message: "an error occured", err: data.message, success: false});
        await prisma.users.update({where: {user_id}, data: {profilePhoto: data.secure_url}});
        const user = await prisma.users.findUnique({
            where: {user_id},
            include: {description: true, Images: true, Reviews: true},
        });
        return res.status(200).json({
            message: "photo updated",
            user,
            success: true,
        });
    } catch (error) {
        logger.info(error);
        return res.status(200).json({message: "an error occured on photo change", error, success: false});
    }
};

export async function updateProfileDetails(req: Request, res: Response) {
    const {
        city,
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
        displayName,
        phone,
    } = req.body;
    const {user_id} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});

        if (phone) {
            await prisma.users.update({where: {user_id}, data: {phone}});
        }
        if (!findUser.descriptionId || findUser.descriptionId === null) {
            const item = await prisma.description.create({
                data: {
                    BustSize: bustsize,
                    orientation,
                    oralSex,
                    displayName,
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
                    userId: user_id,
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
                },
            });
            await prisma.users.update({where: {user_id}, data: {descriptionId: item.escort_id}});
            const user = await prisma.users.findUnique({
                where: {user_id},
                include: {description: true, Images: true, Reviews: true},
            });
            return res.status(200).json({message: "details updated", user, success: true});
        }
        await prisma.description.update({
            where: {userId: user_id},
            data: {
                BustSize: bustsize,
                displayName,
                orientation,
                oralSex,
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
            },
        });
        const user = await prisma.users.findUnique({where: {user_id}, include: {description: true, Images: true}});
        return res.status(200).json({message: "details updated", user, success: true});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info(e);
                logger.info("There is a unique constraint violation, a new user ");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                    message: "There is a unique constraint violation, ",
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

export async function uploadImages(req: Request, res: Response) {
    const {user_id} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
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
            await prisma.images.create({data: {userId: user_id, images: result.secure_url}});
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
export async function uploadImagesOnSignUp(req: Request, res: Response) {
    const {user_id} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const files = req.files as Express.Multer.File[];
        if (files.length > 4 && !findUser.isVerified)
            return res
                .status(HTTP_STATUS_CODE.BAD_REQUEST)
                .json({message: "you have to be verified to upload more than four images", success: false});

        for (let i = 0; i < files.length; i++) {
            if (i === 0) {
                const result = await streamUpload(files[0].buffer);
                if (result.message) return res.status(result.http_code).json({message: result.message, success: false});
                await prisma.users.update({where: {user_id}, data: {profilePhoto: result.secure_url}});
            } else {
                const result = await streamUpload(files[i].buffer);
                if (result.message) return res.status(result.http_code).json({message: result.message, success: false});
                await prisma.images.create({data: {userId: user_id, images: result.secure_url}});
            }
        }
        const user = await prisma.users.findUnique({
            where: {user_id},
            include: {Images: true, description: true, Reviews: true},
        });
        return res.status(200).json({message: "images updated", success: true, user});
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

export async function getEscort(req: Request, res: Response) {
    const {username} = req.params;
    try {
        const findUser = await prisma.users.findUnique({where: {username}});
        if (!findUser) return res.status(400).json({message: "user not gotten", success: false});
        const user = await prisma.users.findUniqueOrThrow({
            where: {username},
            include: {Images: true, description: true, Reviews: true},
        });
        if (
            user.role !== "Escort" ||
            user.profilePhoto === "" ||
            !user.description ||
            user.description?.country === "" ||
            user.description?.city === "" ||
            user.description?.gender === "" ||
            user.description?.age === ""
        ) {
            return res.status(400).json({message: "user is an admin", success: false});
        }
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

export async function getSingleEscort(req: Request, res: Response) {
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

export async function getAllEscorts(req: Request, res: Response) {
    try {
        const allEscort = await prisma.users.findMany({
            where: {
                role: "Escort",
                profilePhoto: {not: {equals: null || ""}},
                accountStatus: 1234567890,
                phone: {not: {equals: null}},
                description: {
                    age: {not: {equals: null || ""}},
                    gender: {not: {equals: null || ""}},
                    country: {not: {equals: null || ""}},
                    city: {not: {equals: null || ""}},
                    state: {not: {equals: null || ""}},
                },
            },
            include: {description: true, Images: true, Reviews: true},
        });
        const sortedEscort = await prisma.users.findMany({
            orderBy: {login_at: "desc"},
            where: {
                role: "Escort",
                accountStatus: 1234567890,
                profilePhoto: {not: {equals: null || ""}},
                phone: {not: {equals: null}},
                description: {
                    age: {not: {equals: null || ""}},
                    gender: {not: {equals: null || ""}},
                    country: {not: {equals: null || ""}},
                    city: {not: {equals: null || ""}},
                    state: {not: {equals: null || ""}},
                },
            },
            include: {Images: true, description: true, Reviews: true},
        });
        return res.status(200).json({message: "escort gotten", allEscort, sortedEscort, success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export async function getClient(req: Request, res: Response) {
    const {user_id} = req.user as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "user not found", success: false});
        return res.status(200).json({message: "user gotten", user: {findUser}});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export const deleteUserImage = async (req: Request, res: Response) => {
    const {image} = req.body;
    const {user_id} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const getImages = await prisma.images.findMany({where: {userId: user_id, images: image}});
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
        return res.status(200).json({message: "Image Deleted", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};

export const uploadVideo = async (req: Request, res: Response) => {
    const {user_id} = req.user as unknown as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        logger.info("omo ooh");

        if (!req.file) return res.status(400).json({message: "file needed", success: false});
        const data = await streamUpload(req.file.buffer);

        logger.info("something is not being awaites");

        if (data.message)
            return res.status(data.http_code).json({message: "an error occured", err: data.message, success: false});
        await prisma.users.update({where: {user_id}, data: {video: data.secure_url}});
        return res.status(200).json({message: "video updated", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};

export async function increaseView(req: Request, res: Response) {
    const {username} = req.params;
    try {
        const findUser = await prisma.users.findUnique({where: {username}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        if (findUser.viewed === null) {
            await prisma.users.update({where: {username}, data: {viewed: 1}});
            return res.status(200).json({message: "view increased", success: true});
        }
        await prisma.users.update({where: {username}, data: {viewed: {increment: 1}}});
        return res.status(200).json({message: "view increased", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const {adminId} = req.user as users;
    const {id} = req.params;
    try {
        const findAdmin = await prisma.admin.findUnique({where: {id: adminId as number | undefined}});
        if (!findAdmin) return res.status(400).json({message: "admin not found", success: false});
        const finddUser = await prisma.users.findUnique({where: {user_id: Number(id)}});
        if (!finddUser) return res.status(400).json({message: "user already deleted"});
        const getImages = await prisma.images.findMany({where: {userId: Number(id)}});
        if (getImages) {
            for (let i = 0; i < getImages.length; i++) {
                const item = getImages[i].images;
                if (item) {
                    const striped = item.split("/")[7].split(".")[0];
                    try {
                        await cloudinary.uploader.destroy(striped);
                    } catch (error) {
                        logger.info(error);
                        return res
                            .status(HTTP_STATUS_CODE.BAD_REQUEST)
                            .json({message: "an error occured", error, success: false});
                    }
                }
            }
        }
        if (finddUser.profilePhoto) {
            const striped = finddUser.profilePhoto.split("/")[7].split(".")[0];
            try {
                await cloudinary.uploader.destroy(striped);
            } catch (error) {
                logger.info(error);
                return res
                    .status(HTTP_STATUS_CODE.BAD_REQUEST)
                    .json({message: "an error occured", error, success: false});
            }
        }
        if (finddUser.video) {
            const striped = finddUser.video.split("/")[7].split(".")[0];
            try {
                await cloudinary.uploader.destroy(striped);
            } catch (error) {
                logger.info(error);
                return res
                    .status(HTTP_STATUS_CODE.BAD_REQUEST)
                    .json({message: "an error occured", error, success: false});
            }
        }
        await prisma.users.delete({where: {user_id: Number(id)}});
        return res.status(200).json({message: "user deleted", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};

export async function searchUser(req: Request, res: Response) {
    const {
        city,
        username,
        state,
        country,
        condom,
        height,
        orientation,
        anal,
        sixtynine,
        oral,
        bdsm,
        smoke,
        from,
        to,
        looks,
        gender,
        ethnicity,
        GFExperience,
        build,
        bustsize,
    } = req.body;

    try {
        if (username) {
            const findUser = await prisma.users.findMany({
                orderBy: {created_at: "desc"},
                where: {
                    role: "Escort",
                    username,
                    profilePhoto: {not: {equals: null || ""}},
                    phone: {not: {equals: null || ""}},
                    description: {
                        state: {not: {equals: null || ""}},
                        city: {not: {equals: null || ""}},
                        country: {not: {equals: null || ""}},
                        age: {not: {equals: null || ""}},
                        gender: {not: {equals: null || ""}},
                    },
                },
                include: {Images: true, description: true, Reviews: true},
            });
            return res.status(200).json({findUser, message: "users gotten", success: true});
        }
        const item =
            typeof gender !== "undefined"
                ? gender === "both"
                    ? {contains: "ale"}
                    : gender === "Male"
                    ? {startsWith: "Male"}
                    : {startsWith: "Female"}
                : {contains: "ale"};

        const getUser = await prisma.users.findMany({
            orderBy: {created_at: "desc"},
            where: {
                role: "Escort",
                profilePhoto: {not: {equals: null || ""}},
                description: {
                    state,
                    city,
                    country,
                    condom,
                    height,
                    build,
                    GFExperience,
                    oralSex: oral,
                    orientation,
                    sixtynine,
                    BustSize: bustsize,
                    BDSM: bdsm,
                    smoke,
                    anal,
                    looks,
                    ethnicity,
                    age: {lte: to, gte: from},
                    gender: item,
                },
            },
            include: {Images: true, description: true, Reviews: true},
        });
        const findUser: (users & {
            description: description | null;
            Images: Images[];
            Reviews: Reviews[];
        })[] = [];
        for (let index = 0; index < getUser.length; index++) {
            if (
                getUser[index].description?.country === "" ||
                getUser[index].description?.city === "" ||
                getUser[index].description?.age === "" ||
                getUser[index].description?.gender === ""
            ) {
                return;
            }
            findUser.push(getUser[index]);
        }
        return res.status(200).json({findUser, message: "users gotten", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    const {password} = req.body;
    const {user_id} = req.user as users;
    try {
        const findUser = await prisma.users.findUnique({where: {user_id}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.users.update({where: {user_id}, data: {password: hashedPassword}});
        return res.status(200).json({message: "passwordd updated", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};
export const updateClientPassword = async (req: Request, res: Response) => {
    const {password, email} = req.body;
    try {
        const findUser = await prisma.users.findUnique({where: {email}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.users.update({where: {email}, data: {password: hashedPassword}});
        return res.status(200).json({message: "passwordd updated", success: true});
    } catch (e) {
        logger.info(e);
        return res
            .status(HTTP_STATUS_CODE.BAD_REQUEST)
            .json({error: e, message: "an error occured on creating a user", success: false});
    }
};
export const addReview = async (req: Request, res: Response) => {
    const {username} = req.params;
    const {name, review, rating} = req.body;

    try {
        const findUser = await prisma.users.findUnique({where: {username}});
        if (!findUser) return res.status(400).json({message: "user not found", success: false});
        await prisma.reviews.create({data: {name, review, rating: Number(rating), userId: findUser.user_id}});
        return res.status(201).json({message: "review added", success: true});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
};

export async function deleteVideo(req: Request, res: Response) {
    const {user_id} = req.user as users;
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
        await prisma.users.update({where: {user_id}, data: {video: ""}});
        return res.status(200).json({message: "video deleted", success: true});
    } catch (error) {
        logger.info(error);

        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
}

export async function getData(req: Request, res: Response) {
    try {
        const data = await prisma.users.findMany({
            where: {
                role: "Escort",
                profilePhoto: {not: {equals: null || ""}},
                phone: {not: {equals: null || ""}},
                description: {
                    age: {not: {equals: null || ""}},
                    gender: {not: {equals: null || ""}},
                    country: {not: {equals: null || ""}},
                    city: {not: {equals: null || ""}},
                    state: {not: {equals: null || ""}},
                },
            },
            include: {description: true, Images: true, Reviews: true},
        });
        return res.status(200).json({data});
    } catch (error) {
        logger.info(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: "an error occured", error, success: false});
    }
}
