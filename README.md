# world-chatter

Create a chat room anwyerhere on a map and talk with other people!

## Installation

In the project directory, run:

`composer install`

`npm install`

Make sure to add your Pusher API key in `.env` and `resources/js/bootstrap.js`.Also update other necessary info like DB info and run:

`npm run dev`

 Run Migrations with:

`php artisan migrate`

Bring the server up with: 

`php artisan serve`

Finally start the websocket server with:

`php artisan websockets:serve`
