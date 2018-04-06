// main document ready function to check if dom is loaded fully or not

let myFacebookToken;

$(document).ready(() => {

    myFacebookToken = prompt("Please enter your Facebook Token:", "");

    if (myFacebookToken == null || myFacebookToken == "") {

        alert("No usr Token found");

    } else {

        getAllDetails();

    } // end if condition

}); // end document.ready function

let getAllDetails = () => {


    // API call to get user details

    $.ajax({
        type: 'GET',
        dataType: 'json',
        async: true,
        url: 'https://graph.facebook.com/me?fields=id,name,quotes,cover,picture.type(large),about,posts,email,address,first_name,gender,hometown,inspirational_people&access_token=' + myFacebookToken,

        success: (response) => {

            $('#dataSection').css('display', 'block');

            console.log(response);

            $('#userName').append(response.name);

            $('#favouritrQuote').append(response.quotes);
            $('#mailingID').append(response.email);
            $('#gender').append(response.gender);
            $('#myHome').append(response.hometown.name);
            for(estory of response.posts.data){
                $('#story').append("<div>");
                $('#story').append(estory.story);
                $('#story').append("<p class='blockquote-reverse'>");
                $('#story').append(estory.created_time);
                $('#story').append("</p></div>");
            }
            
            $('#profilePhoto').html('<img src="' + response.picture.data.url + '" class="img-fluid profileHeight"/>');

            $('#cover').css('background-image', 'url(' + response.cover.source + ')');



        }, error: (err) => {

            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)

        }

    });// end ajax call 

}