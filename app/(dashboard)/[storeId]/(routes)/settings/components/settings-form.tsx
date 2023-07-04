"use client"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { zodResolver } from '@hookform/resolvers/zod'
import{toast} from 'react-hot-toast'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'

interface SettingsFormProps{
    initialData: Store
}


const formSchema = z.object({
    name: z.string().min(1),
})

type SettingsFormValue = z.infer<typeof formSchema>


const SettingsForm:React.FC<SettingsFormProps> = ({initialData}) => {

    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData,
    });

    const onSubmit =async(data: SettingsFormValue)=>{
        try {
            setLoading(true);
        await axios.patch(`/api/stores/${params.storeId}`, data);
           router.refresh();
           toast.success("Store updated.")
        } catch (error) {
           toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async()=>{
        try {
            setLoading(true);
        await axios.delete(`/api/stores/${params.storeId}`)
        router.refresh();
        router.push('/');
        toast.success("Store deleted.")  
        setOpen(false);
        } catch (error) {
            toast.error("Make sure you remove all products and categories first");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

  return (
    <>
    <AlertModal isOpen={open} loading={loading} onClose={()=>setOpen(false)} onConfirm={onDelete}/>
    <div className=" flex items-center justify-between">
    <Heading title='Settings' description='Manage store preferences'/>    
    <Button variant='destructive' size='icon' onClick={()=>{setOpen(true)}} disabled={loading}>
        <Trash className=" w-4 h-4"/>
    </Button>
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
                        <Input disabled={loading} placeholder='Store name' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
             )}
             />

           
        </div>
            <Button disabled={loading} className=' ml-auto' type='submit'>
                Save changes
            </Button>
        </form>
    </Form>
    <Separator/>
    <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.storeId}`} variant='public'/>
    </>  
  )
}

export default SettingsForm