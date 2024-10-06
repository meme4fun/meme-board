import numbro from 'numbro';

export const isBrowser = typeof window !== 'undefined';
/**
 * Ensure that an Ethereum address does not overflow
 * by removing the middle characters
 * @param address An Ethereum address
 * @param shrinkInidicator Visual indicator to show address is only
 * partially displayed
 * @returns A shrinked version of the Ethereum address
 * with the middle characters removed.
 */
function truncateAddress(
  address?: string,
  firstLength = 6,
  lastLength = 6,
  shrinkInidicator?: string,
) {
  if (!address) return address;
  return (
    address.slice(0, firstLength) +
    (shrinkInidicator || '…') +
    address.slice(-lastLength)
  );
}

/**
 * Ensure the ENS names do not overflow by removing the
 * middle characters
 * @param ensName An ENS name
 * @param shrinkInidicator Visual indicator to show address is only
 * partially displayed
 * @returns A shrinked version of the ENS name if and
 * and only if the ENS name is longer than 24 characters
 * such that the displayed string does not overflow
 */
function truncateEns(ensName?: string | null, shrinkInidicator?: string) {
  if (!ensName || ensName.length < 24) return ensName;

  return ensName.slice(0, 20) + (shrinkInidicator || '…') + ensName.slice(-3);
}

export { truncateAddress, truncateEns };

export function mantissaNumber(
  value,
  mantissa = 6,
  optionalMantissa = true,
  average = false,
) {
  if (!value) return '0';
  return numbro(value).format({
    thousandSeparated: true,
    average,
    totalLength: average ? 4 : 0,
    optionalMantissa,
    mantissa,
    trimMantissa: true,
  });
}
