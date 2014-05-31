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
	
	/*==========Register=========================*/	
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
	/*==========Link to Projects , Tasks,  Buttons ============*/

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
	});//	


	$("#logOut").on("click", function(e){
		//id="logOut"
		
		e.preventDefault();

		window.location.assign("index.html");
	});//	

		
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
		 			//overlay will fade in, then find the modal id and fadeIn Modal
		 $("#overlay").fadeIn()
					  .find("#modal")
		              .fadeIn();
	});	//close .modalClick

			//close the modal and overlay fn
	$(".close").on("click", function(e){

		 e.preventDefault();						
		 		//fadeOut he overlay, then find the modal , and fadeOut the modal
		 $("#overlay").fadeOut()
		              .find("#modal")
		              .fadeOut();//fade the modal out
	});//close  .close fn

	/*==========fade status btn====================*/	

	$(".mystatus").mouseover(function()  {

		$(this).fadeTo(100 ,.3);//fadeTo 100 ,.3 transparency
							//use the timing to fade

	} );//close .mystatus

	
	//mouse out
	$(".mystatus").mouseout(function()  {

		$(this).fadeTo(100 , 1);//1 is full image no transparency at all


	} );//close .mystatus

	/*==========add the projects page button==============*/	

	//+ sign on the modal panel, dont confuse with the add.html btn
   $("#addButton").on("click", function(e){
   	//  id="addButton" 
		e.preventDefault();

		window.location.assign("add.html");//go to new page add.html
    })

   //take user from project page back to the dashboard/admin page
   $("#dashboardButton").on("click", function(e){
   	  //id="dashboardButton" 

		e.preventDefault();

		window.location.assign("admin.html");//go from projects.html back to dashboard
    });

 /*+++++++++++++++Add Projects Page++++++++++++++++++++++++*/ 

 // add a project
$("#addBtn").on("click", function(e)  {
//id="addBtn"
	e.preventDefault();
								// this needed to be seperated by commas not semicolons
	var projName = $("#projectName").val(),
		projDesc = $("#projectDescription").val(),
		projDue = $("#projectDueDate").val(),
		status = $("#projectStatus").val();


		$.ajax({

			url:"xhr/new_project.php",
			type:"post",
			dataType:"json",
			data:{

		   //matches php,  var name which matches the html
			projectName:	    projName,
			projectDescription:	projDesc,
			dueDate:	        projDue,
			status:	            status

		},
		success:function(response){

			console.log("testing success");

			if(response.error){

				alert(response.error);

			}else{
						//take user to the projects page 
				window.location.assign("projects.html");

			};
		}

	});

} );//close add project fn
/*============Add the Projects to the Projects page=========*/
var projects = function(){

	$.ajax({

		url:"xhr/get_projects.php",
		type: "get",
		dataType: "json",

		success:function(response){

			if(response){

				console.log(response);	

			}else{

				for(var i=0; j=response.projects.length, i<j ; i++ ){

					var result = response.projects[i];

			


						//append the box for the projects to the projects div
				$(".projects").append('<div style="border:1px solid #000 ">' + 
					//<div class="projects"></div>

									//result.id is the reuslt with the id info
					"Project ID:" + result.id + "<br>"  +

					"Project Name:" + result.projectName + "<br>"  +

					"Project Description:" + result.projectDescription + "<br>" +

						//inserting a button to delete the project
					'<button class="deleteBtn" >Delete</button>'  + 

						//inserting a btn to edit project
					'<button class="editBtn">Edit</button>' +


						//close the div and add a line break
				
			        "</div>"	);//close the append method
				
					}//end else

			}//end loop

		}//end success

	})//end ajax

}//end project fn












/*===========Accordian for Admin/Dashboard Page=============*/

     //<div class="mytabs">
     //<ul class="tabs">


  $("ul .tabs").each(function() {
	//keeping track of the active tab
	//context of $(this) = $active  //find anchors
	var $active , $content , $links = $(this).find ("a");

    //if location.hash matches one of the links then make it active
    //if not then use the first tab as the active tab

    //we will hide the content tabs thtat are not non-active           //setting tabs at index 0
    			//I think this is where I am having the issue particulary with the apostrophes
    			//I moved the [0] to be inside the parenthesis but I dont fully understand where to put the parenthesis

    //$active = $($links.filter (  '[ href= " + 'location[0].hash ' + " ]' )    ||  (  $links[0] )        );

    $active = $($links.filter (  '[href= " '+location.hash+' " ]' ) [0] || $links[0] );

    $active.addClass('active');//adding class .active

    $content = $($active[0].hash);


    //hide non-active info from other 2 tabs
    $links.not($active).each(function(){ 

    	//this anochor hide it
	   $(this.hash).hide();

    });//close links not active

     //Bind this to  a click event
	$(this).on("click", "a" , function(e){

	   //remove class active after use
	   $active.removeClass("active");
	   $content.hide();

       //updating tabs w/ active class 
	   $active = $(this);
	   $content = $(this.hash);

       //make tab active and show the content
	   $active.addClass("active");
	   $content.show();

	   //prevent anchor defaault click action
	   e.preventDefault();
 
	});//close click event
 
});//close tabs 

/*=========Display User================*/
/*==========Template user id===================*/
//get the user id to dispaly in the page

		

})(jQuery); // end private scope


