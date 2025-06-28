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
    object: string;
    attributes: Account;
}

export interface TwoFactor {
    data: {
        image_url_data: string;
    };
}

export interface TwoFactorResponse {
    object: string;
    data: TwoFactor;
};