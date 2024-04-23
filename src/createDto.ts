import { parse, BaseSchema } from 'valibot';

export interface ValibotDto<TOutput = any> {
    new (): TOutput
    isValibotDto: true
    schema: BaseSchema<TOutput>
    create(input: unknown): TOutput
}

export const createDto = <
    TInput = object
>(schema: BaseSchema<TInput>) =>
    class DtoGenerator {
        public static isValibotDto = true;
        public static schema = schema;
        public static create = (input: unknown) => parse(schema, input);
    } as ValibotDto