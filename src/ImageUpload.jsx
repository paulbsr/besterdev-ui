import React from 'react';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { toast } from 'react-toastify';

export function ImageUpload(props) {
    const [image, setImage] = React.useState([]);
    const maxNumber = 1;

    const onImageSave = async (imageList, addUpdateIndex) => {
        setImage(imageList);
        
        const formData = new FormData();
        formData.append('imagedata', imageList[0].file); // Assuming you only allow one image to be uploaded

        formData.append('step_id_fk', props.stepidfk);
        formData.append('parent_step_name', props.parentstepname);
        formData.append('parent_step_id', props.parentstepid);

        try {
            const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success(`Image for ${props.parentstepname} has been memorialized.`);
            } else {
                toast.error('An error occurred while saving the image.');
            }
        } catch (error) {
            console.error('Error while uploading image:', error);
            toast.error('An error occurred while saving the image.');
        }
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={image}
                onChange={onImageSave}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageSave,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button onClick={onImageUpload} {...dragProps}>Select</button>
                        &nbsp;
                        <button onClick={onImageSave}>Save</button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="200" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Change</button>
                                    <button onClick={() => onImageRemove(index)}>Drop</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}
