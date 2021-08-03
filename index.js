let myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Cookie", "PHPSESSID=58235f830633492d9c13b243c718d2f8; YIICSRFTOKEN=9764a6debc7d5fad5df6c76c86f245603b9a1da4s%3A88%3A%22VWJTMkRENjBZa1FDUkZvT292eVBLeXlTblNZSk5CbmaSKVwQwb8QOWL7OMp3e92LV6KdoZFaQ8lQOsK89L9Z4A%3D%3D%22%3B");

let raw = "{\r\n\"apiKey\": \"41de3ecc2b398986e37a03631f257f8d\",\r\n\"modelName\": \"InternetDocument\",\r\n\"calledMethod\": \"getDocumentList\",\r\n\"methodProperties\": {\r\n\"DateTime\": \"12.12.2020\",\r\n\"Page\": \"1\",\r\n\"GetFullList\": \"0\"\r\n}\r\n}";

let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://api.novaposhta.ua/v2.0/json/", requestOptions)
    .then(response => response.json())
    .then(result => {
        let string = '';
        result.data.forEach(item => {
            string += `ТТН: ${ item.IntDocNumber }\nИмя: ${ item.RecipientContactPerson }\nНомер: ${ item.RecipientsPhone }\n\n`;
        })
        downloadString(string, 'txt', 'result');
    })
    .catch(error => console.log('error', error));

function downloadString(text, fileType, fileName) {
    let blob = new Blob([text], { type: fileType });
    let a = document.createElement('a');

    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.innerHTML = 'DOWNLOAD INFO';
    document.body.appendChild(a);
    a.onclick = () => setTimeout(function () {
        URL.revokeObjectURL(a.href);
    }, 1500);
}