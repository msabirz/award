<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventEmail extends Model
{
    public $timestamps = false;

    public function event()
   {
     return $this->belongsTo('App\Event','id');
   }
}
