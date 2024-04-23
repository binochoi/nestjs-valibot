import { ValiError, parse } from "valibot";
import { ValibotDto } from "../createDto";
import { Exception } from "../Exception";

export const validate = (value: unknown, dto: ValibotDto) => {
    try {
        parse(dto.schema, value);
        return value;
    } catch (error) {
        if(error instanceof ValiError) {
            throw new Exception(error);
        }
        throw error;
    }
}