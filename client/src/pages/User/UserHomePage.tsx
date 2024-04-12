import { useState, useEffect, useCallback } from "react";
import useContract from "@/hooks/useContract";
import { Button } from "@/components/ui/button";

export default function UserHomePage() {
    const [userData, setUserData] = useState({});
    const [isUserVerified, setisUserVerified] = useState(false)
    const [loading, setLoading] = useState(true);
    const privateKey = localStorage.getItem('key');
    const contractInstance: any = useContract();

    const getUserData = useCallback(async () => {
        try {

            const UserData = await contractInstance?.methods.getBuyerDetails(privateKey).call();
            const isVerified = await contractInstance?.methods.isVerified(privateKey).call();

            if (isVerified) {
                setisUserVerified(true)
            }
            setUserData({
                name: UserData[0],
                city: UserData[1],
                panNumber: UserData[2],
                document: UserData[3],
                email: UserData[4],
                age: UserData[5].toString(),
                adharNumber: UserData[6]
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [contractInstance, privateKey]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    return (
        <div className="flex items-center flex-col">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Profile
            </h1>
            {loading ? (
                <div>Loading...</div>
            ) : (


                <div className="p-10">
                    {isUserVerified ? (<div>User is Verified</div>) : (<div>User is Not  Verified</div>)}

                    <p>Username: {userData.name}</p>
                    <p>Age: {userData.age}</p>
                    <p>City: {userData.city}</p>
                    <p>Adhaar Card No: {userData.adharNumber}</p>
                    <p>Pan Card No: {userData.panNumber}</p>
                    <p>Email: {userData.email}</p>
                    <a href={"https://gateway.lighthouse.storage/ipfs/" + userData.document}>View Document</a>

                </div>
            )}
        </div>
    );
}
