const [isLoading, setAppLoader] = useToggle(false)

export interface AppLoader {
  isLoading: Ref<boolean>
  setAppLoader: (value?: boolean | undefined) => boolean
}

export function useAppLoader(): AppLoader {
  return {
    isLoading,
    setAppLoader,
  }
}
