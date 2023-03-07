/* eslint-disable @typescript-eslint/naming-convention */
export type paystackResponse = {
    message: string;
    status: boolean;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
};

export type flutterWaveResponse = {
    data: {
        success: "success" | "failed";
        message: string;
        data: {
            link: string;
        };
    };
};

export type paystackResponseVerification = {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        reference: string;
        amount: number;
        message: null;
        gateway_response: string;
        paid_at: Date;
        created_at: Date;
        channel: string;
        currency: string;
        ip_address: string;
        metadata: string;
        log: {
            start_time: number;
            time_spent: number;
            attempts: number;
            errors: number;
            success: boolean;
            mobile: boolean;
            input: [];
            history: [
                {
                    type: string;
                    message: string;
                    time: number;
                },
                {
                    type: string;
                    message: string;
                    time: number;
                }
            ];
        };
        fees: number;
        fees_split: null;
        authorization: {
            authorization_code: string;
            bin: number;
            last4: number;
            exp_month: number;
            exp_year: number;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: null;
        };
        customer: {
            id: number;
            first_name: null;
            last_name: null;
            email: string;
            customer_code: string;
            phone: null;
            metadata: null;
            risk_action: string;
            international_format_phone: null;
        };
        plan: null;
        split: object;
        order_id: null;
        paidAt: Date;
        createdAt: Date;
        requested_amount: number;
        pos_transaction_data: null;
        source: null;
        fees_breakdown: null;
        transaction_date: Date;
        plan_object: object;
        subaccount: object;
    };
};
