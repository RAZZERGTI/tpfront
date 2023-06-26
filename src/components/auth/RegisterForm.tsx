import React, {useState} from 'react';
import {Button, Form, Input, notification} from "antd";
import styles from './Auth.module.scss'
import {RegisterFormDTO, RegisterFormWithCodeDTO} from "@/pages/api/dto/auth.dto";
import * as Api from "@/pages/api";
import {setCookie} from "nookies";
import { sha512Hash } from '@/hash/hashUtils'

const RegisterForm = () => {
    const [showCodeInput, setShowCodeInput] = useState(false);

    const onSubmit = async (values: RegisterFormDTO) => {
        try {
            values.password = sha512Hash(values.password)
            const response = await Api.auth.register(values);
            if (!response.error){
                setShowCodeInput(true);
                notification.success({
                    message: "Успешно!",
                    description: "Остался последний шаг",
                    duration: 2,
                });
                setCookie(null, "_id", `${response.response.id}`, {
                    path: "/",
                });
            }
            else{
                notification.error({
                    message: "Ошибка!",
                    description: "Неверный логин или пароль",
                    duration: 2,
                });
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
    const onCodeSubmit = async (values: RegisterFormWithCodeDTO) => {
        try {
            const response  = await Api.auth.checkCodeRegistration(values);
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
                    label="Никнейм"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Укажите имя пользователя",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                        rules={[{ required: true, message: "Укажите код"}]}
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

export default RegisterForm;
