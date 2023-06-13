export interface LoginFormDTO {
    email:string
    password: string
}
export interface LoginResponseDTO {
    response: {
        id: number
        name: string
        mail: string
    }
}
export interface LoginFormWithCodeDTO{
    email: string
    password: string
    code: number
}
export interface LoginFormWithCodeResponseDTO{
    response: boolean
}
export interface ReductionDTO {
    email:string
}
export type ReductionResponseDTO = LoginFormWithCodeResponseDTO

export interface ReductionFormWithCodeDTO {
    email: string
    code: number
}
export type ReductionFormWithCodeResponseDTO = ReductionResponseDTO

export interface ReductionFormWithPassDTO {
    email: string
    password: string
}
export interface ReductionFormWithPassResponseDTO {
    response: {
        id: number,
        name: string,
        mail: string
    }
}

export type RegisterFormDTO = LoginFormDTO & { name: string };
export type RegisterFormResponseDTO = LoginResponseDTO;
export type RegisterFormWithCodeDTO = LoginFormWithCodeDTO & { name: string }
export type RegisterFormWithCodeResponseDTO = LoginFormWithCodeResponseDTO

export interface User {
    id: number
    mail:string
    name: string
}