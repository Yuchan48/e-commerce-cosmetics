# E-Commerce Website

Shopping website created with React.js, Node.js, Redux and MongoDB. 
___

#### This e-commerce enables 2 main different implementations:

1. Buyers browse the store category, products, and place orders and make payment. Receive order receipt by email after placing and paying for the order. Logging in to the account will enable to view the order histories and update profile.

2. Admin manages and controls the entire store components including view/edit/delete/create orders, users, products.

##### place order screen 
![cart image](https://i.imgur.com/CE316oWm.jpg)
___

#### Features

- secure signin with Authentication with jasonwebtoken
- password hashed with bcrypt
- payment with paypal and stripe
- send order receipt after placing order and successful payment
- signin info, cart items, shipping address etc. will remain for 30days in the localstorage
- when signed in, you can view order histories, view and edit user profile.
- when signed in as an Admin, you can view, edit, delete list of all the users/orders/products as well create products.

___

### to run the app
- `npm run dev` in the terminal
___

##### home
![home image](https://i.imgur.com/pEzKblQm.jpg)

#### mobile 
![mobile image](https://i.imgur.com/SSFiBZcm.jpg)

#### cart 
![cart image](https://i.imgur.com/qVpcXMNm.jpg)

