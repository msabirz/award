<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;

class FlagController extends Controller
{
    // public function __construct(){
    //     $this->middleware('auth');
    //   }
    public function email_unique_flag(Request $request){

        $result = array('status'=>false, 'data'=>'Failed Init.');
        $email = $request->email;
        // Query to get email count;
        $email_count = User::where('email',$email)->count();

        // Setting up result based on email count
        if($email_count == 0 ){
            $result = array('success' => true,'status_code'=>1000, 'data'=>'Yippe ! Its Unique');
        }else {
            $result = array('success' => false,'status_code'=>555, 'data'=>'Sorry ! Its already taken.');
        }

        // Return the response
        return response()->json( $result, 200);

    }
}
