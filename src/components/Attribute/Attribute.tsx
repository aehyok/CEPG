import CatBlockAttributes from './CatBlockAttributes';
import CatListHAttribute from './CatListHAttributes';
import { PluginType } from '@/types';
import React from 'react';
import ImageAttribute from './ImageAttribute';
import VideoAttributes from './VideoAttributes';
import TextAttribute from './TextAttribute';
import PictureListAttributes from './PictureListAttributes';
import ButtonAttributes from './ButtonAttributes';
import StateBlockAttributes from './StateBlockAttributes';

export const getAttributeComponent = (
  type: PluginType,
  props: { attribute: any; cId: string },
) => {
  const attrComponent: { [T in PluginType]: React.ReactElement } = {
    CatBlock: <CatBlockAttributes {...props.attribute} cId={props.cId} />,
    PicList: <PictureListAttributes {...props.attribute} cId={props.cId} />,
    PicsShuffling: (
      <PictureListAttributes {...props.attribute} cId={props.cId} />
    ),
    CatListH: <CatListHAttribute {...props.attribute} cId={props.cId} />,
    CatListV: <CatListHAttribute {...props.attribute} cId={props.cId} />,
    AdBlock: <div>广告位属性</div>,
    Image: <ImageAttribute {...props.attribute} cId={props.cId} />,
    Video: <VideoAttributes {...props.attribute} cId={props.cId} />,
    Button: <ButtonAttributes {...props.attribute} cId={props.cId} />,
    Text: <TextAttribute {...props.attribute} cId={props.cId} />,
    StateBlock: <StateBlockAttributes {...props.attribute} cId={props.cId} />,
  };
  return attrComponent[type];
};
