import React from 'react';

const EpgVideo = (props: any) => {
  return (
    <video
      style={{ width: '100%', height: '100%' }}
      muted
      autoPlay
      loop
      src={props.url}
      controls
    ></video>
  );
};

export default EpgVideo;
