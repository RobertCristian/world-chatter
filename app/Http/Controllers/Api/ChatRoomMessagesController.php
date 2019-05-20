<?php

namespace App\Http\Controllers\Api;

use App\ChatRoom_Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChatRoomMessagesController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sender' => 'required',
            'message' => 'required',
            'chatRoomId' => 'required|numeric',
        ]);

        try {
            $chatRoomMessage = new ChatRoom_Message;

            $chatRoomMessage->chatRoom_id = $request->chatRoomId;
            $chatRoomMessage->message = $request->message;
            $chatRoomMessage->sender = $request->sender;

            $chatRoomMessage->save();

            broadcast(new MessageSent($chatRoomMessage->id, $chatRoomMessage->message, $chatRoomMessage->sender, $chatRoomMessage->chatRoom_id, $chatRoomMessage->created_at));

            return response()->json(null, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 400);
        }
    }

}
