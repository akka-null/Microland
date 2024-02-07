- [ ] delete an account (user can delete his account and admin can delete an acount)
- [x] refactor "forget password"

## unite testing
- [ ] wirte a unite testing for all the edge cases
- [ ] make sure you test each edge case possible 
- [ ] ask your self in each function you do what can goes wrong and how should the api react to that change

## Error Handling
- [x] use the error handling on all the routes
- [x] error handler middelware for express 
- [x] notfound handler middelware for express 
- [x] validObjectId middelware with mongoose

orders and pyments
- [ ] complete the order section 
- [ ] order schema
- [ ] create order
- [ ] update order 
- [ ] stripe implemntation
- [ ] chargily implemntation

- [x] migrate from js to ts ( should you?)
- [x] build a web-scraper to get data from [ouedkinss](https://www.ouedkniss.com/) store page specifecly [microland's page](https://www.ouedkniss.com/store/2236/microland-informatique-oran/)
- [ ] checkout [cloudnary](https://cloudinary.com/)
- [x] add pagination support to all the shop routes
- [ ] don't rely on postman docs and learn how to implement Api doc with [openapi](https://swagger.io/specification/)


### DB/ orm  side
- [x] create a seeder script- [scraper](https://www.github.com/akka-null/scraper)

- [ ] Mongoodb with [Mongoose (odm)](https://mongoosejs.com/)
    - [x] user Schema
    - [x] ~~checkout~~ (frontend stuff no need to implement on the BE)
    - [ ] user orders (not sure if we need it for space managment)
    - [ ] user whishlist
    - [x] review schema
    - [ ] product Schema
        - [ ] logic to calc the discount factor or the discount price
        - [ ] logic to calc the discount price
        - [ ] use mongoose [discriminator](https://mongoosejs.com/docs/discriminators.html) to help structure the pruducts
        - [ ] create index for better performace (need to test performance of mongooddb without them first)

### try postgresql for this project
- [ ] use drizzle || prisma with postgresql
- [ ] ~~prisma~~(the more i read articles about prisma performance the more i lean twards drizzile)
- [ ] use drizzle orm
    - [ ] user Schema
    - [ ] ~~checkout~~ (no need for microland)
    - [ ] user whishlist
    - [ ] review schema
    - [ ] product Schema

### Auth & security
- [x] input validation sanitization ([express validator](https://express-validator.github.io/docs/guides/getting-started/))
- [x] isAdmine middelware(protecting some routes)
- [x] isLoggedIn middelware(protecting some routes)
- [ ] Max Retry/Jail in Login
- [x] ~~csrf protection~~ (no need in algeria unless we impliment stripe/chargily)
- [x] HttpOnly cookie (JWT ofc)
- [x] helmet js

### ROUTES 
- [ ] generate api doc with postman


### payment support
- [ ] order form (for algeria since we don't use stripe)
- [ ] Stripe (learning ) 
- [ ] [chargily](https://chargily.com/) (for algeria)
- [ ] impliment chargily



# FrontEnd side:
- [x] site prototype
- [ ] build a figma prototype
- [ ] start the react project structure
- [ ] learn some react
- [ ] learn some html
- [ ] learn some css
- [ ] add input validation for user input (UX)

# BackEnd side:
- [ ] user Schema
- [ ] product Schema
- [ ] category Schema
- [ ] order Schema

- [ ] cors errors
- [ ] csrf protection
- [ ] set number of request are alowed on certain routes
- [ ] helmetJS for settting security headers
- [ ] use Oauth to login with google account
- [ ] jwt tokens 
- [ ] file upload with multer

- [ ] middlewares for error handling (express handler or make your own)
- [ ] middlewares is for validation / sanitizing 
- [ ] middlewares is logedin
- [ ] middlewares is admin
- [ ] middlewares is auth

- [ ] Routes
- [ ] test all the Routes with postman

- [ ]  look for better deployment for DZ website
- [ ]  Docker and should you use it

## Schema 
### user 
- username
- email
- password
- confirmPassword
- role
### product 
- title
- quantity
- price 
- category
- brand

### Route structure 
## auth route
- BaseURL/register
- BaseURL/login
- BaseURL/logout

## admin route
- BaseURL/admin ( or at / if we are as admin we can see a drop down menu for an admin to manage orders and products and users)
  GET    /admin/products/
  GET    /admin/products/:prodID
  POST   /admin/edits-products
  DELETE /admin/products

## shop route(product)
  GET /product/
  GET /product/:prodId
  GET /product/:category/:subCategory/

