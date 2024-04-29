import { Module, DynamicModule, ExistingProvider, FactoryProvider, ValueProvider, ClassProvider } from '@nestjs/common';
import { GlobalOptions } from './types/options';
import { VALIBOT_OPTIONS } from './constants';
import { createDefaultOptions } from './utils/createDefaultOptions';
import { APP_PIPE } from '@nestjs/core';
import { ValibotValidationPipe } from '.';

type AsyncModuleOptions<T> =
  | Omit<ClassProvider<T>, 'provide'>
  | Omit<ValueProvider<T>, 'provide'>
  | Omit<FactoryProvider<T>, 'provide'>
  | Omit<ExistingProvider<T>, 'provide'>;
  
@Module({})
export class ValibotModule {
    static forRoot(options: GlobalOptions): DynamicModule {
        return ValibotModule.forRootAsync({ useValue: createDefaultOptions(options) });
    }
    static forRootAsync(options: AsyncModuleOptions<GlobalOptions>): DynamicModule {
        return {
            module: ValibotModule,
            providers: [
                {
                    provide: VALIBOT_OPTIONS,
                    ...options,
                },
                {
                    provide: APP_PIPE,
                    useClass: ValibotValidationPipe,
                }
            ],
            exports: [],
        }
    }
}