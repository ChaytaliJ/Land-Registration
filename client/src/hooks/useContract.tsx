import { useState, useEffect } from 'react';
import getWeb3 from "../Web3"; // Assuming this is a function that returns a Web3 instance
import LandContract from '../artifacts/Land.json'; // Assuming you have your contract ABI and network details in a JSON file

const useContract = () => {
    const [contractInstance, setContractInstance] = useState(null);

    useEffect(() => {
        const initializeContract = async () => {
            try {
                const web3: any = await getWeb3();

                const networkId = await web3.eth.net.getId();
                //@ts-ignore
                const deployedNetwork = LandContract.networks[networkId];

                const instance = new web3.eth.Contract(
                    LandContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                //@ts-ignore
                setContractInstance(instance);
            } catch (error) {
                console.error('Error initializing contract:', error);
            }
        };

        initializeContract();
    }, []);

    return contractInstance;
};

export default useContract;
