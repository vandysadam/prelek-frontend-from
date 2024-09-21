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
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import {
  useGetUserDetailQuery,
  useTopupUserMutation,
} from '../../../modules/users/api/user.api';
import DashboardLayout from '../../layouts/dasboard-layout';
import { toast } from 'react-toastify';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';

const topupSchema = z.object({
  name: z.string(),
  house_number: z
    .number()
    .min(1)
    .refine((val) => !isNaN(Number(val)), {
      message: 'House number must be at least 1.',
    }),
  amount: z.number().min(100, {
    message: 'Amount must be at least 100.',
  }),
});

type EditFormInputs = z.infer<typeof topupSchema>;

const UserTopup: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Mendapatkan ID dari URL
  const validId: string = id!;

  const navigate = useNavigate();
  const handleClick = () => {
    // Navigasi ke /users
    navigate('/users/list');
  };

  const { data: userData, refetch } = useGetUserDetailQuery({
    id: validId,
  });
  const [updateUser, { isLoading: updateLoading }] = useTopupUserMutation();

  const form = useForm<EditFormInputs>({
    resolver: zodResolver(topupSchema),
    defaultValues: {
      name: '',
      house_number: userData?.data?.house_number,
      amount: 0,
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData?.data?.name || '',
        house_number: userData?.data?.house_number || 0,
        amount: userData?.data?.wallet?.balance || 0,
      });
    }
  }, [userData, form]);

  const handleSubmit = async (formValue: EditFormInputs) => {
    try {
      await updateUser({
        house_number: formValue.house_number,
        amount: formValue.amount,
      }).unwrap();
      setTimeout(() => {
        toast.success(`${formValue.name} Updated!`, {
          theme: 'dark',
        });
      }, 0.1);
      refetch();
      navigate('/users/list');
    } catch (error) {
      const err = error as { data?: { message?: string } };
      setTimeout(() => {
        if (err.data && err.data.message) {
          // Contoh: error.data.message berisi pesan error dari backend
          if (err.data.message.includes('Nomor rumah sudah ada yang punya')) {
            form.setError('house_number', {
              type: 'manual',
              message: 'Nomor rumah sudah terdaftar',
            });
          } else {
            toast.error(err.data.message, {
              theme: 'dark',
            });
          }
        } else {
          toast.error('Something went wrong!', {
            theme: 'dark',
          });
        }
      }, 0.1);
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full p-8 space-y-6">
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
              Topup User
            </h2>
            <p className="text-sm text-center text-black">
              Topup user account here.
            </p>
          </div>
          <div></div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jhon doe"
                      {...field}
                      readOnly
                      className="cursor-default"
                    />
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
                      readOnly
                      className="cursor-default"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Nominal Topup</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Rp.1xxxx"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2"
              disabled={updateLoading}
            >
              {updateLoading ? (
                <span className="flex flex-row items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              ) : (
                <span>Update</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default UserTopup;
