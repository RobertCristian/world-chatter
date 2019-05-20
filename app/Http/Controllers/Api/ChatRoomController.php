<?php

namespace App\Http\Controllers\Api;

use App\ChatRoom;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the ChatRoom resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $chatRooms = ChatRoom::with('messages')->get();

            return response()->json($chatRooms, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Store a newly created ChatRoom resource
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:ChatRooms,name|max:20|min:1',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        try {
            $chatRoom = new ChatRoom;

            $chatRoom->name = $request->name;
            $chatRoom->lat = $request->lat;
            $chatRoom->lng = $request->lng;
            $chatRoom->save();

            return response()->json($chatRoom, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Display a ChatRoom resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $chatRoom = ChatRoom::with('messages')->where('id', $id)->first();

            return response()->json($chatRoom, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Search for Chat Rooms with a specific keyword
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        try {
            $chatRooms = ChatRoom::where('name', 'LIKE', '%' . $request->searchValue . '%')->get();

            return response()->json($chatRooms, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
