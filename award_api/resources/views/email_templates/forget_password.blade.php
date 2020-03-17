
<div class="container">
	<div class="row text-center">
        <div class="col-sm-6 col-sm-offset-3">
        <br><br> <h2 style="color:#0fad00">Forgot Password Mail</h2>
        <p style="font-size:20px;color:#5C5C5C;">Please Click on below link to change your password.</p>
        <!-- <a href="" class="btn btn-success">     Log in      </a> -->
        <br><br>
        <a href="{{url('api/forget_password', $token)}}">Reset your Password</a>
        </div>
        
	</div>
</div>
