'use client';

import { useRef, useState, useEffect } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name, image}) {  
    const [pickedImage, setPickedImage] = useState(image, null);
    const imageInput = useRef();
    
    function handlePickClick() {
        imageInput.current.click();
    }
     
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) {
            return; 
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        console.log('Imageinput ref', imageInput)
        console.log('file', pickedImage)
        fileReader.readAsDataURL(file);
    } 

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image has been picked.</p>}
                    {pickedImage && <Image src={pickedImage} alt="Picked" fill/>}
                </div>
                <input className={classes.input} type='file' id={name} accept='image/jpeg, image/png, image/jpg' name={name} ref={imageInput} onChange={handleImageChange}/>
                <button className={classes.button} type="button" onClick={handlePickClick}>Pick Image</button>
            </div>
        </div>
    );
}