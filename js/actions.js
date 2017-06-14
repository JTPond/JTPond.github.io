function main(){
    $(".drawer").hide();
    $(".drawerButton").on('click',function(){
        $(this).next().slideToggle(400);
    });
}
$(document).ready(main);
