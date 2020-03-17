<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
use App\Category;
// use App\Config;
use Log;

class CategoryController extends Controller
{
    protected $user;

    public function __construct()
    {
      // Need to add middleware auth
      $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $token = $request->bearerToken();

        $categories = Category::orderBy('id','desc')->get();
        if(isset($categories) && !empty($categories)){
          $result = array('success' => true, 'status_code'=>1000 ,'message' => 'Records Available','data' => $categories);
        }else{
          $result = array('success' => false, 'status_code'=>999 ,'message' => 'No Records Found','data' => '');
        }
        return response()->json( $result, 200);
    }

    public function isAlreadyExist(Request $request)
    {
        $token = $request->bearerToken();
        $name = $request->category_name;
        if($name){
            $category = Category::where('name',$name)->get();
            if(!empty($category)){
                $result = array('success' => true, 'status_code'=>1000 ,'message' => 'Records Available','data' => $category);
            }else{
                $result = array('success' => false, 'status_code'=>999 ,'message' => 'No Records Found','data' => '');
            }
        }else{
            $result = array('success' => false, 'status_code'=>999 ,'message' => 'No Records Found','data' => '');
        }
        return response()->json( $result, 200);
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

        if($request->category_name){
            try {
                $category = new Category();
                $category->name = $request->category_name;
               // $category->code = $request->code;
                $category->save();
                $category_id = $category->id;
            } catch (\Illuminate\Database\QueryException $e) {
                Log::critical($e->errorInfo);
                $result = array('success' => false, 'status_code'=>555 ,'message' => 'Critical Error! Event could not be added','data' => $e->errorInfo);
                $category = '';
            }

            if(isset($category) && !empty($category)){
                $result = array('success' => true,'status_code'=>1000, 'message' => 'Category added successfully','data' => $request);
            }
        }else{
            $result = array('success' => false,'status_code'=>999, 'message' => 'No data provided. Please provide event details.','data' => $request);
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
        $id = $request->id;

        if($category = Category::find($id)){
            // if($event->logo){
            //     $event->logo = config('constant.event_logo_upload_url').'/'.$event->logo;
            // }
            $result = array('success' => true,'status_code'=>1000, 'message' => "Record found",'data' => $category);
        }else{
            $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $id);
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
        $id = $request->id;
        if($category = Category::find($id)){
          $result = array('success' => true,'status_code'=>1000, 'message' => "Record found",'data' => $category);
        }else{
          $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $id);
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
        if($request->category_name){
          try {
              $logo = '';

              $category = Category::find($id);
              $category->name = $request->category_name;
             // $category->code = $request->code;
              $category->save();
          } catch (\Illuminate\Database\QueryException $e) {
              Log::critical($e->errorInfo);
              $result = array('success' => false, 'status_code'=>555 ,'message' => 'Critical Error! Event could not be added','data' => $e->errorInfo);
              $category = '';
          }

          if(isset($category) && !empty($category)){
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
            if($category = Category::find($id)){
                $category->delete();

                $result = array('success' => true,'status_code'=>1000, 'message' => "Event (#$id) deleted successfully.",'data' => $id);
            }else{
                $result = array('success' => false,'status_code'=>999, 'message' => 'Record not found.','data' => $id);
            }
        }else{
            $result = array('success' => false,'status_code'=>999, 'message' => 'Invalid Token or Id.','data' => '');
        }
        return response()->json( $result, 200);
    }
}
