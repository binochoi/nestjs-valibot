import * as v from 'valibot';

export interface ValibotDto<TOutput = any> {
    new (): TOutput
    isValibotDto: true
    schema: v.BaseSchema<any, TOutput, any>
    create(input: unknown): TOutput
}

export const createDto = <
    TInput = object,
>(schema: v.BaseSchema<TInput, any, any>) =>
    class DtoGenerator {
        public static isValibotDto = true;
        public static schema = schema;
        public static create = (input: unknown) => v.parse(schema, input);
    } as ValibotDto<TInput>