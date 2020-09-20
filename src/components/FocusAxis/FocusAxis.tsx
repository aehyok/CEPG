import React from 'react';
import { InputNumber, Checkbox, Select, Card, Input } from 'antd';
import { BlockItemType, FocusMoveType, FocusedActionType } from '@/types';

export type OnMoveChangeFunc = (value: Partial<BlockItemType>) => void;
type FocusAxisProps = {
  canFocus: 0 | 1;
  update: (n: number, filed: string) => void;
  onMoveChange: OnMoveChangeFunc;
  blockList: BlockItemType[];
  focusedAction: FocusedActionType;
} & { [T in keyof FocusMoveType]: string };

const FocusAxis = (props: FocusAxisProps) => {
  const {
    left,
    up,
    down,
    right,
    focusedAction,
    update,
    onMoveChange,
    canFocus,
    blockList,
  } = props;
  const {
    stateBlock,
    stateChangeType,
    stateIndex,
    stateContent,
    mode,
  } = focusedAction;
  return (
    <>
      <Checkbox
        checked={!!canFocus}
        onChange={e => update(Number(e.target.checked), 'canGetFocus')}
      >
        获得焦点
      </Checkbox>
      {!!canFocus && (
        <>
          <div>
            <span>Left</span>
            <Select
              value={left}
              onChange={n =>
                n !== undefined &&
                onMoveChange({
                  focusMove: {
                    left: n,
                    up,
                    down,
                    right,
                  },
                })
              }
              style={{ width: 180 }}
              size="small"
              allowClear
            >
              {blockList.map(b => (
                <Select.Option value={b.cId} key={b.cId}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <span>Right</span>
            <Select
              value={right}
              onChange={n =>
                n !== undefined &&
                onMoveChange({
                  focusMove: {
                    left,
                    up,
                    down,
                    right: n,
                  },
                })
              }
              style={{ width: 180 }}
              size="small"
              allowClear
            >
              {blockList.map(b => (
                <Select.Option value={b.cId} key={b.cId}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <span>Up</span>
            <Select
              value={up}
              onChange={n =>
                n !== undefined &&
                onMoveChange({
                  focusMove: {
                    left,
                    up: n,
                    down,
                    right,
                  },
                })
              }
              style={{ width: 180 }}
              size="small"
              allowClear
            >
              {blockList.map(b => (
                <Select.Option value={b.cId} key={b.cId}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <span>Down</span>
            <Select
              value={down}
              onChange={n =>
                n !== undefined &&
                onMoveChange({
                  focusMove: {
                    left,
                    up,
                    down: n,
                    right,
                  },
                })
              }
              style={{ width: 180 }}
              size="small"
              allowClear
            >
              {blockList.map(b => (
                <Select.Option value={b.cId} key={b.cId}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </>
      )}

      <Card
        title="聚焦动作"
        size="small"
        style={{ marginTop: 5 }}
        bordered={false}
      >
        <div>
          <span>状态栏</span>
          <Select
            value={stateBlock}
            onChange={n =>
              n !== undefined &&
              onMoveChange({
                focusedAction: {
                  stateBlock: n,
                  stateContent,
                  stateChangeType,
                  stateIndex,
                  mode,
                },
              })
            }
            style={{ width: 180 }}
            size="small"
            allowClear
          >
            {blockList.map(b => (
              <Select.Option value={b.cId} key={b.cId}>
                {b.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <span>切换模式</span>
          <Select
            style={{ width: 180 }}
            size="small"
            allowClear
            value={mode}
            onChange={n =>
              n !== undefined &&
              onMoveChange({
                focusedAction: {
                  stateBlock,
                  stateContent,
                  stateChangeType,
                  stateIndex,
                  mode: n,
                },
              })
            }
          >
            <Select.Option value="SetIndex">序号</Select.Option>
            <Select.Option value="SetContent">内容</Select.Option>
          </Select>
        </div>

        {mode === 'SetIndex' ? (
          <>
            <div style={{ marginTop: 8 }}>
              <span>状态序号</span>
              <InputNumber
                value={stateIndex}
                onChange={n =>
                  n !== undefined &&
                  onMoveChange({
                    focusedAction: {
                      stateBlock,
                      stateContent,
                      stateChangeType,
                      stateIndex: n,
                      mode,
                    },
                  })
                }
                style={{ width: '70px' }}
                size="small"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <span>状态块形态</span>
              <Select
                style={{ width: 180 }}
                size="small"
                allowClear
                value={stateChangeType}
                onChange={n =>
                  n !== undefined &&
                  onMoveChange({
                    focusedAction: {
                      stateBlock,
                      stateContent,
                      stateChangeType: n,
                      stateIndex,
                      mode,
                    },
                  })
                }
              >
                <Select.Option value="SetIndex">序号</Select.Option>
                <Select.Option value="SetContent">内容</Select.Option>
              </Select>
            </div>
            <div>
              <Input
                name="stateContent"
                onChange={e =>
                  onMoveChange({
                    focusedAction: {
                      stateBlock,
                      stateContent: e.target.value,
                      stateChangeType,
                      stateIndex,
                      mode,
                    },
                  })
                }
                addonBefore="展示内容"
                value={stateContent}
                size="small"
              />
            </div>
          </>
        )}
      </Card>
    </>
  );
};

export default React.memo(FocusAxis);
