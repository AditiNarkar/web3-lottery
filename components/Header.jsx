"use client";

// Moralis APIs powers crypto and blockchain applications 
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function Header() {
    const { enableWeb3, deactivateWeb3, account, isWeb3Enabled, isWeb3EnableLoading, Moralis } = useMoralis(); // hook

    // StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you
    useEffect(() => {
        if (isWeb3Enabled) return;

        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3() // sets isWeb3Enabled to false
            }
        })
    }, [])

    return (
        <div>
            {
                account
                    ?
                    (
                        <div>Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)} </div>
                    )
                    :
                    (<button onClick={ async () => {
                            await enableWeb3();
                            if (typeof window !== "undefined")
                                window.localStorage.setItem("connected", "injected")
                        }}
                        disabled={isWeb3EnableLoading}
                    >
                        Connect
                    </button>)
            }

        </div>
    );
}
