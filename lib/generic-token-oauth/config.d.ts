declare const config: {
    oauth: {
        defaultOptions: {
            authUrl: string;
            tokenUrl: string;
            profileUrl: string;
        };
        errorMessages: {
            invalidOptions: string;
        };
    };
    profile: {
        acceptedFields: {
            field: string;
            possibleExternalFields: string[];
        }[];
    };
};
export default config;
