<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterAuthRequest;
use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Event;

class UserController extends Controller
{
    public $loginAfterSignUp = true;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function __construct(){
    $this->user = JWTAuth::parseToken()->authenticate();
}
    public function index(Request $request)
    {
        $token = $request->bearerToken();
        $role_id = $request->role_id;

        //for superadmin only
        if($token && $role_id == 1){
            $users = User::where('role_id',3)->orderBy('id','desc')->get();

            if(isset($users) && !empty($users)){
                $result = array('success' => true, 'status_code'=>1000 ,'message' => 'Records Available','data' => $users);
            }else{
                $result = array('success' => false, 'status_code'=>999 ,'message' => 'No Records Found','data' => '');
            }
        }else{
            $result = array('success' => false, 'status_code'=>999 ,'message' => 'Permission Denied','data' => '');
        }
        return response()->json( $result, 200);
    }

    public function register(RegisterAuthRequest $request)
    {

        // Set the By default Result
        $result = array('success' => false,'status_code'=>999,'data' => 'Init Failed.');
        $random_string =  md5(rand().microtime());
        //Register the User
        try {
            $user = new User();
            $user->first_name = $request->firstName;
            $user->last_name = $request->lastName;
            $user->email = $request->email;
            $user->company_name = $request->companyName;
            $user->country = $request->country;
            $user->password = bcrypt($request->password);
            $user->role_id = 3; //user
            $user->email_token = $random_string;
            $user->ip_address = $_SERVER['REMOTE_ADDR'];
            $user->save();
            $user_id = $user->id;
        } catch (\Illuminate\Database\QueryException $e) {
            $result = array('success' => false, 'status_code'=>555 ,'data' => $e->errorInfo);
            $user='';
        }

        //Set the Result based on user value
        if(isset($user) && !empty($user)){
            // Send Email for Verification
            $name = $request->firstName." ".$request->lastName;
            $email = $request->email;
            $data = array('name'=>$name,'token'=>$random_string,'email'=>$email);
            $emailObj =  (object)array('to' => $request->email,'to_name'=>$name,'from'=>'xyz@gmail.com','from_name'=>'XYZ','subject'=>'Laravel Testing Mail with Attachment');
            $sendmail = sendMail($data,$emailObj,'email_templates.email_verification');

            // If success is true then login else redirect to false
            if($sendmail['success']){
                $result = array('success' => true,'status_code'=>1000, 'data' => $user);
                if ($this->loginAfterSignUp === true) {
                    return $this->login($request);
                }
            }else{
                $result = array('success' => true,'status_code'=>555, 'data' => 'Verification Email is Not Send.');
            }


        }

        // Returning the Result.
        return response()->json( $result, 200);
    }

    public function login(Request $request)
    {
        $input = $request->only('email', 'password');
        $jwt_token = null;

        if (!$jwt_token = JWTAuth::attempt($input)) {
            return response()->json([
                'status_code'=>999,
                'success' => false,
                'data' => 'Invalid Email or Password',
            ], 401);
        }

        $user =  JWTAuth::user();

        // $userObj = (object)array('is_email_verified'=>$user->is_email_verified);
       // $result = array('user'=>$user);
        return response()->json([
            'status_code'=>1000,
            'success' => true,
            'token' => $jwt_token,
            'role_id' => $user->role_id,
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        $this->validate($request, [
            'token' => 'required'
        ]);

       try {
            JWTAuth::invalidate($token);

            return response()->json([
                'status_code'=>1000,
                'success' => true,
                'data' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'status_code'=>999,
                'success' => false,
                'data' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }

    public function getAuthUser(Request $request)
    {
        $token = $request->bearerToken();
        $this->validate($request, [
            'token' => 'required'
        ]);

        $user = JWTAuth::authenticate($token);

        return response()->json(['user' => $user]);
    }

    public function verifyUser(Request $request, $email_token){

        if(isset($email_token) && !empty($email_token)){
            $EXPIRED_PERIOD = 10800;
            $user = User::where('email_token',$email_token)->first();
            if($user){
                $dateTime = $user->created_at;
                $timestamp = strtotime($dateTime);

                if ( time() - $timestamp  < $EXPIRED_PERIOD)
                {
                    $user->is_email_verified = "1";
                    $user->email_token = "";
                    $user->save();
                    return view('email_templates.email_success');

                }else {

                    return view('email_templates.email_expired');
                }
            }
            else
            {
                return view('error.email_error');
            }


        }else{
            return view('error.email_error');
        }
    }

    public function forget_password_config(Request $request, $token=null, $flag=null){
       if(empty($token) && empty($flag)){
           if(isset($request->email)){
                $email = $request->email;

                $is_user_avail = User::where('email',$email)->count();
                if($is_user_avail == 0){
                    $result = array('success' => true,'status_code'=>1000, 'data' => 'Please Provide Correct Email Id.');
                }else{

                    $user_detail = User::where('email',$email)->first();

                    // Send Email for Verification
                    $random_string =  md5(rand().microtime());
                    $name = $user_detail->first_name." ".$user_detail->last_name;
                    $data = array('name'=>$name,'token'=>$random_string,'email'=>$email);
                    $emailObj =  (object)array('to' => $email,'to_name'=>$name,'from'=>'xyz@gmail.com','from_name'=>'XYZ','subject'=>'Forget Password');
                    $sendmail = sendMail($data,$emailObj,'email_templates.forget_password');

                    // If success is true then login else redirect to false
                    if($sendmail['success']){
                        $user= User::find($user_detail->id);
                        $user->forget_password_token = $random_string;
                        $user->save();
                        $result = array('success' => true,'status_code'=>1000, 'data' => 'Email has been send.');
                    }else{
                        $result = array('success' => true,'status_code'=>555, 'data' => 'Email is Not Send.');
                    }


                }
                   // Returning the Result.
                   return response()->json( $result, 200);
            }else{
                $result = array('success' => false,'status_code'=>999, 'message' => 'Please Send Email Id.','data'=>'');
                // Returning the Result.
                return response()->json( $result, 200);
            }

        }else if(!empty($token) && empty($flag)){
           $get_user_from_token = User::where('forget_password_token',$token)->first();
           if($get_user_from_token){
                $result = array('success' => true,'status_code'=>1000, 'message' => 'Valid User.','data'=>'');
              //return view('email_templates.forget_password_view')->with('token');
            }else{
                $result = array('success' => true,'status_code'=>555, 'nesage' => 'Email is Not Send.','data'=>'');
                //return view('error.email_error');
           }

           return response()->json( $result, 200);

        }else if( !empty($token) && !empty($request->password)){

           $password = $request->password;
            $user= User::where('forget_password_token',$token)->first();
            $random_string =  md5(rand().microtime());
            if($user){
                $user->forget_password_token = '';
               // $user->password = bcrypt($request->new_password);
               $user->password = bcrypt($password);
                $user->save();
                //return redirect("http://192.168.100.104:3000");
                $result = array('success' => true,'status_code'=>1000, 'message' => 'Invalid token.','data' => '');
            }else{
                $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
            }

        }else{
            $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
  /*  public function edit(Request $request)
    {
        $token = $request->bearerToken();
        if($token){
            $details = JWTAuth::getPayload($token)->toArray();
            if(isset($details['sub']) && !empty($details['sub'])){
                $id = $details['sub'];

                if($user = User::find($id)){
                    $result = array('success' => true,'status_code'=>1000, 'message' => "Record found",'data' => $user);
                }else{
                    $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $id);
                }
            }else{
                $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
            }
        }else{
            $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
        }
        return response()->json( $result, 200);
    }*/


    /*public function editProfile(Request $request)
    {
        $token = $request->bearerToken();
        if($token){
            $details = JWTAuth::getPayload($token)->toArray();
            if(isset($details['sub']) && !empty($details['sub'])){
                $id = $details['sub'];

                //update the User
                try {
                    $user = User::find($id);
                    $user->first_name = $request->first_name;
                    $user->last_name = $request->first_name;
                    $user->email = $request->email;
                    $user->company_name = $request->company_name;
                    $user->country = $request->country;
                    $user->save();

                    $result = array('success' => true,'status_code'=>1000, 'message' => 'User profile updated successfully.','data' => $user);
                } catch (\Illuminate\Database\QueryException $e) {
                    $result = array('success' => false, 'status_code'=>555 ,'data' => $e->errorInfo);
                    $user='';
                }
            }else{
                $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
            }

        }else{
            $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
        }

        // Returning the Result.
        return response()->json( $result, 200);
    }*/

  /*  public function changePassword(Request $request)
    {
        $token = $request->bearerToken();
        if($token){
            $details = JWTAuth::getPayload($token)->toArray();
            if(isset($details['sub']) && !empty($details['sub'])){
                $id = $details['sub'];

                //update the User password
                try {
                    $user = User::find($id);

                    if($user->password == bcrypt($request->old_password)){
                        $user->password = bcrypt($request->new_password);
                        $user->save();
                        $result = array('success' => true,'status_code'=>1000, 'message' => 'Password changed successfully.','data' => $user);
                    }else{
                        $result = array('success' => false, 'status_code'=>555 , 'message' => 'Old Password is Invalid.','data' => '');
                    }
                } catch (\Illuminate\Database\QueryException $e) {
                    $result = array('success' => false, 'status_code'=>555 ,'data' => $e->errorInfo);
                    $user='';
                }
            }else{
                $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
            }

        }else{
            $result = array('success' => true,'status_code'=>555, 'message' => 'Invalid token.','data' => '');
        }

        // Returning the Result.
        return response()->json( $result, 200);
    }*/


}
