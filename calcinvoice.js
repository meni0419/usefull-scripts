var $emptext = $(".divemp-text"),
    $cost = $(".divemp-cost"),
    $slider = $("[name='slider']"),
    $empcount = $("[name=empcount]"),
    slider = 10,
    cost = 30,
    rcost = 300,
    sizeemp = 150,
    sizecost = 150,
    sizecostfont = 10

function calc(slider) {
    sizecostfont = 49.5 + slider/20+'px';
    document.getElementsByName('empcount')[0].value = slider;
    document.getElementsByName('slider')[0].value = slider;
    sizeemp = 147.7 + slider*0.23+'px';
    sizecost = 149.3 + slider*0.05+'px';

    if (slider <100) {
        rcost = Math.round(cost * slider);
    } else if (slider <500) {
        rcost = Math.round(cost * slider * 0.9);
    } else if (slider <1000) {
        rcost = Math.round(cost * slider * 0.8);
    } else {
        slider = "Дзвоніть<br>домовимось<br>😉";
        rcost = "&#128176;";
        sizecostfont = '50px';
        document.getElementsByName('empcount')[0].value = 1000;
        document.getElementsByName('slider')[0].value = 1000;
        sizeemp = "380px";
        sizecost = "197px";
    }

    $emptext.html(slider);
    $cost.html(rcost+'<br>грн.');
    document.getElementsByClassName('divemp-text')[0].style.width = sizeemp;
    document.getElementsByClassName('divemp-text')[0].style.height = sizeemp;
    document.getElementsByClassName('divemp-text')[0].style.fontSize = sizecostfont;
    document.getElementsByClassName('divemp-cost')[0].style.width = sizecost;
    document.getElementsByClassName('divemp-cost')[0].style.height = sizecost;
}

$slider.on("touchmove", function () {
    calc($(this).prop("value"));
});
$slider.on("mousemove", function () {
    calc($(this).prop("value"));
});
$empcount.on("keyup", function () {
    calc($(this).prop("value"));
});
