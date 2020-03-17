<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\EventForm;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;

class EventFormController extends Controller
{

    //Create the form and store against the event
    public function __construct(){
          $this->middleware('auth');
    }
    public function store( Request $request ) {

         // Set the By default Result
         $result = array('success' => false,'status_code'=>999,'data' => 'Init Failed.');

         $eventCode =  $request->eventCode;
         $user_id = $request->user_id;
         $form_json = $request->form_json;
         if( !empty($eventCode) && !empty($user_id) && !empty( $form_json )){
            $event = Event::where('seo_keyword', $eventCode)->first();


            if($event != null ){

                 try {

                    $new_event_form = new EventForm;
                    $new_event_form->event_id = $event->id;
                    $new_event_form->form_json = serialize($form_json);
                    $new_event_form->created_by = $request->user_id;
                    $new_event_form->ip_address = $_SERVER['REMOTE_ADDR'];
                    $new_event_form->save();

                    $result = array('success' => true,'status_code'=>1000, 'data' => 'Created Successfully.');


                 }catch (\Illuminate\Database\QueryException $e) {

                    $result = array('success' => false, 'status_code'=>555 ,'data' => $e->errorInfo);
                }


            }else{

                $result = array('success' => false,'status_code'=>999, 'data' => 'No Matched Keyword Found.');

            }


         }else{
            $result = array('success' => true,'status_code'=>555, 'data' => 'No Keyword.');
         }

         // Returning the Result.
         return response()->json( $result, 200);
    }

    public function getEventForm( Request $request )  {

          // Set the By default Result
          $result = array('success' => false,'status_code'=>999,'data' => 'Init Failed.');

          $event_id =  $request->event_id;

          if( !empty($event_id) ){

            $event_form = EventForm::whereEventId($event_id)->first();


             if($event_form){

                $event_form->form_json = unserialize($event_form->form_json);

                $event_form->form_json = replace_null_with_empty_string($event_form->form_json);

                $result = array('success' => true,'status_code'=>1000, 'data' => $event_form);

            }else{

                 $result = array('success' => false,'status_code'=>999, 'data' => 'No Record.');

            }

          }else{

             $result = array('success' => true,'status_code'=>555, 'data' => 'NF.');

          }
         // Returning the Result.
         return response()->json( $result, 200);

    }


}
