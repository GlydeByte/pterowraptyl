export interface Account {
    object: string;
    attributes: {
        id: number;
        admin: boolean;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
    };  
};

export interface AccountResponse {
    attributes: Account;
}

export interface TwoFactor {
    data: {
        image_url_data: string;
        secret: string;
    };
}

export interface TwoFactorResponse {
    data: TwoFactor;
};

export interface TwoFactorEnableRequest {
    code: string;
    password: string;
}

export interface TwoFactorEnable {
    object: string;
    attributes: {
        tokens: string[];
    };
};

export interface TwoFactorDisable {
    password: string;
}
