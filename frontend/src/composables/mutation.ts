import type { Client, CombinedError, MaybeRef, MutationApi, Operation, QueryExecutionContext, QueryVariables } from 'villus'
import { useMutation as useMutationRequeset } from 'villus'

interface MutationHooks<TData> {
  onData?: (data: TData) => void
  onError?: (err: CombinedError) => void
}

interface MutationExecutionOptions {
  context: MaybeRef<QueryExecutionContext>
  client?: Client
  clearCacheTags?: string[]
  refetchTags?: string[]
}

export function useMutation<TData = any>(query: Operation<TData, QueryVariables>['query'], hooks?: Partial<MutationHooks<TData>>, opts?: Partial<MutationExecutionOptions>): MutationApi<TData, QueryVariables> {
  const { token } = useAuth()
  const { notificationBus } = useNotification()
  const { setAppLoader } = useAppLoader()

  const headers: Record<string, string> = {}

  if (token)
    headers.authorization = `Bearer ${token}`

  const { data, error, execute, isDone, isFetching } = useMutationRequeset<TData>(unref(query), opts)

  watch(error, (value) => {
    const errors = value?.graphqlErrors
    if (!errors)
      return
    notificationBus.emit({ variant: 'danger', message: errors[0].message })
    hooks?.onError?.(value)
  })
  watch(data, (value) => {
    if (value && Object.keys(value).length)
      hooks?.onData?.(value)
  })
  watch(isFetching, value => setAppLoader(value))

  return {
    data,
    error,
    execute,
    isDone,
    isFetching,
  }
}
