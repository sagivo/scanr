if (window.location.href.includes('flash=')) window.history.replaceState('Object', 'Title', window.location.href.replace(/flash=.*--/, ''));
$(function(){
  //alerts
  //login module
  "use strict"; // Start of use strict
  $('#login-link').click(function(){
    $(this).closest('p').hide().next().show();
    $('#signupLabel').text('Signin');
    $('#login-submit').text('Login');
    $('#sign-form').attr('action', 'login');
  });

  $('#register-link').click(function(){
    $(this).closest('p').hide().prev().show();
    $('#password').show().prop('required', true);
    $('#signupLabel').text('Signup');
    $('#login-submit').text('Join');
    $('#sign-form').attr('action', 'register');
  });

  $('#forgot-pass-link').click(function(){
    $('#password').hide().removeAttr('required');
    $('#signupLabel').text('Reset Password');
    $('#login-submit').text('Reset');
    $('#sign-form').attr('action', 'reset');
  });

});