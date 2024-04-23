import { BadRequestException, HttpStatus } from "@nestjs/common";
import { type ValiError } from 'valibot';

export class Exception extends BadRequestException {
    constructor(private readonly error: ValiError) {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
            errors: error.issues
        })
    }
}