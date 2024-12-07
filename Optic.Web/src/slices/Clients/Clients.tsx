import { faCircleMinus, faMagnifyingGlass, faMars, faPlay, faPlus, faVenus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OffCanvas from '../../shared/components/OffCanvas/Index';
import { MouseEvent, useState } from 'react';
import { Direction } from '../../shared/components/OffCanvas/Models';
import { ClientForm } from './ClientForm';
import useClient from './useClient';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
export const Clients = () => {
   const [visible, setVisible] = useState(false);

   const { clients, deleteClient, queryClients } = useClient();

   const handleClose = () => {
      setVisible(false);
   };

   const handleClick = () => {
      setVisible(true);
   };


   if (queryClients.isLoading) {
      return <div>Cargando...</div>;
   }

   const handleDelete = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
      e.preventDefault();
      Swal.fire({
         title: '¿Estás seguro de eliminar este cliente?',
         text: 'Esta acción no se puede deshacer',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         confirmButtonText: 'Confirmar',
         cancelButtonText: 'Cancelar',
         preConfirm: async () => {
            await deleteClient.mutateAsync(id);
         }
      })
   }

   return (
      <div className="w-full">
         <div className="flex space-x-4 mb-4">
            <div className="mb-2">
               <button type='button' className=" bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
                  onClick={handleClick}>
                  <FontAwesomeIcon
                     icon={faPlus}
                     className="fa-search top-3 pr-2 font-bold"
                  />Nuevo Cliente</button>
            </div>
            <div className="mb-2">
               <div className="relative">
                  <div className="inline-flex">
                     <input
                        type="text"
                        placeholder="Buscar Cliente"
                        className="p-2 pl-10 border-blue-400 rounded"
                     />
                     <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="fa-search absolute left-3 top-3 text-gray-400"
                     />

                     <button className="text-white font-bold border hover:bg-blue-700 bg-blue-500 px-4 py-2 rounded ">Buscar</button>
                  </div>
               </div>
            </div>
         </div>
                        {/* <!-- TABLA DE CLIENTES --> */}
         <div className="rounded-lg border border-grey-500 mb-4 w-full ">
            <table className=" bg-white rounded shadow w-full">
               <thead>
                  <tr>
                     <th className="border p-2">Nombre</th>
                     <th className="border p-2">Identificación</th>
                     <th className="border p-2">Celular</th>
                     <th className="border p-2">Dirección</th>
                     <th className="border p-2">Email</th>
                     <th className="border p-2">Opciones</th>
                  </tr>
               </thead>
               <tbody>
                  {clients?.map((client) => (
                     <tr key={client.id}>
                        <td className=" p-2 border-b border-gray-200">
                           {' '}
                           <FontAwesomeIcon
                              icon={client.sex === 1 ? faMars : faVenus}
                              className={client.sex === 1 ? "text-blue-600 fas fa-mars text-lg mr-8" : "text-pink-600 fas fa-mars text-lg mr-8"}
                           />
                           {client.firstName} {client.lastName}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">{client.identificationNumber}</td>
                        <td className="border border-gray-300 p-2 text-center">{client.cellPhoneNumber}</td>
                        <td className="border border-gray-300 p-2 text-center">{client.address}</td>
                        <td className="border border-gray-300 p-2 text-center">{client.email}</td>
                        <td className="border border-gray-300 p-2 text-center">
                           <Link to={`/Clientes/${client.id}`} title='Ver detalle' className='text-blue-500  mr-10'>
                              <FontAwesomeIcon icon={faPlay} />
                           </Link>
                           <button className="text-red-500" onClick={(e) => handleDelete(e, client.id)}>
                              <FontAwesomeIcon
                                 icon={faCircleMinus}
                                 className="ml-2"
                              />
                           </button>
                        </td>
                     </tr>
                  ))}

               </tbody>
            </table>
            <div className="mt-4 flex justify-center">
               <nav className="inline-flex rounded-md shadow">
                  <a
                     href="#"
                     className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300"
                  >
                     1
                  </a>
                  <a
                     href="#"
                     className="px-4 py-2 bg-white hover:bg-blue-500  border border-gray-300"
                  >
                     2
                  </a>
                  <a
                     href="#"
                     className="px-4 py-2 bg-white hover:bg-blue-500 border border-gray-300"
                  >
                     3
                  </a>
               </nav>
            </div>
         </div>
         <OffCanvas titlePrincipal='Registro de Cliente' visible={visible} xClose={handleClose} position={Direction.Right}  >
            <ClientForm />
         </OffCanvas>
      </div>
   );
};
