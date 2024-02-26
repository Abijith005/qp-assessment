
## Implementation Guidelines

### Authentication

- Implemented JWT-based authentication for secure user sessions with one day session.
- Three types of users are supported: Author, Admin, and Retail Users.

### Authorization

- Implemented RBAC to control access based on user roles (Author, Admin, Retail User).
- Each user is assigned a role during registration.
- Implemented JWT-based authorization with role-based access control.

### Authorization Middleware

- Created middleware functions for role-based authorization.
- Middleware functions can be used to restrict access to specific routes based on user roles.

### Password Encryption

- Utilized a strong encryption algorithm to securely hash and store user passwords.
- Passwords are not stored in plaintext in the database, enhancing security.


### User Registration and Login


- Authors can register using a dedicated registration endpoint.
- Authors can log in using their registered credentials.
- JWT tokens are issued upon successful login for subsequent authenticated requests.

### Example API Endpoints

POST /api/v1/user/auth/register

{
"name": "author123",
"password": "password123",
"email": "author123@example.com"
}

POST /api/v1/user/auth/login

{
"email": "author123@example.com",
"password": "password123"
}

#### Admin

- Admin is pre-registered in the database with default credentials (email:admin@gmail.com,password:password123).
- Admin can log in using the provided admin credentials.
- JWT tokens are issued upon successful admin login for subsequent authenticated requests.

#### Example API Endpoints

POST /api/v1/admin/auth/login

{
"email": "admin@gmail.com",
"password": "password123"  
}


### Admin can add grocery item
- Authorized admin can add new grocery item it will be stored in grocery table in th database.

#### Example API Endpoints

POST /api/v1/admin/service/addGrocery

{
"name":"Grocery name",
"price":500,
"quantity":10
}


### Admin can remove grocery
- Authorized admin can remove grocery item.

#### Example API Endpoints

id of the grocery to be removed is given as params

DELETE /api/v1/admin/service/removeGrocery/1

### Admin can view all groceries
- Authorized admin can view all grocery items.

#### Example API Endpoints

GET /api/v1/admin/service/viewGroceries

### Admin can update  grocery
- Authorized admin can update  grocery item.

#### Example API Endpoints

id of the grocery to be updated is given as params

PUT /api/v1/admin/service/updateGrocery/1

{
    "name":"updated name",
    "price":"updated price",
    "quantity"""updated quantity"
}

### Admin can manage inventory of all groceries
- Authorized admin can manage inventory of all grocery items.

#### Example API Endpoints

id of the grocery item to mange inventory is given as params

PATCH /api/v1/admin/service/manageInventory/1

{
    "quantity":1 ||-1
}


### User can view all available groceries

- Authorized user can view all available groceries ie, inventory of product greater than or equl to 1.

#### Example API Endpoints


GET /api/v1/user/service/listGroceries


### User can order multiple item available groceries in single order

- Authorized user can order multiple item available groceries in single order.

#### Example API Endpoints


POST /api/v1/user/service/orderGroceries

{
    "orderItems":[{"productId":1,"quantity":2},{"productId":2,"quantity":3},{"productId":3,"quantity":4}]
}


### .env

PORT=5000
DB_NAME=QP
DB_USERNAME=abijith
DB_PASSWORD=abijiths@005
DB_HOST=localhost
JWT_SIGNATURE=secret


