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
import { Plus } from 'lucide-react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import AddFiles from '../../components/upload';
import DashboardLayout from '../../layouts/dasboard-layout';

const addSchema = z.object({
  name: z.string(),
  file: z.instanceof(File).optional(), // Membuat file opsional
  picture: z.instanceof(File).optional(), // Membuat picture opsional
  cards: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      qty: z.string(),
    }),
  ),
});

type AddFormInputs = z.infer<typeof addSchema>;

const ActivityAdd: React.FC = () => {
  // const [addProcess] = useCreateUserMutation();
  const [activityFiles, setActivityFiles] = useState<File[]>([]);
  const onActivityFileChange = (files: File[]) => {
    setActivityFiles(files);
    console.log('Files uploaded:', files);
  };

  const form = useForm<AddFormInputs>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      name: '',
      cards: [],
      file: undefined,
      picture: undefined,
    },
  });
  form.formState.errors && console.log('Errors:', form.formState.errors);
  // const fileRef = form.register('file');

  // const navigate = useNavigate();

  // const onSubmit = async (formValue: AddFormInputs) => {
  const onSubmit = async () => {
    // const { name, picture, price, qty } = formValue;
    try {
      const formData = form.getValues();

      console.log('Data dari form:', formData);

      // Tambahkan file yang diupload dari state activityFiles
      const finalData = {
        ...formData,
        activityFiles, // tambahkan activityFiles ke finalData
        cards, // tambahkan detail card ke finalData
      };

      console.log('Data yang akan dikirim:', finalData);
      // await addProcess({
      //   name,
      //   picture,
      //   price,
      //   qty,
      // }).unwrap();
      // toast.success('User updated successfully!');
      // navigate('/users/list');
    } catch (error: any) {
      console.error('Error detail:', error);
    }
  };

  const removeCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const [cards, setCards] = useState([{ id: 1, name: '', price: '', qty: '' }]);

  const addCard = () => {
    const newCard = { id: cards.length + 1, name: '', price: '', qty: '' };
    setCards([...cards, newCard]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, [field]: value } : card,
    );
    setCards(updatedCards);
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Judul kegiatan </FormLabel>
                  <FormControl>
                    <Input placeholder="Judul Kegiatan " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AddFiles
              allowedExtensions={['image/jpg', 'image/jpeg', 'image/png']}
              maxFileSize={1024 * 1024 * 5}
              maxFiles={4}
              onFilesChange={onActivityFileChange}
            />

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
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`name-${card.id}`}>Name barang</Label>
                        <Input
                          id={`name-${card.id}`}
                          placeholder="Name of your project"
                          value={card.name}
                          onChange={(e) =>
                            handleChange(index, 'name', e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`price-${card.id}`}>Price</Label>
                        <Input
                          id={`price-${card.id}`}
                          placeholder="1.000.000"
                          value={card.price}
                          onChange={(e) =>
                            handleChange(index, 'price', e.target.value)
                          }
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor={`qty-${card.id}`}>Qty</Label>
                        <Input
                          id={`qty-${card.id}`}
                          placeholder="1"
                          value={card.qty}
                          onChange={(e) =>
                            handleChange(index, 'qty', e.target.value)
                          }
                        />
                      </div>
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
              // disabled={addProcess.isLoading}
            >
              {/* {addProcess.isLoading ? (
                <span className="flex flex-row items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </span>
              ) : (
                <span>Input</span>
              )} */}
              testing
            </Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default ActivityAdd;
