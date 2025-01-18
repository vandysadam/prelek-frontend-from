import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Lock, LockOpen } from 'lucide-react';
import { useState } from 'react';
import { useCreateUserMutation } from '../../../modules/users/api/user.api';
import DashboardLayout from '../../layouts/dasboard-layout';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import { toast } from 'react-toastify';

const addSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter your name.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  house_number: z
    .number()
    .min(1)
    .refine((val) => !isNaN(Number(val)), {
      message: 'House number must be at least 1.',
    }),
  phone_number: z
    .string()
    .trim()
    .regex(
      /^(\+62|62)?0?8[0-9]\d{7,10}$/,
      'Invalid number, start with (+62/62/08/8), and must be 10-13 digits',
    ),
  address: z.string().min(1, {
    message: 'Please enter your address.',
  }),
});

type AddFormInputs = z.infer<typeof addSchema>;

const UserAdd: React.FC = () => {
  const [addUsers, addProcess] = useCreateUserMutation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const form = useForm<AddFormInputs>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      name: '',
      house_number: 0,
      phone_number: '',
      address: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/users/list');
  };

  const onSubmit = async (formValue: AddFormInputs) => {
    const { name, password, house_number, phone_number, address } = formValue;
    try {
      await addUsers({
        name,
        password,
        house_number,
        phone_number,
        address,
      }).unwrap();

      toast.success('User add successfully!');
      navigate('/users/list');
    } catch (error: any) {
      console.error('Error detail:', error); 

      // Tangkap error dan tampilkan dengan toast
      if (error.data?.message) {
        toast.error(error.data.message, {
          autoClose: 5000, // Auto close dalam 5 detik
          hideProgressBar: false, // Progress bar ditampilkan
        });
      } else {
        // Jika error tidak memiliki pesan, tampilkan pesan default
        toast.error('An unknown error occurred. Please try again.', {
          autoClose: 5000,
          hideProgressBar: false,
        });
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full p-8 space-y-6 ">
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ArrowLeft
                  onClick={handleClick}
                  className="cursor-pointer hover:text-blue-500 transition-colors duration-300"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Back To List User</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div>
            <h2 className="text-2xl font-bold text-center text-black">
              Add User
            </h2>
            <p className="text-sm text-center text-black">
              Add user account here.
            </p>
          </div>
          <div></div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="house_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nomer Rumah</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1 - 99"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nomer Telp</FormLabel>
                  <FormControl>
                    <Input placeholder="+62, 08" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Alamat</FormLabel>
                  <FormControl>
                    <Input placeholder="Jl.xxxx.xxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                        onClick={() => setPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
                          <LockOpen className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2"
              disabled={addProcess.isLoading}
            >
              {addProcess.isLoading ? (
                <span className="flex flex-row items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              ) : (
                <span>add user</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default UserAdd;
