import { useCallback, useEffect, useState } from "react";
import LandCard from "./land-card";
import useContract from "@/hooks/useContract";

export default function LandCardContainer({ islandgallery }) {
    const [loading, setLoading] = useState(true);
    const [userLands, setUserLands] = useState([]);
    const privateKey = localStorage.getItem('key');
    const contractInstance: any = useContract();

    const getLandData = useCallback(async () => {
        try {
            if (!islandgallery) {
                const landsData = await contractInstance?.methods?.getUserOwnedLands(privateKey).call();
                setUserLands(landsData);
            }
            else {
                const landsData = await contractInstance?.methods?.getAllLandIds().call();

                setUserLands(landsData);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [contractInstance, privateKey]);

    useEffect(() => {
        getLandData();
    }, [getLandData]);

    return (
        <div className="grid grid-cols-4 gap-4">
            {userLands?.map((landId, index) => (
                <LandCard key={index} islandgallery={islandgallery} landId={parseInt(landId)} />
            ))}
        </div>
    );
}
