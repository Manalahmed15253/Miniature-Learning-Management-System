# Miniature-Learning-Management-System
### Learning Management System (LMS) in the form of a RESTful API and provide HTML forms for create only.
### The system will have two entities: Course and Student. provided a full CRUD operations (Create, read, update and delete).
# Specifications
## Course entity will have the following properties
+ name: string, required, min length of 5 characters
+ code: string, required, must match 3 letters followed by 3 numbers.
+ id: integer, auto generated.
+ description: string, optional, max length of 200 characters.
## Student entity will have the following properties
+ name: string, required, only letters in both cases, apostrophe and dashes are allowed.
+ code: string, required, must match 7 characters.
+ id: integer, auto generated.
# Important Notes
### The endpoints for your API should look like /api/courses/.. and /api/students/..
### The endpoints for your forms should look like /web/courses/create and /web/students/create
### Data stored in a unstructured database (Firebase)
### Deployment Heroku link --> https://desolate-oasis-67530.herokuapp.com/
