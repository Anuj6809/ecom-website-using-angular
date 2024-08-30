export interface signup{
    name:string,
    email:string,
    password:string
}


export interface login{
    email:string,
    password:string
}

export interface product{
    name:string,
    price:number,
    description:string,
    category:string,
    color:string,
    image:string,
    id:number,
    quantity:undefined|number,
    productId:undefined|number
}

export interface cart{
    name:string,
    price:number,
    description:string,
    category:string,
    color:string,
    image:string,
    id:undefined|number,
    quantity:undefined|number,
    userId:number,
    productId:number
}

export interface priceSummary{
    price:number,
    discount:number,
    delivery:number,
    tax:number,
    total:number
}

export interface order{
        totalPrice: number,
        userId: number,
        email: string,
        address: string,
        contact: string,
        id:undefined|number,
       
}