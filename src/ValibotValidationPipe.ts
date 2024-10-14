import { ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform, Response } from '@nestjs/common'
import { ValibotDto } from './createDto';
import { isValibotDto } from './utils/isValibotDto';
import { validate } from './utils/validate';
import { GlobalOptions } from './types/options';
import { VALIBOT_OPTIONS } from './constants';
import { createDefaultOptions } from './utils/createDefaultOptions';

@Injectable()
export class ValibotValidationPipe implements PipeTransform {
    private dto?: ValibotDto;
    constructor(
        private readonly dtoOrOptions?: ValibotDto | GlobalOptions,
        @Inject(VALIBOT_OPTIONS)
        private readonly options: GlobalOptions = {},
    ) {
        if(isValibotDto(this.dtoOrOptions)) {
            this.dto = this.dtoOrOptions as ValibotDto;
        }
        else {
            this.options = createDefaultOptions(
                this.dtoOrOptions as GlobalOptions || this.options
            );
        }
    }
    transform(value: unknown, { metatype }: ArgumentMetadata) {
        const { dto, options } = this;
        if(!dto && !isValibotDto(metatype)) {
            return value;
        }
        return validate(
            value,
            dto || metatype as unknown as ValibotDto,
            options,
        );
    }
}