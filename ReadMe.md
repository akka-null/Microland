a webapp for microland inoformatique

// TODO: 
- [ ] site prototype
- [ ] db Schema

- [ ] use mongoose with mongoodb 
- [ ] use drizzle with postgresql

# FrontEnd side:
- [ ] build a figma prototype
- [ ] start the react project structure
- [ ] learn some react
- [ ] learn some html
- [ ] learn some css
- [ ] add input validation for user input (UX)

- [ ]
- [ ]

# BackEnd side:
- [ ] add input validation for user input (Security)
- [ ] build the EndPoint
- [ ] DB Schema
- [x] user Schema
- [ ] product Schema
- [ ] Routes
- [ ] middlewares is auth, is admin
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
# routes 

- http://localhost/product/
-                          /computer/
-                                 /Desktop
-                                 /laptop
-                                 /tabblet
-                                 /allinone
-                       /parts/
-                             /mob
-                                 /intel
-                                 /amd
-                             /gpu
-                                 /intel
-                                 /amd
-                             /cpu
-                                 /intel
-                                 /amd
-                             /ram
-                             /psu
-                             /case
-                             /storage
-                                     /ssd
-                                     /hdd
-                             /cooling
-                                     /air
-                                     /water
-                                     /fan
-                                     /thermalpaste
-                             /peripherals/
-                                         /monitor
-                                         /mouse
-                                         /keyboard
-                                         /headset
-                                         /mousepad


/product-category/accessoires-et-reseaux/
/product-category/accessoires-et-reseaux/adaptateurs/adaptateurs-affichage/
/product-category/accessoires-et-reseaux/adaptateurs/adaptateurs-alimentation/
/product-category/accessoires-et-reseaux/adaptateurs/adaptateurs-audio/
/product-category/accessoires-et-reseaux/adaptateurs/adaptateurs-usb/
/product-category/accessoires-et-reseaux/adaptateurs/adaptateurs-type-c/
/product-category/accessoires-et-reseaux/adaptateurs/hubs-usb/
/product-category/accessoires-et-reseaux/adaptateurs/splitters/
/product-category/accessoires-et-reseaux/cables/cables-affichage/
/product-category/accessoires-et-reseaux/cables/cables-electrique/
/product-category/accessoires-et-reseaux/cables/cables-audio/
/product-category/accessoires-et-reseaux/cables/cables-reseau/
/product-category/accessoires-et-reseaux/cables/cables-telephonique/

/product-category/accessoires/reffroidisseur-cpu/
/product-category/accessoires/stockage-externe/cartes-memoires/
/product-category/accessoires/stockage-externe/flash-disk/
/product-category/accessoires/stockage-externe/disques-durs-externes/
/product-category/accessoires/stockage-externe/graveurs-externes/
/product-category/accessoires-et-reseaux/#
/product-category/accessoires-et-reseaux/#
/product-category/accessoires/reseau/modems/
/product-category/accessoires/reseau/routeurs-repeteurs-points-d-acces/
/product-category/accessoires/reseau/bluetooth/
/product-category/accessoires/reseau/usb-wifi/
/product-category/accessoires/reseau/cartes-reseau-lan/
/product-category/accessoires/reseau/cartes-reseau-wifi/
/product-category/accessoires/reseau/switches/
/product-category/accessoires/reseau/CPLS/
/product-category/accessoires/reseau/antennes/
/product-category/accessoires/onduleurs-multiprises/
/product-category/logiciel/
product-category/accessoires/telephonies/soires/telephonie/

/product-category/mobilier-et-impression/
/product-category/mobilier/tables-pc/
/product-category/mobilier/chaises-pc/
/product-category/printer/
/product-category/consommables/
/product-category/multimedia/


