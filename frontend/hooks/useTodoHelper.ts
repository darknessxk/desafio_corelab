import {useCallback} from "react";
import {notification} from "antd";
import {useQueryClient} from "@tanstack/react-query";
import useDeleteTodo from "@/api/useDeleteTodo";
import useUpdateTodo from "@/api/useUpdateTodo";
import ITodo from "@/interfaces/ITodo";
import {CardViewMode} from "@/components/TodoCardView";

interface UseTodoHelperProps {
    item: ITodo;
    setBusy: (value: boolean) => void;
    setViewMode: (value: CardViewMode) => void;
    authToken: string;
}

export default function useTodoHelper({ authToken, item, setBusy, setViewMode }: UseTodoHelperProps) {
    const queryClient = useQueryClient();
    const { mutate: deleteTodo } = useDeleteTodo({
        authToken
    })
    const { mutate: updateTodo } = useUpdateTodo({
        authToken
    })
    
    const deleteItem = useCallback(() => {
        setBusy(true);
        deleteTodo({
            id: item.id
        }, {
            onSuccess: () => {
                setBusy(false)
                notification.success({
                    message: "Item deleted",
                    description: "Item has been successfully deleted"
                })

                queryClient.invalidateQueries({ queryKey: ["todos"] }).then()
            },
            onError: () => {
                setBusy(false)
                notification.error({
                    message: "Error deleting item",
                    description: "An error occurred while deleting the item"
                })
            },
        })
    }, [deleteTodo, item.id, queryClient, setBusy])

    const updateColor = useCallback((bgColor: string) => {
        setBusy(true);
        updateTodo({
            params: {
                id: item.id
            },
            body: {
                ...item,
                color: bgColor
            }
        }, {
            onError: () => {
                setBusy(false)
                notification.error({
                    message: "Error updating color",
                    description: "An error occurred while updating the color"
                })
            },
            onSuccess: () => {
                setBusy(false)
                notification.success({
                    message: "Color updated",
                    description: "Color has been successfully updated"
                })

                queryClient.invalidateQueries({ queryKey: ["todos"] }).then()
            }
        })
    }, [item, queryClient, setBusy, updateTodo])

    const toggleFavorite = useCallback(() => {
        setBusy(true);
        updateTodo({
            params: {
                id: item.id
            },
            body: {
                ...item,
                favorite: !item.favorite
            }
        }, {
            onError: () => {
                setBusy(false)
                notification.error({
                    message: "Error updating favorite",
                    description: "An error occurred while updating the favorite"
                })
            },
            onSuccess: () => {
                setBusy(false)
                notification.success({
                    message: "Item updated",
                    description: !item.favorite ? "Item has been added to favorites" : "Item has been removed from favorites"
                })

                queryClient.invalidateQueries({ queryKey: ["todos"] }).then()
            }
        })
    }, [item, queryClient, setBusy, updateTodo])

    const toggleCompleted = useCallback(() => {
        setBusy(true);
        updateTodo({
            params: {
                id: item.id
            },
            body: {
                ...item,
                completed: !item.completed
            }
        }, {
            onError: () => {
                setBusy(false)
                notification.error({
                    message: "Error updating completed",
                    description: "An error occurred while updating the completed"
                })
            },
            onSuccess: () => {
                setBusy(false)
                notification.success({
                    message: "Item updated",
                    description: !item.completed ? "Item has been marked as completed" : "Item has been marked as incomplete"
                })

                queryClient.invalidateQueries({ queryKey: ["todos"] }).then()
            }
        })
    }, [item, queryClient, setBusy, updateTodo])
    
    const updateItem = useCallback((values: { title: string, description: string }) => {
        setBusy(true);
        updateTodo({
            params: {
                id: item.id
            },
            body: {
                ...item,
                title: values.title,
                description: values.description
            }
        }, {
            onError: () => {
                setBusy(false)
                notification.error({
                    message: "Error updating item",
                    description: "An error occurred while updating the item"
                })
            },
            onSuccess: () => {
                setBusy(false)
                setViewMode(CardViewMode.View)
                notification.success({
                    message: "Item updated",
                    description: "Item has been successfully updated"
                })

                queryClient.invalidateQueries({ queryKey: ["todos"] }).then()
            }
        })
    }, [item, queryClient, setBusy, updateTodo])

    return {
        deleteItem,
        updateColor,
        toggleFavorite,
        toggleCompleted,
        updateItem
    }
}