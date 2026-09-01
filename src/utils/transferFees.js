export const ADMIN_TRANSFER_PHONE = '0723274962';

export function calculateTransferFee(amount) {
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return 0;
  }

  if (parsedAmount < 1000) {
    return 0;
  }

  if (parsedAmount <= 10000) {
    return 20;
  }

  const additionalTenKBlocks = Math.floor((parsedAmount - 10000) / 10000);
  return 20 + additionalTenKBlocks * 5;
}
