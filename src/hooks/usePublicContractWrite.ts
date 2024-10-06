import {
  useContractWrite,
  UseContractWriteConfig,
  useWaitForTransaction,
} from 'wagmi';
import MeelierAbi from '@/constants/abi/Meelier.json';
import { Abi, parseEther } from 'viem';
import { WriteContractMode } from '@wagmi/core';

export function usePublicContractWrite<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(config: UseContractWriteConfig<TAbi, TFunctionName, TMode>) {
  const {
    data: trxData,
    write: contractWrite,
    writeAsync,
    isLoading: contractIsLoading,
    error: contractError,
    isError: contractIsError,
  } = useContractWrite({
    ...config,
    onError(error, variables, context) {
      const e1 = JSON.parse(JSON.stringify(error));
      console.error(e1);
      config?.onError?.(error, variables, context);
    },
  } as any);
  const {
    isLoading: trxIsProcessing,
    error: trxError,
    isError: trxIsisError,
    isSuccess,
  } = useWaitForTransaction({
    hash: trxData?.hash,
    onError(error) {
      // @ts-ignore
      config?.onError?.(error);
    },
    onSuccess(data) {
      // @ts-ignore
      config?.onSuccess?.(trxData);
    },
  });
  return {
    data: trxData,
    writeAsync,
    write: contractWrite,
    isLoading: contractIsLoading || trxIsProcessing,
    error: contractError || trxError,
    isError: contractIsError || trxIsisError,
    isSuccess,
  };
}
