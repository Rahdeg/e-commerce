"use client"

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useParams, useRouter } from "next/navigation"
import { OrderColumn, columns } from "./column"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface OrderClientProps{
    data : OrderColumn[]
}

export const OrderClient : React.FC<OrderClientProps> =({data})=>{
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <div className=" flex items-center justify-between">
       <Heading title={`Order (${data.length})`} description="Manage order for your store"/>
        </div>
        <Separator/>
        <DataTable columns={columns} data={data} searchKey="products"/>
        </>
    )
}