"use client"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {  Size } from "@prisma/client"
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

interface SizeFormProps{
    initialData: Size | null
}


const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
})

type SizeFormValue = z.infer<typeof formSchema>


const SizeForm:React.FC<SizeFormProps> = ({initialData}) => {

    const params = useParams();
    const router = useRouter();
    

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData? "Edit size" :"Create size"
    const description = initialData? "Edit a size" :"Add a new size"
    const toastMessage = initialData? "size updated" :"size created"
    const action = initialData? "Save changes" :"Create"

    const form = useForm<SizeFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData || {
            name:'',
            value:""
        }
    });

    const onSubmit =async(data: SizeFormValue)=>{
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data);  
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, data);
            }
        
           router.refresh();
           router.push(`/${params.storeId}/sizes`);
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
        await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
        router.refresh();
        router.push(`/${params.storeId}/sizes`);
        toast.success("Size deleted.")  
        setOpen(false);
        } catch (error) {
            toast.error("Make sure you remove all categories using this size first");
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
                        <Input disabled={loading} placeholder='Size name' {...field}/>
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
                        <Input disabled={loading} placeholder='Size value' {...field}/>
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