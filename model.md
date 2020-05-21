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
    * permissions
   ## Permission
    * id
    * name
  #### REST Endpoints:
    * GET /api/auth/users
    * GET /api/auth/users/{id}
    * GET /api/auth/users/{role}
    * GET /api/auth/users/{id}/permissions
    * GET /api/auth/users/permissions
    * POST /api/auth/users/{id}/permissions/update
    * POST /api/auth/users/permissions/create
    * PATCH /api/auth/users/status/{id}
    * POST /api/auth/users/login
    * POST /api/auth/users/register
    * POST /api/auth/users/update
    * POST /api/auth/users/role/update
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
      * busyTimeline
   ## Make
      * id
      * name
   ## Model
      * id
      * name
      * modelId
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
      * status
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
      * POST /api/cars/pricelist/create
      * PUT /api/cars/pricelist/update
      * DELETE /api/cars/pricelist/remove/{id}
      * GET /api/cars/pricelist/all 
      * GET /api/cars/stats
      * GET /api/cars/stats/{id}
      * GET /api/cars/reviews
      * GET /api/cars/reviews/{id}
      * POST /api/cars/review/create
      * GET /api/cars/reviews/pending
      * DELETE /api/cars/review/remove/{id}
      * GET /api/cars/make
      * GET /api/cars/make/{id}
      * GET /api/cars/models
      * GET /api/cars/models/{id}
      * GET /api/cars/fuels
      * GET /api/cars/fuels/{id}
      * GET /api/cars/class
      * GET /api/cars/class/{id}
      * POST /api/cars/create
      * POST /api/cars/update
      * POST /api/cars/reviews/create
      * POST /api/cars/reviews/update
      * POST /api/cars/make/create
      * POST /api/cars/make/update
      * POST /api/cars/models/create
      * POST /api/cars/models/update
      * POST /api/cars/fuels/create
      * POST /api/cars/fuels/update
      * POST /api/cars/class/create
      * POST /api/cars/class/update
      * DELETE /api/cars/models/remove/{id}
      * DELETE /api/cars/class/remove/{id}
      * DELETE /api/cars/make/remove/{id}
      * DELETE /api/cars/fuels/remove/{id}
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
    * bundleId
    * isBundle ?
   ## OrderBundle
    * id
    * cars
   ## Report
    * orderId 
    * date
    * mileage
    * text
  #### Endpoints:
    * GET api/orders
    * GET api/orders/{id}
    * GET api/orders/bundles
    * GET api/orders/bundles/{id}
    * POST api/orders/create
    * POST api/orders/revoke/{id}
    * POST api/orders/{id}/{approve}
 # Search microservice model: 
  #### Endpoints: 
    * POST api/search/cars
 # Tracking microservice model:
  ## Location
    * carId
    * renterId
    * ownerId
    * coordinates
    * timestamp
  #### Endpoints:
    * POST api/tracking/{carId}
    * POST api/tracking/{carId}/track
