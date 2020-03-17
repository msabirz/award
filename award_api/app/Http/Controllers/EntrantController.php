<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entrant;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;


class EntrantController extends Controller
{
    //
    public function __construct(){
          $this->middleware('auth');
    }
    public function store( Request $request ){

        // Set the By default Result
        $result = array('success' => false,'status_code'=>999,'data' => 'Init Failed.');

        $event_id =  $request->event_id;
        $user_id = $request->user_id;
        $user_form_json = $request->user_form_json;

        if( !empty($event_id) && !empty($user_id) && !empty( $user_form_json )){

                try {

                   $new_eventrant = new Entrant;

                   $new_eventrant->user_id = $user_id;
                   $new_eventrant->event_id = $event_id;
                   $new_eventrant->status = $request->status;
                   $new_eventrant->endorsement_status = $request->endorsement_status;
                   $new_eventrant->order_status = $request->order_status;
                   $new_eventrant->payment_status  =$request->payment_status;
                   $new_eventrant->allocated_judges = $request->allocated_judges;
                   $new_eventrant->submitted_date = date('Y/m/d H:i:s') ;

                   $new_eventrant->user_form_json = serialize($user_form_json);
                   $new_eventrant->created_by = $request->created_by;
                   $new_eventrant->updated_by = $request->updated_by;
                   $new_eventrant->ip_address = $_SERVER['REMOTE_ADDR'];
                   $new_eventrant->save();

                   $result = array('success' => true,'status_code'=>1000, 'data' => 'Created Successfully.');


                }catch (\Illuminate\Database\QueryException $e) {

                   $result = array('success' => false, 'status_code'=>555 ,'data' => $e->errorInfo);
               }



        }else{
           $result = array('success' => true,'status_code'=>555, 'data' => 'NF.');
        }

        // Returning the Result.
        return response()->json( $result, 200);

    }

    public function getEntrantFilledForm( Request $request ){

         // Set the By default Result
         $result = array('success' => false,'status_code'=>999,'data' => 'Init Failed.');

         $user_id =  $request->user_id;
         $event_id =  $request->event_id;

         if( !empty($user_id) && !empty($user_id) ){

                 try {

                    $entrant = Entrant::whereUserId($user_id)->whereEventId($event_id)->first();
                   if($entrant){
                        $entrant->user_form_json = unserialize($entrant->user_form_json);
                        $result = array('success' => true,'status_code'=>1000, 'data' => $entrant);
                    }else{

                        $result = array('success' => false,'status_code'=>999, 'data' => 'No Record');
                    }




                 }catch (\Illuminate\Database\QueryException $e) {

                    $result = array('success' => false, 'status_code'=>555 ,'data' => $e->errorInfo);
                }



         }else{
            $result = array('success' => true,'status_code'=>555, 'data' => 'NF.');
         }

         // Returning the Result.
         return response()->json( $result, 200);


    }
}
