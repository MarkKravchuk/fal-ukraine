import xml from 'xml'
export let generateXML  =(port) =>{
    console.log(port);
    let xmlValue = xml([{
        EPCMessage: [{
            EPCMessageHeader: [{
                ArrivalDeparture:'k'
            }]},
            {EPCRequestBody: [{
                VoyageNumber:'k'
            }]}
        ]
    }],{declaration: true})
    downloadXMLfile(xmlValue);

}
 let downloadXMLfile = (xmlValue) => {
    let data = xmlValue;
    let filename = `XML config ${new Date()}.xml`
    console.log('downloadXMLfile')
    var file = new Blob([data], /*{type: type}*/);

        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);

}

export default {generateXML}