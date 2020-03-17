<?php
use App\config;

return[
  'google_map_api_key' => 'AIzaSyADo-Lidh5uCF392j79_-pooszeTD83mj4',
  'user_images_upload_path' => public_path('/upload/user_images/'),
  'event_logo_upload_path' => public_path('/upload/event_logo/'),
  'event_logo_upload_url' => env('APP_URL').'/public/upload/event_logo/',
  'per_page'=>10,
];
 ?>
