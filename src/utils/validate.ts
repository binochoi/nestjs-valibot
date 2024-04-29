import { ValiError, parse } from "valibot";
import { ValibotDto } from "../createDto";
import { Exception } from "../Exception";
import { GlobalOptions } from "src/types/options";

export const validate = (
    value: unknown,
    dto: ValibotDto,
    options: GlobalOptions
) => {
    try {
        parse(dto.schema, value);
        return value;
    } catch (error) {
        if(error instanceof ValiError) {
            Exception.options = options;
            throw new Exception(error);
        }
        throw error;
    }
}