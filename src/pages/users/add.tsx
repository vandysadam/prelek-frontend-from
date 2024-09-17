// import { useState } from 'react';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { useCreateUserMutation } from '../../../modules/users/api/user.api';
// import { Form, useNavigate } from 'react-router-dom';
// import { Loader2, Lock, LockOpen } from 'lucide-react';
// import { Button } from '../../components/ui/button';
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from '../../components/ui/form';
// import { Input } from '../../components/ui/input';

// const addSchema = z.object({
//   name: z.string().email({ message: 'Please enter a valid email address.' }),
//   password: z.string().min(6, {
//     message: 'Password must be at least 6 characters.',
//   }),
//   house_number: z.number().min(1, {
//     message: 'House number must be at least 1.',
//   }),
//   phone_number: z
//     .string()
//     .trim()
//     .regex(
//       /^(\+62|62)?0?8[0-9]\d{7,10}$/,
//       'Invalid number, start with (+62/62/08/8), and must be 10-13 digits',
//     ),
//   address: z.string().min(1, {
//     message: 'Please enter your address.',
//   }),
// });

// type AddFormInputs = z.infer<typeof addSchema>;

// const form = useForm<AddFormInputs>({
//   resolver: zodResolver(addSchema),
// });

// const UserAddPage: React.FC = () => {
//   const [addUsers, addProcess] = useCreateUserMutation();
//   const [isPasswordVisible, setPasswordVisible] = useState(false);

//   const navigate = useNavigate();

//   const onSubmit = async (formValue: AddFormInputs) => {
//     const { name, password, house_number, phone_number, address } = formValue;

//     try {
//       const resultAction = await addUsers({
//         name: name,
//         password: password,
//         house_number: house_number,
//         phone_number: phone_number,
//         address: address,
//       })
//         // Skip login if the environment variable is set
//         .unwrap();

//       console.log('User added successfully:', resultAction);
//       navigate('/users/list');
//       // Update Redux state with the user's info
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-slate-200">
//       <div className="w-full max-w-sm p-8 space-y-6 bg-slate-600 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-white">Login</h2>
//         <p className="text-sm text-center text-white">
//           Enter your email below to login to your account.
//         </p>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-white">Naama</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Jhon doe" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/*
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="Password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-white">Password</FormLabel>
//                   <FormControl>
//                     <div className="relative">
//                       <Input
//                         type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password
//                         placeholder="Password"
//                         {...field}
//                       />
//                       <button
//                         type="button"
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
//                         onClick={() => setPasswordVisible(!isPasswordVisible)}
//                       >
//                         {isPasswordVisible ? (
//                           <LockOpen className="h-5 w-5" />
//                         ) : (
//                           <Lock className="h-5 w-5" />
//                         )}
//                       </button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className="w-full py-2"
//               disabled={addProcess.isLoading}
//             >
//               {addProcess.isLoading ? (
//                 <span className="flex flex-row items-center justify-center">
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </span>
//               ) : (
//                 <span>Sign in</span>
//               )}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };
// export default UserAddPage;
