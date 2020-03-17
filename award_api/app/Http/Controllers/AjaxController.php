<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Admin;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;

class AjaxController extends Controller
{
    //use App\Http\Requests;
    public function __construct(){
        //  $this->middleware('auth');
    }
    public function check_email(){
      $data = Admin::checkUserEmail($_POST['email']);
      echo isset($data[0]->email) ? $data[0]->email : '';
    }
    public function demo(){
      echo bcrypt('123456');
    }
}
