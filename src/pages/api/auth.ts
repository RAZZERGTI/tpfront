import axios from "axios";
import {
    LoginFormDTO,
    LoginFormWithCodeDTO,
    LoginFormWithCodeResponseDTO,
    LoginResponseDTO,
    ReductionDTO,
    ReductionFormWithCodeDTO,
    ReductionFormWithCodeResponseDTO,
    ReductionFormWithPassDTO, ReductionFormWithPassResponseDTO,
    ReductionResponseDTO,
    RegisterFormDTO,
    RegisterFormResponseDTO,
    RegisterFormWithCodeDTO,
    RegisterFormWithCodeResponseDTO,
    User
} from "@/pages/api/dto/auth.dto"
import {destroyCookie} from "nookies";

export const login = async (
    values: LoginFormDTO
): Promise<LoginResponseDTO> => {
    return (await axios.get(`http://188.212.124.120:3001/api/authorization?mail=${values.email}&password=${values.password}`)).data
};

export const checkCodeAuth = async (
    values: LoginFormWithCodeDTO
): Promise<LoginFormWithCodeResponseDTO> => {
    return (await axios.get(`http://188.212.124.120:3001/api/authorization?mail=${values.email}&code=${values.code}`)).data
};

export const register = async (
    values: RegisterFormDTO
): Promise<RegisterFormResponseDTO> => {
    return (await axios.get(`http://188.212.124.120:3001/api/registration?name=${values.name}&mail=${values.email}&password=${values.password}`)).data
};

export const checkCodeRegistration = async (
    values: RegisterFormWithCodeDTO
): Promise<RegisterFormWithCodeResponseDTO> => {
    return (await axios.get(`http://188.212.124.120:3001/api/checkCode?mail=${values.email}&code=${values.code}`)).data
};
export const reduction = async (
    values: ReductionDTO
): Promise<ReductionResponseDTO> => {
    return (await axios.get(`http://188.212.124.120:3001/api/reductionPassword?mail=${values.email}`)).data
};

export const checkCodeReduction = async (
    values: ReductionFormWithCodeDTO
): Promise<ReductionFormWithCodeResponseDTO> => {
    return (await axios.get(`http://188.212.124.120:3001/api/reductionPassword?mail=${values.email}&code=${values.code}`)).data
};

export const newPassReduction = async (
    values: ReductionFormWithPassDTO
): Promise<ReductionFormWithPassResponseDTO> => {
    return (await axios.get(`http://188.212.124.120:3001/api/reductionPassword?mail=${values.email}&password=${values.password}`)).data
};

export const getMe = async (_id: string): Promise<User> => {
    return (await axios.get(`http://188.212.124.120:3001/api/getUserById/${_id}`)).data
}

export const logout = () => {
  destroyCookie(null, "_id", {path: '/'})
}
