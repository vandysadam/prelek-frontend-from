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
import { Loader2, Lock, LockOpen } from 'lucide-react';
import { useState } from 'react';
import { useCreateUserMutation } from '../../../modules/users/api/user.api';
import DashboardLayout from '../../layouts/dasboard-layout';
import AddFiles from '../../components/upload';

const MAX_FILE_SIZE = 1000000; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
];

const addSchema = z.object({
  name: z.string(),
  picture: z.any().refine((file) => {
    if (!file) return false;
    if (file.size > MAX_FILE_SIZE) return false;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false;
    return true;
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

const ActivityAdd: React.FC = () => {
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
      picture: undefined,
    },
  });
  // const fileRef = form.register('file');

  const navigate = useNavigate();

  const onSubmit = async (formValue: AddFormInputs) => {
    const { name, password, house_number, phone_number, address } = formValue;

    try {
      const resultAction = await addUsers({
        name: name,
        password: password,
        house_number: house_number,
        phone_number: phone_number,
        address: address,
      })
        // Skip login if the environment variable is set
        .unwrap();

      console.log('User added successfully:', resultAction);
      navigate('/activities/list');
      // Update Redux state with the user's info
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout>
      <div className="w-full p-8 space-y-6 ">
        <h2 className="text-2xl font-bold text-center text-black">
          Add Activity
        </h2>
        <p className="text-sm text-center text-black">add user account here.</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AddFiles />
            <FormField
              control={form.control}
              name="picture"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="Picture"
                      type="file"
                      accept="image/*, application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              disabled={addProcess.isLoading}
            >
              {addProcess.isLoading ? (
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
export default ActivityAdd;
