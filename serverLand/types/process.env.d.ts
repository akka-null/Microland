declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: number;
            URI: string;
            STRIPE_KEY: string;
            STRIPE_WHSEC: string;
            CURRENCY: string;
            SHIPMENT_COST: number;

            JWT_SECRET_TOKEN: string;

            ITEM_PER_PAGE: number;

            // email
            EMAIL_SERVICE: string;
            EMAIL_USERNAME: string;
            EMAIL_PASSWORD: string;
            EMAIL_FROM: string;
            EMAIL_SENDER: string;
            EMAIL_SECRET: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }

