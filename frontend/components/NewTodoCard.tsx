import {useCallback, useState} from "react";
import TodoCardView, {CardViewMode} from "@/components/TodoCardView";
import {PlusCircleOutlined} from "@ant-design/icons";
import useCreateTodo from "@/api/useCreateTodo";
import {notification} from "antd";
import {useQueryClient} from "@tanstack/react-query";

export default function NewTodoCard({authToken}: {authToken: string}) {
    const [isBusy, setBusy] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<CardViewMode>(CardViewMode.View);
    const queryClient = useQueryClient();
    const { mutate: createTodo } = useCreateTodo({
        authToken,
        successCallback: () => {
            setBusy(false);
            setViewMode(CardViewMode.View);
            notification.success({
                message: "Todo created",
                description: "Todo has been created successfully"
            });
            
            queryClient.invalidateQueries({ queryKey: ["todos"] }).then();
        },
        errorCallback: (error) => {
            setBusy(false);
            notification.error({
                message: "Error",
                description: error.message
            });
        },
    });

    const onFinish = useCallback((values: { title: string, description: string }) => {
        setBusy(true);
        createTodo({
            title: values.title,
            description: values.description,
            completed: false,
            color: "#ffffff",
        });
    }, [createTodo]);

    return <TodoCardView
        onFinish={onFinish}
        isBusy={isBusy}
        mode={viewMode}
        setMode={setViewMode}
        actions={[
            <PlusCircleOutlined key={"insert-new"} onClick={() => setViewMode(CardViewMode.Insert)} />
        ]}
        bgColor={"#ffffff"}
    />
}