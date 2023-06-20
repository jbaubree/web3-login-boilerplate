import type { QueryApi, QueryCompositeOptions, QueryVariables } from 'villus'
import { useQuery as useQueryRequeset } from 'villus'

export function useQuery<TData = any>(args: QueryCompositeOptions<TData, QueryVariables>): QueryApi<TData, QueryVariables> {
  const { query, onData, onError, paused, skip, variables, fetchOnMount, client, cachePolicy, tags } = args
  const { token } = useAuth()
  const { notificationBus } = useNotification()
  const { setAppLoader } = useAppLoader()

  const headers: Record<string, string> = {}

  if (token)
    headers.authorization = `Bearer ${token}`

  const { data, isDone, isFetching, execute, error, onData: onDataArg, onError: onErrorArg, then } = useQueryRequeset<TData>({
    query,
    variables,
    context: {
      headers,
    },
    skip,
    paused,
    client,
    cachePolicy,
    tags,
    fetchOnMount: fetchOnMount ?? true,
    onData: (data) => {
      onData?.(data)
    },
    onError: (err) => {
      const errors = err?.graphqlErrors
      if (errors?.length) {
        notificationBus.emit({ variant: 'danger', message: errors[0].message })
        onError?.(err)
      }
    },
  })

  watch(isFetching, value => setAppLoader(value))

  return {
    data,
    error,
    isDone,
    isFetching,
    execute,
    then,
    onData: onDataArg,
    onError: onErrorArg,
  }
}
