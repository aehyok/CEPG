import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import router from 'umi/router';
import { getEpgList, createEpg } from '@/services';
import { Dispatch, connect } from 'dva';
import { EpgListItemType } from '@/types';
import { ColumnsType } from 'antd/lib/table';

// const { Option } = Select;

export const Home = (props: { changeEpg: (info: EpgListItemType) => void }) => {
  const { changeEpg } = props;
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const columns: ColumnsType<EpgListItemType> = [
    { title: 'EPG名称', dataIndex: 'epgName', key: '1' },
    { title: '备注', dataIndex: 'remark', key: '2' },
    { title: 'ProjectType', dataIndex: 'projectType', key: '3' },
    {
      title: '操作',
      key: '2',
      render(text, record) {
        return (
          <Button
            onClick={() => {
              changeEpg(record);
              router.push('/editor');
            }}
          >
            编辑
          </Button>
        );
      },
    },
  ];

  const fetchList = useCallback((page: number) => {
    getEpgList({ page: page }).then(res => {
      setList(res.data.docs);
      setTotal(res.data.total);
    });
  }, []);
  useEffect(() => {
    fetchList(1);
  }, [fetchList]);

  const handleCreate = async (fileds: any) => {
    const res = await createEpg({
      epgName: fileds.epgName,
      screenDirection: 1,
      projectType: 'gboss',
      resolutionWidth: 1280,
      resolutionHeight: 720,
      remark: fileds.remark,
    });
    if (res.code === 0) {
      message.success('添加成功');
      form.resetFields();
      setVisible(false);
    }
  };
  return (
    <div>
      <div style={{ padding: '20px 0' }}>
        <Button type="primary" onClick={() => setVisible(true)}>
          新增EPG
        </Button>
        {/* <Button>导入</Button>
        <Button>导出</Button> */}
      </div>
      <Table
        pagination={{ total: total, onChange: fetchList }}
        rowKey="id"
        dataSource={list}
        columns={columns}
      />
      <Modal
        visible={visible}
        title="新增EPG"
        footer={[
          <Button
            key="back"
            onClick={() => {
              form.resetFields();
              setVisible(false);
            }}
          >
            取消
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              form.validateFields().then(values => {
                handleCreate(values);
              });
            }}
          >
            确定
          </Button>,
        ]}
        onCancel={() => {
          form.resetFields();
          setVisible(false);
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Epg名称"
            name="epgName"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item
            name="screenDirection"
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value={1}>横屏</Radio>
              <Radio value={0}>竖屏</Radio>
            </Radio.Group>
          </Form.Item> */}

          {/* <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

const mapDispatchToProp = (dispatch: Dispatch) => {
  return {
    changeEpg(info: EpgListItemType) {
      dispatch({
        type: 'project/update',
        payload: {
          epgId: info.epgId,
        },
      });
    },
  };
};

export default connect(null, mapDispatchToProp)(Home);
