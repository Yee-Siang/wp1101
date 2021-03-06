function author() {
    document.getElementById('author').scrollIntoView();
}

function enlarge(k) {
    document.getElementById('detail').style.display = 'block';
    for (var i = 1; i < 36; i++) {
        document.getElementById(String(i)).style.display = 'none';
        document.getElementById(String(i) + "s").style.border = 'solid 3px rgb(44, 190, 0)';
    }
    document.getElementById(String(k)).style.display = 'block';
    document.getElementById(String(k) + "s").style.border = 'solid 5px rgb(190, 35, 35)';
    document.getElementById('detail').scrollIntoView()
}

function selectAlbum(x) {

    for (var i = 1; i < 4; i++) {
        document.getElementById("album" + String(i)).style.display = 'none';
    }
    document.getElementById("album" + String(x)).style.display = 'block';
    if (x === 1) {
        enlarge(1);
        document.getElementById("B1").style.backgroundColor = '#136b16';
        document.getElementById("B2").style.backgroundColor = 'rgb(130, 243, 55)';
        document.getElementById("B3").style.backgroundColor = 'rgb(130, 243, 55)';
    }
    if (x === 2) {
        enlarge(16);
        document.getElementById("B1").style.backgroundColor = 'rgb(130, 243, 55)';
        document.getElementById("B2").style.backgroundColor = '#136b16';
        document.getElementById("B3").style.backgroundColor = 'rgb(130, 243, 55)';
    }
    if (x === 3) {
        document.getElementById("B1").style.backgroundColor = 'rgb(130, 243, 55)';
        document.getElementById("B2").style.backgroundColor = 'rgb(130, 243, 55)';
        document.getElementById("B3").style.backgroundColor = '#136b16';
        window.alert("Sorry! It is an empty album.")
    }
}
