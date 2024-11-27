/**
 * minirobo.js
 * (c) 2024 Gabuniku
 */

const C_RED = "red";
const C_BLUE = "blue";
const C_GREEN = "green";
const C_YELLOW = "yellow";


var remain_time = 180;
var interval_id = null;

// elements
var timer = document.getElementById("timer");
var start_time = document.getElementById("start_time");
var start_score = document.getElementById("start_score");
var init_btn = document.getElementById("init_btn");
var start_btn = document.getElementById("start_btn");
var stop_btn = document.getElementById("stop_btn");

function show_time() {
    timer.innerText = get_time_text(remain_time);
    if(remain_time < 30){
        timer.setAttribute("class", "red");
    }else{
        timer.removeAttribute("class", "red");
    }
}

function get_time_text(sec) {
    let min = Math.floor(sec / 60);
    sec = sec % 60;
    return String(min) + ":" + ("00" + sec).slice(-2);
}

function count_down() {
    remain_time--;
    show_time();
    if (remain_time <= 0) {
        stop();
        timer.innerText = "FINISH";
    }
}

function initialize_timer() {
    remain_time = Number(start_time.value);
    let score_els = ["red_score", "blue_score","green_score","yellow_score"];
    for (let index = 0; index < score_els.length; index++) {
        const id = score_els[index];
        let element = document.getElementById(id);
        element.innerText = start_score.value;
    }
    show_time();
}

function start() {
    if (interval_id == null) {
        interval_id = setInterval(count_down, 1000);
        show_time();
        init_btn.disabled = true;
        start_btn.disabled = true;
        stop_btn.disabled = false;
    }
}
function stop() {
    clearInterval(interval_id);
    interval_id = null;
    init_btn.disabled = false;
    start_btn.disabled = false;
    stop_btn.disabled = true;
}

function Init() {
    init_btn.disabled = false;
    start_btn.disabled = false;
    stop_btn.disabled = true;
    initialize_timer();
}

function update_score(color, update_value) {
    let score_el = document.getElementById(color + "_score");
    let val = Number(score_el.innerText);
    score_el.innerText = val + update_value;
}
