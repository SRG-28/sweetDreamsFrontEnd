import ProductDetails from "@/app/homeProductsUser/[id]/components/productDetails";
//import "@/app/homeProductsUser/[id]/page.css"; 
import {notFound} from "next/navigation";
/**
 * Fetches the Product details based on the provided task ID using SSR (Server-Side Rendering).
 * The 'cache: no-store' option is used to ensure fresh data is retrieved on each request.
 * @param {string} id - The ID of the Product to be fetched.
 * @returns {Promise<Object|undefined>} - The Product data as a JSON object, or undefined if not found.
 */

async function getProduct(id) {
    const url = `${process.env.NEXT_PUBLIC_API_BACKEND_PRODUCTS_URL}/${id}`;

    // Perform the API request
    const res = await fetch(url, { cache: "no-store" });

    // If the response is not OK (e.g., 404 or other errors), return undefined
    if (!res.ok) {
        return undefined;
    }

    // Return the parsed JSON data
    return res.json();
}
/**
 * ProductDetailsPage Component - Displays the details of a single Product.
 * This page uses SSR to fetch the Product details before rendering the component.
 * @param {Object} props - The props object containing route parameters.
 * @param {Object} props.params - The route parameters, including the Product ID.
 * @returns {JSX.Element} - The JSX for rendering the Product details, or a 404 page if the Product is not found.
 */
const ProductDetailsPage = async ({ params }) => {
    // Fetch Product data based on the provided ID
    const product = await getProduct(params.id);

    // If the Product is not found, trigger a 404 page
    if (!product) {
        notFound(); // This function should be provided by Next.js to render a 404 page
        return; // Return early to stop further rendering
    }

    // Render the ProductDetails component with the fetched Product data
    return (
        <div className='pageGeneralClass'>
            <ProductDetails product={product} />
        </div>
    );
};

export default ProductDetailsPage;
