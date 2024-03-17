import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdCamera } from "react-icons/md";
import { Tooltip } from '@mui/material';

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
            // const response = await axios.post(`http://localhost:8000/api/v1/images/upload`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                props.setCheckForRecords(!props.checkForRecords);
                toast.success(`Image saved for Step#${props.parentstepid}`);
            } else {
                toast.error('An error occurred while saving the image.');
            }
        } catch (error) {
            console.error('Error while uploading image:', error);
            toast.error('An error occurred while saving the image.');
        }
    };

    return (
        <ImageUploading
            multiple
            value={image}
            onChange={onImageSave}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {(
                {
                    imageList,
                    onImageUpload,
                    onImageSave,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }
            ) =>
            (
                <React.Fragment>
                    <Tooltip title='Add or Replace an image to this Step' placement="top">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={onImageUpload}>
                            <MdCamera style={{ color: 'D5441C', display: 'block', margin: 'auto', fontSize: '19px' }} />
                        </button>
                    </Tooltip>
                    {imageList.map((image, index) => (
                        <img key={index} src={image['data_url']} />
                    ))}
                </React.Fragment>

            )
            }
        </ImageUploading>
    );
}
