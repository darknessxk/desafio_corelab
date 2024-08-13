import type {ColorPickerProps, GetProp} from 'antd';
import {ColorPicker, Popconfirm, Spin} from "antd";
import ITodo from "@/interfaces/ITodo";
import {
    BgColorsOutlined,
    CheckCircleFilled,
    CheckCircleOutlined,
    DeleteOutlined,
    EditFilled,
    EditOutlined,
    StarFilled,
    StarOutlined
} from '@ant-design/icons';
import {useCallback, useMemo, useState} from "react";
import useTodoHelper from "@/hooks/useTodoHelper";
import TodoCardView, {CardViewMode} from "@/components/TodoCardView";

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

export default function TodoCard({item, authToken}: {item: ITodo, authToken: string}) {
    const [color, setColor] = useState<Color>(item.color);
    const [isBusy, setBusy] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<CardViewMode>(CardViewMode.View);

    const bgColor = useMemo<string>(
        () => (typeof color === 'string' ? color : color!.toHexString()),
        [color],
    );

    const {
        deleteItem,
        toggleFavorite,
        toggleCompleted,
        updateColor,
        updateItem
    } = useTodoHelper({ item, setBusy, authToken, setViewMode })

    const actions = useMemo(() => isBusy ? [
        <Spin key={"spinner"}>...</Spin>
    ] : [
        ...(viewMode === CardViewMode.View ? [
            item.favorite ?
                <StarFilled key="favorite" onClick={toggleFavorite} /> :
                <StarOutlined key="favorite" onClick={toggleFavorite} />,

            <ColorPicker key="color" disabledAlpha value={color} onChange={setColor} onOpenChange={
                (open) => {
                    if (!open && item.color !== bgColor) {
                        updateColor(bgColor)
                    }
                }
            } trigger={"click"}>
                <BgColorsOutlined />
            </ColorPicker>,

            item.completed ? <CheckCircleFilled onClick={toggleCompleted} key="completed" /> :
                <CheckCircleOutlined onClick={toggleCompleted} key="completed" />,

            <Popconfirm
                title="Delete item"
                description="Are you sure to delete this item?"
                okText="Yes"
                cancelText="No"
                onConfirm={deleteItem}
                key="remove"
            >
                <DeleteOutlined />
            </Popconfirm>
        ] : []),

        viewMode === CardViewMode.Edit ?
            <EditFilled onClick={() => setViewMode(CardViewMode.View)} key="edit" /> :
            <EditOutlined onClick={() => setViewMode(CardViewMode.Edit)} key="edit" />,
    ], [isBusy, item.favorite, item.completed, item.color, toggleFavorite, color, toggleCompleted, deleteItem, viewMode, bgColor, updateColor]);

    return <TodoCardView onFinish={updateItem} isBusy={isBusy} mode={viewMode} setMode={setViewMode} actions={actions} bgColor={bgColor} item={item} />;
}