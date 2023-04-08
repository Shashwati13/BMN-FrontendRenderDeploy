import React, { useState } from "react";

function Imageupload() {
    const [image, setImage] = useState(null);

    function handleImageUpload(event) {
        console.log(event.target.files);
        setImage(event.target.files[0]);
    }

    return (
        <div>
            <h1>Image Upload</h1>
            <label htmlFor="file">Upload an image:</label>
            <input type="file" name="file" id="file" onChange={handleImageUpload} />
            {image && <img src={URL.createObjectURL(image)} alt="uploaded image" />}
        </div>
    );
}

export default Imageupload;
