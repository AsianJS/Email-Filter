

    const fileInput = document.getElementById('files');
    let objectStorage = [];
    let emailcheck = [];
    fileInput.onchange = () => {
      const selectedFiles = [...fileInput.files];
      let count = 0;
      for(let i = 0; i<selectedFiles.length;i++){
        let temp = Papa.parse(selectedFiles[i], {
            header: true,
            skipEmptyLInes: true,
            complete: function(results){
                const storage = results.data;
                for(let j = 0; j<storage.length; j++){
                    if((!emailcheck.includes(storage[j].Email)) && storage[j].Email != null){
                        objectStorage[count] = storage[j];
                        emailcheck[count] = storage[j].Email;
                        count++;                           
                    }else if((!emailcheck.includes(storage[j].email)) && storage[j].email != null){
                        objectStorage[count] = storage[j];
                        emailcheck[count] = storage[j].email;
                        count++;   
                    }
                }
                // Collect all the different keys
                let keys = Object.keys(Object.assign({}, ...objectStorage));

                // Build header
                var result = keys.join(",") + "\n";

                // Add the rows
                objectStorage.forEach(function (obj) {
                //If there's a field, use the field, else, just add a blank field.
                    result += keys.map((k) => {
                        let item = "";
                        if (obj[k]) item = obj[k]; 
                        return item
                    }).join(",") + "\n";
                });
                if(i == selectedFiles.length -1){
                    download(result);
                }
            }
        });
      }


    }
    const download = function (data) {
  
        // Creating a Blob for having a csv file format 
        // and passing the data with type
        const blob = new Blob([data], { type: 'text/csv' });
      
        // Creating an object for downloading url
        const url = window.URL.createObjectURL(blob)
      
        // Creating an anchor(a) tag of HTML
        const a = document.createElement('a')
      
        // Passing the blob downloading url 
        a.setAttribute('href', url)
      
        // Setting the anchor tag attribute for downloading
        // and passing the download file name
        a.setAttribute('download', 'download.csv');
      
        // Performing a download with click
        a.click()
    }
      
/*
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    
    e.preventDefault();
    // Prevents HTML handling submission
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    // Creates empty formData object
    formData.append("name", name.value);
    // Appends value of text input
    for(let i =0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }

    // Appends value(s) of file input
    // Post data to Node and Express server:
    fetch('http://127.0.0.1:5000/api', {
        method: 'POST',
        body: formData, // Payload is formData object
    })
    .then(res => res.json())
    .then(data => console.log(data));
})
*/