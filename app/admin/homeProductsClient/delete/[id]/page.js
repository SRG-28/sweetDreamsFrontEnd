import DeleteProduct from "@/app/admin/homeProductsClient/delete/[id]/components/DeleteProduct";

/**
 * getProduct Function
 *
 * Fetches product details from the backend API using the provided product ID.
 * This function is intended for server-side rendering (SSR).
 *
 * @param {string} id - The unique identifier of the product to be fetched.
 * @returns {Object|undefined} The product data if the fetch is successful, otherwise undefined.
 */
async function getProduct(id) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL}/${id}`;

    // Fetch product data from the API without caching (to ensure fresh data)
    const res = await fetch(url, { cache: "no-store" });

    // If the response is not ok (e.g., 404), return undefined
    if (!res.ok) {
        return undefined;
    }

    // Parse the JSON response and return the product data
    return res.json();
}

/**
 * ProductDeletePage Component
 *
 * This is a server-side rendered page component that fetches a product by its ID
 * and displays the DeleteProduct component to allow users to delete the product.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.params - The parameters object containing route parameters
 * @param {string} props.params.id - The unique identifier of the product from the route
 *
 * @returns {JSX.Element} The rendered page component
 */
const ProductDeletePage = async ({ params }) => {
    // Fetch the product data using the provided ID
    const product = await getProduct(params.id);

    // If no product is found, trigger the notFound function (assumes Next.js routing)
    if (!product) {
        notFound(); // This would typically render a 404 page or similar
    }

    return (
        <div className="pageGeneralClass">
            {/* Render the DeleteProduct component with the fetched product data */}
            <DeleteProduct product={product} />
        </div>
    );
};

export default ProductDeletePage;
