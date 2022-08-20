import idGenerate from '../../helpers/idGenerator'

describe('Id Genrator', () => {
  test('Genrates random id', () => {
    const result = idGenerate()
    expect(result).toBeDefined()
  })
})
