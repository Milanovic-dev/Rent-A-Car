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
    * GET /auth/users
    * GET /auth/users/{id}
    * GET /auth/users/{role}
    * GET /auth/users/{id}/permissions
    * GET /auth/users/permissions
    * POST /auth/users/{id}/permissions/update
    * POST /auth/users/permissions/create
    * PATCH /auth/users/status/{id}
    * POST /auth/users/login
    * POST /auth/users/register
    * POST /auth/users/update
    * POST /auth/users/role/update
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
      * GET /cars
      * GET /cars/{id}
      * GET /cars/pricelists/{id}
      * POST /cars/pricelist/create
      * PUT /cars/pricelist/update
      * DELETE /cars/pricelist/remove/{id}
      * GET /cars/pricelist/all 
      * GET /cars/stats
      * GET /cars/stats/{id}
      * GET /cars/reviews
      * GET /cars/reviews/{id}
      * POST /cars/review/create
      * GET /cars/reviews/pending
      * DELETE /cars/review/remove/{id}
      * GET /cars/make
      * GET /cars/make/{id}
      * GET /cars/models
      * GET /cars/models/{id}
      * GET /cars/fuels
      * GET /cars/fuels/{id}
      * GET /cars/class
      * GET /cars/class/{id}
      * POST /cars/create
      * POST /cars/update
      * POST /cars/reviews/create
      * POST /cars/reviews/update
      * POST /cars/make/create
      * POST /cars/make/update
      * POST /cars/models/create
      * POST /cars/models/update
      * POST /cars/fuels/create
      * POST /cars/fuels/update
      * POST /cars/class/create
      * POST /cars/class/update
      * DELETE /cars/models/remove/{id}
      * DELETE /cars/class/remove/{id}
      * DELETE /cars/make/remove/{id}
      * DELETE /cars/fuels/remove/{id}
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
    * GET /messages
    * GET /messages/{id}
    * POST /messages/send
    * DELETE /messages/remove/{id}
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
    * renterId
    * cars
   ## Report
    * orderId 
    * date
    * mileage
    * text
  #### Endpoints:
    * GET /orders
    * GET /orders/{id}
    * GET /orders/bundles
    * GET /orders/bundles/{id}
    * POST /orders/create
    * POST /orders/revoke/{id}
    * POST /orders/{id}/{approve}
 # Search microservice model: 
  #### Endpoints: 
    * POST /search/cars
 # Tracking microservice model:
  ## Location
    * carId
    * renterId
    * ownerId
    * coordinates
    * timestamp
  #### Endpoints:
    * POST /tracking/{carId}
    * POST /tracking/{carId}/track
