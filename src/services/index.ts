import request from '@/utils/request';
import { CategoryItemType, EpgListItemType } from '@/types';

export const getPages = (data: any) => {
  return request.post('/api/EpgPage/GetPageList', data);
};

// 保存页面
export const savePages = (data: any) => {
  return request.post('/api/EpgPage/AddPage', data);
};

// enum ResourceType {
//   其他 = 0,
//   图片 = 1,
//   视频 = 2,
//   音频 = 4,
//   流媒体 = 5,
//   URL链接 = 6,
// }

export type ResourcesParams = {
  projectType: string;
  epgId: string;
  // 素材类型
  resourceType: number;
  page?: number;
  limit?: number;
  orderBy?: string;
  desc?: boolean;
};

/**
 * 获取资源
 * @param data ResourcesParams
 */
export const getResources = (data: ResourcesParams) => {
  return request.post('/GetResourceList', data);
};

export const saveColumn = (data: CategoryItemType[]) => {
  return request.post('/api/Category/AddCategory', data);
};

export const getColumn = (epgId: string) => {
  return request.post('/api/Category/GetCategoryList', { epgId });
};

/**
 * 获取栏目类型
 */
export const getCategoryType = () => {
  return request.post('/api/CustomEpg/GetCategoryType');
};

type GetEpgListParams = {
  projectType: string;
  name: string;
  page: number;
  limit: number;
  orderby: string;
  desc: boolean;
};
export const getEpgList = (data: Partial<GetEpgListParams>) => {
  return request.post('/api/CustomEpg/GetPageList', data);
};

/**
 * 创建EPG
 * @param data
 */
export const createEpg = (
  data: Pick<
    EpgListItemType,
    | 'epgName'
    | 'remark'
    | 'screenDirection'
    | 'resolutionHeight'
    | 'resolutionWidth'
    | 'projectType'
  >,
) => {
  return request.post<any, { code: number; message: string; data: any }>(
    '/api/CustomEpg/AddEpg',
    data,
  );
};
