// @ts-check
import { clientEnv, clientSchema } from './schema.mjs';

const _clientEnv = clientSchema.safeParse(clientEnv);

// eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/explicit-function-return-type
export const formatErrors = (

  /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}\n`;
      }
      return undefined;
    })
    .filter(Boolean);

if (!_clientEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_clientEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

// eslint-disable-next-line no-restricted-syntax
for (const key of Object.keys(_clientEnv.data)) {
  if (!key.startsWith('NEXT_PUBLIC_')) {
    console.warn(
      `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`,
    );

    throw new Error('Invalid public environment variable name');
  }
}

export const env = _clientEnv.data;
