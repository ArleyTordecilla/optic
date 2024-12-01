import { useMutation, useQuery } from '@tanstack/react-query';
import { createBusinessServices, createUserServices, getUser, getUsers, loginUser } from './LoginServices';
import { toast } from 'react-toastify';

const KEY = 'LOGIN';

export const useLogin = (id: number | undefined = undefined) => {
   const queryUsers = useQuery({
      queryKey: [`${KEY}_USERS`],
      queryFn: getUsers,
   });

   const queryUser = useQuery({
      queryKey: [`${KEY}_USER`],
      queryFn: () => getUser(id),
      enabled: id !== null,
   });

   const logginn = useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });

   const createUser = useMutation({
      mutationFn: createUserServices,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });

   const createBusiness = useMutation({
      mutationFn: createBusinessServices,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });

   return {
      users: queryUsers?.data?.data,
      queryUsers,
      logginn,
      queryUser,
      user: queryUser?.data?.data,
      createUser,
      createBusiness,
   };
};
