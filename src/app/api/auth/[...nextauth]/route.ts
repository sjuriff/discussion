export {GET, POST} from '@/auth'

/* 
when you define a route.ts inside your app directory in next  you can export a GET() or POST() function

export async function GET(){

}

export async function POST(){   
}   
*/

/* 
This will implement api request handlers inside your next app.
If you ever have som outside app services, you can create a route file like this to create a GET request handelers or
a POST request handlers
Generaly we dont have to create route handelers for own personal use, we only need them when we have some 
outside services to access from our app.
 */

//Oauth theory

/*
When the user clicks on sign up, we redirect them to github with our client_id 
gituhub.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID
Github will present the user with a page asking the user if it is ok to share info with our app.
If the user says yes
Github redirects back to localhost:3000/api/auth/callback?code=YOUR_CODE
which is our authorization callback URL
The server retrieves 'YOUR_CODE' from the request and creates a follow up request to Github
to github.com/login/oauth/access_token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&code=YOUR_CODE
github.com/login/oauth/access_token{clientId, clientSecret, code}
Github makes sure that clientID, clientSecret and code are correct and responds with an access token.
access_token = abc123
the access token is what allows us to access information about the user.
To get this information, we need to send a request to Github.
api.github.com/user Authorization: Bearer/token abc123
github then responds with the user's profile, {name, email, avatar}
The Prisma Adapter creates a new user in the database with the data
After that, we send a cookie back to the user's browser, which will contain all future
request automatically. The cookie tells us who makes a request to our server.
Next auth handles all of this, so we don't need to write explicit code for this.
*/
