# Microservices:

* Auth microservice model
  ## User
    * id
    * name
    * surname
    * adress
    * city
    * state
    * phone
    * email
    * roles
  #### Endpoints:
    * GET : /api/auth/login
    * GET : /api/auth/users
    * POST : /api/auth/register
   
 * Car microservice model
    ## Car
      * id
      * make
      * brand
      * class
      * transmmission
      * seats
      * mileage
      * rating 
      * ownerId
      * hasACDW
      * image
      * insurance
      * state
      * following 
      * from
      * to
      * pricelistId
    ## Make
      * id 
      * name
    ## Model
      * id
      * name
    ## Class
      * id
      * name
    ## Transmission
      * id
      * name
    ## Fuel
      * id 
      * name
    ## Review
      * id 
      * userId
      * rate
      * commentId
   ## Comment
      * id
      * userId
      * comment
      * reply
      
    ## Pricelist
      * id
      * agencyId
      * pricePerDay
      * pricePerKm
      * carId
      
   #### Endpoints:
   
  * Mail microservice model
    ## User 
    * id
    * name
    * surname
    * adress
    * city
    * state
    * phone
    * email
    * roles
    ## Message
    * id
    * sender
    * receiver
    * message
    * date
    * time
    * reply
    #### Endpoints:
  
  * Orders microservice model:
    ## Order
    * id
    * carId
    * ownerId
    * renterId
    * status
    * from
    * to
    * startLocation
    * endLocation
    * isBundle ?
    ## Report
    * orderId 
    * date
    * mileage
    * text
    
  #### Endpoints
    
    
    
      
      
      
      
    
  
  
