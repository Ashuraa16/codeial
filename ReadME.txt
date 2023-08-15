Information about project

1) API -> we will never put the fetching logic of api inside an component
for this we will make another Api folder inside there we will be having this index.js and there we will have multiple function like getPost,Createost and fetching function will be inside these functions and then we will call these functions inside the components

JSON.parse() takes a JSON string and transforms it into a JavaScript object. JSON.stringify() takes a JavaScript object and transforms it into a JSON string.

2) Props Validation -> As the porject grows we will pass the props in components which may lead to errors for this we need to validate the props by its type which can be done with the help of the packages such as flow,typescript and proptype packages we are using proptype package in this project  "npm i prop-types" it is only used in development mode not in production mode

A callback is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of action.

In Spa routing is happen at the client side using javascript and in Mpa routing is happen at the server side and in Spa we are making request to server just to get data not the pages 

For routing 'npm i react-router-dom'


'npm i react-toast-notifications' for giving notifications in our react app 


AUTHENTICATION

 Statefull Auth -> Also called as session based Auth here user login with user and pass and server will create the session and store it in the user memory and in response it set the cookie on the client browser with session id and send this cookie with session id with every request and server will match the id send the response accordingly | in short we are maintaing the user state on the server side also called as session based Auth

 Stateless Auth -> Used in Spa here server generate the token for the user and send it back in response and get stored in the local storage of user's  browser and then we include this token in the header of the every request and then server validate the token and then send the suitable request

 Jwt (json webtoken) it consist of 3 parts 
 1-> header -> which contain what algorithm is used
 2-> payload -> which contain the user Information
 3->signature -> this signature is done by the server and server verify the token by this signature and it is created by the header payload and the secret key

 The Context in react is used to share data between nested components without passing it as props

 For Decoding the Token we se a 'npm i jwt-decode'



 https://replit.com/@mayanklakhina87/routing-react

 Making route Private -> Only logged in user should access the settings page and if another user tries to acess the page we should redirect the user to somewhere else 

 for this we use Navigate from react-router-dom



Context provides a way to pass data through the component tree without having to pass props down manually at every level. Context is designed to share data that can be considered “global” for a tree

For example, authenticated user, locale preference, UI theme need to be accessed in the application by many components.
     
    const {Provider, Consumer} = React.createContext(defaultValue)

