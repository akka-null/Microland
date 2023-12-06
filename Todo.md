a webapp for microland inoformatique

// TODO: 

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

#### example from fractalshop
/product/ordinateurs/
/product/ordinateurs/pc-de-marque/
/product/ordinateurs/laptop/
/product/ordinateurs/all-in-one/
/product/ordinateurs/tablettes/
/product/ordinateurs/pc-gamer/

/product/composents/alimentation/
/product/composents/boitiers/
/product/composents/processeur/
/product/composents/carte-mere/
/product/composents/memoires/
/product/composents/vga/
/product/composents/disque-dur/
/product/composents/ssd/

/product/composents/pate-thermique/
/product/composants/moniteurs/
/product/composents/refroidisseur-boitier/
/product/composents/eclairage-PC/
/product/ordinateurs/#
/product/peripheriques-pc/pc-de-bureau/Claviers/
/product/peripheriques-pc/pc-de-bureau/souris/
/product/peripheriques-pc/pc-de-bureau/Tapis-De-Souris/
/product/peripheriques-pc/pc-de-bureau/casques/
/product/peripheriques-pc/pc-de-bureau/haut-parleurs/
/product/peripheriques-pc/pc-de-bureau/Microphones/
/product/peripheriques-pc/pc-de-bureau/Manettes/
/product/peripheriques-pc/peripheques-pc-de-bureau/webcam/
/product/peripheriques-pc/pc-de-bureau/casque-realite-virtuelle/
/product/peripheriques-pc-portable/memoire-ram-pour-pc-portable/
/product/peripheriques-pc/peripheriques-laptop/disque-dur-pc-portable/
/product/peripheriques-pc-portable/Chargeurs/
/product/peripheriques-pc-portable/sac-laptop/
/product/peripheriques-pc-portable/batteries/
/product/peripheriques-pc-portable/ventilateurs-pc-portable/


/product/accessoires-et-reseaux/
/product/accessoires-et-reseaux/adaptateurs/adaptateurs-affichage/
/product/accessoires-et-reseaux/adaptateurs/adaptateurs-alimentation/
/product/accessoires-et-reseaux/adaptateurs/adaptateurs-audio/
/product/accessoires-et-reseaux/adaptateurs/adaptateurs-usb/
/product/accessoires-et-reseaux/adaptateurs/adaptateurs-type-c/
/product/accessoires-et-reseaux/adaptateurs/hubs-usb/
/product/accessoires-et-reseaux/adaptateurs/splitters/
/product/accessoires-et-reseaux/cables/cables-affichage/
/product/accessoires-et-reseaux/cables/cables-electrique/
/product/accessoires-et-reseaux/cables/cables-audio/
/product/accessoires-et-reseaux/cables/cables-reseau/
/product/accessoires-et-reseaux/cables/cables-telephonique/

/product/accessoires/reffroidisseur-cpu/
/product/accessoires/stockage-externe/cartes-memoires/
/product/accessoires/stockage-externe/flash-disk/
/product/accessoires/stockage-externe/disques-durs-externes/
/product/accessoires/stockage-externe/graveurs-externes/
/product/accessoires-et-reseaux/#
/product/accessoires-et-reseaux/#
/product/accessoires/reseau/modems/
/product/accessoires/reseau/routeurs-repeteurs-points-d-acces/
/product/accessoires/reseau/bluetooth/
/product/accessoires/reseau/usb-wifi/
/product/accessoires/reseau/cartes-reseau-lan/
/product/accessoires/reseau/cartes-reseau-wifi/
/product/accessoires/reseau/switches/
/product/accessoires/reseau/CPLS/
/product/accessoires/reseau/antennes/
/product/accessoires/onduleurs-multiprises/
/product/logiciel/
product/accessoires/telephonies/soires/telephonie/

/product/mobilier-et-impression/
/product/mobilier/tables-pc/
/product/mobilier/chaises-pc/
/product/printer/
/product/consommables/
/product/multimedia/


