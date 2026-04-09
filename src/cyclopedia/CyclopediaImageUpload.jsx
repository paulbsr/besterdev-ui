import React from 'react';
import ImageUploading from 'react-images-uploading';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { toast } from 'react-toastify';
import { Tooltip } from '@mui/material';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import { CiCamera } from "react-icons/ci";

export function CyclopediaImageUpload(props) {
    const [image, setImage] = React.useState([]);
    const { cyclopediarootdata, loading, error, setRefreshCyclopediarootdata } = useCyclopediaApi();
    const maxNumber = 1;

    const onImageSave = async (imageList, addUpdateIndex) => {
        setImage(imageList);
        const formData = new FormData();
        formData.append('cyclopediaImageData', imageList[0].file); // Assuming you only allow one image to be uploaded
        formData.append('cyclopediaIdFk', props.cyclopedia_id);
        formData.append('cyclopediaName', props.cyclopedia_name);
        formData.append('cyclopediaId', props.cyclopedia_id);

        try {
            const response = await OAuth2APIClient.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopediaimages/upload`, formData, { //HEROKU
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                toast.success(`Image saved`);
                setRefreshCyclopediarootdata(prev => !prev);  // Assuming setRefresh triggers a data refetch
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