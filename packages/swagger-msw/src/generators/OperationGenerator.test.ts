import type { Api } from '@kubb/swagger'
import createSwagger from '@kubb/swagger'
import { FileManager } from '@kubb/core'

import { OperationGenerator } from './OperationGenerator'

describe('msw operation generator', () => {
  const swagger = createSwagger({})
  const swaggerApi = swagger.api as Api
  const fileManager = new FileManager()
  const resolveId = () => './pets.ts'

  it('should generate a handler url for getting a list of items', async () => {
    const oas = await swaggerApi.getOas({ root: './', output: { path: 'test', clean: true }, input: { path: 'packages/swagger-msw/mocks/petStore.yaml' } })

    const og = await new OperationGenerator({ oas, directory: './', fileManager, resolveId }).getGet('/pets')
    expect(og?.source).toBe(`
      export const listPetsEntryUrl = '*/pets'
    `)
  })
})
