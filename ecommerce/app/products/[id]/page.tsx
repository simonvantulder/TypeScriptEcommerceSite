import { products } from "@/app/product-data"

export default function ProductDetailPage({ params } : { params : {id : string}}){
    const product = products?.find(p => p.id ===params.id);
    return <h1> {product?.name} </h1>
}