import axios from 'axios'
import * as resumeReviewHelper from '../../helpers/resumeReview'

describe('Resume Review Helpers', () => {
  const AxiosPostSpy = jest.spyOn(axios, 'post')
  const AxiosCancelSpy = jest.spyOn(axios, 'isCancel')
  const cancelToken = {
    current: {
      token: jest.fn(),
      cancel: jest.fn(),
    },
  } as any
  const index = 0

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Upload chat attachment', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    const file = 'dummy' as any
    const setProgress = jest.fn() as any
    const onDone = jest.fn() as any
    const setDone = jest.fn() as any
    const onSuccess = jest.fn() as any
    const setError = jest.fn() as any

    test('Should fail due to file is not defined', async () => {
      const result = await resumeReviewHelper.uploadChatAttachment(
        undefined as any,
        cancelToken,
        setProgress,
        onDone,
        setDone,
        onSuccess,
        setError,
        index
      )
      expect(result).toBeFalsy()
    })
    test('Should fail due to api error', async () => {
      AxiosPostSpy.mockRejectedValue({
        response: { data: { error: { message: 'Known Error' } } },
      })
      const result = await resumeReviewHelper.uploadChatAttachment(
        file,
        cancelToken,
        setProgress,
        onDone,
        setDone,
        onSuccess,
        setError,
        index
      )
      expect(AxiosPostSpy).toHaveBeenCalledTimes(1)
      expect(onSuccess).not.toHaveBeenCalled()
      expect(setError).toBeCalledTimes(2)
      expect(setDone).toBeCalledTimes(1)
      expect(onDone).toBeCalledTimes(1)
      expect(result).toBeFalsy()
    })
    test('Should fail due to axios cancel', async () => {
      AxiosCancelSpy.mockReturnValue(true)
      AxiosPostSpy.mockRejectedValue({
        response: { data: { error: { message: 'Known Error' } } },
      })
      const result = await resumeReviewHelper.uploadChatAttachment(
        file,
        cancelToken,
        setProgress,
        onDone,
        setDone,
        onSuccess,
        setError,
        index
      )
      expect(AxiosPostSpy).toHaveBeenCalledTimes(1)
      expect(AxiosCancelSpy).toHaveBeenCalledTimes(1)
      expect(setError).toBeCalledTimes(1)
      expect(onSuccess).not.toHaveBeenCalled()
      expect(setDone).toBeCalledTimes(1)
      expect(onDone).toBeCalledTimes(1)
      expect(result).toBeFalsy()
    })
    test('Should sucessfully upload', async () => {
      AxiosCancelSpy.mockReturnValue(true)
      AxiosPostSpy.mockResolvedValue({
        data: 'dummy',
      } as any)
      const result = await resumeReviewHelper.uploadChatAttachment(
        file,
        cancelToken,
        setProgress,
        onDone,
        setDone,
        onSuccess,
        setError,
        index
      )
      expect(AxiosPostSpy).toHaveBeenCalledTimes(1)
      expect(setError).toBeCalledTimes(1)
      expect(onSuccess).toHaveBeenCalledWith('dummy', 0)
      expect(setDone).toBeCalledTimes(1)
      expect(onDone).toBeCalledTimes(1)
      expect(result).toBeFalsy()
    })
  })
  describe('Remove Chat Attachment', () => {
    const done = false
    const error = true
    const handeRemoveFile = jest.fn() as any

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should cancel with token present', () => {
      resumeReviewHelper.removeChatAttachment(
        index,
        done,
        error,
        cancelToken,
        handeRemoveFile
      )
      expect(cancelToken.current.cancel).toHaveBeenCalledTimes(1)
      expect(handeRemoveFile).toHaveBeenCalledTimes(1)
    })

    test('Should cancel with no token present', () => {
      resumeReviewHelper.removeChatAttachment(
        index,
        true,
        error,
        cancelToken,
        handeRemoveFile
      )
      expect(cancelToken.current.cancel).not.toHaveBeenCalled()
      expect(handeRemoveFile).toHaveBeenCalledTimes(1)
    })
  })
  describe('Download attachment api', () => {
    const chatId = 'abc'
    const id = 'efg'
    const setProgress = jest.fn()
    const AxiosRequestSpy = jest.spyOn(axios, 'request')

    afterEach(() => {
      jest.clearAllMocks()
    })
    test('Should fail', async () => {
      AxiosRequestSpy.mockRejectedValue(null)
      const result = await resumeReviewHelper.downloadAttachmentApi(
        chatId,
        id,
        setProgress
      )
      expect(result).toBeNull()
    })
    test('Should pass', async () => {
      AxiosRequestSpy.mockResolvedValue('dummy')
      const result = await resumeReviewHelper.downloadAttachmentApi(
        chatId,
        id,
        setProgress
      )
      expect(result).toEqual('dummy')
    })
  })
  describe('Handle Download Attachment', () => {
    Object.defineProperty(window.URL, 'createObjectURL', {
      value: jest.fn(),
    })
    Object.defineProperty(window.URL, 'revokeObjectURL', {
      value: jest.fn(),
    })

    const downloadAttachmentApiSpy = jest.spyOn(
      resumeReviewHelper,
      'downloadAttachmentApi'
    )
    const chatId = '123'
    const id = '456'
    const setProgress = jest.fn()
    const isDownloading = false
    const setIsDownloading = jest.fn()
    const setNotify = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('Should fail due to downloading is true', async () => {
      await resumeReviewHelper.handleDownloadAttachment(
        chatId,
        id,
        setProgress,
        true,
        setIsDownloading,
        setNotify
      )
      expect(setIsDownloading).not.toHaveBeenCalled()
      expect(setNotify).not.toHaveBeenCalled()
    })
    test('Should fail due to api error', async () => {
      downloadAttachmentApiSpy.mockResolvedValue(null)
      await resumeReviewHelper.handleDownloadAttachment(
        chatId,
        id,
        setProgress,
        isDownloading,
        setIsDownloading,
        setNotify
      )
      expect(setIsDownloading).toHaveBeenCalledTimes(2)
      expect(setNotify).toHaveBeenCalledTimes(1)
    })
    test('Should successfully download', async () => {
      downloadAttachmentApiSpy.mockResolvedValue({
        data: 'dummy',
        headers: {
          'content-type': 'image/jpeg',
          'content-disposition': 'attachment; filename="attachment.jpeg"',
        },
      } as any)
      await resumeReviewHelper.handleDownloadAttachment(
        chatId,
        id,
        setProgress,
        isDownloading,
        setIsDownloading,
        setNotify
      )
      expect(setIsDownloading).toHaveBeenCalledTimes(2)
      expect(setNotify).not.toHaveBeenCalled()
    })
  })
})
