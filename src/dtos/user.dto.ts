export interface userLoginDTO {
  email: string;
  password: string;
}

export interface createUserDTO {
  name: string;
  email: string;
  password: string;
}

interface item{
  productId:number,
  quantity:number,
}

export interface orderItemsDTO{
  orderItems:[item]
}

