<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;

class MailController extends Controller
{
  public function __construct(){
        $this->middleware('auth');
  }
    // public function basic_email() {
    //     $data = array('name'=>"Virat Gandhi");

    //     Mail::raw('Hi, welcome user!', function($message) {
    //        $message->to('mohammed.sabir@infodramz.com', 'Tutorials Point')
    //                 ->subject('Laravel Basic Testing Mail')
    //                 ->setBody('Hi, welcome user!');
    //     });
    //     echo "Basic Email Sent. Check your inbox.";
    //  }

    // public function html_email() {
    //     $data = array('name'=>"Virat Gandhi");
    //     Mail::send('email_templates.email_verification', $data, function($message) {
    //        $message->to('abc@gmail.com', 'Tutorials Point')->subject
    //           ('Laravel HTML Testing Mail');
    //        $message->from('xyz@gmail.com','Virat Gandhi');
    //     });
    //     echo "HTML Email Sent. Check your inbox.";
    //  }
     public function attachment_email() {
        $data = array('name'=>"Jhon Doe");
        $emailObj =  (object)array('to' => 'mjs.infodreamz@gmail.com','to_name'=>'VG','from'=>'xyz@gmail.com','from_name'=>'XYZ','subject'=>'Laravel Testing Mail with Attachment');
        $attachments = array('https://blog.hubspot.com/hubfs/image8-2.jpg','https://i.ytimg.com/vi/SfBR9aGrk9k/maxresdefault.jpg');
        $sendmail = sendMail($data,$emailObj,'email_templates.email_verification');
        if($sendmail['success']){
            // Returning the Result.
            return response()->json( $sendmail, 200);
        }else{
            // Returning the Result.
            return response()->json( $sendmail, 200);
        }

     }

}
