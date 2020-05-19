# Microservices:

# Auth microservice model
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
 # Car microservice model
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
   ## Make
      * id
      * name
   ## Model
      * id
      * name
   ## Fuel
      * id
      * name
   ## Class
      * id
      * name
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
      * POST /api/cars/make/create
      * POST /api/cars/make/update
      * DELETE /api/cars/make/remove/{id}
      * GET /api/cars/make
      * GET /api/cars/make/{id}
      * POST /api/cars/models/create
      * POST /api/cars/models/update
      * DELETE /api/cars/models/remove/{id}
      * GET /api/cars/models
      * GET /api/cars/models/{id}
      * POST /api/cars/fuels/create
      * POST /api/cars/fuels/update
      * DELETE /api/cars/fuels/remove/{id}
      * GET /api/cars/fuels
      * GET /api/cars/fuels/{id}
      * POST /api/cars/class/create
      * POST /api/cars/class/update
      * DELETE /api/cars/class/remove/{id}
      * GET /api/cars/class
      * GET /api/cars/class/{id}
  # Message microservice model
   ## Message
    * id
    * sender
    * receiver
    * message
    * date
    * time
    * reply
   ## Endpoints
    * GET api/messages
    * GET api/messages/{id}
    * POST api/messages/send
    * DELETE api/messages/remove/{id}
  # Orders microservice model:
   ## Order
    * id
    * carId
    * ownerId
    * renterId
    * approved
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
    * GET api/orders
    * GET api/orders/{id}
    * POST api/orders/create
    * POST api/orders/revoke/{id}
    * POST api/orders/{id}/{approve}
 # Search microservice model: 
  #### Endpoints: 
    * POST api/search/cars
