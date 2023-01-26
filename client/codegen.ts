import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:9000/api',
  documents: 'src/**/*.ts',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  config: {
    // This will cause the generator to avoid using TypeScript optionals (?) on types, so the following definition: type A { myField: String } will output myField: Maybe<string> instead of myField?: Maybe<string>.
    // This avoids the error of graphql making nullable fields T | null | undefined, instead of T | null
    avoidOptionals: true,
  },
}

export default config
