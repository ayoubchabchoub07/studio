'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { initialGroceryItems } from '@/lib/data';
import type { GroceryItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';


const formSchema = z.object({
  name: z.string().min(1, 'Item name cannot be empty.'),
});
type FormValues = z.infer<typeof formSchema>;

export default function GroceryListManager() {
  const [items, setItems] = useState<GroceryItem[]>(initialGroceryItems);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = (values: FormValues) => {
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: values.name,
      purchased: false,
    };
    setItems([newItem, ...items]);
    form.reset();
  };

  const togglePurchased = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };
  
  const clearPurchased = () => {
    setItems(items.filter(item => !item.purchased));
  };
  
  const itemsToBuy = items.filter(i => !i.purchased);
  const itemsPurchased = items.filter(i => i.purchased);


  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
        <Card>
            <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem className="flex-grow">
                          <FormControl>
                            <Input placeholder="Add an item..." {...field} />
                          </FormControl>
                          <FormMessage className="text-xs"/>
                      </FormItem>
                    )} />
                    <Button type="submit" size="icon">
                        <Plus className="h-4 w-4" />
                    </Button>
                  </form>
                </Form>

                <div className="mt-6 space-y-2">
                    <AnimatePresence>
                    {itemsToBuy.map(item => (
                        <motion.div 
                          key={item.id} 
                          layout
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-secondary"
                        >
                            <Checkbox id={item.id} onCheckedChange={() => togglePurchased(item.id)} checked={item.purchased} />
                            <label htmlFor={item.id} className="flex-grow text-sm font-medium">{item.name}</label>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
                
                {itemsPurchased.length > 0 && (
                    <>
                        <div className="relative my-6">
                           <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Purchased</span>
                            </div>
                        </div>

                         <div className="space-y-2">
                             <AnimatePresence>
                                {itemsPurchased.map(item => (
                                    <motion.div 
                                      key={item.id}
                                      layout
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                                      className="flex items-center gap-3 p-3 rounded-md"
                                    >
                                        <Checkbox id={item.id} onCheckedChange={() => togglePurchased(item.id)} checked={item.purchased} />
                                        <label htmlFor={item.id} className="flex-grow text-sm font-medium text-muted-foreground line-through">{item.name}</label>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}
                
                {itemsPurchased.length > 0 && (
                     <div className="flex justify-end mt-6">
                        <Button variant="outline" size="sm" onClick={clearPurchased}>
                            <Trash2 className="h-3 w-3 mr-2" />
                            Clear Purchased
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
