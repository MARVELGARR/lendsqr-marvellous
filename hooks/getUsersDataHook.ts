import { useQuery } from "@tanstack/react-query";
import getUsers from "../actions/getUsers";


const useGetUsersHooks = () => {


  const { 
    data: users, isLoading, error
  } = useQuery({
    queryKey: ['users'],
    queryFn: ()=>getUsers(),
    
  })
  return {
    users, isLoading, error
  };
}
 
export default useGetUsersHooks;