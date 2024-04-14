import { useState, useEffect, useCallback } from "react";
import useContract from "@/hooks/useContract";
import { Button } from "@/components/ui/button";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";

export default function UserHomePage() {
    const [userData, setUserData] = useState({});
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const privateKey = localStorage.getItem('key');
    const contractInstance = useContract();

    const getUserData = useCallback(async () => {
        try {
            const UserData = await contractInstance?.methods.getBuyerDetails(privateKey).call();
            const isVerified = await contractInstance?.methods.isVerified(privateKey).call();

            if (isVerified) {
                setIsUserVerified(true);
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
        <div className="flex flex-col items-center">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight p-6">Profile</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-10 max-w-3xl">
                    <div className="mb-6">

                        {
                            isUserVerified ? (<div className="flex flex-row space-x-2 "><MdVerified className="h-8 w-8 text-green-600" /><p className="font-extrabold text-2xl text-green-600">Verified</p></div>) : (<div className="flex text-red-600 flex-row space-x-2 "><GoUnverified className="h-8 w-8 text-red-600" /><p className="font-extrabold text-2xl">Not Verified</p></div>)
                        }

                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-bold">Username - <span className="text-md font-normal" >{userData.name}</span></p>
                        <p className="text-lg font-bold">Age - <span className="text-md font-normal" >{userData.age}</span></p>
                        <p className="text-lg font-bold">City - <span className="text-md font-normal" >{userData.city}</span></p>
                        <p className="text-lg font-bold">Adhaar Card No - <span className="text-md font-normal" >{userData.adharNumber}</span></p>
                        <p className="text-lg font-bold">Pan Card No - <span className="text-md font-normal" >{userData.panNumber}</span></p>
                        <p className="text-lg font-bold">Email - <span className="text-md font-normal" >{userData.email}</span></p>
                    </div>
                    <div>
                        <a href={"https://gateway.lighthouse.storage/ipfs/" + userData.document} className="text-blue-600 underline">View Document</a>
                    </div>
                </div>
            )}
        </div>
    );
}
