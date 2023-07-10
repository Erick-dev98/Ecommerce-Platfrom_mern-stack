import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./ProductForm.scss";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";

const ProductForm = ({
  files,
  setFiles,
  product,
  productImage,
  imagePreview,
  setImagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  categories,
  filteredBrands,
  isEditing,
}) => {
  const img =
    "https://res.cloudinary.com/zinotrust/image/upload/v1674999036/nhq5gqr1xecrkipneiup.jpg";

  // useEffect(() => {
  //   const updateImagePreview = () => {
  //     // const imagesArray = files.map((file) => {
  //     //   return file;
  //     // });
  //     setImagePreview(files);
  //   };
  //   updateImagePreview();
  // }, [files, setImagePreview]);

  const removeImage = (image) => {
    console.log(image);
    setFiles(files.filter((img, index) => img !== image));
  };

  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />

      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveProduct}>
          <label>Product Images:</label>
          <div className="slide-container">
            <aside>
              {files.length > 0 &&
                files.map((image) => (
                  <div key={image} className="thumbnail">
                    <img src={image} alt="productImage" height={100} />
                    <div>
                      <BsTrash
                        size={15}
                        className="thumbnailIcon"
                        onClick={() => removeImage(image)}
                      />
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="--m">No image set for this poduct.</p>
              )}
            </aside>
          </div>
          <br />
          <hr />
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <select
            name="category"
            value={product?.category}
            className="form-control"
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option>{product?.category}</option>
            ) : (
              <option>Select Category</option>
            )}
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._name}>
                  {cat.name}
                </option>
              ))}
          </select>

          {/* <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          /> */}

          <label>Product Brand:</label>
          <select
            name="brand"
            value={product?.brand}
            className="form-control"
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option>{product?.brand}</option>
            ) : (
              <option>Select Brand</option>
            )}

            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>
          {/* <input
            type="text"
            placeholder="Brand"
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
          /> */}
          <label>Product Color:</label>
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={product?.color}
            onChange={handleInputChange}
          />

          <label>Regular Price:</label>
          <input
            type="text"
            placeholder="Regular Price"
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
          />
          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
