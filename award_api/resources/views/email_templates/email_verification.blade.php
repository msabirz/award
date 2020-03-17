<div>
    Hi,{{ $name }}
    <h2>Welcome to the site {{ $name }}</h2>
    <br/>
    Your registered email-id is {{ $email }} , Please click on the below link to verify your email account
    <br/>
    <a href="{{url('api/verify', $token)}}">Verify Email</a>
</div>