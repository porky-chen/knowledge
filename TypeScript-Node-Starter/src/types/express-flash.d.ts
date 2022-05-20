/// <reference types="express" />

/**
 * This type definition augments existing definition
 * 此类型时对现有定义的扩充 from express-flash
 * from @types/express-flash
 */
declare namespace Express {
    export interface Request {
        flash(event: string, message: any): any;
    }
}

interface Flash {
    flash(type: string, message: any): void;
}

declare module "express-flash";

