<?php
// namespace App\Mail;

function sendMail($data,$mailData,$templated_url,$attachments = null){

    $result = array('success' => false, 'status_code'=>999 ,'data' => 'Init Failed.');
    // With Attachments
    if($attachments != null){
        try {

            Mail::send($templated_url, $data, function($message) use ($mailData, $data, $attachments ) {
                $message->to($mailData->to, $mailData->to_name)->subject($mailData->subject);
                // Loop through every attachments.
                foreach($attachments as $doc){
                    $message->attach($doc);
                }
                $message->from($mailData->from,$mailData->from_name);

            });
            //Return the result
            $result = array('success' => true, 'status_code'=>1000 ,'data' => 'Send');
            return $result;

        }catch (\Exception  $e) {
            //Return the exception as result
            $result = array('success' => false, 'status_code'=>555 ,'data' => $e->getMessage());
            return $result;
        }
    }else{
        // Without Attachments
        try {

            Mail::send($templated_url, $data, function($message) use ($mailData, $data ) {
                $message->to($mailData->to, $mailData->to_name)->subject($mailData->subject);
                $message->from($mailData->from,$mailData->from_name);
            });
            $result = array('success' => true, 'status_code'=>1000 ,'data' => 'Send');
            return $result;

        }catch (\Exception  $e) {
            $result = array('success' => false, 'status_code'=>555 ,'data' => $e->getMessage());
            return $result;
        }
    }

}

/*function uploadFile($request,$file_name,$file_path_name)
{
    $image = $request->file($file_name);
    $name = $image->getClientOriginalName();
    $destination = config("constant.$file_path_name");
    $image->move($destination, $name);
    return $name;
}*/

function replace_null_with_empty_string($array)
{
    foreach ($array as $key => $value) 
    {
        if(is_array($value))
            $array[$key] = replace_null_with_empty_string($value);
        else
        {
            if (is_null($value))
                $array[$key] = "";
        }
    }
    return $array;
}
