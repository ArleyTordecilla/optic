import { useState } from "react";
import { UsersModel, UsersResponseModel } from "./UsersModel";
import { useUsers } from "./Users";
import { toast } from "react-toastify";

export const UsersForm = ({ id }: { id?: number }) => {
    const [form, setForm] = useState<UsersModel | UsersResponseModel>({
    id: id,   
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    securePharse: '',
    });

const { createUser } = useUsers();
const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        const res = await createUser.mutateAsync(form);
        if (!res.isSuccess) {
            toast.error(res.message);
            return;
        } 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };  

    return (
            <form onSubmit={handleSubmit}className="bg-white p-9 w-full max-w-md grid gap-6  my-5">
                <div>
                    <label
                        htmlFor="namesTxt"
                        className="block text-gray-600 text-sm font-bold mb-2">
                        Nombres
                    </label>
                    <div className="relative">
                        <input
                            id="namesTxt"
                            name="firstName"
                            value={form?.firstName}
                            onChange={(e) => handleChange(e)}
                            required
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nombres"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="lastNameTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Apellidos
                    </label>
                    <div className="relative">
                        <input
                            id="lastNameTxt"
                            name="lastName"
                            value={form?.lastName}
                            onChange={(e) => handleChange(e)}
                            required
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Apellidos"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form?.email}
                            onChange={(e) => handleChange(e)}
                            required
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Correo electrónico"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            required
                            name="password"
                            value={form?.password}
                            onChange={(e) => handleChange(e)}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Contraseña"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="confirmPasswordTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Confirmar Contraseña
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            id="confirmPasswordTxt"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Contraseña"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="securePharseTxt"
                        className="block text-gray-600 text-sm font-bold mb-2"
                    >
                        Frase de segura
                    </label>
                    <div className="relative">
                        <input
                            id="securePharseTxt"
                            name="securePharse"
                            value={form?.securePharse}
                            onChange={(e) => handleChange(e)}
                            maxLength={150}
                            required
                            className="w-full px-5 py-2 border border-gray-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Frase de segura"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Crear Usuario
                </button>
            </form>
  
    );
}