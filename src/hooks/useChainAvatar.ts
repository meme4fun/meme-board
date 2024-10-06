import { useState } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';

export function useChainAvatar(address?: `0x${string}`) {
  /*  const { data: ensAvatar } = useEnsAvatar({
    address,
  }); */

  const [avatar, setAvatar] = useState<string | null>();

  const { data: ensName } = useEnsName({
    address,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
  });

  return ensAvatar;
}
