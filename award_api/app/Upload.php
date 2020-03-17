<?php
//Upload Image: Anjali
namespace App;

class Upload
{
  public $encrypt_name	= FALSE;
  public $file_ext				= "";
  public static $error				= "";
  public $file_name				= "";
  public $mimes = array();

  public static function set_filename($path, $filename)
	{
    $upload = new Upload();
    $fileExt = $this->file_ext;
    //$fileExt = self::$file_ext;
		if ($upload->encrypt_name == TRUE)
		{
			mt_srand();
			$filename = md5(uniqid(mt_rand())).$fileExt;
		}

		if ( ! file_exists($path.$filename))
		{
			return $filename;
		}

		$filename = str_replace($upload->file_ext, '', $filename);

		$new_filename = '';
		for ($i = 1; $i < 100; $i++)
		{
			if ( ! file_exists($path.$filename.$i.$fileExt))
			{
				$new_filename = $filename.$i.$fileExt;
				break;
			}
		}

		if ($new_filename == '')
		{
			$this->error = 'Bad filename';
			return FALSE;
		}
		else
		{
			return $new_filename;
		}
	}

  public static function clean_file_name($filename)
	{
		$bad = array(
						"<!--",
						"-->",
						"'",
						"<",
						">",
						'"',
						'&',
						'$',
						'=',
						';',
						'?',
						'/',
						"%20",
						"%22",
						"%3c",		// <
						"%253c",	// <
						"%3e",		// >
						"%0e",		// >
						"%28",		// (
						"%29",		// )
						"%2528",	// (
						"%26",		// &
						"%24",		// $
						"%3f",		// ?
						"%3b",		// ;
						"%3d"		// =
					);

		$filename = str_replace($bad, '', $filename);
    $filename = preg_replace("/\s+/", "_", $filename); //remove spaces
		return stripslashes($filename);
	}


  static function uploadFile($request,$file_name,$file_path_name)
  {
    $upload = new Upload();
      $image = $request->file($file_name);
      $file_ext = $image->getClientOriginalExtension();
      $name = $image->getClientOriginalName();
      $filename = $upload->clean_file_name($name);
      $destination = config("constant.$file_path_name");
      if ( ! file_exists($destination.$filename)){
  			return $filename;
  		}

  		$filename = str_replace('.'.$file_ext, '', $filename);
  		$new_filename = '';
  		for ($i = 1; $i < 100; $i++){
  			if ( !file_exists($destination.$filename.$i.'.'.$file_ext)){
  				$new_filename = $filename.$i.'.'.$file_ext;
  				break;
  			}
  		}
      if($new_filename){
        $filename = $new_filename;
        $image->move($destination, $filename);
        return $data = array('status'=>TRUE,'data' => $filename);
      }else{
        return $data = array('status'=>FALSE,'data' => 'Bad Filename');
      }
  }

}
