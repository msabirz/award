<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('api', 'ApiController@index');
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Validation Routes
// 1.Email Duplication
Route::post('email_unique_flag', 'FlagController@email_unique_flag');




// Non Auth Routes
Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::get('/verify/{token}', 'UserController@verifyUser');
Route::any('/forget_password/{param?}/{flag?}','UserController@forget_password_config');

// Authenticated Routes
Route::group(['middleware' => 'auth.jwt'], function () {
    Route::post('logout', 'UserController@logout');
    Route::post('user', 'UserController@getAuthUser');
    Route::post('user/list', 'UserController@index');
    Route::post('user/edit', 'UserController@edit');
    Route::post('user/update', 'UserController@editProfile');

    //for category
    Route::post('category/list', 'CategoryController@index');
    Route::post('category/store', 'CategoryController@store');   
    Route::post('category/edit', 'CategoryController@edit');
    Route::post('category/update', 'CategoryController@update');
    Route::get('category/show', 'CategoryController@show');
    Route::post('category/delete', 'CategoryController@destroy');
    Route::post('category/is_already_exist', 'CategoryController@isAlreadyExist');
    
    // Route::apiResource('event', 'EventController');
    Route::post('event/list', 'EventController@index');
    Route::post('event/store', 'EventController@store');
    Route::post('event/upload', 'EventController@upload');
    Route::post('event/edit', 'EventController@edit');
    Route::post('event/update', 'EventController@update');
    Route::post('event/show', 'EventController@show');
    Route::post('event/delete', 'EventController@destroy');

    Route::post('event-details/{param?}', 'EventController@eventDetails');

    Route::post('event/latest_events', 'EventController@getRecentEventList');
    
    

    // API FOR GETTING EVENT DETAIL BASED ON ID
    Route::post("event/event_details/{id?}",'EventController@event_details');
   
    // API FOR STORING ENTRY FORM SETUP
    Route::post("entry_setup/store",'EntrySetupController@store');
    

    //API FOR THE ENTRY FORM SETUP AGAINST THE EVENT CODE
    Route::post("event_form/store",'EventFormController@store');
    // API TO GET GET FORM RELATED TO EVENT
    Route::post("event_form/getEventForm",'EventFormController@getEventForm');



    // API TO STORE ENTRIES AGAINST THE EVENT ==> ENTRANSTS
    Route::post("entrant/store",'EntrantController@store');
    Route::post("entrant/getEntrantFilledForm",'EntrantController@getEntrantFilledForm');

});

// Email API for Test
Route::get('sendbasicemail','MailController@basic_email');
Route::get('sendhtmlemail','MailController@html_email');
Route::get('sendattachmentemail','MailController@attachment_email');
