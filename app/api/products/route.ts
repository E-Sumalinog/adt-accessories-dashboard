import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { logActivity } from "@/lib/activityLogger";


/*
=========================================
GET ALL PRODUCTS
=========================================
*/
export async function GET(){

try{

const result = await pool.query(`
SELECT
id,
name,
sku,
category,
price,
stock,
min_stock AS "minStock",
max_stock AS "maxStock",
status,
location,
supplier,
description,
image_url AS "imageUrl",
created_at AS "createdAt",
updated_at AS "updatedAt"

FROM products

ORDER BY created_at DESC
`);


return NextResponse.json(result.rows);


}catch(error){

console.error("GET PRODUCTS ERROR:",error);


return NextResponse.json(
{
error:"Failed fetching products"
},
{
status:500
}
);

}

}



/*
=========================================
CREATE PRODUCT
=========================================
*/
export async function POST(req:Request){

try{


const body = await req.json();


const result = await pool.query(
`
INSERT INTO products
(
name,
sku,
category,
price,
stock,
min_stock,
max_stock,
status,
location,
supplier,
description,
image_url,
created_at,
updated_at
)

VALUES
($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())

RETURNING *

`,
[
body.name,
body.sku,
body.category,
body.price,
body.stock,
body.minStock,
body.maxStock,
body.status,
body.location,
body.supplier,
body.description,
body.imageUrl
]

);

await logActivity({
  userName: "Admin",
  action: "CREATE",
  entity: "PRODUCT",
  entityId: result.rows[0].id,
  description: `Created product ${body.name}`,
});



return NextResponse.json(
result.rows[0]
);



}catch(error){

console.error("CREATE PRODUCT ERROR:",error);


return NextResponse.json(
{
error:"Failed creating product"
},
{
status:500
}
);

}

}




/*
=========================================
UPDATE PRODUCT
=========================================
*/
export async function PUT(req:Request){

try{


const body = await req.json();


const result = await pool.query(
`
UPDATE products

SET

name=$1,
sku=$2,
category=$3,
price=$4,
stock=$5,
min_stock=$6,
max_stock=$7,
status=$8,
location=$9,
supplier=$10,
description=$11,
image_url=$12,
updated_at=NOW()


WHERE id=$13


RETURNING *

`,
[

body.name,
body.sku,
body.category,
body.price,
body.stock,
body.minStock,
body.maxStock,
body.status,
body.location,
body.supplier,
body.description,
body.imageUrl,
body.id

]

);

await logActivity({
  userName: "Admin",
  action: "UPDATE",
  entity: "PRODUCT",
  entityId: body.id,
  description: `Updated product ${body.name}`,
});



return NextResponse.json(
result.rows[0]
);



}catch(error){

console.error("UPDATE PRODUCT ERROR:",error);


return NextResponse.json(
{
error:"Failed updating product"
},
{
status:500
}
);

}

}




/*
=========================================
DELETE PRODUCT
=========================================
*/
export async function DELETE(req:Request){

try{


const body = await req.json();



const existingProduct = await pool.query(
  `
  SELECT name
  FROM products
  WHERE id=$1
  `,
  [body.id]
);

await logActivity({
  userName: "Admin",
  action: "DELETE",
  entity: "PRODUCT",
  entityId: body.id,
  description: `Deleted product ${existingProduct.rows[0]?.name || body.id}`,
});



return NextResponse.json(
{
success:true
}
);



}catch(error){

console.error("DELETE PRODUCT ERROR:",error);



return NextResponse.json(
{
error:"Failed deleting product"
},
{
status:500
}
);


}

}