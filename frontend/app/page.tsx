'use client';
import {Card, Divider, Flex, Statistic, Typography} from 'antd';
import {useUser} from "@/helpers/useUser";
import {useEffect, useMemo, useState} from "react";
import {IStatsTodoResponse} from "@/interfaces/IStatsTodoResponse";
import useStats from "@/api/useStats";

export default function Home() {
    const { state: user, isAuthenticated } = useUser();
    const showStats = useMemo(() => isAuthenticated, [isAuthenticated]);
    const [stats, setStats] = useState<IStatsTodoResponse | null>(null);
    const { mutate, status } = useStats({
        authToken: user?.token ?? "",
    })

    useEffect(() => {
        if (isAuthenticated) {
            mutate({}, {
                onSuccess: (data) => setStats(data)
            });
        }
    }, [isAuthenticated, mutate]);

    return (
        <Flex vertical align={"center"}>
            <Flex vertical>
                <Typography.Title level={4}>Home</Typography.Title>
                <Typography.Paragraph>
                    Welcome to the home page, some mutable information are there, so if you login/register some stuff will show up!
                </Typography.Paragraph>
            </Flex>
            {showStats && (
                <Card className={"min-w-[325px] max-w-[325px]"} loading={status === "pending"} title="Stats">
                    {status === "error" && (
                        <Typography.Paragraph>
                            Error loading stats...
                        </Typography.Paragraph>
                    )}

                    {status === "success" && (
                        <Typography.Paragraph>
                            <Statistic title="Total Todos" value={stats?.total} />
                            <Statistic title="Completed Todos" value={stats?.completed} />
                            <Statistic title="Pending Todos" value={stats?.pending} />
                            <Statistic title="Overdue Todos" value={stats?.overdue} />
                        </Typography.Paragraph>
                    )}
                </Card>
            )}
        </Flex>
    );
}
