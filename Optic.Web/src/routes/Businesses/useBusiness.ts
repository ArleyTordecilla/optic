import { useQuery } from '@tanstack/react-query';
import { getBusiness } from './BusinessServices';

const KEY = 'BUSINESS';
export const useBusiness = () => {
   const queryBusiness = useQuery({
      queryKey: [`${KEY}`],
      queryFn: getBusiness,
      refetchOnWindowFocus: false,
   });

   return {
      business: queryBusiness?.data?.data,
      queryBusiness,
   };
};
