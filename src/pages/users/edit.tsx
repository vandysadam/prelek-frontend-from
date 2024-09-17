import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import {
  useGetUserDetailQuery,
  useUpdateUserMutation,
} from '../../../modules/users/api/user.api';

import DashboardLayout from '../../layouts/dasboard-layout';
import { User1 } from '../../../modules/users/dtos/models/entity';
import { LockOpen, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';

const validationSchema = z.object({
  name: z.string().min(1, 'Field is required!'),
  house_number: z
    .number()
    .min(1, 'Must be more than 0')
    .refine((val) => val > 0, { message: 'Must be more than 0' }),
  phone_number: z
    .string()
    .trim()
    .regex(
      /^(\+62|62)?0?8[0-9]\d{7,10}$/,
      'Invalid number, start with (+62/62/08/8), and must be 10-13 digits',
    )
    .min(1, 'Field is required!'),
  address: z.string().min(1, 'Field is required!'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
});

const UserEdit: React.FC = () => {
  const [updateUser, updateProcess] = useUpdateUserMutation<User1>();
  const [showPassword, setShowPassword] = useState(false);

  const { id } = useParams<{ id: string }>();
  const validId: string = id!;
  console.log(id);
  const navigate = useNavigate();
  const { data: userData, refetch } = useGetUserDetailQuery({
    id: validId,
  });

  const initialState: User1 = useMemo(() => {
    return {
      user_id: userData?.data?.user_id || '',
      name: userData?.data?.name || '',
      house_number: userData?.data?.house_number || 0,
      phone_number: userData?.data?.phone_number || '',
      address: userData?.data?.address || '',
      password: userData?.data?.password || '',
    };
  }, [userData?.data]);

  const handleSubmit = async (
    formValue: User1,
    { setFieldError }: FormikHelpers<User1>,
  ) => {
    try {
      const { ...userData } = formValue;
      await updateUser({
        ...userData,
        user_id: id,
      }).unwrap();
      setTimeout(() => {
        toast.success(`${formValue.name} Updated!`, {
          theme: 'dark',
        });
      }, 0.1);
      refetch();
      navigate('/user/list');
    } catch (error) {
      setTimeout(() => {
        const typedError = error as { data?: { message?: string } };

        if (typedError.data && typedError.data.message) {
          // Contoh: error.data.message berisi pesan error dari backend
          if (
            typedError.data.message.includes('Nomor rumah sudah ada yang punya')
          ) {
            setFieldError('house_number', 'Nomor rumah sudah terdaftar');
          } else {
            toast.error(typedError.data.message, {
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
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                    Edit User
                  </h1>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-sm border border-gray-200 relative">
                {/* navigation */}
                <header className="px-5 pt-4 pb-1 flex flex-row">
                  <Link
                    to="/user/list"
                    className="btn btn-sm bg-white border-gray-200 hover:bg-white hover:border-slate-400 text-indigo-500"
                  >
                    <ArrowLeft />
                  </Link>
                  <h2 className="font-semibold text-gray-800 ml-3 mt-1">
                    Edit User
                  </h2>
                </header>

                <Formik
                  initialValues={initialState}
                  enableReinitialize={true}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          name
                          <span className="text-red-500"> *</span>
                        </label>
                        <Field
                          id="name"
                          name="name"
                          placeholder="ex: Jhon"
                          className="form-input w-full"
                          type="text"
                        />

                        <div className="h-2">
                          <ErrorMessage
                            name="name"
                            component="span"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="house_number"
                        >
                          House Number
                        </label>
                        <Field
                          id="house_number"
                          name="house_number"
                          placeholder="ex: 123"
                          className="form-input w-full"
                          type="number"
                        />
                        <div className="h-2">
                          <ErrorMessage
                            name="house_number"
                            component="span"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="phone_number"
                        >
                          Phone
                          <span className="text-red-500"> *</span>
                        </label>
                        <Field
                          id="phone_number"
                          name="phone_number"
                          placeholder="+62xxxx / 62xxxx / 08xxxx / 8xxxx"
                          className="form-input w-full"
                          type="text"
                        />
                        <div className="h-2">
                          <ErrorMessage
                            name="phone_number"
                            className="text-red-600 text-sm"
                            component="div"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="address"
                        >
                          Address
                          <span className="text-red-500"> *</span>
                        </label>
                        <Field
                          id="address"
                          name="address"
                          placeholder="+62xxxx / 62xxxx / 08xxxx / 8xxxx"
                          className="form-input w-full"
                          type="text"
                        />
                        <div className="h-2">
                          <ErrorMessage
                            name="address"
                            className="text-red-600 text-sm"
                            component="div"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                          <span className="text-red-500"> *</span>
                        </label>
                        <div className="relative w-full">
                          <Field
                            id="password"
                            name="password"
                            placeholder="Fill in your password to change it"
                            className="form-input w-full"
                            type={showPassword ? 'text' : 'password'}
                            as="input"
                            autoComplete="off"
                          />
                          <div className="absolute inset-y-0 right-2 top-1">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                setShowPassword(!showPassword);
                              }}
                            >
                              {showPassword ? (
                                <LockOpen className="h-5 w-5" />
                              ) : (
                                <Lock className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="h-2">
                          <ErrorMessage
                            name="password"
                            component="span"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-6">
                      {/* {createUserProcess.isLoading ? (
                      <button
                        className="btn loading hover:bg-indigo-600  disabled:bg-indigo-600 disabled:text-white"
                        disabled={true}
                      >
                        loading
                      </button>
                    ) : ( */}

                      <Button
                        className=" py-2 btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                        type="submit"
                      >
                        Submit
                      </Button>
                      {/* )} */}
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserEdit;
