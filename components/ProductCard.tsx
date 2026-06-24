"use client"

import {
Eye,
Edit,
Trash2
}
from "lucide-react"


import {Product} from "@/lib/type"



export default function ProductCard({

product,
onView

}:{

product:Product
onView:(p:Product)=>void

}){


return (

<div className="
bg-white
rounded-2xl
border
shadow-sm
hover:shadow-xl
transition
overflow-hidden
">


<div className="
h-48
bg-gradient-to-br
from-blue-50
to-indigo-100
flex
items-center
justify-center
">


<div className="
text-5xl
">
📦
</div>


</div>



<div className="p-5">


<div className="
flex
justify-between
">


<h3 className="
font-bold
text-lg
">

{product.name}

</h3>


<span className="
text-xs
bg-green-100
text-green-700
px-2
py-1
rounded-full
">

{product.status}

</span>


</div>



<p className="
text-sm
text-gray-500
mt-2
">

SKU:
{product.sku}

</p>



<p className="
mt-4
font-bold
text-xl
">

₱{product.price}

</p>



<div className="
flex
justify-between
mt-5
">


<span>

Stock:
{product.stock}

</span>


<div className="
flex
gap-2
">


<button
onClick={()=>onView(product)}
>

<Eye size={18}/>

</button>


<button>

<Edit size={18}/>

</button>


<button className="
text-red-500
">

<Trash2 size={18}/>

</button>


</div>


</div>


</div>



</div>


)

}