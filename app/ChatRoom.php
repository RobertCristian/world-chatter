<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    protected $table = 'chatRooms';

    public function messages()
    {
       return $this->hasMany('App\ChatRoom_Message', 'chatRoom_id', 'id');
    }
}
