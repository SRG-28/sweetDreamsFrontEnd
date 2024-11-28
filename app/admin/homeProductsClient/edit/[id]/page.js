import { notFound } from "next/navigation";
import EditProductForm from "@/app/admin/homeProductsClient/edit/[id]/components/EditProductForm";

async function getProduct(id) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL}/${id}`;
    // This is SSR
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        return undefined;
    }

    return res.json();
}

const ProductEditPage = async ({ params }) => {
    const product = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="pageGeneralClass">
            <EditProductForm product={product} />
        </div>
    );
};

export default ProductEditPage;
