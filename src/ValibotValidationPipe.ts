import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common'
import { ValibotDto } from './createDto';
import { isValibotDto } from './utils/isValibotDto';
import { validate } from './utils/validate';

@Injectable()
export class ValibotValidationPipe implements PipeTransform {
    constructor(private readonly dto?: ValibotDto) {}
    transform(value: any, { metatype }: ArgumentMetadata) {
        if(!this.dto && !isValibotDto(metatype)) {
            return value;
        }
        const dto = this.dto || metatype as unknown as ValibotDto;
        return validate(value, dto);
    }
}