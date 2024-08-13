'use client'
import useTodoList from "@/api/useTodoList";
import {useUser} from "@/helpers/useUser";
import {useRouter} from "next/navigation";
import TodoCard from "@/components/TodoCard";
import {Row, Col, Flex, Spin, Typography} from "antd";
import NewTodoCard from "@/components/NewTodoCard";
import {useMemo} from "react";

export default function Todos() {
    const { state: user, isAuthenticated } = useUser();
    const { data, status } = useTodoList({
        authToken: user.token!,
    })
    const router = useRouter()

    // grouped by completed

    const { favorites, others } = useMemo(() => {
        if (!data) return { favorites: [], others: [] }

        return {
            favorites: data.filter((todo) => todo.favorite),
            others: data.filter((todo) => !todo.favorite),
        }
    }, [data]);

    if (!isAuthenticated) {
        router.push("/")
    }

    if (status === "pending") {
        return <Flex align="center" gap="middle" justify="center">
            <Spin tip="Loading" size="large">
                <div style={{
                    padding: 50,
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderRadius: 4,
                }} />
            </Spin>
        </Flex>
    }

    return (
        <Flex vertical gap={24}>
            <Flex vertical gap={16}>
                <Typography.Title level={2}>Todos</Typography.Title>
                <Row>
                    <Col span={6} xs={24} md={12} lg={6}>
                        <NewTodoCard authToken={user.token!} />
                    </Col>
                </Row>
            </Flex>

            <Typography.Title level={3}>Favorites</Typography.Title>
            <Row gutter={[16, 16]}>
                {
                    (favorites.length) && favorites.map((todo) => (
                        <Col key={todo.id} span={6} xs={24} md={12} lg={6}>
                            <TodoCard item={todo} authToken={user.token!} />
                        </Col>
                    ))
                }
            </Row>

            <Typography.Title level={3}>Others</Typography.Title>
            <Row gutter={[16, 16]}>
                {
                    (others.length) && others.map((todo) => (
                        <Col key={todo.id} span={6} xs={24} md={12} lg={6}>
                            <TodoCard item={todo} authToken={user.token!} />
                        </Col>
                    ))
                }
            </Row>
        </Flex>
    );
}
