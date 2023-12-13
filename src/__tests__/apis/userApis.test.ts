import { apiRefreshSession } from "../../apis/user"
import * as axiosRequest from "../../helpers/axiosRequest"

describe("Refresh session", () => {
  const axiosRequestSpy = jest.spyOn(axiosRequest, "default")

  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
    jest.resetModules()
  })

  const options = {
    method: "GET",
    url: `${process.env.AUTH_HOST}/refresh`,
  }

  test("Fails to refresh session", async () => {
    axiosRequestSpy.mockRejectedValue(new Error("Failed to refresh session"))

    const result = await apiRefreshSession()
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBeUndefined()
    expect(result.error.message).toBe("Failed to refresh session")
  })

  test("Successfully refreshes session", async () => {
    axiosRequestSpy.mockResolvedValueOnce({
      data: "session obj",
      error: undefined,
    })

    const result = await apiRefreshSession()
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1)
    expect(axiosRequestSpy).toHaveBeenCalledWith(options)
    expect(result.data).toBe("session obj")
    expect(result.error).toBeUndefined()
  })
})
