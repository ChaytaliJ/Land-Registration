import VerifyUserTable from "../components/verify-user-table";
import { useCallback, useEffect, useState } from "react";

import useContract from "@/hooks/useContract";


export default function LandInspectorVerifyUserPage() {
    const [Users, setUsers] = useState([])
    const contractInstance: any = useContract();
    const getUsers = useCallback(async () => {
        try {

            const Users = await contractInstance?.methods?.getUser().call();
            setUsers(Users)


        } catch (error) {
            console.log(error);

        }
    }, [contractInstance]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);
    return (
        <div className="flex h-200 flex-col items-center px-4">

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Verify User
            </h1>
            <VerifyUserTable Users={Users} />
            <div className="p-10"></div>

        </div>
    )
}
