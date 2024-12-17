export interface Product {
    id: string;
    data: ProductData;
}

export interface ProductData{
    name: string;
    category: string;
    price: number;
    reviews: string[];
}