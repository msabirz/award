<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">

<style>

/************* GENERIC  *****************/
a {color:#696969;}
img {width:100%;}
.twhite {color:#fff!important;}
.twhite a {color:#fff!important;}
/************* Background ****************/
.bglight1 {background:#f2f2f2;}
/************* TOP-HEAD *****************/
.top-head ul li {padding-right:8px;}
/****************** Navigation **************/
.navbar-toggler {border-color: #dd0000;}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(221, 0, 0, 0.7)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
/**************** Banner Slider Carousel **************/
.carousel-inner img {width: 100%;}
.carousel-caption {color:#000;top:110px; bottom: auto; text-align:left;}
.carousel-caption h1 { color:#dd0000; background-color:#;}
/************ Services **************/
.most-car-box:hover {background: ; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);}
/*********** TABS *******/
.nav-tabs { border-bottom: 1px solid #ccc; }
.nav-tabs .nav-link.active {
    border-bottom: 1px solid #dd0000;
    border-radius:0px;
}
/**************** Social ICONS ***************/

.social-icons{margin: 0;padding: 0; font-size : 8px;}
.social {margin:7px 7px 7px 0px;}
#social-fb:hover {color: #3B5998;transition:all .25s;}
 #social-tw:hover {color: #4099FF;transition:all .25s;}
 #social-gp:hover {color: #d34836;transition:all .25s;}
 #social-em:hover {color: #f39c12;transition:all .25s;}

</style>



<div class="content py-5 bg-light  ">
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                        <span class="anchor" id="formChangePassword"></span>
                    <!-- form card change password -->
                        <div class="card card-outline-secondary">
                            <div class="card-header">
                                <h3 class="mb-0">Reset Password</h3>
                            </div>
                            <div class="card-body">
                                <form class="form" role="form" autocomplete="off" action="{{ url('api/forget_password/'.Request::segment(3).'/changeit/') }}" method="post">
                                    <div class="form-group">
                                        <label for="new_password">New Password</label>
                                        <input type="password" name="new_password" class="form-control" id="new_password" required="">
                                    </div>
                                    <div class="form-group">
                                        <label for="confirm_password">Confirm Password</label>
                                        <input type="password" class="form-control" id="confirm_password" required="">
                                    </div>
                                    <strong id="error">Please Match the  Password and Confirm Password</strong>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-success btn-lg float-right" id="change_it">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- /form card change password -->

                    </div>
        </div>
    </div>
</div>
<div class="copyright bglight1 border pt-2">
    <div class="container">
        <div class="row justify-content-md-center">
            <p> © 2018 xyz Software Pvt. Ltd. </p>
        </div>
    </div>
</div>
<script>
$(document).ready(function(){
    $("#error").hide();
    $("#change_it").on('click',function(){
        console.log($("#new_password").val())
        console.log($("#confirm_password").val())
        if($("#new_password").val() != $("#confirm_password").val()){
            $("#error").show();
            return false;
        }else{
            $("#error").hide();
            return true;
        }
        
    });
});
</script>