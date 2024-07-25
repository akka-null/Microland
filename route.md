Admin:
    POST    /api/product  
    PATCH   /api/product  
    DELETE  /api/product/:id  
    GET     /api/users
    PATCH   /api/user/:id       (make a user an admin)
    DELETE  /api/user/:id
    GET     /api/orders/         (get all orders) 
    PATCH   /api/orders/:orderId/deliver (delivred)

    DROP:
    GET     /api/user/:id       (get profile of a user) this could be done from the frontend bcs we send all the users
    DELETE  /api/order/:orderId (cancle undelevred orders)

User:
    POST    /api/review/:prodId
    GET     /api/user/          (get profile)
    PATCH   /api/user/          (update profile) think about this
    DELETE  /api/user/          (delete account) must provide password
    POST    /api/orders/         (add order)
    GET     /api/orders/mine     (get my order)
    GET     /api/orders/:orderId (get order by id)
    PATCH   /api/orders/:orderId/pay         (pay the order)

    TODO:
    PATCH   /api/review/:prodId
    DELETE  /api/review/:prodId


Shop: TODO: check the routes and validID and stuff like that
    GET     /api/products
    GET     /api/products/:prodType
    GET     /api/products/:prodType/:prodCategory
    GET     /api/product/:prodId
    GET     /api/top            (get top rated products)
    GET     /api/latest         (get top latest products)

Auth:
    POST    /api/register
    POST    /api/login
    POST    /api/logout
    POST    /api/forget
    POST    /api/reset/:resetToken
    GET     /api/email/:emailToken

    TODO:
                                (signup or signin with google)
