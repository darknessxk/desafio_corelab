import {Button, Card, Flex, Form, Input} from "antd";
import ITodo from "@/interfaces/ITodo";
import React from "react";

type EditProps = {
    title: string,
    description: string
}

export enum CardViewMode {
    Edit = "edit",
    View = "view",
    Insert = "insert"
}

interface TodoCardViewProps {
    item?: ITodo;
    isBusy: boolean;
    mode: CardViewMode;
    setMode: (value: CardViewMode) => void;
    actions: React.ReactNode[];
    bgColor: string;
    onFinish: (values: EditProps) => void;
}

export default function TodoCardView({ mode, item, setMode, isBusy, actions, bgColor, onFinish }: TodoCardViewProps) {
    const [form] = Form.useForm<EditProps>();

    const cardStyle: React.CSSProperties = {
        backgroundColor: bgColor,
        borderColor: bgColor,
    };

    return (
        <Form<EditProps> form={form} onFinish={values => {
            onFinish(values)
            form.resetFields()
        }}>
            <Card
                title={
                    mode !== CardViewMode.View ? <Form.Item<EditProps>
                        name="title"
                        rules={[
                            { min: 3, message: 'Title must be at least 3 characters long' }
                        ]}
                    >
                        <Input
                            placeholder="Title"
                            defaultValue={item?.title}
                            disabled={isBusy}
                            style={{ marginTop: '24px' }}
                        />
                    </Form.Item> : item?.title ?? "Create new item"
                }
                style={cardStyle}
                bordered={false}
                loading={isBusy}
                actions={mode === CardViewMode.View ? actions : []}
            >
                <Flex vertical>
                    {
                        mode !== CardViewMode.View ? <Form.Item<EditProps>
                            name="description"
                            rules={[
                                { min: 3, message: 'Description must be at least 3 characters long' }
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Description"
                                defaultValue={item?.description}
                                disabled={isBusy}
                                rows={6}
                            />
                        </Form.Item> : item?.description ?? "Create new item description"
                    }

                    {mode !== CardViewMode.View && (
                        <Flex gap={4} justify="flex-end">
                            <Button
                                type="primary"
                                onClick={() => form.submit()}
                                loading={isBusy}
                            >
                                {mode === CardViewMode.Edit ? "Save" : "Create"}
                            </Button>

                            <Button
                                type="default"
                                danger
                                onClick={() => {
                                    form.resetFields()
                                    setMode(CardViewMode.View)
                                }}
                                loading={isBusy}
                            >
                                Cancel
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Card>
        </Form>
    )
}