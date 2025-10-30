import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  validateSync,
} from 'class-validator';

enum TimeZone {
  TIME_ZONE = 'America/Sao_Paulo',
}
enum Environment {
  DEVELOP = 'development',
  HOMOLOG = 'homologation',
  PRODUCTION = 'production',
}

class EnvironmentVariables {
  @IsDefined({ message: 'TZ environment variable is not defined' })
  @IsNotEmpty({ message: 'TZ environment variable is empty' })
  @IsEnum(TimeZone, { message: 'TZ environment variable is not valid' })
  ['TZ']: string;

  @IsDefined({ message: 'NODE_ENV environment variable is not defined' })
  @IsNotEmpty({ message: 'NODE_ENV environment variable is empty' })
  @IsEnum(Environment, {
    message: 'NODE_ENV environment variable is not valid',
  })
  ['NODE_ENV']: string;

  @IsDefined({ message: 'NATS_SERVER environment variable is not defined' })
  @IsNotEmpty({ message: 'NATS_SERVER environment variable is empty' })
  ['NATS_SERVER']: string;

  @IsDefined({ message: 'DATABASE_HOST environment variable is not defined' })
  @IsNotEmpty({ message: 'DATABASE_HOST environment variable is empty' })
  ['DATABASE_HOST']: string;

  @IsDefined({ message: 'DATABASE_PORT environment variable is not defined' })
  @IsNotEmpty({ message: 'DATABASE_PORT environment variable is empty' })
  @IsNumberString(
    { ['no_symbols']: true },
    { message: 'DATABASE_PORT environment variable is not valid' },
  )
  ['DATABASE_PORT']: string;

  @IsDefined({ message: 'DATABASE_USER environment variable is not defined' })
  @IsNotEmpty({ message: 'DATABASE_USER environment variable is empty' })
  ['DATABASE_USER']: string;

  @IsDefined({ message: 'DATABASE_PASS environment variable is not defined' })
  @IsNotEmpty({ message: 'DATABASE_PASS environment variable is empty' })
  ['DATABASE_PASS']: string;

  @IsDefined({ message: 'DATABASE_NAME environment variable is not defined' })
  @IsNotEmpty({ message: 'DATABASE_NAME environment variable is empty' })
  ['DATABASE_NAME']: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  let index = 0;
  let errorMessage = '';
  for (const error of errors) {
    if (!error.constraints) {
      continue;
    }

    const constraints = Object.values(error.constraints);
    ++index;
    errorMessage += `\n`;
    constraints.forEach((value) => {
      errorMessage += `${index}. ${value}\n`;
    });
  }

  if (errors.length > 0) {
    throw new Error(`Invalid environment variables: \n${errorMessage}`);
  }

  return validatedConfig;
}
