
function loadJSON(gl,modelURL) {
    var xhr = new XMLHttpRequest();
    var model;

    xhr.open('GET', modelURL, false);
    xhr.onload = function () {
        if (xhr.status != 200) {

            alert('LOAD' + xhr.status + ': ' + xhr.statusText);
        } else {

            gl.model = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
}

