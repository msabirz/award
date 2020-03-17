<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
use App\Admin;
class AdminController extends Controller{

    public $heading = 'Unnati Renault Admin';
    public function __construct(){
          $this->middleware('auth');
    }
    public function dashboard(){
      $data['title'] = 'Dashboard | '.$this->heading;
      return view('dashboard',$data);
    }
    public function profile(){
      $data['title'] = 'Profile | '.$this->heading;
      $data['data'] = Admin::getProfileDetail();
      return view('auth.profile',$data);
    }

}
