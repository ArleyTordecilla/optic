import { useMutation, useQuery } from '@tanstack/react-query';
import { createSupplierService, deleteSupplierService, getSuppliers, updateSupplierService } from './SupplierServices';
import { toast } from 'react-toastify';

const KEY = 'Supplier';

export const useSupplier = () => {
   const querySuppliers = useQuery({
      queryKey: [KEY],
      queryFn: getSuppliers,
   });

   const createSupplier = useMutation({
      mutationFn: createSupplierService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               querySuppliers.refetch();
            }
         }
      },
   });

   const deleteSupplier = useMutation({
      mutationFn: deleteSupplierService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               querySuppliers.refetch();
            }
         }
      },
   });

   const updateSupplier = useMutation({
      mutationFn: updateSupplierService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               querySuppliers.refetch();
            }
         }
      },
   });

   return {
      querySuppliers,
      suppliers: querySuppliers?.data?.data,
      createSupplier,
      deleteSupplier,
      updateSupplier,
   };
};
