let selectedDate = formattedDate();

function refreshData(date) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("Cookie", "PHPSESSID=58235f830633492d9c13b243c718d2f8; YIICSRFTOKEN=9764a6debc7d5fad5df6c76c86f245603b9a1da4s%3A88%3A%22VWJTMkRENjBZa1FDUkZvT292eVBLeXlTblNZSk5CbmaSKVwQwb8QOWL7OMp3e92LV6KdoZFaQ8lQOsK89L9Z4A%3D%3D%22%3B");

    let raw = `{\r\n\"apiKey\": \"d01aa3752730451f5b0b3d3f0dcaddeb\",\r\n\"modelName\": \"InternetDocument\",\r\n\"calledMethod\": \"getDocumentList\",\r\n\"methodProperties\": {\r\n\"DateTime\": \"${ date }\",\r\n\"GetFullList\": \"1\"\r\n}\r\n}`;

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    const list = document.getElementById('list');
    list.innerHTML = '';

    fetch("https://api.novaposhta.ua/v2.0/json/", requestOptions)
        .then(response => response.json())
        .then(result => {
            result.data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = ` ${ item.IntDocNumber } ${ item.RecipientContactPerson } ${ item.RecipientsPhone }`;
                list.appendChild(li);
            })
        })
        .catch(error => console.log('error', error));
}

function formattedDate(d = new Date()) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}.${month}.${year}`;
}


refreshData(formattedDate());

document.getElementById("dateInput").addEventListener("change", function () {
    var input = this.value;
    var d = new Date(input);

    selectedDate = formattedDate(d);
});

document.getElementById('submitButton').addEventListener('click', () => {
    refreshData(selectedDate);
});
