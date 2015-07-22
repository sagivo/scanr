$(function(){
  //login module
  "use strict"; // Start of use strict
  $('#login-link').click(function(){
    $(this).closest('p').hide().next().show();
    $('#signupLabel').text('Sign-in');
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
    $('#login-submit').text('Reset');
    $('#sign-form').attr('action', 'reset');
  });

});