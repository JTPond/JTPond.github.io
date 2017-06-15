var bio = "";

function main(){
    $(".drawer").hide();
    $(".bio").hide();
    $(".edu").hide();
    $(".exp").hide();
    $(".skl").hide();
    $(".drawerButton").mouseenter(function(){
        $(this).children().css("color","#ff0080");
    });
    $(".drawerButton").mouseleave(function(){
        $(this).children().css("color","#25f6f9");
    });
    $(".barButton").mouseenter(function(){
        $(this).children().css("color","#ff0080");
    });
    $(".barButton").mouseleave(function(){
        $(this).children().css("color","#25f6f9");
    });
    $(".drawerButton").on('click',function(){
        $(this).next().slideToggle(400);
    });
    $("#bio").on('click',function(){
        if ($(".edu").is(":visible")){
            $(".edu").slideToggle(400);
        }
        if ($(".exp").is(":visible")){
            $(".exp").slideToggle(400);
        }
        if ($(".skl").is(":visible")){
            $(".skl").slideToggle(400);
        }
        $(".bio").slideToggle(400);
    });
    $("#edu").on('click',function(){
        if ($(".bio").is(":visible")){
            $(".bio").slideToggle(400);
        }
        if ($(".exp").is(":visible")){
            $(".exp").slideToggle(400);
        }
        if ($(".skl").is(":visible")){
            $(".skl").slideToggle(400);
        }
        $(".edu").slideToggle(400);
    });
    $("#exp").on('click',function(){
        if ($(".bio").is(":visible")){
            $(".bio").slideToggle(400);
        }
        if ($(".edu").is(":visible")){
            $(".edu").slideToggle(400);
        }
        if ($(".skl").is(":visible")){
            $(".skl").slideToggle(400);
        }
        $(".exp").slideToggle(400);
    });
    $("#skl").on('click',function(){
        if ($(".bio").is(":visible")){
            $(".bio").slideToggle(400);
        }
        if ($(".edu").is(":visible")){
            $(".edu").slideToggle(400);
        }
        if ($(".exp").is(":visible")){
            $(".exp").slideToggle(400);
        }
        $(".skl").slideToggle(400);
    });
}
$(document).ready(main);
