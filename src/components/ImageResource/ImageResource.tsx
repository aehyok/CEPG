import React, { useState } from 'react';
import { Row, Col, Pagination } from 'antd';
import styles from './ImageResource.less';
import { useResource } from '@/hooks/useResource';
import { ResourceItemType } from '@/types';

const ImageResource = (props: any) => {
  const [selected, setSelected] = useState<ResourceItemType>();
  const { onSelect, type, epgId } = props;
  const { currentPage, limit, list, handlePageChange, total } = useResource(
    type,
    epgId,
  );

  const handleSelect = (item: ResourceItemType) => {
    setSelected(item);
    onSelect(item);
  };

  return (
    <div>
      <Row gutter={10} align="top">
        {list.map(i => (
          <Col span={4} key={i.id}>
            <div
              onClick={() => handleSelect(i)}
              className={`
            ${styles['img-col']}
            ${selected?.id === i.id ? styles['active'] : ''}`}
            >
              <img
                className={styles['img-thumbnail']}
                src={i.thumb}
                alt={i.resourceName}
              />
              <div className={styles['img-name']}>{i.resourceName}</div>
            </div>
          </Col>
        ))}
      </Row>
      <Pagination
        pageSize={limit}
        current={currentPage}
        total={total}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ImageResource;
