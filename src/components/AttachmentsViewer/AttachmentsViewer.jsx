import React, { useEffect, useState } from 'react';
import { isFile, toBase64 } from '../../helpers';
import { useAttachmentsStore } from '../../store/useAttachmentsStore';
import Attachment from './Attachment';

const mediaHeight = 100;

const fileSvg = (
  <svg
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {' '}
      <title>File-Generic</title>{' '}
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        {' '}
        <g id="File-Generic">
          {' '}
          <rect
            id="Rectangle"
            fillRule="nonzero"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            {' '}
          </rect>{' '}
          <path
            d="M4,5 C4,3.89543 4.89543,3 6,3 L15.1716,3 C15.702,3 16.2107,3.21071 16.5858,3.58579 L19.4142,6.41421 C19.7893,6.78929 20,7.29799 20,7.82843 L20,19 C20,20.1046 19.1046,21 18,21 L6,21 C4.89543,21 4,20.1046 4,19 L4,5 Z"
            id="Path"
            stroke="#0C0310"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {' '}
          </path>{' '}
          <path
            d="M15,4 L15,6 C15,7.10457 15.8954,8 17,8 L19,8"
            id="Path"
            stroke="#0C0310"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {' '}
          </path>{' '}
        </g>{' '}
      </g>{' '}
    </g>
  </svg>
);

const getJsxImg = async files => {
  const images = await Promise.all(
    files.map(async file => {
      const base64 = await toBase64(file);
      return { src: base64, id: file.id };
    })
  );

  return images.map(img => (
    <Attachment key={img.id} id={img.id}>
      <img
        style={{
          height: mediaHeight,
        }}
        src={img.src}
        alt="image"
      />
    </Attachment>
  ));
};

const getJsxVideo = async files => {
  const videos = await Promise.all(
    files.map(async file => {
      const base64 = await toBase64(file);
      return { src: base64, id: file.id, type: file.type };
    })
  );

  return videos.map(video => (
    <Attachment key={video.id} id={video.id}>
      <video controls style={{ height: mediaHeight }}>
        <source src={video.src} type={video.type} />
      </video>
    </Attachment>
  ));
};

const getJsxFile = files => {
  return files.map(file => {
    return (
      <Attachment key={file.id} id={file.id}>
        <div className="file">
          {fileSvg}
          <div className="file__info">
            <div className="file__name">{file.name}</div>
          </div>
        </div>
      </Attachment>
    );
  });
};

export const AttachmentsViewer = () => {
  const files = useAttachmentsStore(state => state.files);
  console.log(files);
  const [jsxMedia, setJsxMedia] = useState(null);
  const [jsxFiles, setJsxFiles] = useState(null);

  const render = async files => {
    const images = await getJsxImg(files[0]);
    const videos = await getJsxVideo(files[1]);
    setJsxMedia(images.concat(videos));
    setJsxFiles(getJsxFile(files[2]));
  };

  useEffect(() => {
    console.log(files);
    const sortedFiles = [[], [], []];
    files.forEach(file => {
      if (isFile.image(file)) {
        sortedFiles[0].push(file);
      } else if (isFile.video(file)) {
        sortedFiles[1].push(file);
      } else {
        sortedFiles[2].push(file);
      }
    });

    render(sortedFiles);
  }, [files]);

  return (
    <div className="text-editor__attachments-viewer attachments-viewer">
      <div className="attachments-viewer__media-files">{jsxMedia}</div>
      <div className="attachments-viewer__files">{jsxFiles}</div>
    </div>
  );
};
