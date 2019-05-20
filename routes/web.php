<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('ws', function() {
    $event = new App\Events\MessageSent('1','2', 6);
    dd(broadcast($event));
});

Route::view('/{path?}', 'app');

//Route::get('/', function () {
//    return view('welcome');
//});