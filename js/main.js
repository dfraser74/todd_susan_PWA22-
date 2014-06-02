/*  
Susan Todd
Project Management App
5-5-2014
PWA-2
*/

(function($){
	console.log("ready");//ready


	$(".masterTooltip").hover(function()   {

		var title=$(this).attr("title");//setting title = current "title"

		$(this).data("tipText", title)
			   .removeAttr("title");

		$('<p class="tooltip"></p>').text(title)
									.appendTo("body")//append the title info to the body
									.fadeIn("slow")  ;

		//close hover, chain the hover out and remove tooltip fn						
	}, function(){

		//hover out and remove from page after use
		$(this).attr("title",  $(this).data("tipText") );

		$(".tooltip").remove();

		//chain mousemove for cursor position
	}).mousemove (function(e){

		var mousex=e.pageX + 20;//getting x-coordinate on pg-horizontal
		var mousey=e.pageY +10;//y co-ordiante-vertical

		$(".tooltip").css({top:mousey, left:mousex})
						 

	});//close tooltip fn


/*==========Login Button====================*/	
	$("#signInButton").click(function(){

		var user = $("#user").val();
		var pass = $("#pass").val();
		console.log("pass working?");

		//ajax call
		$.ajax({
			url:"xhr/login.php",
			type:"post",
			dataType:"json",
			data:{

				//php  : html
				username: user,
				password: pass

			},//put a comma before the success portion
			success:function(response){

				console.log("testing user");

				if(response.error){
					alert(response.error);
				}else{

					//window loaction is where user will be taken when logged in
					window.location.assign('admin.html');
				};//close else		

			}//close success part

		});//close ajax

	});//close signInButton
	
/*==========Register Page   Submit Button fn=========================*/	
	//set up the reg fields w/variables to get the val()
	//changed the name of the register button to submit as it makes more sense to me, also there was a conflict with id names
	$("#submit").on("click",function() {

		//edited the var names to match the names in the html 
			//nameing convention
			//anything u want | html 
		var first=   $("#first").val();//id="first" 
		var last=    $("#last").val();//id="last" 
		var userName= $("#userName").val();//id="userName" 
		var email=    $("#email").val();//id="email"  
		var password= $("#password").val();//id="password"  

		//testing vars
		console.log(first + ' ' +last +' '+ userName + ' ' + email+ ' ' + password );

		$.ajax({

			url: "xhr/register.php",
			type: "post",
			dataType: "json",
			data:{

				//just making notes as to what needs to match and where when sending and returning data	
				//once I made these changes the register page worked
				//a pop for errors or duplicate names will occur if user name or e-mail is the same

				// php names   :  html names
				 firstname: first,
				 lastname:  last,
				 username:  userName,
				 email:     email,
				 password:  password

			},  

			//put comma after }

			success:function(response){

				if(response.error){

					alert(response.error);

				}else{
					//when registration is complete , user is taken to index page to sign in 
					window.location.assign("index.html");

				};//close else
			}//close ajax

	});//close ajax fn

	});//close register btn

/*=========Display User========================*/

$.getJSON("xhr/check_login.php" , function(data) {

		console.log(data);

		$.each(data, function (key, val){

			console.log(val.first_name);

			$(".userid").html("Welcome User:" + val.first_name);

		});//close each fn

});//end fn
	
/*==========Link to Projects Page from the tabs on admin page============*/

$(".projectsbtn").on("click", function(e){
		//class="projectsbtn" >
		e.preventDefault();

		window.location.assign("projects.html");
});	//<button class="projectsbtn" > <a href="projects.html">Projects</a> </button></p>

/*=======================Add modal=========================*/
	//using delegation for click event
	//I am using the red + sign as a button to bring up the modal 
	// I can create a  project, choose a date 
	//clicking add is being directed to the add.html page which does nothing--this may make a good edit page

	$(".modalClick").on("click", function(e){

		 e.preventDefault();
		 			//overlay will fade in, then find the modal id and fadeIn Modal
		 $("#overlay").fadeIn()
					  .find("#modal")
		              .fadeIn();
	});	//close .modalClick

			//close the modal and overlay fn--this is the red x on the modal
	$(".close").on("click", function(e){

		 e.preventDefault();						
		 		//fadeOut he overlay, then find the modal , and fadeOut the modal
		 $("#overlay").fadeOut()
		              .find("#modal")
		              .fadeOut();//fade the modal out
	});//close  .close fn

/*=====================fade status btn====================*/	
//status buttons for the modal window fade in and out on mouse over
//considered animation effects

	$(".mystatus").mouseover(function()  {

		$(this).fadeTo(100, .3);//fadeTo 100 ,.3 transparency
							//use the timing to fade

	});//close .mystatus

	
	//mouse out
	$(".mystatus").mouseout(function()  {

		$(this).fadeTo(100, 1);//1 is full image no transparency at all

	});//close .mystatus

/*==========add the Dashboard page button=========================================*/	

   //take user from project page back to the dashboard/admin page
   $("#dashboardButton").on("click", function(e){
   	  //id="dashboardButton" 

		e.preventDefault();

		window.location.assign("admin.html");//go from projects.html back to dashboard
    });


	$(".taskbtn").on("click", function(e){
		//class="taskbtn" >
		e.preventDefault();

		window.location.assign("tasks.html");
	});//	"tasksbtn" 


	$(".usersbtn").on("click", function(e){

		//class="usersbtn" >
		e.preventDefault();

		window.location.assign("users.html");
	});

/*===============Sign Up button for Register page=========*/		
$("#signUp").on("click", function(e){
		//id="signUp" 
		
		e.preventDefault();
				//take user from index to register page
		window.location.assign("register.html");
});

/*===============Date Picker========================*/

// adds the calandar
$(".mydatepicker").datepicker();

/* =============jquery ui for tabs===========================*/	
/*
$(function() {
	$("#tabs").tabs();

});
			//the tabs are interfering with the sorting mechanism
			//each time I get the tabs working the projects disapear
			//when I comment out the tabs then the projects show up
			//I can create and sort the projects
			//they are too big , trying to make smaller


			//tabs will only partially work
			//thought I would try to use the ui to see if that made a difference
			//they look a little better using the ui 
			//but the tabs still do not hide the content and then reveal contenct when clicked
			//have tried everything I know to get this to function
			//I can only conclude that the placement of my code is causing some interfence
			//since I have discovered that the tabs and projects are interfering with each other is stands to reason the tabs 
			//are inhibited by some other code
*/
/*===========Accordian for Admin/Dashboard Page=============*/

     //<div class="mytabs">
     //<ul class="tabs">

/*
  $("ul .tabs").each(function() {
	//keeping track of the active tab
	//context of $(this) = $active  //find anchors
	var $active , $content , $links = $(this).find ('a');

    //if location.hash matches one of the links then make it active
    //if not then use the first tab as the active tab

    //we will hide the content tabs thtat are not non-active           //setting tabs at index 0

    $active = $($links.filter( '[href= "  '+location.hash+'  " ]' )[0]   || $links[0] );

    //adding class .active
    $active.addClass('active');


    $content = $($active[0].hash);


    //hide non-active info from other 2 tabs
    $links.not($active).each(function(){ 
		//this anochor hide it
	    $(this.hash).hide();
    });//close links not active



     //Bind this to  a click event
	$(this).on('click','a' , function(e){

	   //remove class active after use
	   $active.removeClass('active');
	   $content.hide();


       //updating tabs w/ active class 
	   $active = $(this);
	   $content = $(this.hash);


       //make tab active and show the content
	   $active.addClass('active');
	   $content.show();

	   //prevent anchor defaault click action
	   e.preventDefault();
 
	});//close click event
 
});//close tabs 


*/




/*====================add projects page===========================================*/	

	//this is the add button on the modal window
	//it takes you to the add.html page
	
	//addBtn for projects page , programed to stay on page till further need arises
   $("#addBtn").on("click", function(e){
   	//  id="addButton" 
		e.preventDefault();

		window.location.assign("add.html");//go to new page add.html
    });

/*this is the second button we made on the projects page that goes directly to add.html*/
   $("#myButton").on("click", function(e) {
   		e.preventDefault();
   		window.loaction.assign("add.html");// I think this should be the window wher the modal pops up not in the projects page
   })

/*+++++++++++++++New Projects Page++++++++++++++++++++++++*/ 

 // add a project with the modal window
$("#addButton").on("click", function(e)  {
//id="addBtn"
	e.preventDefault();
	  // this needed to be seperated by commas not semicolons
	var projectName        = $("#projectName").val(),
		projectDescription = $("#projectDescription").val(),
		dueDate            = $("#dueDate").val(),
		status             = $('input[name]="status"]:checked').prop("id");
		

		$.ajax({

			 url:"xhr/new_project.php",
			 type:"POST",
			 dataType:"JSON",
			 data:{

		     //matches php,  var name which matches the html
		     	 
				projectName:	  	projectName,
				projectDescription:	projectDescription,
				dueDate:	        dueDate,
				status:	            status

		},//close data
		success:function(response){

			console.log("testing success");

			if(response.error){

				alert(response.error);

			}else{
				//take user to the projects page 
				window.location.assign("projects.html");
			};//close else
		}//close success

	});

});//close add project fn
/*============Add the Projects to the Projects page==========================*/

	var projects = function(){
		$.ajax({

			url: "xhr/get_projects.php",
			type: "GET",
			dataType:"JSON",

			success:function(response){
				if(response.error){
					console.log(response.error);
				}else{

					for(var i=0, j=response.projects.length; i<j; i++){
						//create var to iterate through all the projects
						var result = response.projects[i];


							//attach all the div sortable to the projects div using the the new ui
						$(".projects").append('<div id="sortable" class="ui-state-default">' +

						 "<input class='projectid'  type='hidden'   value=' " + result.projectID + " '>"+

							"Project Name:" + result.projectName   + "<br>" +

							"Project Due Date:" + result.dueDate   + "<br>" +

							"Project projectDescription:" + result.projectDescription  + "<br>" +

							"Project Status:" + result.status  + "<br>" +

							'<button class="deleteBtn" > Delete </button>'+" "

							//taking out the button temp for testing

							+'</div><br>'
                      
						);//end method
					}//close loop
				}

			}//close success

		});//end ajax

	};//end projects fn
	//projects();

/*===============Delete Projects Btn=========================================*/

					//add delete btn code here
	       $(".deletebtn").on("click", function(e)  {
	       	
	       		//e.preventDefault();
	       		//must find the project by id in order to delete it
	       		var pid = $(this).parent().find(".projectid").val();

			    console.log("test delete");

		        $.ajax( {

					url: "xhr/delete_project.php",

					type:"POST",

					dataType: "JSON",

					data:{

						projectID: pid    //projectID is the name in the xhr file

						},//end data
						
						success: function(response){

							console.log("testing success");

							if(response.error){

								alert(response.error);

							}else{

								//console.log(result.id);
								window.location.assign("projects.html");

							};//end else

						}//end success

				});//end ajax

		});//end delete btn

/*===========Input button on form for modal=========*/

//associated with the date picker
$("input[type=submit], a , button")
						.button()
						.click(function (event) {


			event.preventDefault();

});

/*============select a status for projects=========*/

$("#selectable").selectable();
$("#projectstatus").buttonset();
//must add the ids to my html for the jq-ui to work

/*=========Sortable from JQuery UI=================*/

//allows you to sort the projects on the projects page
 $( "#sortable" ).sortable();
 $( "#sortable" ).disableSelection();
  

/*==========draggable/drppable===================*/
//code for dragging  and dropping currently applied to images

$(function() {
	$("#draggable").draggable();
	//$("#droppable").droppable();
		
});

/*=========Log Out Btn============================*/

	$("#logOut").on("click", function(e){
		//id="logOut"
		
		e.preventDefault();

		window.location.assign("index.html");
	});//	
		

})(jQuery); // end private scope


