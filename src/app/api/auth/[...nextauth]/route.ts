export {GET, POST} from '@/auth'

//when you define a route.ts inside your app directory in next  you can export a GET() or POST() function
/* 
export async function GET(){

}

export async function POST(){   
}  */

//This will implement api request handlers inside your next app
//if you ever have som outside app services, you can create a route file like this to create a GET request handelers or
//a POST request handlers
//Generaly we dont have to create route handelers for own personal use, we only need them when we have some 
//outside services to access from our app.







//Oauth theory
//Når brukeren klikker på sign up, redirecter vi dem til github med vår client_id 
//gituhub.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID
//Github vil presentere brukeren med en side som spør brukeren om den er ok med å dele info med vår app.
//Hvis brukeren sier ja
//Github redirecter tilbake til localhost:3000/api/auth/callback?code=YOUR_CODE
//som er vår authorization callback URL
//Severen henter'YOUR_CODE' fra requesten og lager en follow up requesy til Github
//til github.com/login/oauth/access_token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&code=YOUR_CODE
//github.com/login/oauth/access_token{clientId, clientSecret, code}
//Github forsikrer seg om at clientID, clientSecret og code er riktigeog responderer med en access token.
//access_token = abc123
//access tokenen er det som tillater oss å nå informasjon om brukeren.
//For å få denne informasjonen må vi sende en til requesten til Github.
//api.github.com/user Authorization: Bearer/token abc123
//github responderer så med brukeren sin profil, {name, email, avatar}
//Prisma Adapteren lager en ny bruker i databasen med dataen
//Etter det sender vi en cookietiklbake til brukeren sin browser, som vil inneholde all fremtidig
//request automatisk. Cookien forteller oss hvem som lager en request til vår server.
//Next auth håndterer alt dette, så vi trenger ikke å skrive eksplisitt kode for dette.
