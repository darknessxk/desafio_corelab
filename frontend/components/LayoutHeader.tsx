"use client";
import {Menu, Typography, Layout, Flex} from "antd";
import {MenuItemType} from "antd/lib/menu/interface";
import {usePathname, useRouter} from "next/navigation";
import {useUser} from "@/helpers/useUser";
import {useCallback, useEffect, useMemo, useState} from "react";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Logo from "@/components/Logo";

export default function LayoutMenu() {
    const path = usePathname();
    const user = useUser();
    const [items, setItems] = useState<MenuItemType[]>([]);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [registerModalOpen, setRegisterModalOpen] = useState(false);
    const router = useRouter()
    
    const menuOnClick = useCallback(({ key }: { key: string }) => {
        switch (key) {
            case '/':
                router.push('/');
                break;
            case '/logout':
                user.clearToken();
                break;
            case '/login':
                setLoginModalOpen(true);
                break;
            case '/register':
                setRegisterModalOpen(true);
                break;
            case '/todos':
                router.push('/todos');
                break;
            default:
                console.log('Navigate to', key);
        }
    }, [router, user]);

    useEffect(() => {
        const base = [
            {
                title: 'Home',
                key: '/',
                label: 'Home',
            }
        ]

        if (user.isAuthenticated) {
            base.push({
                title: 'Todos',
                key: '/todos',
                label: 'Todos',
            })

            base.push({
                title: 'Logout',
                key: '/logout',
                label: 'Logout',
            })
        } else {
            base.push({
                title: 'Login',
                key: '/login',
                label: 'Login',
            })

            base.push({
                title: 'Register',
                key: '/register',
                label: 'Register',
            })
        }

        setItems(base);
    }, [user.isAuthenticated]);

    const MenuRender = useMemo(() => <Menu
        mode="horizontal"
        items={items}
        selectedKeys={[path]}
        onClick={menuOnClick}
        style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
    />, [items, path, menuOnClick]);

    return (
        <>
            <Layout.Header
                className={"flex items-center justify-between"}
                style={{
                    borderBottom: "1px solid rgba(5, 5, 5, 0.06)"
                }}
            >

                <Flex>
                    <Logo />
                    <Typography.Title style={{ margin: 0 }} level={3} className={"text-white pl-4"}>
                        CoreNotes
                    </Typography.Title>
                </Flex>
                {MenuRender}
                <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
                <RegisterModal open={registerModalOpen} setOpen={setRegisterModalOpen} />
            </Layout.Header>
        </>
    )
}