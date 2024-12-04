import fs from 'fs'

// eslint-disable-next-line import/prefer-default-export
export const handleUploadFile = (req, res) => {
    console.log("File upload started. Details of file are", req.file)
    //res.send('File uploaded successfully!');
  res.json({success : true, message : 'File uploaded succesfully!!'})
}