import readXlsxFile from 'read-excel-file'
export let readXLSCrew = () =>{
     let crew = [
         { NR: 1, },
         { NR: 2 },
         { NR: 3 },
         { NR: 4 },
     ];

    let file = document.getElementById("xlsCrew");
    readXlsxFile(file.files[0]).then((rows) => {
        // console.log(rows)


    })
    return {crew};
}
export default {readXLS: readXLSCrew}
