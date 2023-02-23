export interface IUser {
    user_id: number;
    username: string;
    email: string;
    phone: string | null;
    password: string;
    accountStatus: number;
    isVerified: boolean;
    escort_id: number | null;
    client_id: number | null;
    subscription_id: number | null;
    adminId: number | null;
    created_at: Date;
    updated_at: Date | null;
}
