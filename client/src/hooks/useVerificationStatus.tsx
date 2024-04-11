import { useState, useEffect, useCallback } from 'react';
import useContract from './useContract';

const useVerificationStatus = () => {
    const [isUserVerified, setIsUserVerified] = useState(false);
    const privateKey = localStorage.getItem('key');
    const contractInstance: any = useContract();

    const getVerificationStatus = async () => {
        try {
            const isVerified = await contractInstance?.methods?.isVerified(privateKey).call();
            setIsUserVerified(isVerified);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getVerificationStatus();
    }, [getVerificationStatus]);

    return isUserVerified;
};

export default useVerificationStatus;
