import React, { useState } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Like = () => {
    const [like, setLike] = useState('disabled')
    const handleLike = () => {
        const color = like === 'primary' ? 'disabled' : 'primary'
        setLike(color)
    }
    return (
        <div>
            <ThumbUpIcon onClick={handleLike} color={like}></ThumbUpIcon>
        </div>
    );
};

export default Like;