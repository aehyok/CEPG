import { useState, useEffect, useCallback } from 'react';
import { getResources } from '@/services';
import { ResourceItemType } from '@/types';

/**
 * 返回资源接口数据和分页数据
 * @param resourceType 资源类型
 */
export const useResource = (resourceType: number, epgId: string) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [list, setList] = useState<ResourceItemType[]>([]);
  const [limit, setLimit] = useState<number>(12);
  const [total, setTotal] = useState<number>(1);

  const fetchList = useCallback(async () => {
    const res = await getResources({
      projectType: 'IPS',
      epgId,
      resourceType,
      page: currentPage,
      limit,
    });
    setList(res.data.docs);
    setTotal(res.data.total);
  }, [epgId, resourceType, currentPage, limit]);

  const handlePageChange = useCallback((page: number, size?: number) => {
    if (size) {
      setLimit(size);
    }
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);
  useEffect(() => {
    setCurrentPage(1);
  }, [resourceType]);

  return {
    currentPage,
    limit,
    total,
    list,
    handlePageChange,
  };
};
