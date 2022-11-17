import React, {useState} from 'react';

export const AddNewMedia:React.FC = () => {
    const [drag, setDrag] = useState(false);

    const dragStartOverHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }

    const dropHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const formData = new FormData();
            formData.append('media', e.dataTransfer.files[0]);
        }
    }

    return (
        <div className='add-new-media-zone'>
            <h2 className='title-new-media'>New media</h2>
            {drag
                ?<div
                    onDragStart={dragStartOverHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartOverHandler}
                    onDrop={dropHandler}
                    className='drop-area'>Drop files for upload
                </div>
                :<div
                    onDragStart={dragStartOverHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartOverHandler}
                    className='drop-area'>Drag files for upload
                </div>}

            <form className='new-media-form'>
                <div className='new-media-group'>
                    <label className='new-media-label'>Title</label>
                    <input type='text' className='quick-nav-item clear-button search-input new-media-input'></input>
                </div>
                <div className='new-media-group description'>
                    <label className='new-media-label'>Description</label>
                    <textarea className='quick-nav-item clear-button search-input
                    new-media-input description'></textarea>
                </div>
            </form>

            <div className='nav-bar my-media-buttons'>
                <button className='quick-nav-item clear-button quick-nav-item-label'>Add video</button>
                <button className='quick-nav-item clear-button quick-nav-item-label'>Cancel</button>
            </div>
        </div>
    )
}