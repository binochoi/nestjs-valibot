import { BadRequestException, HttpStatus } from "@nestjs/common";
import { type ValiError } from 'valibot';
import type { GlobalOptions } from "./types/options";

export class Exception extends BadRequestException {
    static options: GlobalOptions;
    constructor(
        private readonly error: ValiError<any>,
        ) {
        const { disableErrorMessages } = Exception.options;
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
            ...(disableErrorMessages ? {} : { errors: error.issues })
        })
    }
}