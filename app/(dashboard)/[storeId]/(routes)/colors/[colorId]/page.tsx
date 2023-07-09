import prismadb from "@/lib/prismadb"
import BillboardForm from "./components/size-form"


const BillboardPage = async ({params}:{params: { colorId : string}}) => {

    const color = await prismadb.color.findUnique({
        where:{
            id: params.colorId
        }
    })


  return (
    <div className=" flex-col">
     <div className="flex-1 space-y-4 p-8 pt-6">
    <BillboardForm initialData={color} />
    </div>   
    </div>
  )
}

export default BillboardPage