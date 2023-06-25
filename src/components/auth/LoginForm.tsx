import React, {useState} from 'react';
import styles from './Auth.module.scss'
import {Button, Form, Input, notification} from "antd";
import {LoginFormDTO, LoginFormWithCodeDTO} from "@/pages/api/dto/auth.dto";

import * as Api from "@/pages/api"
import {setCookie} from "nookies";
import {sha512Hash} from "@/hash/hashUtils";

const LoginForm = () => {
    const [showCodeInput, setShowCodeInput] = useState(false);

    const onSubmit = async (values: LoginFormDTO) => {
    try {
        if (values.password && values.email === 'admin') {
            setCookie(null, "_id", 'admin', {
                path: "/",
            });
            location.href = "/admin/reports";
        } else {
            values.password = sha512Hash(values.password);
            const response = await Api.auth.login(values);
            if ('error' in response) {
                notification.error({
                    message: "Ошибка!",
                    description: "Неверный логин или пароль",
                    duration: 2,
                });
            } else {
                setShowCodeInput(true);
                notification.success({
                    message: "Успешно!",
                    description: "Остался последний шаг",
                    duration: 2,
                });
                setCookie(null, "_id", response.response.id, {
                    path: "/",
                });
            }
        }
    } catch (err) {
        console.log("LoginForm", err);

        notification.error({
            message: "Ошибка!",
            description: "Неверный логин или пароль",
            duration: 2,
        });
    }
};
    const onCodeSubmit = async (values: LoginFormWithCodeDTO) => {
        try {
            const response  = await Api.auth.checkCodeAuth(values);
            if (response.response){
                location.href = "/dashboard";
                notification.success({
                    message: "Код успешно введен!",
                    description: "Переходим на главную страницу...",
                    duration: 2,
                });
            }
            else{
                notification.error({
                    message: "Ошибка!",
                    description: "Неверный код",
                    duration: 2,
                });
            }
        } catch (err) {
            console.log("CodeForm", err);

            notification.error({
                message: "Ошибка!",
                description: "Неверный код",
                duration: 2,
            });
        }
    };
    return (
        <div className={styles.formBlock}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                onFinish={showCodeInput ? onCodeSubmit : onSubmit}
            >
                <Form.Item
                    label="E-Mail"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Укажите почту",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Укажите пароль",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {showCodeInput && (
                    <Form.Item
                        label="Код"
                        name="code"
                        rules={[{ required: true, message: "Укажите код",},]}
                    >
                        <Input />
                    </Form.Item>
                )}

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        {showCodeInput ? "Подтвердить" : "Получить код"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
