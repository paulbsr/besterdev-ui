import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdCamera } from "react-icons/md";
import { Tooltip } from '@mui/material';

export function CyclopediaImageUpload(props) {
    const [image, setImage] = React.useState([]);
    const maxNumber = 1;

    const onImageSave = async (imageList, addUpdateIndex) => {
        setImage(imageList);
        const formData = new FormData();
        formData.append('cyclopediaImageData', imageList[0].file); // Assuming you only allow one image to be uploaded
        formData.append('cyclopediaIdFk', props.cyclopedia_id);
        formData.append('cyclopediaName', props.cyclopedia_name);
        formData.append('cyclopediaId', props.cyclopedia_id);

        try {
            const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopediaimages/upload`, formData, { //HEROKU
                // const response = await axios.post(`http://localhost:8000/api/v1/cyclopediaimages/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success(`Image saved`);
            } else {
                toast.error('An error occurred while saving the image.');
            }
        } catch (error) {
            console.error('In <CyclopediaImageUpload> het jy n probleem:', error);
            toast.error('An error occurred while saving the image', error);
        }
        console.log("In <CyclopediaImageUpload> is jou props.cyclopediaId", props.cyclopediaId)
        console.log("In <CyclopediaImageUpload> is jou props.cyclopediaIdFk", props.cyclopediaIdFk)
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
                    <Tooltip title='Add or Replace an image associated with this Cyclopedia Entry' placement="top">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={onImageUpload}>
                            <MdCamera style={{ color: '#336791', display: 'block', margin: 'auto', fontSize: '21px' }} />
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