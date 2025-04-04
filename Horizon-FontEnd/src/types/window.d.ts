interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

type EthereumEventMap = {
    accountsChanged: string[];
    chainChanged: string;
    connect: { chainId: string };
    disconnect: { code: number; message: string };
};

type EthereumEventCallback<K extends keyof EthereumEventMap> = (params: EthereumEventMap[K]) => void;

interface Window {
    ethereum?: {
        request: (args: RequestArguments) => Promise<unknown>;
        send: (method: string, params: unknown[]) => Promise<unknown>;
        on: <K extends keyof EthereumEventMap>(event: K, callback: EthereumEventCallback<K>) => void;
        removeListener: <K extends keyof EthereumEventMap>(event: K, callback: EthereumEventCallback<K>) => void;
        isMetaMask?: boolean;
    };
} 