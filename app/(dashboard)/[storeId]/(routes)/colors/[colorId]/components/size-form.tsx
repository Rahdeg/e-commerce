"use client"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {  Color, Size } from "@prisma/client"
import { Trash } from "lucide-react"
import { zodResolver } from '@hookform/resolvers/zod'
import{toast} from 'react-hot-toast'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import ImageUpload from '@/components/ui/image-upload'

interface ColorFormProps{
    initialData: Color | null
}


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/,{
        message: "String must be a valid hex code",
    }),
});

type ColorFormValue = z.infer<typeof formSchema>


const SizeForm:React.FC<ColorFormProps> = ({initialData}) => {

    const params = useParams();
    const router = useRouter();
    

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData? "Edit Color" :"Create Color"
    const description = initialData? "Edit a Color" :"Add a new Color"
    const toastMessage = initialData? "Color updated" :"Color created"
    const action = initialData? "Save changes" :"Create"

    const form = useForm<ColorFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData || {
            name:'',
            value:""
        }
    });

    const onSubmit =async(data: ColorFormValue)=>{
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);  
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data);
            }
        
           router.refresh();
           router.push(`/${params.storeId}/colors`);
           toast.success(toastMessage);
        } catch (error) {
           toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async()=>{
        try {
            setLoading(true);
        await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
        router.refresh();
        router.push(`/${params.storeId}/colors`);
        toast.success("Color deleted.")  
        setOpen(false);
        } catch (error) {
            toast.error("Make sure you remove all categories using this color first");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

  return (
    <>
    <AlertModal isOpen={open} loading={loading} onClose={()=>setOpen(false)} onConfirm={onDelete}/>
    <div className=" flex items-center justify-between">
    <Heading title={title} description={description}/>    
    {
        initialData && (
            <Button variant='destructive' size='icon' onClick={()=>{setOpen(true)}} disabled={loading}>
            <Trash className=" w-4 h-4"/>
        </Button>
        )
    }
    </div>
    <Separator/>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8 w-full'>
        <div className=' grid grid-cols-3 gap-8'>
            <FormField
             control={form.control} 
             name='name'
             render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input disabled={loading} placeholder='Color name' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}
             />
             <FormField
             control={form.control} 
             name='value'
             render={({field})=>(
                <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                        <div className='flex items-center gap-x-4'>
                        <Input disabled={loading} placeholder='Color value' {...field}/>
                        <div className='border p-4 rounded-full' style={{backgroundColor: field.value}}/>
                        </div>
                       
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}
             />
        </div>
            <Button disabled={loading} className=' ml-auto' type='submit'>
                {action}
            </Button>
        </form>
    </Form>
    </>  
  )
}

export default SizeForm