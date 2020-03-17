<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Validator;
use Auth;

class StudentController extends Controller{
    //
    public $heading = 'Unnati Renault Admin';
    public function __construct(){
          $this->middleware('auth');
    }
    public function student($case='',$id='',Request $request){
      $data['title'] = 'Student | '.$this->heading;
      switch($case){
        case 'add':
              if($id=='add'){
              $validator = Validator::make($request->all(), [
                  'name' => 'required|unique:posts|max:255',
                  'email' => 'required|unique:posts|email',
                  'password'=> 'required|max:20|min:6'
              ]);
                if ($validator->fails()) {
                return redirect('student/add')->withErrors($validator)->withInput();
                }else{
                echo'<pre>';print_r($_POST);
                }
              }else{
                return view('student.add',$data);
              }
              break;
        case 'list':
              return view('student.list',$data);
              break;
      }

    }


}
