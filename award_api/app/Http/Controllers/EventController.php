<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
// use App\Config;
//use JWTAuth;
use Log;
use App\Upload;

class EventController extends Controller
{
    protected $user;
    public $heading = 'Award Admin';
    public function __construct()
    {
      //  $this->user = JWTAuth::parseToken()->authenticate();
      $this->middleware('auth');
    }

    public function upload(Request $request)
    {
        if($request->hasfile('logo'))
        {
            $fileData = Upload::uploadFile($request,'logo','event_logo_upload_path');
            if($fileData['status'] == true){
              $logo = $fileData['data'];
              $result = array('success' => true, 'status_code'=>1000 ,'message' => 'Image Uploaded Successfully','data' => $logo);
              return response()->json( $result, 200);
            }else{
                $error = $fileData['data'];
                $result = array('success' => false, 'status_code'=>555 ,'message' => $error,'data' => '');
                return response()->json( $result, 500);
            }
        }else{
          $result = array('success' => false, 'status_code'=>555 ,'message' => 'Please Upload Image.','data' => '');
          return response()->json( $result, 500);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $token = $request->bearerToken();

        $events = Event::orderBy('id','desc')->get();
        if(isset($events) && !empty($events)){
          $result = array('success' => true, 'status_code'=>1000 ,'message' => 'Records Available','data' => $events);
        }else{
          $result = array('success' => false, 'status_code'=>999 ,'message' => 'No Records Found','data' => '');
        }
        return response()->json( $result, 200);
    }

    public function getRecentEventList(Request $request)
    {
        $token = $request->bearerToken();


        if($token){
            //echo "<prE>";print_r($this->user);echo "</prE>";
            $user = $this->user;

            if(!empty($user)){
                $latest_events = Event::where('status', 1)
                                        ->orderBy('id', 'desc')
                                        ->take(5)
                                        ->get();

                $data = array('latest_events' => $latest_events);
                $result = array('success' => true, 'status_code'=>1000 ,'message' => 'Records Available','data' => $data);
            }else{
                $result = array('success' => false, 'status_code'=>999 ,'message' => 'No Records Found','data' => '');
            }
        }else{
            $result = array('success' => false, 'status_code'=>999 ,'message' => 'Invalid Token','data' => '');
        }
          return response()->json( $result, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $token = $request->bearerToken();

        if($request->name){
            try {
                $logo = '';

                /*if($request->hasfile('logo')){
                    $logo = uploadFile($request,'logo','event_logo_upload_path');
                }*/

                $event = new Event();
                $event->name = $request->name;
                $event->start_date = date('Y-m-d H:i:s',strtotime($request->startDate));
                $event->end_date = date('Y-m-d H:i:s',strtotime($request->endDate));
                $event->submission_deadline = date('Y-m-d H:i:s',strtotime($request->submissionDeadline));
                $event->logo = $logo;
                $event->description = $request->description;
                $event->status = $request->status;
                $event->timezone = $request->timezone;
                $event->ip_address = $_SERVER['REMOTE_ADDR'];
                $event->seo_keyword = $this->getseokeyword($request->name,uniqid());
                $event->main_contact_email = $request->mainContactEmail;
                $event->other_contact_email = $request->otherContactEmail;
                $event->mail_signature = $request->mailSignature;
                $event->outgoing_mail_sender = $request->outgoingMailSender;
                $event->reply_to_email = $request->replyToEmail;
                $event->save();
                $event_id = $event->id;
            } catch (\Illuminate\Database\QueryException $e) {
                Log::critical($e->errorInfo);
                $result = array('success' => false, 'status_code'=>555 ,'message' => 'Critical Error! Event could not be added','data' => $e->errorInfo);
                $event = '';
            }

            if(isset($event) && !empty($event)){
                $result = array('success' => true,'status_code'=>1000, 'message' => 'Event added successfully','data' => $request);
            }
        }else{
            $result = array('success' => false,'status_code'=>999, 'message' => 'No data provided. Please provide event details.','data' => $request);
        }
        return response()->json( $result, 200);
    }

    public function getseokeyword($title,$id)
    {
        $expr = '/(?<=\s|^)[a-z]/i';
        preg_match_all($expr, $title, $matches);
        $result = implode('', $matches[0]);
        $result = strtoupper($result).date('Y').$id;
        return $result;
    }


    public function eventDetails(Request $request,$event_seokeyword)
    {
        $token = $request->bearerToken();
        //$event_seokeyword = $request->event_seokeyword;

        if($event = Event::where('seo_keyword',$event_seokeyword)->get()){
            $event = @$event[0];
            $result = array('success' => true,'status_code'=>1000, 'message' => "Record found",'data' => $event);
        }else{
            $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $event_seokeyword);
        }
        return response()->json( $result, 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $token = $request->bearerToken();
       // $id = $request->id;
       if($request->event_seokeyword){
        $event_seokeyword = $request->event_seokeyword;
        $event = Event::where('seo_keyword',$event_seokeyword)->get();
        if($event){
            $event = @$event[0];
                $result = array('success' => true,'status_code'=>1000, 'message' => "Record found",'data' => $event);
            }else{
                $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $event_seokeyword);
            }
       }else{
            $result = array('success' => false,'status_code'=>999, 'message' => 'No data provided.','data' => '');
        }
        return response()->json( $result, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $token = $request->bearerToken();
        //$id = $request->id;
      //  if($event = Event::find($id)){
        $event_seokeyword = $request->event_seokeyword;
        if($event = Event::where('seo_keyword',$event_seokeyword)->get()){
          $event = @$event[0];
          if($event->logo){
              $event->logo = config('constant.event_logo_upload_url').'/'.$event->logo;
          }
          $result = array('success' => true,'status_code'=>1000, 'message' => "Record found",'data' => $event);
        }else{
          $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $event_seokeyword);
        }
        return response()->json( $result, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $token = $request->bearerToken();

        $id = $request->id;
        if($request->name){
          try {
              $logo = '';

              $event = Event::find($id);
              $logo = $event->logo;
              if($request->logo)
              {
                  $logo = $request->logo;
                  if($event->logo){
                      $destination = config('constant.event_logo_upload_path');
                      @unlink($destination.'/'.$event->logo);
                  }
              }

              $event->name = $request->name;
              $event->start_date = date('Y-m-d H:i:s',strtotime($request->startDate));
              $event->end_date = date('Y-m-d H:i:s',strtotime($request->endDate));
              $event->submission_deadline = date('Y-m-d H:i:s',strtotime($request->submissionDeadline));
              $event->description = $request->description;
              $event->logo = $logo;
              $event->status = $request->status;
              $event->timezone = $request->timezone;
              $event->ip_address = $_SERVER['REMOTE_ADDR'];
              $event->main_contact_email = $request->mainContactEmail;
              $event->other_contact_email = $request->otherContactEmail;
              $event->mail_signature = $request->mailSignature;
              $event->outgoing_mail_sender = $request->outgoingMailSender;
              $event->reply_to_email = $request->replyToEmail;
              $event->save();
              $event_id = $id;
          } catch (\Illuminate\Database\QueryException $e) {
              Log::critical($e->errorInfo);
              $result = array('success' => false, 'status_code'=>555 ,'message' => 'Critical Error! Event could not be added','data' => $e->errorInfo);
              $event = '';
          }

          if(isset($event) && !empty($event)){
              $result = array('success' => true,'status_code'=>1000, 'message' => 'Event updated successfully','data' => $request);
          }
      }else{
          $result = array('success' => false,'status_code'=>999, 'message' => 'No data provided. Please provide event details.','data' => $request);
      }
      return response()->json( $result, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $token = $request->bearerToken();
        $id = $request->id;
        if($token && $id){
            if($event = Event::find($id)){
                $event->delete();
                if($event->logo){
                    $destination = config('constant.event_logo_upload_path');
                    @unlink($destination.'/'.$event->logo);
                }
                $result = array('success' => true,'status_code'=>1000, 'message' => "Event (#$id) deleted successfully.",'data' => $id);
            }else{
                $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $id);
            }
        }else{
            $result = array('success' => false,'status_code'=>999, 'message' => 'Invalid Token or Id.','data' => '');
        }
        return response()->json( $result, 200);
    }

    // Event Details
    public function event_details($id = null)
    {
       if(!empty($id) && $id != null){
            $event_details = Event::where('id',$id)->get();
        }else{
            $event_details = Event::orderBy('id','desc')->first();
        }
        if(count($event_details)){
            $result = array('success'=>true, 'status_code'=>1000, 'data'=>$event_details, 'message' => 'Record Found.');
        }else{
            $result = array('success'=>false, 'status_code'=>999, 'message' => 'Record Not Found.');
        }


        return response()->json( $result, 200 );
    }

    public function my_events(){
      $data['title'] = 'My Events | '.$this->heading;
      $data['data'] = Event::orderBy('id','desc')->get();
      return view('event.list',$data);
    }

}
