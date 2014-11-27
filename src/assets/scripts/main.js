
// Wait for DOM to Load
jQuery(function($) {

    // Create New Socket Connection using Socket.io
    var socket = io();

    // Send A Message To The Server

    var userError = $('#userError').val(); // Error message
   
    var name = $('#name').val();
    var location = $('#location').val();
    var textMessage = $('#textMess').val();
    var mess = $('#mess').val();
    


    $('#butUser').click(function(e){
      //e.preventDefault();
      socket.emit('checkUser', {
        name:'name',


      })
      
    });

   

    socket.on('contiue', function(){
      $('.login').hide();
      $('.message').show();
      $('.texting').show();
      $('#name').val();
    });

    $('#butMess').on('click', function(){
    
      var mess = $('#mess').val();
      var name = $('#name').val();
      var location = $('#location').val();
      $('#mess').val(' ');
      $('#name').val(' ');
      $('#location').val(' ');
      
      socket.emit('message',{
        mess: mess,
        name: name,
        location: location
      });
        
    });

    // Recieve Update Event From The Server
    socket.on('update', function(data){
    
      $('.message')
        
      .append($('<p>').text(data.mess + ':' + data.name+ ' ,' + data.location));
    

     

    });

});
