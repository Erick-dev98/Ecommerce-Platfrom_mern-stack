import React, { useState } from "react";
import Card from "../../card/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const UploadWidget = ({ files, setFiles }) => {
  // File upload start
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const addImages = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages((previousImages) => previousImages.concat(selectedFilesArray));
    // console.log(images);
    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const removeImage = (image) => {
    const imageIndex = selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img) => img !== image));

    setImages(images.filter((img, index) => index !== imageIndex));
    URL.revokeObjectURL(image);
  };
  // File upload end

  const url = "https://api.cloudinary.com/v1_1/zinotrust/image/upload";

  const uploadImages = async () => {
    setUploading(true);
    console.log(images);
    let imageUrls = [];
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("file", file);
      formData.append("upload_preset", "mqxbycre");
      formData.append("folder", "shopito");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          imageUrls.push(data.secure_url);
          setProgress(imageUrls.length);

          if (imageUrls.length === images.length) {
            setFiles((prevFiles) => prevFiles.concat(imageUrls));
            setUploading(false);
            console.log(files);
            toast.success("Image upload complete");
            setImages([]);
            setSelectedImages([]);
            setProgress(0);
          }
        })
        .catch((error) => {
          setUploading(false);
          toast.error(error.message);
          console.log(error);
        });
    }
  };

  //   const uploadImages = async () => {
  //     console.log(images);
  //     let files = [];
  //     try {
  //       for (let i = 0; i < images.length; i++) {
  //         let formData = new FormData();
  //         formData.append("file", images[i]);
  //         formData.append("upload_preset", "mqxbycre");

  //         const res = await instance.post(url, formData);
  //         console.log(res.data.url);
  //         return res.data;
  //         // .then((response) => {
  //         //   console.log(response.data);
  //         //   return response.data;
  //         // });

  //         //   .then((data) => {
  //         //     console.log(data.secure_url);
  //         //   });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div>
      <Card cardClass={"formcard group"}>
        <label className="uploadWidget">
          <AiOutlineCloudUpload size={35} />
          <br />

          <span>Click to upload Up to 5 images</span>
          <input
            type="file"
            name="images"
            onChange={addImages}
            multiple
            accept="image/png , image/jpeg, image/webp"
          />
        </label>
        <br />
        {selectedImages.length > 0 &&
          (selectedImages.length > 5 ? (
            <p className="error">
              You can't upload more than 5 images! <br />
              <span>
                please remove <b> {selectedImages.length - 5} </b> of them.
              </span>
            </p>
          ) : (
            <>
              <div className="--center-all">
                <button
                  className="--btn --btn-danger --btn-large"
                  disabled={uploading}
                  onClick={() => {
                    uploadImages();
                  }}
                >
                  {uploading
                    ? `Uploading... ${progress} of ${selectedImages.length}`
                    : `Upload ${selectedImages.length} Image${
                        selectedImages.length === 1 ? "" : "s"
                      }`}
                </button>
              </div>
            </>
          ))}

        <div className={selectedImages.length > 0 ? "images" : ""}>
          {selectedImages.length !== 0 &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image">
                  <img src={image} width="200" alt="productImage" />
                  <button className="--btn" onClick={() => removeImage(image)}>
                    <BsTrash size={25} />
                  </button>
                  <p>{index + 1}</p>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

export default UploadWidget;
