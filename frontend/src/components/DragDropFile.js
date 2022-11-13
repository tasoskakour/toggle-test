/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';

const DragDropFile = (props) => {
    const { handleFiles } = props;

    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form
            id="form-file-upload"
            css={{
                border: '2px dashed #9d9d9d',
                padding: '16px',
                backgroundColor: dragActive ? '#b3b3b3' : '#f1f1f1',
                margin: '16px',
            }}
            onDragEnter={handleDrag}
            onSubmit={(e) => e.preventDefault()}
        >
            <label id="label-file-upload" htmlFor="input-file-upload">
                <div css={{ textAlign: 'center' }}>
                    <p css={{ textAlign: 'center', fontSize: '18px' }}>
                        Drag and drop your file(s) here
                    </p>
                    <div>or...</div>
                    <Button onClick={onButtonClick}>Upload file(s)</Button>
                    <input
                        ref={inputRef}
                        type="file"
                        hidden
                        id="input-file-upload"
                        multiple
                        onChange={handleChange}
                    />
                </div>
            </label>
            {dragActive && (
                <div
                    id="drag-file-element"
                    css={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '1rem',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                />
            )}
        </form>
    );
};

DragDropFile.propTypes = {
    handleFiles: PropTypes.func.isRequired,
};

export default DragDropFile;
