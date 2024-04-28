# nestjs-valibot
## Features
### ValibotValidationPipe
`1. define valibot pipe globally`
```ts
import { ValibotValidationPipe } from 'nestjs-valibot';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValibotValidationPipe,
    },
  ],
})
export class AppModule {}
```
`or`
```ts
// main.ts
app.useGlobalPipes(new ValibotValidationPipe());
```
`2. create DTO`
```ts
// app.module.ts
import * as v from 'valibot';
import { createDto } from 'nestjs-valibot';

const schema = v.object({
  page: v.number(),
});

export class GetRowDto extends createDto(schema) {}
```

`3. use it`
```ts
import { GetRowDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getPage(@Body() { page }: GetRowDto) {
    return page;
  }
}

```