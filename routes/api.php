<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::get('test', 'Api\ChatRoomController@test');

Route::apiResource('chatroom', 'Api\ChatRoomController')->only([
    'index', 'store', 'show'
]);
Route::post('chatroom/search', 'Api\ChatRoomController@search');
Route::apiResource('chatroom/messages', 'Api\ChatRoomMessagesController')->only([
    'store'
]);

