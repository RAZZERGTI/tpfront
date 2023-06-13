import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import axios from "axios";
import * as Api from "@/pages/api";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
    const { _id } = nookies.get(ctx);
    try {
        if (_id === 'admin'){
            return {
                redirect: {
                    destination: "/admin/reports",
                    permanent: false,
                },
            };
        } else {
            const infos = await Api.auth.getMe(_id);
            if (infos.error){
                return {
                    redirect: {
                        destination: "/dashboard/auth",
                        permanent: false,
                    },
                };
            }
            else {
                return {
                    props: {},
                };
            }
        }
    } catch (err) {
        return {
            redirect: {
                destination: "/dashboard/auth",
                permanent: false,
            },
        };
    }
};
