import { LockOpen, Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useGetUserDetailQuery,
  useUpdateUserMutation,
} from '../../../modules/users/api/user.api';
import { Button } from '../../components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import DashboardLayout from '../../layouts/dashboard-layout';

const validationSchema = z.object({
  name: z.string().min(1, 'Field is required!'),
  house_number: z
    .number()
    .min(1, 'Must be more than 0') // min(1) instead of moreThan(0)
    .refine((val) => val > 0, { message: 'Must be more than 0' }), // Ensures it's greater than 0
  phone_number: z
    .string()
    .trim()
    .regex(
      /^(\+62|62)?0?8[0-9]\d{7,10}$/,
      'Invalid number, start with (+62/62/08/8), and must be 10-13 digits',
    )
    .min(1, 'Field is required!'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});

type FormValues = z.infer<typeof validationSchema>;

export default function UserEdit() {
  const [editUser, { isLoading: editProcessLoading }] = useUpdateUserMutation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserDetailQuery(id);

  const { control, handleSubmit, setError, setValue } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
      house_number: 0,
      phone_number: '',
      address: '',
      password: '',
    },
  });
}
/* Handle Create New User */
const onSubmit: async (formValue: FormValues)  {
      try {
        await editUser({ ...formValue, user_id: id }).unwrap();
        toast.success(`${formValue.name} Updated!`, { theme: 'dark' });
        navigate('/user/list'); // Redirect ke daftar pengguna
      } catch (error: any) {
        if (error?.data?.message) {
          if (error.data.message.includes('Nomor rumah sudah ada yang punya')) {
            setFieldError('house_number', 'Nomor rumah sudah terdaftar');
          } else {
            toast.error(error.data.message, { theme: 'dark' });
          }
        } else {
          toast.error('Something went wrong!', { theme: 'dark' });
        }
      }
    },
  });
  return (
    <DashboardLayout>
      <div className="w-full p-8 space-y-6 ">
        <h2 className="text-2xl font-bold text-center text-black">Add User</h2>
        <p className="text-sm text-center text-black">add user account here.</p>

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
            {/* 
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? 'text' : 'password'} // Toggle between text and password
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
              disabled={editProcess.isLoading}
            >
              {editProcess.isLoading ? (
                <span className="flex flex-row items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              ) : (
                <span>Sign in</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};
