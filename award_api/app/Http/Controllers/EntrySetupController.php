<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EntrySetup;
use Log;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Auth;
class EntrySetupController extends Controller
{
      public function __construct(){
        $this->middleware('auth');
      }
    public function store(Request $request)
    {
        if($request->eventId){
        try {
                $entry_setup = New EntrySetup();
                $entry_setup->open_for_entry  =   $request->openForEntry ;
                $entry_setup->is_modification_allowed  =   $request->isModificationAllowed ;
                $entry_setup->is_cancellation_allowed  =   $request->isCancellationAllowed ;
                $entry_setup->is_deletion_allowed  =   $request->isDeletioAllowed ;
                $entry_setup->is_payment_required  =   $request->isPaymentRequired ;
                $entry_setup->is_endorsement_required  =   $request->isEndorsementRequired ;
                $entry_setup->is_allowed_payment_method_change  =   $request->isAllowedPaymentMethodChange ;
                $entry_setup->is_endorsement_reqiured  =   $request->isEndorsementReqiured ;
                $entry_setup->prefix_entry_id_cat_code  =   $request->prefixEntryIdCatCode ;
                $entry_setup->entry_title_question  =   $request->entryTitleQuestion ;
                $entry_setup->labelled_as  =   $request->labelledAs ;
                $entry_setup->event_id  =   $request->eventId ;
                $entry_setup->ip_address  =   $_SERVER['REMOTE_ADDR']; ;
                $entry_setup->save();
            } catch (\Illuminate\Database\QueryException $e) {
                Log::critical($e->errorInfo);
                $result = array('success' => false, 'status_code'=>555 ,'message' => 'Critical Error! Event could not be added','data' => $e->errorInfo);
                $entry_setup = '';
            }

            if(isset($entry_setup) && !empty($entry_setup)){
                $result = array('success' => true,'status_code'=>1000, 'message' => 'Event added successfully','data' => $entry_setup);
            }
        }else{
                $result = array('success' => false,'status_code'=>999, 'message' => 'No data provided. Please provide event details.','data' => $request);
        }
        return response()->json( $result, 200);
    }
}
