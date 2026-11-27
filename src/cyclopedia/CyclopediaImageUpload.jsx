import React from 'react';
import ImageUploading from 'react-images-uploading';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import { CiCamera } from "react-icons/ci";

export async function uploadCyclopediaImage(imageFile, cyclopediaId, cyclopediaName) {
    const formData = new FormData();
    formData.append('cyclopediaImageData', imageFile);
    formData.append('cyclopediaIdFk', cyclopediaId);
    formData.append('cyclopediaName', cyclopediaName);
    formData.append('cyclopediaId', cyclopediaId);

    return OAuth2APIClient.post(
        'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopediaimages/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
}

export function CyclopediaImageUpload(props) {
    const [image, setImage] = React.useState([]);
    const { reload } = useCyclopediaApi();
    const maxNumber = 1;

    const onImageSave = async (imageList, addUpdateIndex) => {
        setImage(imageList);
        const imageFile = imageList[0]?.file;
        if (props.onImageSelected) {
            props.onImageSelected(imageFile || null);
            return;
        }

        try {
            const response = await uploadCyclopediaImage(
                imageFile,
                props.cyclopedia_id,
                props.cyclopedia_name
            );
            if (response.status >= 200 && response.status < 300) {
                toast.success(`Image saved`);
                await reload();
            } else {
                toast.error('An error occurred while saving the image.');
            }
        } catch (error) {
            console.error('In <CyclopediaImageUpload> het jy n probleem:', error);
            toast.error('An error occurred while saving the image', error);
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
                    <Tooltip title='Add / Replace image' placement="top">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer', marginLeft: '15px' }} type='button' onClick={onImageUpload}>
                            <CiCamera style={{ color: '#4D4D4D', display: 'block', margin: 'auto', fontSize: '33px' }} />
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