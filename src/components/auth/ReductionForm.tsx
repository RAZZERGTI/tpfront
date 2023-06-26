import React, {useState} from 'react';
import {Button, Form, Input, notification} from "antd";
import styles from './Auth.module.scss'
import {
    ReductionDTO,
    ReductionFormWithCodeDTO, ReductionFormWithPassDTO,
    RegisterFormDTO,
    RegisterFormWithCodeDTO
} from "@/pages/api/dto/auth.dto";
import * as Api from "@/pages/api";
import {setCookie} from "nookies";
import { sha512Hash } from '@/hash/hashUtils'
import {checkCodeReduction, newPassReduction, reduction} from "@/pages/api/auth";

const ReductionForm = () => {
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showNewPasswords, setShowNewPasswords] = useState(false);

    const onSubmit = async (values: ReductionDTO) => {
        try {
            const response = await Api.auth.reduction(values);
            if (!response.error){
                setShowCodeInput(true);
                notification.success({
                    message: "Успешно!",
                    description: "Остался последний шаг",
                    duration: 2,
                });
            }
            else{
                notification.error({
                    message: "Ошибка!",
                    description: "Неверная почта",
                    duration: 2,
                });
            }

        } catch (err) {

            notification.error({
                message: "Ошибка!",
                description: "Неверная почта",
                duration: 2,
            });
        }
    };
    const onCodeSubmit = async (values: ReductionFormWithCodeDTO) => {
        try {
            const response  = await Api.auth.checkCodeReduction(values);
            if (response.response){
                setShowNewPasswords(true)
                setShowCodeInput(false)
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
    const onNewPasswordSubmit = async (values: ReductionFormWithPassDTO) => {
        try {
            values.password = sha512Hash(values.password)
            const response  = await Api.auth.newPassReduction(values);
            if (response){
                console.log(response.response.id)
                location.href = "/dashboard";
                notification.success({
                    message: "Пароль успешно введен!",
                    description: "Переходим на главную страницу...",
                    duration: 2,
                });
                setCookie(null, "_id", `${response.response.id}`, {
                    path: "/",
                });
            }
            else{
                notification.error({
                    message: "Ошибка!",
                    description: "Неверный пароль",
                    duration: 2,
                });
            }
        } catch (err) {
            console.log("CodeForm", err);

            notification.error({
                message: "Ошибка!",
                description: "Неверный пароль",
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
                onFinish={showCodeInput ? onCodeSubmit : (showNewPasswords ? onNewPasswordSubmit : onSubmit)}
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

                {showCodeInput && (
                    <Form.Item
                        label="Код"
                        name="code"
                        rules={[{ required: true, message: "Укажите код"}]}
                    >
                        <Input />
                    </Form.Item>
                )}
                {showNewPasswords && (
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: "Укажите пароль"}]}
                    >
                        <Input.Password />
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

export default ReductionForm;
