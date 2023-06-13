import React from 'react';
import Head from "next/head";
import {Tabs} from "antd";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ReductionForm from "@/components/auth/ReductionForm";

const Auth = () => {
    return (
        <>
            <Head>
                <title>TaP / Auth</title>
            </Head>
            <main style={{ width: 400, margin: "50px auto" }}>
                <Tabs
                    items={[
                        {
                            label: "Войти",
                            key: "1",
                            children: <LoginForm />,
                        },
                        {
                            label: "Регистрация",
                            key: "2",
                            children: <RegisterForm />,
                        },
                        {
                            label: "Забыли пароль?",
                            key: "3",
                            children: <ReductionForm />,
                        },
                ]}
                />
            </main>
        </>


    );
};

export default Auth;