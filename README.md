# Microland Informatique
* an E-commerce WebSite for a local shop
* Microland is a local shop that sells computers and pc parts
* currntly they are using facbook page: [facebook Microland](https://www.facebook.com/profile.php?id=100063694124814) and ouedkniss page: [MicroLand Ouedkniss](https://www.ouedkniss.com/store/2236/microland-informatique-oran/accueil?page=1)

## review the live website
* [hosted on vercel for now](https://microland.vercel.app)

## run this localy 


## data seeding with [scrapeMeDaddy](https://github.com/akka-null/scraper) it's little script i wrote with [puppeteer](https://pptr.dev/) to web-scrape from [ouedkniss](https://www.ouedkniss.com) store pages
- i needed this for development when i needed data to seed for the project
- and i think it will help the store manager to pupulate the new site from his [page](https://www.ouedkniss.com/store/2236/microland-informatique-oran/)

~~~ bash
## seed predefind data
npm run seed 

## dellete all the products
npm run drop 
~~~


## WalkThrough
* [thinking on excalidraw](https://excalidraw.com/https://excalidraw.com/#json=OvKMEklEr-PgIHf2XFVg5,x9A2MRsiYthRtUcqs09VUQ)

### Email Service
* a lot of options from MailTrap, SendGrid, MailGun
* for now using my gmail as an Email Service

### DB choise
* for the DB i will use both [MongooDB](https://www.mongodb.com/unstructured-data/schemaless) and [PosgreSQL](https://www.postgresql.org/) and use different branch i wanna try both in term of performance

#### MongooDB
* mongoodb is schemaless and you can add anything in the DB, i wanna use[Mongoose](https://mongoosejs.com) as ODM to implement some structure: 

#### PostgreSQL

### ClientLand
* im total noob when it comes to UI
* i will try to build the frontend with Vue (try at least XD)


### api doc


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





