"use client"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import {  ColorColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorClientProps{
    data : ColorColumn[]
}

export const ColorClient : React.FC<ColorClientProps> =({data})=>{
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <div className=" flex items-center justify-between">
       <Heading title={`Color (${data.length})`} description="Manage colors for your store"/>
       <Button onClick={()=>router.push(`/${params.storeId}/colors/new`)}>
        <Plus className="mr-2 h-4 w-4"/>
        Add New
       </Button>
        </div>
        <Separator/>
        <DataTable columns={columns} data={data} searchKey="name"/>
        <Heading title="API" description="API calls for COlors"/>
        <Separator/>
        <ApiList entityIdName='colorId' entityName="colors"/>
        </>
    )
}