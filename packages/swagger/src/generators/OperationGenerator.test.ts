import type { File } from '@kubb/core'

import { OperationGenerator } from './OperationGenerator'

import { definePlugin } from '../plugin'

import type Oas from 'oas'

class DummyOperationGenerator extends OperationGenerator {
  getGet(path: string): Promise<File | null> {
    return new Promise((resolve, _reject) => {
      resolve(null)
    })
  }

  getPost(path: string): Promise<File | null> {
    return new Promise((resolve, _reject) => {
      resolve(null)
    })
  }

  getPut(path: string): Promise<File | null> {
    return new Promise((resolve, _reject) => {
      resolve(null)
    })
  }

  getDelete(path: string): Promise<File | null> {
    return new Promise((resolve, _reject) => {
      resolve(null)
    })
  }

  build() {
    return new Promise((resolve, _reject) => {
      resolve(null)
    })
  }
}

const swaggerApi = definePlugin({}).api

describe('abstract class OperationGenerator', () => {
  test('if pathParams return undefined when there are no params in path', async () => {
    const oas = (await swaggerApi?.getOas({
      root: './',
      output: { path: 'test', clean: true },
      input: { path: 'packages/swagger-msw/mocks/petStore.yaml' },
    })) as Oas

    const og = new DummyOperationGenerator({ oas })

    expect(og.getSchemas(oas.operation('/pets', 'get')).pathParams).toBeUndefined()
    expect(og.getSchemas(oas.operation('/pets', 'get')).queryParams).not.toBeUndefined()
  })
})
