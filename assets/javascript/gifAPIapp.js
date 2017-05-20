// global variables \\
$("#loadTimer1, #instructionsTwo, #loadTimer2,#loadTimer3,#loadTimer4,#loadTimer5,#loadTimer6,#loadTimer7,#loadTimer8,#loadTimer9,#loadTimer10,#loadTimer11,#loadTimer12,#loadTimer13,#loadTimer14,#loadTimer15,.row").hide();
var topics = ["Brandon Boyd", "Dr. Seuss", "Paul McCartney", "John Lennon", "Will Ferrell", "Jimmy Fallon", "Chris Farley", "Dane Cook", "Eminem", "Nas", "Jay-Z", "Rakim", "William Shakespeare", "Jim Morrison", "James Maynard", "Serj Tankian", "Ghandi"];
var gifcount = 0;
var gifLocation;
var clickCount = 1;

// function to create buttons by looping through array of topics \\
var buttonFactory = function() {
     $(".buttonGallery").empty();

     for (i = 0; i < topics.length; i++) {
          var imAbutton = $("<button>");
          imAbutton.addClass("yup");
          // assigning data-name to be used by giphy API to display appropriate gifs
          // on DOM when clicked \\
          imAbutton.attr("data-name", topics[i]);
          imAbutton.text(topics[i]);
          $(".buttonGallery").append(imAbutton);

     }
};
$(document).ready(function() {

     // display timers, each one for a word to be displayed - seperated by 500 ms \\
     setTimeout(function() { $("#loadTimer1").show(); }, 1800);
     setTimeout(function() { $("#loadTimer2").show(); }, 1900);
     setTimeout(function() { $("#loadTimer3").show(); }, 2100);
     setTimeout(function() { $("#loadTimer4").show(); }, 2150);
     setTimeout(function() { $("#loadTimer5").show(); }, 2200);
     setTimeout(function() { $("#loadTimer6").show(); }, 2250);
     setTimeout(function() { $("#loadTimer7").show(); }, 2300);
     setTimeout(function() { $("#loadTimer8").show(); }, 2350);
     setTimeout(function() { $("#loadTimer9").show(); }, 2400);
     setTimeout(function() { $("#loadTimer10").show(); }, 2450);
     setTimeout(function() { $("#loadTimer11").show(); }, 2500);
     setTimeout(function() { $("#loadTimer12").show(); }, 2550);
     setTimeout(function() { $("#loadTimer13").show(); }, 2600);
     setTimeout(function() { $("#loadTimer14").show(); }, 2650);
     setTimeout(function() { $("#loadTimer15, .row, #instructionsTwo").show(); }, 3100);


     // when the user clicks on the add another buttton button \\

     $("#anotherButton").on("click", function(event) {

          // prevent page from refreshing \\
          event.preventDefault();
          // This line grabs the input from the textbox \\
          var onemorebutton = $("#user-input").val().trim();
          $(onemorebutton).addClass("yup");
          // Adding user-input to array \\
          topics.push(onemorebutton);
          // Calling button generating function \\
          buttonFactory();



          // when the user clicks any button but the "add more buttons" button \\
          $(".yup").on("click", function() {

               // change back-ground color of button, reminding the user that they already viewed
               // those gifs \\
               $(this).css({ 'background-color': '#66ff33' });

               // empty all gifs already viewed \\
               $("#gif-Gallery").empty();
               var searchTermUpdate;
               var searchTerm = $(this).attr("data-name");
               // removing white space between two-word strings, replacing " " with a "+" \\
               searchTermUpdate = searchTerm.replace(/ +/g, "+");

               var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTermUpdate + "&api_key=dc6zaTOxFJmzC&limit=10";
               $.ajax({
                    url: queryURL,
                    method: 'GET'
               }).done(function(response) {
                    console.log(response);

                    var results = response.data;

                    // looping through array of results received from giphy api,
                    // assigning div, img, and img attribute properties to each item in array \\
                    for (var i = 0; i < results.length; i++) {


                         var gifDIV = $("<div>");
                         var pRating = $("<p>").text("Rating: " + results[i].rating);
                         var gifImg = $("<img id='gifimg' class='col-md-2 unit'>");
                         gifImg.attr("src", results[i].images.fixed_height_still.url);
                         gifImg.attr({
                              // storing multiple  urls to same image, one for animated state, and the other
                              // a standard still shot \\
                              'data-animate': results[i].images.fixed_height.url,
                              'data-state': "still",
                              'data-still': results[i].images.fixed_height_still.url
                         });
                         // appending gif image and its orresponding rating 
                         // to the div to be placed on DOM \\
                         gifDIV.append(pRating);
                         gifDIV.append(gifImg);





                         // appending gif div to DOM \\
                         if (results[i].rating === "g" || "pg" || "y") {
                              $("#gif-Gallery").append(gifDIV);
                         }
                    }

                    // on-click function for gif images on page \\
                    $(".unit").on("click", function() {
                         // when user clicks gif, change width and height of image \\



                         // increment clickCount by one every time user clicks #gifimg \\
                         clickCount++;


                         // if clickcount is divisible by two, change css 
                         // background-color \\
                         if (clickCount % 2 === 0) {
                              $("body").css({
                                   'background-color': 'cornflowerblue',

                              });
                         }
                         // if clickcount is divisible by three, change css 
                         // background-color \\
                         if (clickCount % 3 === 0) {
                              $("body").css({
                                   'background-color': 'honeydew',

                              });

                         }

                         // if clickcount is divisible by four, change css 
                         // background-color \\
                         if (clickCount % 4 === 0) {
                              $("body").css({
                                   'background-color': 'blueviolet',

                              });

                         }
                         // if clickcount is divisible by five, change css 
                         // background-color \\

                         if (clickCount % 5 === 0) {
                              $("body").css({
                                   'background-color': 'cornflowerblue',
                              });

                         }





                         // creating variable and setting gif data-state as value \\
                         var state = $(this).attr('data-state');



                         if (state === "still") {

                              // changing src and data-state for gif image that user clicked \\
                              $(this).attr("data-state", "animate");
                              $(this).attr("src", $(this).attr("data-animate"));
                              $(this).css({
                                   'height': '350px',
                                   'width': '350px',

                              });


                              // if state is animated, change src and data-state to still image property \\
                         } else if (state === "animate") {

                              $(this).attr("data-state", "still");
                              $(this).attr("src", $(this).attr("data-still"));
                              $(this).css({
                                   'height': '150px',
                                   'width': '150px'


                              });


                         }

                    });
               });





          });

     });


});
