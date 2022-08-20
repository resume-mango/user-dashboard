import { deleteDraggableFromCache } from '../../helpers/draggableBoard'

describe('Draggable Board Helper', () => {
  const id = 'abc'
  const status = 'status1'
  const data = { status: [{ _id: 'abc' }], status1: [{ _id: 'abc' }] }
  const queryKey = 'key'
  const queryClient = { setQueryData: jest.fn() } as any

  test('should delete cache', () => {
    deleteDraggableFromCache(id, status, data, queryKey, queryClient)
    expect(queryClient.setQueryData).toBeCalledWith(queryKey, data)
  })
})
