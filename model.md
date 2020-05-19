# Microservices:

* Auth microservice model
  ## User
    * id
    * username
    * name
    * surname
    * address
    * city
    * state
    * phone
    * email
    * role
    * active
  #### REST Endpoints:
    * GET /api/auth/users
    * GET /api/auth/users/{id}
    * PATCH /api/auth/users/status/{id}
    * POST /api/auth/users/login
    * POST /api/auth/users/logout
    * POST /api/auth/users/register
    * POST /api/auth/users/update
 * Car microservice model
    ## Car
      * id
      * make
      * model
      * class
      * transmmission
      * seats
      * mileage
      * rating 
      * CDW
      * imagePath
      * insurance
      * state
      * pricelistId
      * ownerId
   ## Review
      * id 
      * carId
      * rate
      * comments
   ## Comment
      * id
      * userId
      * comment
      * replies
   ## Pricelist
      * id
      * agencyId
      * pricePerDay
      * pricePerKm
      * carId
   #### Endpoints:
      * GET /api/cars
      * GET /api/cars/{id}
      * GET /api/cars/pricelists/{id}
      * GET /api/cars/stats
      * GET /api/cars/stats/{id}
      * GET /api/cars/reviews
      * GET /api/cars/reviews/{id}
      * POST /api/cars/create
      * POST /api/cars/update
      * POST /api/cars/reviews/create
      * POST /api/cars/reviews/update
  * Mail microservice model
    ## Message
    * id
    * sender
    * receiver
    * message
    * date
    * time
    * reply  
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
  #### Endpoints:
  
 * Search microservice model: 
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
    ## Review
      * id 
      * userId
      * rate
      * commentId
    ## Pricelist
      * id
      * agencyId
      * pricePerDay
      * pricePerKm
      * carId
      * +ZAUZETOST
   #### Endpoints: 
