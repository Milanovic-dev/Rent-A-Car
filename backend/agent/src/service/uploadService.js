const uuidv4 = require('uuid/v4');


function upload(file, callback) {


    let fname = uuidv4();
    let extension = '.' + file.name.split('.').pop();

    let filename = fname + extension;

    file.mv('./uploads/' + filename, (err) => {
        if (err) {
            res.status(500).send('Error');
            callback({
                status: 500,
                response: {
                    error: 'Error'
                }
            }
            )
        }
        callback(
            {
                status: 200,
                response: {
                    file: 'https://localhost:8282/uploads/' + filename
                }
            }
        )
    })
}

module.exports = {
    upload
}