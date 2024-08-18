// import { wagmiConnectors } from "./wagmiConnectors";
import { defaultWagmiConfig } from "@web3modal/wagmi";
// import { createWeb3Modal } from "@web3modal/wagmi";
import {
  Chain, //, createClient, http
} from "viem";
import {
  //hardhat,
  mainnet,
  polygonZkEvm,
  sepolia,
} from "viem/chains";
// import { createConfig } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";

// import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

const { targetNetworks } = scaffoldConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find((network: Chain) => network.id == 1101)
  ? targetNetworks
  : ([...targetNetworks, polygonZkEvm] as const);

// 1. Get projectId from https://cloud.walletconnect.com
export const projectId = "678cb5559099f552e87f019a40ccaea0";

// 2. Create wagmiConfig
export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = defaultWagmiConfig({
  chains: enabledChains,
  projectId,
  metadata,
  auth: {
    email: true, // default to true
    socials: ["google", "x", "github", "discord", "apple", "facebook", "farcaster"],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});

// export const wagmiConfig = createConfig({
//   chains: enabledChains,
//   connectors: wagmiConnectors,
//   ssr: true,
//   client({ chain }) {
//     return createClient({
//       chain,
//       transport: http(getAlchemyHttpUrl(chain.id)),
//       ...(chain.id !== (hardhat as Chain).id
//         ? {
//             pollingInterval: scaffoldConfig.pollingInterval,
//           }
//         : {}),
//     });
//   },
// });
