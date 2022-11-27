import * as resumeApis from '../../apis/resume'
import * as resumeHelper from '../../helpers/resume'

describe('Resume Helpers', () => {
  const formData = new FormData()
  const setLoading = jest.fn()
  const setValue = jest.fn()
  const setNotify = jest.fn()
  const data = { id: '123' } as any
  const loading = false

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Handles resume submit', () => {
    const template = 'template-1'
    const type = 'pdf'
    const initialData = 'dummy-data'
    const resumeData = 'dummy-data'
    const watch = jest.fn()
    const reset = jest.fn()
    const setSubmitSuccess = jest.fn()
    const queryClient = {
      setQueryData: jest.fn(),
      getQueryData: jest.fn(),
    } as any

    const setLimitsReached = jest.fn()

    const updateResumeSpy = jest.spyOn(resumeApis, 'updateResume')
    const handleResumeDownloadSpy = jest.spyOn(
      resumeHelper,
      'handleResumeDownload'
    )
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should fail because no data was provided', async () => {
      const result = await resumeHelper.submitResumeFrom(
        template,
        type,
        initialData,
        undefined,
        watch,
        reset,
        setSubmitSuccess,
        setNotify,
        queryClient,
        setLimitsReached
      )
      expect(result).toBeFalsy()
      expect(updateResumeSpy).not.toBeCalled()
    })

    test('should fail to update resume', async () => {
      updateResumeSpy.mockResolvedValue({ data: undefined, error: 'Err' })
      const result = await resumeHelper.submitResumeFrom(
        template,
        type,
        initialData,
        resumeData,
        watch,
        reset,
        setSubmitSuccess,
        setNotify,
        queryClient,
        setLimitsReached
      )
      expect(result).toBeFalsy()
      expect(updateResumeSpy).toBeCalledTimes(1)
      expect(setNotify).toBeCalledWith({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to update design',
      })
    })
    test('should successfully update resume', async () => {
      updateResumeSpy.mockResolvedValue({
        data: { _id: 'abc', title: 'abc' },
        error: undefined,
      })
      queryClient.getQueryData.mockReturnValue([{ _id: 'abc' }, { _id: 'efg' }])
      const result = await resumeHelper.submitResumeFrom(
        template,
        type,
        initialData,
        resumeData,
        watch,
        reset,
        setSubmitSuccess,
        setNotify,
        queryClient,
        setLimitsReached
      )
      expect(result).toBeTruthy()
      expect(updateResumeSpy).toBeCalledTimes(1)
      expect(queryClient.getQueryData).toBeCalledTimes(1)
      expect(queryClient.setQueryData).toBeCalledTimes(2)
      expect(reset).toBeCalledTimes(1)
      expect(watch).toBeCalledTimes(1)

      expect(handleResumeDownloadSpy).toBeCalledTimes(1)
    })
    test('should successfully create resume', async () => {
      updateResumeSpy.mockResolvedValue({
        data: { _id: 'xyz', title: 'abc' },
        error: undefined,
      })
      queryClient.getQueryData.mockReturnValue([{ _id: 'abc' }, { _id: 'efg' }])
      const result = await resumeHelper.submitResumeFrom(
        template,
        type,
        initialData,
        resumeData,
        watch,
        reset,
        setSubmitSuccess,
        setNotify,
        queryClient,
        setLimitsReached
      )
      expect(result).toBeTruthy()
      expect(updateResumeSpy).toBeCalledTimes(1)
      expect(queryClient.getQueryData).toBeCalledTimes(1)
      expect(queryClient.setQueryData).toBeCalledTimes(2)
      expect(reset).toBeCalledTimes(1)
      expect(watch).toBeCalledTimes(1)

      expect(handleResumeDownloadSpy).toBeCalledTimes(1)
    })
  })

  describe('Upload Resume Avatar', () => {
    const uploadPictureSpy = jest.spyOn(resumeApis, 'uploadPicture')

    afterEach(() => {
      jest.clearAllMocks()
    })
    test('Loading state true', async () => {
      const result = await resumeHelper.uploadResumeAvatar(
        formData,
        data,
        true,
        setLoading,
        setValue,
        setNotify
      )
      expect(result).toBeUndefined()
    })
    test('No Data Id', async () => {
      const result = await resumeHelper.uploadResumeAvatar(
        formData,
        { id: undefined } as any,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(result).toBeUndefined()
    })

    test('Fails to upload avatar', async () => {
      uploadPictureSpy.mockResolvedValue({ data: undefined, error: 'Error' })
      await resumeHelper.uploadResumeAvatar(
        formData,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(setNotify).toBeCalledWith({
        heading: 'Err!',
        message: 'Failed to upload image',
        type: 'danger',
      })
      expect(setLoading).toBeCalledTimes(2)
    })

    test('Successfully to upload avatar', async () => {
      uploadPictureSpy.mockResolvedValue({
        data: { fields: { avatar: 'dummy' } },
        error: undefined,
      } as any)
      await resumeHelper.uploadResumeAvatar(
        formData,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(setValue).toBeCalledTimes(1)
      expect(setLoading).toBeCalledTimes(2)
    })
  })

  describe('Delete Resume Avatar', () => {
    const deletePictureSpy = jest.spyOn(resumeApis, 'deletePicture')

    afterEach(() => {
      jest.clearAllMocks()
    })
    test('Loading state true', async () => {
      const result = await resumeHelper.deleteResumeAvatar(
        data,
        true,
        setLoading,
        setValue,
        setNotify
      )
      expect(result).toBeUndefined()
    })
    test('No Data Id', async () => {
      const result = await resumeHelper.deleteResumeAvatar(
        { id: undefined } as any,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(result).toBeUndefined()
    })

    test('Fails to delete avatar', async () => {
      deletePictureSpy.mockResolvedValue({ data: undefined, error: 'Error' })
      await resumeHelper.deleteResumeAvatar(
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(setNotify).toBeCalledWith({
        heading: 'Err!',
        message: 'Failed to delete image',
        type: 'danger',
      })
      expect(setLoading).toBeCalledTimes(2)
    })
    test('Successfully to delete avatar', async () => {
      deletePictureSpy.mockResolvedValue({
        data: { fields: { avatar: 'dummy' } },
        error: undefined,
      } as any)
      await resumeHelper.uploadResumeAvatar(
        formData,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(setValue).toBeCalledWith('avatar', 'dummy')
      expect(setLoading).toBeCalledTimes(2)
    })
  })

  describe('Appends image blob to form data', () => {
    HTMLCanvasElement.prototype.toBlob = () => {
      return 'success'
    }

    afterEach(() => {
      jest.clearAllMocks()
    })
    test('Successfully appends to blob', async () => {
      const orignalImage = 'www.xyz.com'
      const processedCanvas = document.createElement('canvas')
      const style = {
        height: 0,
        width: 0,
        rotate: 0,
        scale: 0,
        pos: {
          x: 0,
          y: 0,
        },
      }

      const result = await resumeHelper.appendBlobToFromData(
        orignalImage,
        processedCanvas,
        style,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(result).toBe('success')
    })
  })

  describe('Appends form data and upload avatar', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    const formData = new FormData()
    const orignalImage = 'www.xyz.com'
    const style = {
      height: 0,
      width: 0,
      rotate: 0,
      scale: 0,
      pos: {
        x: 0,
        y: 0,
      },
    }
    test('Blob as null', async () => {
      const blob = null

      const result = await resumeHelper.processdCanvasToBlob(
        blob,
        formData,
        orignalImage,
        style,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(result).toBeUndefined()
    })
    test('Success form appends and upload avatar', async () => {
      const blob = new Blob(['success'])
      const uploadResumeAvatarSpy = jest.spyOn(
        resumeHelper,
        'uploadResumeAvatar'
      )
      uploadResumeAvatarSpy.mockReturnValue('success' as any)
      const result = await resumeHelper.processdCanvasToBlob(
        blob,
        formData,
        orignalImage,
        style,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
      expect(result).toBe('success')
      expect(uploadResumeAvatarSpy).toBeCalledWith(
        formData,
        data,
        loading,
        setLoading,
        setValue,
        setNotify
      )
    })
  })
  describe('Deletes Single Resume', () => {
    const setDeleteItemId = jest.fn()
    const queryClient = { setQueryData: jest.fn() } as any
    const id = '1'

    const deleteResumeSpy = jest.spyOn(resumeApis, 'deleteResume')

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Loading is true', async () => {
      const result = await resumeHelper.deleteSigleResume(
        id,
        data,
        'true',
        setLoading,
        setDeleteItemId,
        setNotify,
        queryClient
      )
      expect(result).toBeUndefined()
    })
    test('Fails to delete', async () => {
      deleteResumeSpy.mockResolvedValue({ data: undefined, error: 'Err' })
      const result = await resumeHelper.deleteSigleResume(
        id,
        data,
        null,
        setLoading,
        setDeleteItemId,
        setNotify,
        queryClient
      )
      expect(deleteResumeSpy).toBeCalledWith(id)
      expect(setNotify).toBeCalledWith({
        heading: 'Err!',
        message: 'Failed to delete resume',
        type: 'danger',
      })
      expect(setLoading).toBeCalledTimes(2)
      expect(result).toBeUndefined()
    })
    test('Success to delete resume', async () => {
      const resumeData = { items: [{ _id: '1' }, { _id: '2' }] }
      deleteResumeSpy.mockResolvedValue({
        data: 'Dummy',
        error: undefined,
      } as any)
      const result = await resumeHelper.deleteSigleResume(
        id,
        resumeData,
        null,
        setLoading,
        setDeleteItemId,
        setNotify,
        queryClient
      )
      expect(deleteResumeSpy).toBeCalledWith(id)
      expect(queryClient.setQueryData).toBeCalledTimes(1)
      expect(setLoading).toBeCalledTimes(2)
      expect(result).toBeUndefined()
    })
  })

  describe('Resume Download', () => {
    const name = 'abc'
    const type = 'pdf'
    const id = '123'
    const setLimitsReached = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })

    const downloadResumeSpy = jest.spyOn(resumeApis, 'downloadResume')

    test('Fails to download resume', async () => {
      downloadResumeSpy.mockResolvedValue('Err' as any)
      const result = await resumeHelper.handleResumeDownload(
        name,
        id,
        type,
        setNotify,
        setLimitsReached
      )
      expect(setNotify).toBeCalledWith({
        heading: 'Err!',
        message: 'Failed to donwload design',
        type: 'danger',
      })
      expect(result).toBeUndefined()
    })
    test('Succesfully download resume', async () => {
      Object.defineProperty(window.URL, 'createObjectURL', {
        value: jest.fn(),
      })
      Object.defineProperty(window.URL, 'revokeObjectURL', {
        value: jest.fn(),
      })
      downloadResumeSpy.mockResolvedValue({ data: ['dummy'] } as any)
      const result = await resumeHelper.handleResumeDownload(
        name,
        id,
        type,
        setNotify,
        setLimitsReached
      )
      expect(window.URL.createObjectURL).toBeCalledWith(new Blob(['dummy']))
      expect(window.URL.revokeObjectURL).toBeCalledWith(
        window.URL.createObjectURL(new Blob(['dummy']))
      )
      expect(result).toBeUndefined()
    })
  })

  describe('Toggle Resume Accordian', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    const name = 'abc'
    const defaultValues = 'higk'
    const append = jest.fn()
    const setShow = jest.fn()
    const setOpen = jest.fn()

    test('With Show state = false', () => {
      const show = false
      const accordian = undefined
      resumeHelper.resumeToggleAccordian(
        name,
        accordian,
        defaultValues,
        append,
        show,
        setShow,
        setOpen
      )
      expect(setShow).toBeCalledWith('abc')
      expect(setOpen).toBeCalledWith('abc.0')
      expect(append).toBeCalledWith(defaultValues)
    })
    test('With Show state = false and with accordian items', () => {
      const show = false
      const accordian = ['1', '2'] as any
      resumeHelper.resumeToggleAccordian(
        name,
        accordian,
        defaultValues,
        append,
        show,
        setShow,
        setOpen
      )
      expect(setShow).toBeCalledWith('abc')
      expect(setOpen).not.toBeCalled()
      expect(append).not.toBeCalled()
    })

    test('With Show state = true', () => {
      const show = true
      const accordian = ['1', '2'] as any
      resumeHelper.resumeToggleAccordian(
        name,
        accordian,
        defaultValues,
        append,
        show,
        setShow,
        setOpen
      )
      expect(setShow).toBeCalledWith(null)
      expect(setOpen).not.toBeCalled()
      expect(append).not.toBeCalled()
    })
  })

  describe('Removes Accordian item for list', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Removes for given index', () => {
      const remove = jest.fn()
      const index = 1
      resumeHelper.resumeDeleteAccordianItem(remove, index)
      expect(remove).toBeCalledWith(index)
    })
  })
  describe('Opens Accordian item for list', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    const name = 'abc'
    const index = 1
    const trigger = jest.fn()
    const setOpen = jest.fn()
    test('Already opened, name === open', () => {
      const open = 'abc.1'

      resumeHelper.resumeOpensAccordianItem(name, index, trigger, open, setOpen)
      expect(trigger).toBeCalledWith(name)
      expect(setOpen).toBeCalledWith(null)
    })
    test('Not opened, name != open', () => {
      const open = 'abc.2 '

      resumeHelper.resumeOpensAccordianItem(name, index, trigger, open, setOpen)
      expect(trigger).not.toBeCalled()
      expect(setOpen).toBeCalledWith(name + '.' + index)
    })
  })
  describe('Adds items to resume accordian list', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    const name = 'abc'
    const fieldsCount = 2
    const defaultValues = 'fake values'
    const append = jest.fn()
    const setOpen = jest.fn()

    test('Successfully adds item', () => {
      resumeHelper.resumeAddItemToAccoridan(
        name,
        fieldsCount,
        defaultValues,
        append,
        setOpen
      )
      expect(setOpen).toBeCalledWith(name + '.' + fieldsCount)
      expect(append).toBeCalledWith(defaultValues)
    })
  })
})
