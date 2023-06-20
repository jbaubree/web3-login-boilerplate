import { beforeEach, describe, expect, test } from 'vitest'
import type { AppLoader } from '../../src/composables/loader'
import { useAppLoader } from '../../src/composables/loader'

describe('useAppLoader', () => {
  let appLoader: AppLoader

  beforeEach(() => {
    appLoader = useAppLoader()
  })

  test('should initialize isLoading as false', () => {
    expect(appLoader.isLoading.value).toEqual(false)
  })

  test('should update isLoading value using setAppLoader', () => {
    appLoader.setAppLoader(true)
    expect(appLoader.isLoading.value).toBe(true)

    appLoader.setAppLoader(false)
    expect(appLoader.isLoading.value).toBe(false)
  })
})
