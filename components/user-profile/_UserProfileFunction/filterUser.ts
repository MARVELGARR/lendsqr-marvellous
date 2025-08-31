import { UsersProp } from "../../../actions/getUsers"
import useLocalStorage from "../../../hooks/useLocalStorage"
import { PersistedClientState } from "../../../types"

export const filterCacheForUser = (userId?: string) : UsersProp=>{
    if(!userId) return null
      const [persistedData] = useLocalStorage<PersistedClientState  >("REACT_QUERY_OFFLINE_CACHE", null)
 // ✅ Add null checks to prevent errors
  if (!persistedData || !persistedData.clientState?.queries?.length) {
    return null
  }

  const user = persistedData.clientState.queries[0].state.data.find(
    (user) => user.id === userId
  )

  return user || null

} 


export const filterForOrganisations = (organisation: UsersProp[] | []): string[] =>{

  if(!organisation) return []

  const uniqueOrgs = Array.from(new Set(organisation.map(org => org.organization)));
  return uniqueOrgs

}