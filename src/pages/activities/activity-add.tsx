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
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateActivityMutation } from '../../../modules/activity/api/activity.api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import AddFiles from '../../components/upload';
import DashboardLayout from '../../layouts/dasboard-layout';

const addSchema = z.object({
  title: z.string().min(1, 'Judul kegiatan wajib diisi'),
  deskripsi: z.string().min(1, 'Deskripsi wajib diisi'),
  activity_photos: z
    .array(z.instanceof(File))
    .min(1, 'Foto aktivitas wajib diunggah'), // Required dengan minimal 1 file
  invoice_photos: z
    .array(z.instanceof(File))
    .min(1, 'Foto invoice wajib diunggah'), // Required dengan minimal 1 file
  cards: z
    .array(
      z.object({
        name: z.string().min(1, 'Nama barang wajib diisi'),
        description: z.string().min(1, 'Nama barang wajib diisi'),
        price: z.string().min(1, 'Harga wajib diisi'),
        qty: z.string().min(1, 'Jumlah barang wajib diisi'),
      }),
    )
    .min(1, 'Minimal harus ada 1 barang yang diisi'),
});

type AddFormInputs = z.infer<typeof addSchema>;

const ActivityAdd: React.FC = () => {
  const [createActivity, submitProcess] = useCreateActivityMutation();
  const [photos, setActivityPhotos] = useState<File[]>([]);
  const [invoice, setInvoicePhotos] = useState<File[]>([]);
  const navigate = useNavigate();

  const [cards, setCards] = useState([{ id: 1, name: '', price: '', qty: '' }]);
  console.log('ini data cards', cards);
  const onActivityPhotosChange = (files: File[]) => {
    form.setValue('activity_photos', files);
    setActivityPhotos(files);
    // console.log('Files uploaded:', files);
  };

  const onInvoicePhotosChange = (files: File[]) => {
    form.setValue('invoice_photos', files);
    setInvoicePhotos(files);
    // console.log('Files uploaded:', files);
  };

  const form = useForm<AddFormInputs>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      title: '',
      deskripsi: '',
      cards: [
        {
          name: '',
          description: '',
          price: '',
          qty: '',
        },
      ],
      activity_photos: undefined,
      invoice_photos: undefined,
    },
  });

  const onSubmit = async () => {
    try {
      const data = form.getValues();

      const formData = new FormData();
      // Append simple fields
      formData.append('title', data.title);
      formData.append('description', data.deskripsi);
      formData.append('start_date', new Date().toISOString());

      photos.forEach((file) => {
        formData.append(`activity_photos`, file);
      });

      // Append invoice photos as files
      invoice.forEach((file) => {
        if (file instanceof File) {
          formData.append(`invoice_photos`, file);
        }
      });

      data.cards.forEach((detail, index) => {
        formData.append(`activity_detail[${index}][name]`, detail.name);
        formData.append(`activity_detail[${index}][description]`, detail.name);
        formData.append(`activity_detail[${index}][price]`, detail.price);
        formData.append(`activity_detail[${index}][qty]`, detail.qty);
      });

      // console.log('FormData before sending:', Array.from(formData.entries()));

      await createActivity(formData).unwrap();

      toast.success('Activity added successfully!');
      navigate('/activities/list');
    } catch (error: any) {
      console.error('Error detail:', error);
      throw error;
    }
  };

  const removeCard = (index: number) => {
    form.unregister(`cards.${index}`);
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const addCard = () => {
    setCards((prev) => [
      ...prev,
      { id: prev.length + 1, name: '', price: '', qty: '' },
    ]);
  };

  return (
    <DashboardLayout>
      <div className="w-full p-8 space-y-6 ">
        <h2 className="text-2xl font-bold text-center text-black">
          Add Activity
        </h2>
        <p className="text-sm text-center text-black">
          tambahkan aktifitas pengeluaran kas
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Judul kegiatan </FormLabel>
                  <FormControl>
                    <Input placeholder="Judul Kegiatan " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Deskripsi </FormLabel>
                  <FormControl>
                    <Input placeholder="Deskripsi " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Card>
              <CardHeader>Tambahkan foto aktivitas</CardHeader>
              <CardContent>
                <AddFiles
                  allowedExtensions={['image/jpg', 'image/jpeg', 'image/png']}
                  maxFileSize={1024 * 1024 * 5}
                  maxFiles={4}
                  onFilesChange={onActivityPhotosChange}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Tambahkan foto invoice</CardHeader>
              <CardContent>
                <AddFiles
                  allowedExtensions={['image/jpg', 'image/jpeg', 'image/png']}
                  maxFileSize={1024 * 1024 * 5}
                  maxFiles={4}
                  onFilesChange={onInvoicePhotosChange}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {cards.map((card, index) => (
                <Card key={card.id} className="w-[350px]">
                  <CardHeader>
                    <CardTitle>Detail</CardTitle>
                    <CardDescription>
                      Isi detail barang yang ada di bon
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <FormField
                        key={`name-${card.id}`}
                        control={form.control}
                        name={`cards.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={`name-${card.id}`}>
                              Name barang
                            </FormLabel>
                            <FormControl>
                              <Input
                                id={`name-${card.id}`}
                                placeholder="Nama barang"
                                {...field} // Menghubungkan input dengan react-hook-form
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        key={`description-${card.id}`}
                        control={form.control}
                        name={`cards.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={`description-${card.id}`}>
                              Deskripsi
                            </FormLabel>
                            <FormControl>
                              <Input
                                id={`description-${card.id}`}
                                placeholder="Deskripsi"
                                {...field} // Menghubungkan input dengan react-hook-form
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        key={`price-${card.id}`}
                        control={form.control}
                        name={`cards.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={`price-${card.id}`}>
                              Price
                            </FormLabel>
                            <FormControl>
                              <Input
                                id={`price-${card.id}`}
                                placeholder="1.000.000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        key={`qty-${card.id}`}
                        control={form.control}
                        name={`cards.${index}.qty`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={`qty-${card.id}`}>
                              Qty
                            </FormLabel>
                            <FormControl>
                              <Input
                                id={`qty-${card.id}`}
                                placeholder="1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeCard(index)}
                      className="mt-2"
                    >
                      Remove Card
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Card
                onClick={(e) => {
                  e.preventDefault(); // Mencegah perilaku default
                  addCard();
                }}
                className="w-[350px] h-[150px] flex items-center justify-center border border-gray-300 rounded-md"
              >
                <Plus className="grid w-full items-center gap-4" />
              </Card>
            </div>

            <Button
              type="submit"
              className="w-full py-2"
              disabled={submitProcess.isLoading}
            >
              {submitProcess.isLoading ? (
                <span className="flex flex-row items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default ActivityAdd;
