# world-chatter

Create a chat room anwyerhere on a map and talk with other people! Made With Laravel and React.

## Installation

In the project directory, run:

`composer install`

`npm install`

`php artisan key:generate`

Make sure to add your Pusher API key in `.env` and `resources/js/bootstrap.js`.Also update other necessary info like DB info and run:

`npm run dev`

 Run Migrations with:

`php artisan migrate`

Bring the server up with: 

`php artisan serve`

Finally start the websocket server with:

`php artisan websockets:serve`
