window.onload = function () {
    document.getElementById("button").addEventListener("click", savevalues);
    document.getElementById("button").innerHTML = "SAVE";
    document.getElementById("button").disabled = false;
}

function savevalues() {
    document.getElementById("button").style.color = "white";
    document.getElementById("button").innerHTML = "RESTART BROWSER";
    document.getElementById("button").disabled = true;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var branch = document.getElementById("branch").value;
    var confirmation;
    if (document.getElementById("confirmation").checked)
        confirmation = 1;
    else
        confirmation = 0;
    window.localStorage.setItem("AutoJoomerUsername", JSON.stringify(username));
    window.localStorage.setItem("AutoJoomerPassword", JSON.stringify(password));
    window.localStorage.setItem("AutoJoomerBranch", JSON.stringify(branch));
    window.localStorage.setItem("AutoJoomerConfirmation", JSON.stringify(confirmation));
}