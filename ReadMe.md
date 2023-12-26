# a webapp for microland inoformatique
- microland is a local shop that sells computers and pc parts
- currntly they are using facbook page and ouedkniss page:

- [MicroLand Ouedkniss](https://www.ouedkniss.com/store/2236/microland-informatique-oran/accueil?page=1)
- [facebook Microland](https://www.facebook.com/profile.php?id=100063694124814)

## TODO: 
- [ ] migrate from js to ts
### DB/ orm  side
- [x] create a seeder script
~~~ bash
## seed predefind data
npm run seed 

## drop the prduction model 
npm run drop 
~~~
- [ ] Mongoodb with [Mongoose (odm)](https://mongoosejs.com/)
    - [x] user Schema
    - [x] ~~checkout~~ (no need for microland)
    - [ ] user orders (not sure if we need it for space managment)
    - [ ] user whishlist
    - [ ] review schema
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
    - [x] ~~checkout~~ (no need for microland)
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

### product page
- [ ] review ssytem with stars
- [ ] review formula
- [ ] review comments 
- [ ] figure out the review formula

### payment support
- [ ] order form (for algeria since we don't use stripe)
- [ ] Stripe (learning ) 
- [ ] [chargily](https://chargily.com/)
- [ ] impliment chargily


## Schema 
### user 
- username
- email
- password
- isAdmine
### product 
- title
- quantity
- price 
- description
- category
#### type
- Desktop
- laptop
- tablette
- AllInOne
#### parts
- MOB
    -intel
    -amd
- GPU
    -intel
    -amd
    -nvidia
- CPU
    -intel
    -amd
- RAM
- PSU
- CASE
- Cooling
    -air
    -water
    - fans
    - thermal paste
- Storage
    -sdd
    -hdd
#### periphrals
- monitor
- mouse
- mousepad
- keyboard
- headset



