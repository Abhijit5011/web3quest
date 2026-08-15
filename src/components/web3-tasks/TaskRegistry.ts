import React from 'react';
<<<<<<< HEAD
import BlockChainBreak from '@/interactive/BlockChainBreak';
import CheckBalance from '@/interactive/CheckBalance';
import CheckHelaConnection from '@/interactive/CheckHelaConnection';
import CheckHelaFaucet from '@/interactive/GetTestToken';
import InstallMetaMask from '@/interactive/InstallMetaMask';
import SendToSelf from '@/interactive/SendToSelf';
import SendToUs from '@/interactive/SendToUs';
import WalletAddress from '@/interactive/WalledAddress';
import WalletCreateAndConnect from '@/interactive/WalletCreateAndConnect';

export const Web3TaskRegistry: Record<string, React.FC> = {
  'blockchain-integrity': BlockChainBreak,
  'check-balance': CheckBalance,
  'check-hela-connection': CheckHelaConnection,
  'check-hela-faucet': CheckHelaFaucet,
  'install-metamask': InstallMetaMask,
  'send-to-self': SendToSelf,
  'send-to-us': SendToUs,
  'wallet-address': WalletAddress,
  'wallet-create-connect': WalletCreateAndConnect,
};
=======
import BlockChainBreak from './BlockChainBreak';
import CheckBalance from './CheckBalance';
import CheckHelaConnection from './CheckHelaConnection';
import CheckHelaFaucet from './CheckHelaFaucet';
import InstallMetaMask from './InstallMetaMask';
import SendToSelf from './SendToSelf';
import SendToUs from './SendToUs';
import WalletAddress from './WalletAddress';
import WalletCreateAndConnect from './WalletCreateAndConnect';

export const Web3TaskRegistry: Record<string, React.FC> = {
    'blockchain-integrity': BlockChainBreak,
    'check-balance': CheckBalance,
    'check-hela-connection': CheckHelaConnection,
    'check-hela-faucet': CheckHelaFaucet,
    'install-metamask': InstallMetaMask,
    'send-to-self': SendToSelf,
    'send-to-us': SendToUs,
    'wallet-address': WalletAddress,
    'wallet-create-connect': WalletCreateAndConnect,
};

>>>>>>> 1761b947dfd65ad34da9059e09d9a7b3205a9949
