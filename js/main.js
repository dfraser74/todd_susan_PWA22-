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

				username: user,
				password: pass

			},//put a comma before the success portion
			success:function(response){

				console.log("testing user");

				if(response.error){
					alert(response.error);
				}else{
					window.location.assign('admin.html');
				};//close else		

			}//close success part

		});//close ajax

	});//close signInButton
	
	/*==========Register=========================*/	
	//set up the reg fields w/variables to get the val()
	$("#register").on("click",function() {
		var firstname= $("#first").val();//id="first" 
		var lastname= $("#last").val();//id="last" 
		var username= $("#userName").val();//id="userName" 
		var email= $("#email").val();//id="email"  
		var password= $("#password").val();//id="password"  

		$.ajax({

			url: "xhr/register.php",
			type: "post",
			dataType: "json",
			data:{

				 firstname: firstname,
				 lastname:  lastname,
				 username:  userName,
				 email:     email,
				 password:  password

			},  

			//put comma after }

			success:function(response){

				if(response.error){

					alert(response.error)
				}else{
					//when registration is complete , user is taken to index page to sign in 
					window.location.assign("index.html");

				};//close else
			}//close ajax

	});//close ajax fn

	});//close register btn
	/*==========Link to Projects , Tasks, Users page from the admin page============*/
	$(".projectsbtn").on("click", function(e){
		//class="projectsbtn" >
		e.preventDefault();

		window.location.assign("projects.html");
	});	//<button class="projectsbtn" > <a href="projects.html">Projects</a> </button></p>

	$(".taskbtn").on("click", function(e){
		//class="taskbtn" >
		e.preventDefault();

		window.location.assign("tasks.html");
	});//	"tasksbtn" 

	$(".usersbtn").on("click", function(e){

		//class="usersbtn" >
		e.preventDefault();

		window.location.assign("users.html");
	});//	"usersbtn"

	$("#logOut").on("click", function(e){
		//id="logOut"
		
		e.preventDefault();

		window.location.assign("index.html");
	});//	"usersbtn"

		

	$("#signUp").on("click", function(e){
		//id="signUp" 
		
		e.preventDefault();
				//take user from index to register page
		window.location.assign("register.html");
	});
		

	/*==========Add modal=========================*/
	//using delegation for click event

	$(".modalClick").on("click", function(e){

		 e.preventDefault();

		 $("#overlay").fadeIn()
					  .find("#modal")
		              .fadeIn();
	});	//close .modalClick

	$(".close").on("click", function(e){

		 e.preventDefault();						//modal working now

		 $("#overlay").fadeOut()
		              .find("#modal")
		              .fadeOut();//fade the modal out
	});//close  .close fn

	/*==========fade status btn====================*/	
	//use the timing to fade
	$(".mystatus").mouseover(function()  {

		$(this).fadeTo(100 ,.3);//fadeTo 100 ,.3 transparency


	} );//close .mystatus

	
	//mouse out
	$(".mystatus").mouseout(function()  {

		$(this).fadeTo(100 , 1);//1 is full image no transparency at all


	} );//close .mystatus

	/*==========add the projects page==============*/	

	//add a project on the modal panel
   $("#addButton").on("click", function(e){
   	//  id="addButton" 
		e.preventDefault();

		window.location.assign("add.html");////what is this window location since it is the modal
    })

   //take user from project page back to the dashboard/admin page
   $("#dashboardButton").on("click", function(e){
   	  //id="dashboardButton" 

		e.preventDefault();

		window.location.assign("admin.html");
    });

 /*+++++++++++++++Add Projects Page++++++++++++++++++++++++*/ 
$("#addBtn").on("click", function(e)  {
//id="addBtn"
	e.preventDefault();

	var projName = $("#projectName").val(),
		projDesc = $("#projectDescription").val();
		projDue = $("#projectDueDate").val();
		status = $("#projectStatus").val();


		$.ajax({

			url:"xhr/new_project.php",
			type:"post",
			dataType:"json",
			data:{

				//matches database name, cannot change
			projectName:	    projName,
			projectDescription:	projDesc,
			dueDate:	        projDue,
			projectStatus:	    status

		},
		success:function(response){

			console.log("testing success");

			if(response.error){

				alert(response.error);

			}else{

				window.location.assign("projects.html");

			};
		}

	});

} );//close add project fn
/*===========Accordian for Projects Page=============*/

     //<div class="mytabs">
     //<ul class="tabs">


  $("ul .tabs").each(function() {
	//keeping trak of the active tab
	// context of $(this) = $active  //find anchors
	var $active , $content , $links = $(this).find ("a");

    //if location.hash matches one of the links then make it active
    //if not then use the first tab as the active tab

    //we will hide teh content tabs thtat are not non-active           //setting tabs at index 0
    $active = $($links.filter (  '[href= " '+location.hash+' " ]' ) [0]   ||    $links[0] );

    $active.addClass('active');//adding class .active

    $content=$($active[0].hash);


    //hide non-active info from other 2 tabs
    $links.not($active).each(function()  { 

	   $(this.hash).hide();

    });//close links not active


     //Bind this to  a click event
	$(this).on("click", "a" , function(e){

	   //remove class active after use
	   $active.removeClass("active");
	   $content.hide();

       //updating tabs w/ active class 
	   $active=$(this);
	   $content=$(this.hash);

       //make tab active
	   $active.addClass("active");
	   $content.show();

	   //prevent anchor bubbling actions
	   e.preventDefault();
 
	});//close click event
 
});//close tabs 

/*=========Display User================*/
	/*==========Template user id===================*/	
		

})(jQuery); // end private scope


