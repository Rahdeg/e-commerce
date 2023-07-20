"use client"

import { cn } from "@/lib/utils"
import { Select} from "antd";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

  
  

export function MainNav({className, ...props}:React.HtmlHTMLAttributes<HTMLElement>) {
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

   

    const routes =[
        {
            href:`/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`
        },
        {
            href:`/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href:`/${params.storeId}/categories`,
            label: "Categories",
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href:`/${params.storeId}/sizes`,
            label: "Sizes",
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            href:`/${params.storeId}/colors`,
            label: "Colors",
            active: pathname === `/${params.storeId}/colors`
        },
        {
            href:`/${params.storeId}/products`,
            label: "Products",
            active: pathname === `/${params.storeId}/products`
        },
        {
            href:`/${params.storeId}/orders`,
            label: "Orders",
            active: pathname === `/${params.storeId}/orders`
        },
        {
            href:`/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        },
        

    ];

    interface SelectProps {
  onValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


const onSelectCategory = (value: string) => {
    if (value) {
       const filtered = routes?.filter((route) => route.label === value);
    return   router.push(filtered[0]?.href)
   }
 };

   


    return (
        <>
        <nav className={cn('md:flex hidden items-center space-x-4 lg:space-x-6', className)}>
            {
                routes.map((route)=>(
                    <Link href={route.href} key={route.href} className={cn(' text-sm font-medium transition-colors hover:text-primary',route.active ? 'text-black dark:text-white' : " text-muted-foreground")}>
                    {route.label}
                    </Link>
                ))
            }
        </nav>
        <nav className={cn('flex md:hidden items-center space-x-4 lg:space-x-6', className)}>
        <Select defaultValue=" Overview" size="large"
                   allowClear
                   autoFocus= {false}
                    showSearch
                    placeholder="Overview"
                    optionFilterProp="children"
                    onChange={(val)=> onSelectCategory(val)} bordered={false}
                    onSearch={(val)=> onSelectCategory(val)}
                    filterOption={(input, option) =>
                      (option?.value?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    className=" border  rounded-md " style={{width:100}}> 
                        {
                          routes?.map((route)=>(
                            <Select.Option value={route.label} key={`${route.href}`} className={cn(' text-sm font-medium transition-colors hover:text-primary',route.active ? 'text-black dark:text-white' : " text-muted-foreground")}>{route.label}</Select.Option> 
                          ))
                        }
                    </Select>

            
        </nav>
        </>
        
    )
}


{/* <Select >
<SelectTrigger className="w-[120px]">
  <SelectValue placeholder="Overview" />
</SelectTrigger>
<SelectContent>
 
  {
              routes.map((route)=>( 
                  <SelectItem value={route.label} onSelect={()=>onCategorySelect(route.href)} key={route.href} className={cn(' text-sm font-medium transition-colors hover:text-primary',route.active ? 'text-black dark:text-white' : " text-muted-foreground")}>
                 
                  {route.label}
                 
                
                 
                 
               
                  </SelectItem>
              
              ))
          }
 
 
</SelectContent>
</Select> */}