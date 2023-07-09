"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SizeColumn } from "./column";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps{
    data: SizeColumn;
}


export const CellAction:React.FC<CellActionProps> =({
    data
})=>{
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    const onCopy =(id: string)=>{
        navigator.clipboard.writeText(id);
        toast.success("Size Id copied to the clipboard")
    }

    const onDelete = async()=>{
        try {
            setLoading(true);
        await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
        router.refresh();
        toast.success("Size deleted.")  
        } catch (error) {
            toast.error("Make sure you remove all categories using this size first");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
         <AlertModal isOpen={open} loading={loading} onClose={()=>setOpen(false)} onConfirm={()=>onDelete()}/>
         <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className=" w-8 h-8 p-0">
                <span className=" sr-only">Open menu</span>
                <MoreHorizontal className=" h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                <Copy className="mr-2 w-4 h-4"/>
                Copy Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/sizes/${data.id}`)}>
                <Edit className="mr-2 w-4 h-4"/>
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpen(true)}>
                <Trash className="mr-2 w-4 h-4"/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
        </>
      
    );
};