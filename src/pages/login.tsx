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
// import { useAuthLoginMutation } from '../../modules/auth/auth.api';
import { Loader2, Lock, LockOpen } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthLoginMutation } from '../../modules/auth/auth.api';
import { authSlice } from '../../modules/auth/auth.slice';
import { useTypedDispatch } from '../../store';
import { toast } from 'react-toastify';

// Define the schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

type LoginFormInputs = z.infer<typeof loginSchema>; 

const LoginPage: React.FC = () => {
  const [authLogin, loginProcess] = useAuthLoginMutation();
  const [isPasswordVisible, setPasswordVisible] = useState(false); 

  
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formValue: LoginFormInputs) => {
    const { email, password } = formValue;
    try {
      
      const response = await authLogin({
        login_id: email,
        password: password,
      }).unwrap();

      const accessToken = response?.data.accessToken;
      const currentUser = response?.data.user;

      
      dispatch(authSlice.actions.updateAccessToken(accessToken));
      dispatch(authSlice.actions.updateCurrentUser(currentUser));

      navigate('/');
    } catch (error: any) {
        if (error.status === 401) {
          toast.error('email atau password salah.');
        }      
        if (error.status === 404) {
          toast.error('user tidak ditemukan.');
        }
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-600 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <p className="text-sm text-center text-white">
          Enter your email below to login to your account.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
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
                  <FormLabel className="text-white">Password</FormLabel>
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
              disabled={loginProcess.isLoading}
            >
              {loginProcess.isLoading ? (
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
    </div>
  );
};

export default LoginPage;
