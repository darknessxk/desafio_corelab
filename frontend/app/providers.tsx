'use client'

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider} from "antd";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}

// @ts-ignore
export default function Providers({ children }) {
    const queryClient = getQueryClient()

    return (
        <AntdRegistry>
            <ConfigProvider theme={{
                components: {
                    Layout: {
                        headerBg: 'white'
                    }
                }
            }}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ConfigProvider>
        </AntdRegistry>
    )
}