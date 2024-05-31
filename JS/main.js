var siteName = document.getElementById('SiteName');
var siteUrl = document.getElementById('URL');
var sitesTable = document.getElementById('siteList');
var subButton = document.getElementById('subButton');
var valModal = new bootstrap.Modal(document.getElementById('subModal'));
console.log(valModal);
var mySites;
if (localStorage.getItem("AllSites") != null) {
    mySites = JSON.parse(localStorage.getItem("AllSites"));
    displaySites();
}
else {
    mySites = []
}

function saveSite() {

    if (validateName() == true && validateMail() == true) {
        var site = {
            _siteName: siteName.value,
            _siteURL: siteUrl.value
        };
        mySites.push(site);
        localStorage.setItem("AllSites", JSON.stringify(mySites));
        displaySites();
        clearForm();
    }

    else {
        valModal.show();
    }


}

function displaySites() {
    container = ""
    for (var i = 0; i < mySites.length; i++) {
        container += `<tr>
            <td>${i + 1}</td>
            <td>${mySites[i]._siteName}</td>
            <td>
            <button onclick="window.open('${mySites[i]._siteURL}', '_blank');" type="button" class="btn visit-button">
            <i class="fa-solid fa-eye me-2"></i>
            Visit
            </button>
            </td>
            <td><button onclick="deleteSite(${i})" type="button" class="btn btn-danger">
            <i class="fa-solid fa-trash-can me-2"></i>
            Delete</button></td>
        </tr>`
    }
    sitesTable.innerHTML = container;

}

function deleteSite(elementIndex) {
    mySites.splice(elementIndex, 1);
    localStorage.setItem("AllSites", JSON.stringify(mySites));
    displaySites();
}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

function validateName() {
    var regex = /^[a-zA-Z]{3,}$/;
    if (regex.test(siteName.value)) {
        return true;
    }
    return false;
}

function validateMail(){
    var regex = /^(https:\/\/){1}(www.)?[a-z]{1,}(\.){1}[a-z]+$/;

    if (regex.test(siteUrl.value)) {
        return true;
    }
    return false;
}
