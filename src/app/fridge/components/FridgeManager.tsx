'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { initialFridgeItems, MOCK_CATEGORIES } from '@/lib/data';
import type { FridgeItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Calendar, Tag, Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(1, 'Item name is required.'),
  category: z.string().min(1, 'Category is required.'),
  quantity: z.string().min(1, 'Quantity is required.'),
  expiryDate: z.date({ required_error: 'Expiry date is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

const getFreshnessStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Expired', color: 'text-red-500', icon: <AlertTriangle className="h-4 w-4" /> };
    if (diffDays <= 3) return { label: 'Expiring Soon', color: 'text-yellow-500', icon: <Clock className="h-4 w-4" /> };
    return { label: 'Fresh', color: 'text-green-500', icon: <CheckCircle className="h-4 w-4" /> };
};

export default function FridgeManager() {
  const [items, setItems] = useState<FridgeItem[]>(initialFridgeItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', category: '', quantity: '' },
  });

  const onSubmit = (values: FormValues) => {
    const newItem: FridgeItem = {
      id: Date.now().toString(),
      name: values.name,
      category: values.category,
      quantity: values.quantity,
      expiryDate: values.expiryDate.toISOString().split('T')[0],
    };
    setItems([...items, newItem]);
    form.reset();
    setIsDialogOpen(false);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const groupedItems = items.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, FridgeItem[]>);

  return (
    <>
      <div className="flex items-center">
        <div className='grid gap-2'>
            <h1 className="text-3xl font-bold font-headline">My Fridge</h1>
            <p className="text-muted-foreground">Keep track of your ingredients to reduce waste and get recipe ideas.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-headline">Add New Item to Fridge</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Item Name</FormLabel><FormControl><Input placeholder="e.g. Chicken Breast" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem><FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                        <SelectContent>{MOCK_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="quantity" render={({ field }) => (
                  <FormItem><FormLabel>Quantity</FormLabel><FormControl><Input placeholder="e.g. 2 lbs" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="expiryDate" render={({ field }) => (
                  <FormItem className="flex flex-col"><FormLabel>Expiry Date</FormLabel>
                    <Popover><PopoverTrigger asChild>
                        <FormControl>
                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} initialFocus />
                    </PopoverContent>
                    </Popover>
                  <FormMessage /></FormItem>
                )} />
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                    <Button type="submit">Add Item</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-8 space-y-8">
        {Object.entries(groupedItems).map(([category, itemsInCategory]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold font-headline mb-4">{category}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {itemsInCategory.map(item => {
                const status = getFreshnessStatus(item.expiryDate);
                return (
                  <Card key={item.id} className="group">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-lg">{item.name}</p>
                          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => deleteItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <Package className="h-4 w-4" /> {item.quantity}
                        </div>
                      </div>
                      <div className={`text-sm font-medium flex items-center gap-2 mt-4 ${status.color}`}>
                          {status.icon}
                          {status.label} - {format(new Date(item.expiryDate), "MMM d, yyyy")}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
