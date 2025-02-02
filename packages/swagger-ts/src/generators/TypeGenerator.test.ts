import pathParser from 'path'

import { oasPathParser } from '@kubb/swagger'
import type { OpenAPIV3 } from '@kubb/swagger'
import { print } from '@kubb/ts-codegen'

import { TypeGenerator } from './TypeGenerator'

import { format } from '../../mocks/format'

describe('TypeGenerator simple', () => {
  const path = pathParser.resolve(__dirname, '../../mocks/petStore.yaml')

  test('generate type for Pet', async () => {
    const oas = await oasPathParser(path)
    const generator = new TypeGenerator(oas, { withJSDocs: false, resolveName: ({ name }) => name, enumType: 'asConst' })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build(schemas?.Pet as OpenAPIV3.SchemaObject, 'Pet')

    const output = print(node, undefined)

    expect(output).toBeDefined()

    expect(format(output)).toMatchInlineSnapshot(`
      "export type Pet = {
        id: number
        name: string
        tag?: string | undefined
      }
      "
    `)
  })

  test('generate type for Pets', async () => {
    const oas = await oasPathParser(path)
    const generator = new TypeGenerator(oas, { withJSDocs: false, resolveName: ({ name }) => name, enumType: 'asConst' })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build(schemas?.Pets as OpenAPIV3.SchemaObject, 'Pets')

    const output = print(node, undefined)

    expect(output).toBeDefined()
    expect(format(output)).toMatchInlineSnapshot(`
      "export type Pets = {
        id: number
        name: string
        tag?: string | undefined
      }[]
      "
    `)
  })
  test.todo('generate type for Pets and Pet')
})

describe('TypeGenerator with refs', () => {
  const path = pathParser.resolve(__dirname, '../../mocks/petStoreRef.yaml')

  test('generate type for Pets', async () => {
    const oas = await oasPathParser(path)
    const generator = new TypeGenerator(oas, { withJSDocs: false, resolveName: ({ name }) => name, enumType: 'asConst' })

    const schemas = oas.getDefinition().components?.schemas
    const node = generator.build(schemas?.Pets as OpenAPIV3.SchemaObject, 'Pets')

    const output = print(node, undefined)

    expect(output).toBeDefined()
    expect(format(output)).toMatchInlineSnapshot(`
      "export type Pets = Pet[]
      "
    `)
  })

  test.todo('generate type for Pets and Pet')
})
