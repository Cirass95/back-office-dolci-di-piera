export interface ProductList{
    list: Product[];
    length: number;
}
export interface Product {
    id: string;
    data: ProductData;
}

export interface ProductData{
    description: string;
    title: string;
    category: string;
    price: number;
    reviews: string[];
    employee: string;
}
