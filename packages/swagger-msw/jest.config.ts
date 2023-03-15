import { pathsToModuleNameMapper } from 'ts-jest'

import baseConfig from '../../jest.config'

import type { Config } from 'jest'

const tsconfig = require('./tsconfig.json')

const packageName = 'swagger-msw'

export default {
  ...baseConfig,
  rootDir: '../..',
  roots: [`<rootDir>/packages/${packageName}`],
  displayName: packageName,
  globals: {},
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: `<rootDir>/packages/${packageName}` }),
  },
} as Config
