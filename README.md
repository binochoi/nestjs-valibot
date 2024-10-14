# nestjs-valibot
## Features
### How to start
`1. define valibot pipe globally`
it'll be initialize ValibotValidationPipe internally
```ts
@Module({
  imports: [
    ValibotModule.forRoot({
      disableErrorMessages: true,
    }),
  ],
})
export class AppModule {}
```
`or`
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
`4. using onto frontend`
```ts
try {
  const data = new GetRowDto(input);
} catch(err: ValiError) {}
```
```ts
const { issues, success } = safeParse(GetRowDto.schema);
```

## TODO
- [x] create pipe to connect valibot output to nestjs
- [x] create module that is customizable
- [ ] exception status code is not working
- [ ] test instantly support breaking change of valibot